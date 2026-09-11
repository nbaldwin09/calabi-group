# Calabi Group — operator runbook

This file is internal. Do not link it from the customer site.

## What the company is

Calabi Group is the merchant of record for GPU, CPU, and storage hours.
Customers buy Calabi SKUs. We fulfill on contracted partner fabric.
Customers never receive partner consoles, API keys, or brand names.

This is a reseller / MSP business, not a data-center owner.
Run it that way: apply to partner programs, hold the customer relationship, keep a spread.

## Legal posture

- Customer contract is with Calabi only. Terms say capacity may sit in qualified third-party facilities.
- Do not advertise "our halls" or "our H100s" as owned metal until that is true.
- Do not put partner logos on the marketing site.
- Apply as a Reseller / MSP at https://www.runpod.io/partners
- Sign partner paper before scaling paid traffic. Personal API keys are for bring-up only.

## Money

List prices already include overlay (snapshot, spare, control plane).

Approximate wholesale floors to watch (spot, Secure Cloud, 2026):

| Calabi SKU | List / hr | Typical wholesale | Keep if spread ≥ |
| --- | ---: | ---: | ---: |
| Node | 0.04 | 0.02 | 0.015 |
| Forge | 0.18 | 0.08 | 0.06 |
| Spark (4090) | 0.44 | 0.28–0.39 | 0.08 |
| Loom (A100 80) | 1.89 | 1.19–1.64 | 0.25 |
| Vault (2×H100) | 6.40 | 3.80–5.40 | 0.80 |
| Lattice (8×H100) | 24.00 | 16–22 | 2.00 |

If wholesale prints above list, stop selling that SKU in that region.

Customer billing (next): Stripe credits. Do not pass through partner invoices.

## Keys (Vercel project `calabi-site` / this repo)

- `RUNPOD_API_KEY` — company account, restricted, never a customer key
- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` — this house only
- Later: `VAST_API_KEY`, `LAMBDA_API_KEY`, `STRIPE_SECRET_KEY`

Never commit keys. Never return `provider_ref` to the browser.

## Bring-up sequence

1. Company Runpod team account + billing limit raised.
2. Partner application (Reseller / MSP).
3. Restricted API key in Vercel env.
4. Run `supabase/schema.sql` on the Calabi project.
5. Launch one Spark from Console. Confirm row status `running` and a `provider_ref` in Supabase.
6. Terminate. Confirm the remote pod is gone.
7. Only then take customer money.

## What not to do

- Do not give customers a raw partner SSH/proxy hostname.
- Do not run customer workloads on a personal hobby account long term.
- Do not claim SOC2 or HIPAA until the company holds those reports.
- Do not mine, scrape, or host abuse. Partner AUPs bind us.
