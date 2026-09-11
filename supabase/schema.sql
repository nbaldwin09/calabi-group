-- Calabi Group — own Supabase project. Do not run this on Bullpen or NeemSeed.
create table if not exists pods (
  id text primary key,
  sku text not null,
  region text not null,
  vault boolean not null default true,
  created_at timestamptz not null default now()
);
create table if not exists heartbeats (
  region_id text primary key,
  status text not null,
  lag_ms integer not null default 0,
  updated_at timestamptz not null default now()
);
insert into heartbeats (region_id, status, lag_ms) values
  ('iad', 'nominal', 42),
  ('sjc', 'nominal', 61),
  ('ams', 'nominal', 88),
  ('sin', 'nominal', 73)
on conflict (region_id) do nothing;
