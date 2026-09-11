# Calabi Group — how the company runs

Customer-facing name: Calabi Group. Merchant of record: Calabi. Capacity is purchased on contracted fabric the moment a customer deploys.

## Loop

1. Customer funds a prepaid wallet (Stripe packs $25 / $100 / $500).
2. Customer deploys from the catalog (Compute). That request reserves minutes on the wallet and calls the fabric adapter.
3. Fabric adapter buys a matching GPU from the live partner API.
4. Console polls until SSH is ready. Partner brand is stripped.
5. Cron settles minutes. Zero balance stops the remote machine.

This is the Shadeform / MSP pattern: one wallet, many halls.

## Catalog vs owned metal

The Compute page lists the same class of cards the market sells (2000 Ada through B200, CPU nodes). List price is wholesale plus overlay. If a card is tight upstream, Deploy returns capacity-tight — we do not fake stock.

Live availability polling of partner catalogs is the next adapter pass. Until then, `available: true` means we will attempt purchase, not that a rack is reserved.

## Money

- Customer pays Calabi (Stripe Checkout → credits_cents).
- Calabi pays partners from the company account.
- Never pass a partner invoice to a customer.
- Spread target is in OPERATIONS.md. Kill a SKU if wholesale prints through list.

Env: `STRIPE_SECRET_KEY`, `PUBLIC_ORIGIN=https://www.calabigroup.com`, `RUNPOD_API_KEY`.

## Sales

Self-serve: catalog → deploy.
Enterprise: reserved clusters, committed hours, invoice NET-30. sales@calabigroup.com.
Do not staff a sales team until the self-serve loop has taken $1k of real minutes.

## Legal

Partner Reseller / MSP paper before paid scale. Terms already say third-party facilities. No partner logos on the site.
