import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs")({ component: DocsPage });

function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-5xl">Docs</h1>
      <article className="mt-8 space-y-4 text-muted">
        <h2 className="text-xl text-fg">1. Own Render, own Supabase</h2>
        <p>
          Calabi Group is its own Render web service and its own Supabase project. It does not share a
          database with Bullpen Cession or NeemSeed. GitHub: nbaldwin09/calabi-group. Domain:
          calabigroup.com.
        </p>
        <h2 className="text-xl text-fg">2. Point DNS at this origin</h2>
        <p>
          calabigroup.com currently sits on leftover Firebase A records (199.36.158.100) with no
          deploy. Add the apex and www as custom domains on the Calabi Render service, then ALIAS/ANAME
          the apex and CNAME www. Remove the Firebase addresses.
        </p>
        <h2 className="text-xl text-fg">3. Fabric keys</h2>
        <p>
          RunPod and peer tokens live as Render environment variables on this service only. Pods and
          heartbeats persist in the Calabi Supabase project.
        </p>
        <h2 className="text-xl text-fg">4. Backup policy</h2>
        <p>
          Every pod declares a spare region at launch. Snapshots replicate before the health check
          turns green. Vault is object-lock. Do not disable it to save cents.
        </p>
      </article>
    </main>
  );
}
