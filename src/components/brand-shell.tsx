import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { type ReactNode, useState } from "react";

const PILL = [
  { to: "/compute", label: "Product" },
  { to: "/docs", label: "Docs" },
  { to: "/pricing", label: "Pricing" },
  { to: "/status", label: "Enterprise" },
];

function Wordmark() {
  return (
    <span className="font-mark text-white" style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em" }}>
      calabi<span style={{ marginLeft: 8 }}>group</span>
      <span aria-hidden style={{ display: "inline-block", width: 8, height: 8, marginLeft: 6, marginBottom: 8, borderRadius: 2, background: "#3d6bff", verticalAlign: "super" }} />
    </span>
  );
}

export function BrandShell({ children }: { brand?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ minHeight: "100dvh", background: "#07060f", color: "#f4f2ff" }}>
      <div style={{ background: "#05040a", padding: "8px 0", textAlign: "center", fontSize: 12, color: "#b7b3c9" }}>
        H200 and B200 pods available now →
      </div>
      <header className="sticky top-0 z-40" style={{ background: "#07060fe6", backdropFilter: "blur(12px)" }}>
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-5 py-3">
          <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
            <Wordmark />
          </Link>
          <nav className="ml-3 hidden items-center md:flex" style={{ background: "#161326", borderRadius: 9999, padding: "4px 6px" }}>
            {PILL.map((l) => (
              <Link key={l.to} to={l.to} className="inline-flex h-9 items-center px-3 text-sm" style={{ color: "#b7b3c9" }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-4 md:flex">
            <Link to="/docs" className="text-sm" style={{ color: "#b7b3c9" }}>Contact sales</Link>
            <Link to="/account" className="text-sm" style={{ color: "#b7b3c9" }}>Sign in</Link>
            <Link to="/account" className="inline-flex h-10 items-center px-4 text-sm font-medium text-white" style={{ background: "#7c5cff", borderRadius: 9999 }}>
              Sign Up
            </Link>
          </div>
          <Link to="/account" className="ml-auto inline-flex h-10 items-center px-4 text-sm text-white md:hidden" style={{ background: "#7c5cff", borderRadius: 9999 }}>
            Sign Up
          </Link>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open ? (
          <nav className="flex flex-col px-5 py-3 md:hidden">
            {PILL.map((l) => (
              <Link key={l.to} to={l.to} className="inline-flex h-11 items-center" onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
          </nav>
        ) : null}
      </header>
      {children}
      <footer style={{ borderTop: "1px solid #ffffff14" }}>
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-14 text-sm sm:grid-cols-4" style={{ color: "#7a7690" }}>
          <Wordmark />
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
          <div style={{ textAlign: "right" }}>
            <p className="text-white">Account</p>
            <Link to="/account" className="mt-2 block">Sign in</Link>
            <Link to="/console" className="mt-1 block">Console</Link>
            <a href="https://aorila.com" target="_blank" rel="noreferrer" className="aorila-plate">
              Powered by <span style={{ textDecoration: "underline" }}>Aorila</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
