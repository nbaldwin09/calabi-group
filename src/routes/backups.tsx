import { createFileRoute } from "@tanstack/react-router";
import { SLA } from "@/lib/calabi/content";

export const Route = createFileRoute("/backups")({ component: BackupsPage });

function BackupsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-5xl">Backups so it never goes down</h1>
      <p className="mt-4 max-w-2xl text-muted">
        A single provider is an outage waiting for a press release. Calabi treats every GPU hall as
        disposable. The workload is not.
      </p>
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["3 copies", "Live disk, regional snapshot, object vault. All three exist before we call a pod healthy."],
          ["2 media", "NVMe and object. A firmware bug in one class cannot eat the other."],
          ["1 offline", "WORM vault with object lock. Even we cannot delete it in a panic."],
        ].map(([t, c], i) => (
          <li key={t} className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]">
            <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 text-xl">{t}</h2>
            <p className="mt-2 text-sm text-muted">{c}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 overflow-x-auto rounded-xl shadow-[0_0_0_1px_var(--color-line)]">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-surface-2 text-[11px] uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">RPO</th>
              <th className="px-4 py-3">RTO</th>
              <th className="px-4 py-3">Spare</th>
            </tr>
          </thead>
          <tbody>
            {SLA.map((s) => (
              <tr key={s.name} className="border-t border-line bg-surface">
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3 font-mono">{s.rpo}</td>
                <td className="px-4 py-3 font-mono">{s.rto}</td>
                <td className="px-4 py-3 text-muted">{s.spare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10 rounded-xl bg-surface p-6 shadow-[0_0_0_1px_var(--color-line)]">
        <h2 className="text-2xl">Failover</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Each running pod has a declared spare region. If the heartbeat from us-east fails, the last
          snapshot is attached in us-west and DNS cuts. RPO is the snapshot interval. RTO is the boot
          plus attach, not the restore from a USB in a drawer.
        </p>
      </div>
    </main>
  );
}
