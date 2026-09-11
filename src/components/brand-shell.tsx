import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { type ReactNode, useState } from "react";

const PILL = [
  { to: "/compute", label: "Product" },
  { to: "/docs", label: "Docs" },
  { to: "/pricing", label: "Pricing" },
  { to: "/status", label: "Enterprise" },
];

export function BrandShell({ children }: { brand?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-dvh bg-[#07060f] text-[#f4f2ff]">
      <div className="bg-[#05040a] py-2 text-center text-xs text-[#b7b3c9]">
        H200 and B200 pods available now →
      </div>
      <header className="sticky top-0 z-40 bg-[#07060f]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-5 py-3">
          <Link to="/" className="font-mark text-lg font-semibold tracking-tight" onClick={() => setOpen(false)}>
            calabi
          </Link>
          <nav className="ml-2 hidden items-center rounded-full bg-[#161326] px-1 py-1 md:flex">
            {PILL.map((l) => (
              <Link key={l.to} to={l.to} className="inline-flex h-9 items-center rounded-full px-3 text-sm text-[#b7b3c9] hover:text-white">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-4 md:flex">
            <Link to="/docs" className="text-sm text-[#b7b3c9]">Contact sales</Link>
            <Link to="/account" className="text-sm text-[#b7b3c9]">Sign in</Link>
            <Link to="/account" className="inline-flex h-10 items-center rounded-full bg-[#7c5cff] px-4 text-sm font-medium text-white">
              Sign Up
            </Link>
          </div>
          <Link to="/account" className="ml-auto inline-flex h-10 items-center rounded-full bg-[#7c5cff] px-4 text-sm md:hidden">
            Sign Up
          </Link>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open ? (
          <nav className="flex flex-col px-5 py-3 md:hidden">
            {PILL.map((l) => (
              <Link key={l.to} to={l.to} className="h-11 items-center inline-flex" onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
          </nav>
        ) : null}
      </header>
      {children}
      <footer className="border-t border-white/10">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-14 text-sm text-[#7a7690] sm:grid-cols-4">
          <p className="font-mark text-lg text-white">calabi</p>
          <div>
            <p className="text-white">Product</p>
            <Link to="/compute" className="mt-2 block">Pods</Link>
            <Link to="/storage" className="mt-1 block">Storage</Link>
            <Link to="/pricing" className="mt-1 block">Pricing</Link>
          </div>
          <div>
            <p className="text-white">Company</p>
            <Link to="/docs" className="mt-2 block">Docs</Link>
            <Link to="/terms" className="mt-1 block">Terms</Link>
            <Link to="/status" className="mt-1 block">Status</Link>
          </div>
          <div>
            <p className="text-white">Account</p>
            <Link to="/account" className="mt-2 block">Sign in</Link>
            <Link to="/console" className="mt-1 block">Console</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
