import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-5xl">Terms</h1>
      <article className="mt-8 space-y-6 text-sm text-muted">
        <p>Calabi Group LLC sells compute, storage, and backup as a service. You buy from Calabi.</p>
        <p>
          Capacity may be fulfilled on facilities operated by third parties under contract with
          Calabi. Those operators are not a party to this agreement. You will not be given their
          consoles, keys, or brands. You may not attempt to discover or contact them about a Calabi
          workload.
        </p>
        <p>
          Acceptable use: no unlawful content, no abuse of shared hardware, no cryptocurrency mining
          without a written addendum, no attempts to probe the underlying fabric. We may terminate a
          pod that violates this policy.
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
