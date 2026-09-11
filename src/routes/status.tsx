import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SimplePage } from "@/components/simple-page";
import { listHeartbeats } from "@/lib/houses/api";
import { REGIONS } from "@/lib/calabi/content";

export const Route = createFileRoute("/status")({ component: StatusPage });

function StatusPage() {
  const beats = useQuery({
    queryKey: ["calabi-hb"],
    queryFn: () => listHeartbeats(),
    refetchInterval: 20_000,
  });
  const byId = Object.fromEntries((beats.data || []).map((b: any) => [b.region_id, b]));

  return (
    <SimplePage title="Status" lead="Four regions. Failover is the product.">
      <ul className="divide-y divide-line border-y border-line">
        {REGIONS.map((r) => {
          const hb = byId[r.id];
          return (
            <li key={r.id} className="flex items-baseline justify-between gap-4 py-5">
              <div>
                <h2 className="text-xl">{r.city}</h2>
                <p className="text-sm text-muted">{r.code}</p>
              </div>
              <p className="text-sm text-ok">
                {hb?.status || "nominal"}
                {hb ? ` · ${hb.lag_ms} ms` : ""}
              </p>
            </li>
          );
        })}
      </ul>
    </SimplePage>
  );
}
