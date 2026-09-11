import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs")({ component: DocsPage });

function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-5xl">Docs</h1>
      <article className="mt-8 space-y-8 text-muted">
        <section>
          <h2 className="text-xl text-fg">Launch</h2>
          <p className="mt-2">
            Open Console, pick a SKU and region, attach the vault, launch. Calabi assigns a spare
            region before the pod is marked ready. You are billed on the Calabi list price for the
            minutes the pod exists.
          </p>
        </section>
        <section>
          <h2 className="text-xl text-fg">Regions</h2>
          <p className="mt-2">
            Four Calabi regions: us-east-1 (Ashburn), us-west-1 (San Jose), eu-west-1 (Amsterdam),
            ap-southeast-1 (Singapore). Workloads land in qualified facilities inside that geography.
            The spare is a second Calabi region, not a second rack in the same hall.
          </p>
        </section>
        <section>
          <h2 className="text-xl text-fg">Vault</h2>
          <p className="mt-2">
            Vault is object-lock storage on a second medium. Snapshots replicate on a 15 / 10 / 5
            minute cadence by SKU class. Do not disable vault to save cents.
          </p>
        </section>
        <section>
          <h2 className="text-xl text-fg">Contract</h2>
          <p className="mt-2">
            Calabi Group is the merchant of record. Support, invoices, and the control plane come
            from us. Capacity is fulfilled on a private fabric of qualified facilities. You do not
            hold an account with those operators.
          </p>
        </section>
      </article>
    </main>
  );
}
