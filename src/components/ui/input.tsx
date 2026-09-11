import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md bg-surface px-3 text-sm text-fg shadow-[0_0_0_1px_var(--color-line)] outline-none placeholder:text-faint focus:shadow-[0_0_0_2px_var(--color-accent)]",
        className,
      )}
      {...props}
    />
  );
}
