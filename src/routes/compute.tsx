import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { OFFERS, PRODUCTS, REGIONS } from "@/lib/calabi/content";
import { getToken } from "@/lib/session";
import { launchPod } from "@/lib/houses/api";

export const Route = createFileRoute("/compute")({ component: ComputePage });

const BANDS = [
  { id: "all", label: "Any VRAM" },
  { id: "24", label: "16–24 GB" },
  { id: "32", label: "32 GB" },
  { id: "48", label: "48 GB" },
  { id: "80", label: "80 GB" },
  { id: "96", label: "96 GB+" },
  { id: "140", label: "140 GB+" },
  { id: "cpu", label: "CPU" },
];

function ComputePage() {
  const nav = useNavigate();
  const [band, setBand] = useState("all");
  const [region, setRegion] = useState(REGIONS[0].id);
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");
  const rows = useMemo(
    () => OFFERS.filter((o) => band === "all" || o.band === band || (band === "96" && o.vram >= 96)),
    [band],
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Deploy</p>
      <h1 className="mt-2 font-display text-5xl">Select an instance</h1>
      <p className="mt-3 max-w-xl text-muted">
        Calabi GPU and CPU instances. Deploy from this catalog into a Calabi region.
      </p>
      <div className="mt-8 flex flex-wrap gap-6 text-sm">
        {PRODUCTS.map((p) => (
          <div key={p.id}>
            <p className="text-fg">{p.title}</p>
            <p className="mt-1 max-w-[14rem] text-xs text-muted">{p.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-2">
        {BANDS.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setBand(b.id)}
            className={`h-10 rounded-sm px-3 text-sm ${band === b.id ? "bg-accent text-accent-fg" : "shadow-[0_0_0_1px_var(--color-line)]"}`}
          >
            {b.label}
          </button>
        ))}
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="ml-auto h-10 rounded-sm bg-bg px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]"
        >
          {REGIONS.map((r) => (
            <option key={r.id} value={r.id}>{r.code}</option>
          ))}
        </select>
      </div>
      {msg ? <p className="mt-4 text-sm text-warn">{msg}</p> : null}
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {rows.map((o) => (
          <li key={o.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xl">{o.name}</p>
              <p className="mt-1 text-sm text-muted">
                {o.vram ? `${o.vram} GB VRAM · ` : ""}{o.ram} GB RAM · {o.vcpu} vCPU{o.maxGpus ? ` · up to ${o.maxGpus}×` : ""}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-mono text-sm">${o.price.toFixed(2)}/hr</p>
              <button
                type="button"
                disabled={!o.available || busy === o.id}
                className="inline-flex h-11 items-center rounded-sm bg-accent px-4 text-sm text-accent-fg disabled:opacity-40"
                onClick={async () => {
                  if (!getToken()) { nav({ to: "/account" }); return; }
                  setBusy(o.id);
                  setMsg("");
                  const res = await launchPod({ data: { sku: o.id, region, vault: true } });
                  setBusy("");
                  if (res?.error) { setMsg(String(res.error)); return; }
                  nav({ to: "/console" });
                }}
              >
                Deploy
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-muted">
        Need a reserved cluster? <Link to="/account" className="text-accent">Account</Link> and write sales@calabigroup.com.
      </p>
    </main>
  );
}
