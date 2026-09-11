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
            Create an account, paste an SSH public key, open Console, pick a SKU and region, launch.
            A spare region is assigned before the pod is marked ready. Minutes bill against your
            Calabi balance. At zero, running pods stop.
          </p>
        </section>
        <section>
          <h2 className="text-xl text-fg">API</h2>
          <p className="mt-2">Issue a key on the account page. All routes are POST JSON.</p>
          <pre className="mt-3 overflow-x-auto bg-surface p-4 font-mono text-xs text-fg">
{`Authorization: Bearer ck_…
POST /api/house/pods
POST /api/house/pods/add   { "sku":"c-s", "region":"iad", "vault":true }
POST /api/house/pods/del   { "id":"pod-…" }`}
          </pre>
        </section>
        <section>
          <h2 className="text-xl text-fg">Regions</h2>
          <p className="mt-2">
            us-east-1 Ashburn, us-west-1 San Jose, eu-west-1 Amsterdam, ap-southeast-1 Singapore.
          </p>
        </section>
        <section>
          <h2 className="text-xl text-fg">Contract</h2>
          <p className="mt-2">
            Calabi Group is the merchant of record. Capacity is fulfilled on a private fabric of
            qualified facilities. You do not hold an account with those operators.
          </p>
        </section>
      </article>
    </main>
  );
}
