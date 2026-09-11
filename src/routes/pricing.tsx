import { createFileRoute, Link } from "@tanstack/react-router";
import { OFFERS, STORAGE } from "@/lib/calabi/content";

export const Route = createFileRoute("/pricing")({ component: PricingPage });

function PricingPage() {
  const gpus = OFFERS.filter((o) => o.kind === "gpu");
  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-center text-xs uppercase tracking-[0.16em] text-faint">GPU pricing</p>
      <h1 className="mt-3 text-center font-display text-5xl sm:text-6xl">GPU cloud pricing</h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-muted">
        Pods for dedicated instances. Endpoints for inference. Clusters for multi-node jobs. One Calabi account.
      </p>
      <h2 className="mt-16 font-display text-4xl">Pods</h2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {gpus.map((o) => (
          <li key={o.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xl">{o.name}</p>
            <div className="flex flex-wrap gap-2 text-xs text-muted">
              {o.vram ? <span className="rounded-full bg-surface px-3 py-1">{o.vram} GB VRAM</span> : null}
              <span className="rounded-full bg-surface px-3 py-1">{o.ram} GB RAM</span>
              <span className="rounded-full bg-surface px-3 py-1">{o.vcpu} vCPU</span>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-mono">${o.price.toFixed(2)}/hr</p>
              <Link to="/compute" className="text-sm text-accent">Deploy</Link>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="mt-16 font-display text-3xl">Storage</h2>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {STORAGE.map((s) => (
          <article key={s.id} className="rounded-2xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]">
            <h3>{s.name}</h3>
            <p className="mt-2 font-mono text-sm text-accent">${s.price.toFixed(3)} {s.unit}</p>
            <p className="mt-2 text-sm text-muted">{s.copy}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
