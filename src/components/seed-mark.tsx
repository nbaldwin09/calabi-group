export function SeedMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <line x1="140" y1="92" x2="140" y2="292" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="140" cy="148" r="3.2" fill="currentColor" />
      <circle cx="140" cy="208" r="3.2" fill="currentColor" />
      <circle cx="140" cy="268" r="3.2" fill="currentColor" />
      <path
        d="M140 168 C108 168 86 186 78 214 C104 206 128 188 140 168Z"
        fill="var(--color-dot)"
      />
      <path
        d="M140 176 C168 180 196 204 204 236 C176 224 154 198 140 176Z"
        fill="var(--color-accent)"
      />
      <ellipse cx="140" cy="70" rx="34" ry="52" stroke="currentColor" strokeWidth="1.6" />
      <path d="M140 28 C128 48 124 70 128 96" stroke="currentColor" strokeWidth="1.2" />
      <path d="M140 28 C152 48 156 70 152 96" stroke="currentColor" strokeWidth="1.2" />
      <line x1="174" y1="48" x2="236" y2="36" stroke="currentColor" strokeWidth="1" />
      <circle cx="236" cy="36" r="2.4" fill="currentColor" />
      <line x1="70" y1="214" x2="28" y2="230" stroke="currentColor" strokeWidth="1" />
      <circle cx="28" cy="230" r="2.4" fill="currentColor" />
    </svg>
  );
}
