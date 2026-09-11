import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { launchPod, listPods, me, terminatePod } from "@/lib/houses/api";
import { getToken } from "@/lib/session";
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
  const [account, setAccount] = useState<any>(null);
  const pods = useQuery({
    queryKey: ["calabi-pods"],
    queryFn: () => listPods(),
    refetchInterval: 12_000,
    enabled: Boolean(getToken()),
  });
  const selected = useMemo(() => SKUS.find((s) => s.id === sku) || SKUS[0], [sku]);

  useEffect(() => {
    if (!getToken()) return;
    void me().then((res) => {
      if (res?.account) setAccount(res.account);
    });
  }, [pods.data]);

  if (!getToken()) {
    return (
      <main className="mx-auto max-w-xl px-5 py-16">
        <h1 className="font-display text-5xl">Console</h1>
        <p className="mt-3 text-muted">Sign in to launch and terminate pods.</p>
        <Link to="/account" className="mt-8 inline-flex h-11 items-center rounded-sm bg-accent px-5 text-sm text-accent-fg">Account</Link>
      </main>
    );
  }

  const rows = Array.isArray(pods.data) ? pods.data : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-5xl">Console</h1>
      <p className="mt-2 text-muted">
        {account ? `$${(Number(account.credits_cents || 0) / 100).toFixed(2)} on account.` : "Launch a pod."} Spare region is assigned automatically.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[20rem_1fr]">
        <form className="space-y-3 rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]" onSubmit={async (e) => {
          e.preventDefault();
          setMsg("");
          const res = await launchPod({ data: { sku, region, vault } });
          if (res && "error" in res && res.error) { setMsg(String(res.error)); return; }
          void pods.refetch();
          const next = await me();
          if (next?.account) setAccount(next.account);
        }}>
          <label className="block text-xs uppercase tracking-[0.14em] text-faint">SKU
            <select value={sku} onChange={(e) => setSku(e.target.value)} className="mt-1 h-11 w-full rounded-md bg-bg px-3 text-sm text-fg">
              {SKUS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>
          <label className="block text-xs uppercase tracking-[0.14em] text-faint">Region
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="mt-1 h-11 w-full rounded-md bg-bg px-3 text-sm text-fg">
              {REGIONS.map((r) => <option key={r.id} value={r.id}>{r.code} · {r.role}</option>)}
            </select>
          </label>
          <label className="flex h-11 items-center gap-2 text-sm">
            <input type="checkbox" checked={vault} onChange={(e) => setVault(e.target.checked)} /> Attach WORM vault
          </label>
          <p className="font-mono text-xs text-accent">{selected.gpu} · {selected.cpu} · ${selected.price.toFixed(2)}/hr</p>
          <Button type="submit" className="w-full">Launch pod</Button>
          {msg ? <p className="text-sm text-warn">{msg}</p> : null}
        </form>
        <div className="space-y-2">
          {!rows.length ? <p className="text-muted">No pods yet.</p> : rows.map((p: any) => {
            const s = SKUS.find((x) => x.id === p.sku);
            const r = REGIONS.find((x) => x.id === p.region);
            return (
              <article key={p.id} className="rounded-xl bg-surface px-4 py-3 shadow-[0_0_0_1px_var(--color-line)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-faint">{p.id}</p>
                    <p>{s?.name} · {r?.code} · spare {p.spare} · {p.status}{p.vault ? " · vault" : ""}</p>
                  </div>
                  <Button variant="line" type="button" onClick={async () => { await terminatePod({ data: { id: p.id } }); void pods.refetch(); }}>Terminate</Button>
                </div>
                {p.connect?.command ? (
                  <pre className="mt-3 overflow-x-auto bg-bg p-3 font-mono text-xs">{p.connect.command}</pre>
                ) : (
                  <p className="mt-3 text-sm text-muted">{p.status === "queued" ? "Queued on the fabric. Starts when capacity is attached." : "Connection appears when the machine is reachable."}</p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
