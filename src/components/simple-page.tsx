import type { ReactNode } from "react";

export function SimplePage({
  kicker,
  title,
  lead,
  children,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
      {kicker ? (
        <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-dot" />
          {kicker}
        </p>
      ) : null}
      <h1 className="max-w-3xl font-display text-4xl leading-[1.1] sm:text-5xl">{title}</h1>
      {lead ? <p className="mt-4 max-w-xl text-muted">{lead}</p> : null}
      <div className="mt-12">{children}</div>
    </main>
  );
}
