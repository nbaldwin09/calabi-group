import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-5xl">Terms</h1>
      <article className="mt-8 space-y-6 text-sm text-muted">
        <p>Calabi Group LLC sells compute, storage, and backup. You buy from Calabi.</p>
        <p>
          Acceptable use: no unlawful content, no abuse of shared hardware, no cryptocurrency mining
          without a written addendum. We may terminate a pod that violates this policy.
        </p>
        <p>
          Billing is prepaid credits or invoice, per minute, at the published Calabi rate. Unused
          credits are not refundable except where required by law.
        </p>
        <p>
          RPO and RTO figures on the site are service targets, not a warranty, until an executed
          enterprise order says otherwise.
        </p>
      </article>
    </main>
  );
}
