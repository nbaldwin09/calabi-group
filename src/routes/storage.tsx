import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SimplePage } from "@/components/simple-page";
import { STORAGE } from "@/lib/calabi/content";

export const Route = createFileRoute("/storage")({ component: StoragePage });

function StoragePage() {
  const [gb, setGb] = useState(500);
  const quote = useMemo(
    () => STORAGE.map((s) => ({ ...s, monthly: s.price * gb })),
    [gb],
  );
  return (
    <SimplePage
      title="Storage"
      lead="Block for the running machine. Object for the dataset. Vault for the copy you cannot afford to edit."
    >
      <ul className="divide-y divide-line border-y border-line">
        {STORAGE.map((s) => (
          <li key={s.id} className="py-6">
            <h2 className="text-xl">{s.name}</h2>
            <p className="mt-2 text-sm text-muted">{s.copy}</p>
            <p className="mt-2 tabular-nums text-sm text-faint">
              ${s.price.toFixed(3)} {s.unit}
            </p>
          </li>
        ))}
      </ul>
      <label className="mt-12 block max-w-lg text-sm text-muted">
        Capacity · {gb} GB
        <input
          type="range"
          min={50}
          max={10000}
          step={50}
          value={gb}
          onChange={(e) => setGb(Number(e.target.value))}
          className="mt-3 w-full"
        />
      </label>
      <ul className="mt-6 max-w-lg space-y-2 text-sm">
        {quote.map((s) => (
          <li key={s.id} className="flex justify-between gap-4">
            <span>{s.name}</span>
            <span className="tabular-nums text-muted">${s.monthly.toFixed(2)} / mo</span>
          </li>
        ))}
      </ul>
    </SimplePage>
  );
}
