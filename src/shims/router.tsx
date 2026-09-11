import { Link as RRLink, Outlet as RROutlet, useNavigate as useRRNavigate, useParams as useRRParams, useSearchParams } from "react-router-dom";
import type { ReactNode } from "react";

export const Outlet = RROutlet;

export function Link({ to, params, search, children, className, ...rest }: any) {
  let href = typeof to === "string" ? to : String(to || "/");
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      href = href.replace("$" + k, encodeURIComponent(String(v))).replace(":" + k, encodeURIComponent(String(v)));
    }
  }
  const q =
    search && typeof search === "object"
      ? "?" + new URLSearchParams(Object.fromEntries(Object.entries(search).filter(([, v]) => v != null) as [string, string][])).toString()
      : "";
  return (
    <RRLink to={href + q} className={className} {...rest}>
      {children}
    </RRLink>
  );
}

export function useNavigate() {
  const nav = useRRNavigate();
  return (opts: any) => {
    if (typeof opts === "string") return nav(opts);
    const to = opts.to || "/";
    const sp = opts.search ? new URLSearchParams(opts.search).toString() : "";
    return nav(sp ? `${to}?${sp}` : to);
  };
}

export function createFileRoute(_path: string) {
  return (opts: { component: any; validateSearch?: (raw: Record<string, unknown>) => any }) => ({
    component: opts.component,
    useParams: () => useRRParams() as any,
    useSearch: () => {
      const [sp] = useSearchParams();
      const raw = Object.fromEntries(sp.entries());
      return opts.validateSearch ? opts.validateSearch(raw) : raw;
    },
  });
}

export function createRootRoute(_opts: unknown) {
  return {};
}

export type { ReactNode };
