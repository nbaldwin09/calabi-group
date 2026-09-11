import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { type ReactNode, useState } from "react";
import { CalabiMark } from "@/components/wordmarks";

const LINKS = [
  { to: "/compute", label: "Compute" },
  { to: "/storage", label: "Storage" },
  { to: "/pricing", label: "Pricing" },
  { to: "/status", label: "Status" },
  { to: "/docs", label: "Docs" },
];

export function BrandShell({ children }: { brand?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div data-brand="calabi" className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4">
          <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
            <CalabiMark className="h-9" />
            <span className="sr-only">Calabi Group</span>
          </Link>
          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="inline-flex h-10 items-center px-3 text-sm text-muted hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/console"
              className="ml-2 inline-flex h-10 items-center rounded-sm bg-accent px-4 text-sm font-medium text-accent-fg"
            >
              Console
            </Link>
          </nav>
          <Link
            to="/console"
            className="ml-auto inline-flex h-10 items-center rounded-sm bg-accent px-4 text-sm font-medium text-accent-fg md:hidden"
          >
            Console
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-fg md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open ? (
          <nav className="flex flex-col gap-1 border-t border-line px-5 py-3 md:hidden">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="inline-flex h-11 items-center text-sm"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>
      {children}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-10 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>Calabi Group</p>
          <p>An Aorila house · calabigroup.com</p>
        </div>
      </footer>
    </div>
  );
}
