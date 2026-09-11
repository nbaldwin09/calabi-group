import { createFileRoute, Link } from "@tanstack/react-router";
import { CalabiType } from "@/components/wordmarks";
import { SKUS } from "@/lib/calabi/content";

export const Route = createFileRoute("/")({ component: CalabiHome });

function CalabiHome() {
  return (
    <main>
      <section className="border-b border-line">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-5 py-20 text-center sm:py-28">
          <CalabiType className="text-6xl sm:text-8xl" />
          <p className="mt-10 max-w-md text-muted">
            GPU, VM, and storage with a spare already on. Capacity from RunPod and peers. Backups so
            a hall can fail without the workload noticing.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/compute"
              className="inline-flex h-11 items-center rounded-sm bg-accent px-5 text-sm text-accent-fg"
            >
              Compute
            </Link>
            <Link
              to="/status"
              className="inline-flex h-11 items-center rounded-sm px-5 text-sm shadow-[0_0_0_1px_var(--color-line)]"
            >
              Status
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-4xl gap-10 px-5 py-16 sm:grid-cols-3">
        <Fact title="Compute" body="CPU nodes and GPU pods, dropshipped and wrapped in a spare region." />
        <Fact title="Storage" body="Block, object, and a WORM vault. Three copies. Two media." />
        <Fact title="Status" body="Four regions, always watching. Failover is the product." />
      </section>
      <section className="mx-auto max-w-4xl px-5 pb-20">
        <h2 className="font-display text-sm uppercase tracking-widest text-muted">Floor</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {SKUS.slice(0, 4).map((s) => (
            <li key={s.id} className="flex items-baseline justify-between gap-4 py-4">
              <span>{s.name}</span>
              <span className="tabular-nums text-muted">${s.price.toFixed(2)} / hr</span>
            </li>
          ))}
        </ul>
        <Link to="/compute" className="mt-6 inline-flex h-11 items-center text-sm text-muted hover:text-fg">
          All SKUs
        </Link>
      </section>
    </main>
  );
}

function Fact({ title, body }: { title: string; body: string }) {
  return (
    <article>
      <h2 className="font-display text-xl">{title}</h2>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </article>
  );
}
