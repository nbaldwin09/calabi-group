import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/fabric")({ component: FabricPage });

function FabricPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-5xl">Fabric</h1>
      <p className="mt-3 max-w-xl text-muted">
        Calabi is the control plane: catalog, schedule, snapshot, spare, invoice. Hardware sits in
        qualified halls. You never operate those halls.
      </p>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {[
          { t: "Secure GPU", d: "Datacenter-class cards. Preferred path for Spark through Lattice." },
          { t: "CPU nodes", d: "Forge and Node for compile, queue, and control work." },
          { t: "Object + vault", d: "Versioned object and WORM copies on a second medium." },
          { t: "Spare region", d: "Every launch names a second Calabi region before health turns green." },
        ].map((x) => (
          <li key={x.t} className="py-6">
            <h2 className="text-xl">{x.t}</h2>
            <p className="mt-2 text-sm text-muted">{x.d}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
