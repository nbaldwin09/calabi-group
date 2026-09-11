import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { type ReactNode, useState } from "react";
import { CalabiMark } from "@/components/wordmarks";

const LINKS = [
  { to: "/compute", label: "Pods" },
  { to: "/storage", label: "Storage" },
  { to: "/pricing", label: "Pricing" },
  { to: "/docs", label: "Docs" },
  { to: "/status", label: "Status" },
];

export function BrandShell({ children }: { brand?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div data-brand="calabi" className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-4">
          <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
            <CalabiMark className="h-8" />
            <span className="sr-only">Calabi Group</span>
          </Link>
          <nav className="ml-4 hidden items-center rounded-full bg-surface px-2 py-1 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="inline-flex h-9 items-center rounded-full px-3 text-sm text-muted hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-3 md:flex">
            <Link to="/account" className="text-sm text-muted hover:text-fg">
              Sign in
            </Link>
            <Link
              to="/account"
              className="inline-flex h-10 items-center rounded-full bg-accent px-4 text-sm font-medium text-accent-fg"
            >
              Sign up
            </Link>
          </div>
          <Link
            to="/account"
            className="ml-auto inline-flex h-10 items-center rounded-full bg-accent px-4 text-sm text-accent-fg md:hidden"
          >
            Sign up
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-fg md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open ? (
          <nav className="flex flex-col gap-1 border-t border-line px-5 py-3 md:hidden">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="inline-flex h-11 items-center text-sm" onClick={() => setOpen(false)}>
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
          <p>
            <Link to="/terms" className="hover:text-fg">Terms</Link>
            <span className="mx-2">·</span>
            calabigroup.com
          </p>
        </div>
      </footer>
    </div>
  );
}
