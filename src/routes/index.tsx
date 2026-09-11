import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { OFFERS } from "@/lib/calabi/content";

export const Route = createFileRoute("/")({ component: CalabiHome });

function CalabiHome() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const featured = OFFERS.filter((o) => o.kind === "gpu").slice(0, 6);

  const go = (e: FormEvent) => {
    e.preventDefault();
    nav({ to: "/account", search: { email } });
  };

  return (
    <main>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,#3d6bff22,transparent_55%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <h1 className="font-display text-5xl tracking-tight sm:text-7xl">The AI developer cloud</h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              Experiment, train, fine-tune, deploy, scale on one platform.
            </p>
            <form onSubmit={go} className="mt-8 flex max-w-md overflow-hidden rounded-full bg-surface p-1 shadow-[0_0_0_1px_var(--color-line)]">
              <input
                className="h-11 min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
                placeholder="Work email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="h-11 shrink-0 rounded-full bg-accent px-5 text-sm text-accent-fg">
                Get started
              </button>
            </form>
          </div>
          <div className="grid grid-cols-3 gap-3 opacity-80">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-surface shadow-[0_0_0_1px_var(--color-line),0_20px_60px_#3d6bff14]"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-sm text-faint">Pods · Endpoints · Clusters · Storage</p>
        <h2 className="mt-3 font-display text-4xl">GPU cloud pricing</h2>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {featured.map((o) => (
            <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-5">
              <p className="text-xl">{o.name}</p>
              <div className="flex flex-wrap gap-2 text-xs text-muted">
                <span className="rounded-full bg-surface px-3 py-1">{o.vram} GB VRAM</span>
                <span className="rounded-full bg-surface px-3 py-1">{o.ram} GB RAM</span>
                <span className="rounded-full bg-surface px-3 py-1">{o.vcpu} vCPU</span>
              </div>
              <p className="font-mono text-sm">${o.price.toFixed(2)}/hr</p>
            </li>
          ))}
        </ul>
        <Link to="/compute" className="mt-8 inline-flex h-11 items-center text-sm text-accent">
          See all instances
        </Link>
      </section>
    </main>
  );
}
