# Calabi Group

GPU, VM, and storage with a spare already on.

An Aorila company. Production domain: **calabigroup.com**

Calabi is the merchant of record. Customers buy Calabi SKUs. Capacity is fulfilled on a private fabric of qualified facilities. The public site does not name those operators.

## Stack

- This repository, Vercel project for this house only
- This house’s Supabase project (see `supabase/schema.sql`)
- Fabric adapter in `api/_lib/fabric.mjs` (partner credentials in env only)

## Environment

```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
RUNPOD_API_KEY
```

Without `RUNPOD_API_KEY` the site still boots. Launches persist as `queued` until fabric credit is attached.

## Local

```bash
npm install
npm run build && npm start
```

Internal operating notes: `OPERATIONS.md`

Sister houses (separate Vercel, separate Supabase):

- [bullpen-cession](https://github.com/nbaldwin09/bullpen-cession) — bullpencession.com
- [neemseed](https://github.com/nbaldwin09/neemseed) — neemseed.net
- [calabi-group](https://github.com/nbaldwin09/calabi-group) — calabigroup.com
