import { createFileRoute } from "@tanstack/react-router";
import { PROVIDERS } from "@/lib/calabi/content";

export const Route = createFileRoute("/fabric")({ component: FabricPage });

function FabricPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-5xl">Fabric</h1>
      <p className="mt-3 max-w-xl text-muted">
        Dropshipping compute is not a slur. It is how you stay up when one marketplace blinks.
        Calabi is the control plane: schedule, snapshot, spare, invoice.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {PROVIDERS.map((p) => (
          <article key={p.id} className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{p.kind}</p>
            <h2 className="mt-1 text-xl">{p.name}</h2>
            <p className="mt-2 text-sm text-muted">{p.use}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
