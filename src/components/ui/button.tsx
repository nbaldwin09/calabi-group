import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "line" | "live";

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        "inline-flex h-11 min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium tracking-tight transition-[opacity,transform,background-color] duration-150 ease-out active:scale-[0.98] disabled:opacity-50",
        variant === "primary" && "bg-accent text-accent-fg hover:opacity-90",
        variant === "ghost" && "bg-transparent text-fg hover:bg-surface-2",
        variant === "line" && "bg-transparent text-fg shadow-[0_0_0_1px_var(--color-line)] hover:bg-surface",
        variant === "live" && "bg-live text-fg hover:opacity-90",
        className,
      )}
      {...props}
    />
  );
}
