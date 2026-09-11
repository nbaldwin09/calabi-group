import { createFileRoute, Link } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
import { SKUS } from "@/lib/calabi/content";

export const Route = createFileRoute("/compute")({ component: ComputePage });

function ComputePage() {
  return (
    <SimplePage
      title="Compute"
      lead="GPU pods and CPU VMs. Price is the dropshipped floor plus snapshot, spare, and failover."
    >
      <ul className="divide-y divide-line border-y border-line">
        {SKUS.map((s) => (
          <li key={s.id} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h2 className="text-xl">{s.name}</h2>
              <p className="mt-1 text-sm text-muted">
                {s.gpu} · {s.cpu} · {s.ram}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="tabular-nums text-muted">${s.price.toFixed(2)} / hr</span>
              <Link to="/console" search={{ sku: s.id }} className="text-sm text-accent">
                Launch
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </SimplePage>
  );
}
