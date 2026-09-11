import { createFileRoute, Link } from "@tanstack/react-router";
import { SKUS, STORAGE } from "@/lib/calabi/content";

export const Route = createFileRoute("/pricing")({ component: PricingPage });

function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-5xl">Pricing</h1>
      <p className="mt-3 max-w-xl text-muted">
        Listed rates include the Calabi overlay (snapshot, spare, vault). Underlying GPU hours are
        dropshiped from the fabric.
      </p>
      <div className="mt-8 overflow-x-auto rounded-xl shadow-[0_0_0_1px_var(--color-line)]">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-surface-2 text-[11px] uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">GPU</th>
              <th className="px-4 py-3">USD / hr</th>
            </tr>
          </thead>
          <tbody>
            {SKUS.map((s) => (
              <tr key={s.id} className="border-t border-line bg-surface">
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3 text-muted">{s.kind}</td>
                <td className="px-4 py-3 text-muted">{s.gpu}</td>
                <td className="px-4 py-3 font-mono tabular-nums">{s.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {STORAGE.map((s) => (
          <article key={s.id} className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]">
            <h2>{s.name}</h2>
            <p className="mt-1 font-mono text-xs text-accent">
              ${s.price.toFixed(3)} {s.unit}
            </p>
          </article>
        ))}
      </div>
      <Link to="/console" className="mt-8 inline-flex h-11 items-center text-sm text-accent">
        Launch from console
      </Link>
    </main>
  );
}
