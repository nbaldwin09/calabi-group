import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { launchPod, listPods, terminatePod } from "@/lib/houses/api";
import { REGIONS, SKUS } from "@/lib/calabi/content";

type Search = { sku?: string };

export const Route = createFileRoute("/console")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    sku: typeof raw.sku === "string" ? raw.sku : undefined,
  }),
  component: ConsolePage,
});

function ConsolePage() {
  const { sku: skuParam } = Route.useSearch();
  const [sku, setSku] = useState(skuParam || SKUS[0].id);
  const [region, setRegion] = useState(REGIONS[0].id);
  const [vault, setVault] = useState(true);
  const [msg, setMsg] = useState("");
  const pods = useQuery({
    queryKey: ["calabi-pods"],
    queryFn: () => listPods(),
    refetchInterval: 15_000,
  });
  const selected = useMemo(() => SKUS.find((s) => s.id === sku) || SKUS[0], [sku]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-5xl">Console</h1>
      <p className="mt-2 text-muted">
        Launch a pod. A spare region is assigned automatically.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[20rem_1fr]">
        <form
          className="space-y-3 rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]"
          onSubmit={async (e) => {
            e.preventDefault();
            setMsg("");
            const res = await launchPod({ data: { sku, region, vault } });
            if (res && "error" in res && res.error) {
              setMsg(res.error);
              return;
            }
            void pods.refetch();
          }}
        >
          <label className="block text-xs uppercase tracking-[0.14em] text-faint">
            SKU
            <select
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="mt-1 h-11 w-full rounded-md bg-bg px-3 text-sm text-fg"
            >
              {SKUS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs uppercase tracking-[0.14em] text-faint">
            Region
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-1 h-11 w-full rounded-md bg-bg px-3 text-sm text-fg"
            >
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.code} · {r.role}
                </option>
              ))}
            </select>
          </label>
          <label className="flex h-11 items-center gap-2 text-sm">
            <input type="checkbox" checked={vault} onChange={(e) => setVault(e.target.checked)} />
            Attach WORM vault
          </label>
          <p className="font-mono text-xs text-accent">
            {selected.gpu} · {selected.cpu} · ${selected.price.toFixed(2)}/hr
          </p>
          <Button type="submit" className="w-full">
            Launch pod
          </Button>
          {msg ? <p className="text-sm text-warn">{msg}</p> : null}
        </form>
        <div className="space-y-2">
          {!pods.data?.length ? (
            <p className="text-muted">No pods yet. Launch one — a spare region is assigned automatically.</p>
          ) : (
            pods.data.map((p) => {
              const s = SKUS.find((x) => x.id === p.sku);
              const r = REGIONS.find((x) => x.id === p.region);
              const spare = REGIONS.find((x) => x.id !== p.region);
              return (
                <article
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3 shadow-[0_0_0_1px_var(--color-line)]"
                >
                  <div>
                    <p className="font-mono text-xs text-faint">{p.id}</p>
                    <p>
                      {s?.name} · {r?.code} · spare {spare?.code}
                      {p.vault ? " · vault" : ""}
                    </p>
                  </div>
                  <Button
                    variant="line"
                    type="button"
                    onClick={async () => {
                      await terminatePod({ data: { id: p.id } });
                      void pods.refetch();
                    }}
                  >
                    Terminate
                  </Button>
                </article>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
