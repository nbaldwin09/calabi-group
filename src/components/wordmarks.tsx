import { cn } from "@/lib/utils";

export function BullpenMark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/bullpen.png"
      alt="Bullpen Cession"
      className={cn("mark h-7 w-auto sm:h-8", className)}
    />
  );
}

export function NeemMark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-[1.7rem] leading-none tracking-tight", className)}>
      neemseed<span className="text-dot">.</span>
    </span>
  );
}

export function CalabiMark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/calabi-light.png"
      alt="Calabi Group"
      className={cn("mark h-10 w-auto", className)}
    />
  );
}

export function CalabiType({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-mark font-semibold leading-[0.88] tracking-tight text-fg",
        className,
      )}
    >
      calab
      <span className="relative inline-block pr-1">
        ı
        <span
          aria-hidden
          className="absolute right-0 top-0 h-[0.3em] w-[0.3em] translate-x-[0.14em] rounded-[2px] bg-accent"
        />
      </span>
      <span className="block">group</span>
    </span>
  );
}
