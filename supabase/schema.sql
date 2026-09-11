-- Calabi Group — own Supabase project.
create table if not exists accounts (
  id text primary key,
  email text unique not null,
  password_hash text not null,
  credits_cents integer not null default 0,
  ssh_public_key text,
  created_at timestamptz not null default now()
);
create table if not exists sessions (
  id text primary key,
  token text unique not null,
  account_id text not null,
  created_at timestamptz not null default now()
);
create table if not exists api_keys (
  id text primary key,
  account_id text not null,
  token text unique not null,
  created_at timestamptz not null default now()
);
create table if not exists pods (
  id text primary key,
  account_id text,
  sku text not null,
  region text not null,
  spare text,
  vault boolean not null default true,
  status text not null default 'queued',
  provider_ref text,
  connect_json text,
  last_billed_at timestamptz,
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
alter table pods add column if not exists account_id text;
alter table pods add column if not exists spare text;
alter table pods add column if not exists status text;
alter table pods add column if not exists provider_ref text;
alter table pods add column if not exists connect_json text;
alter table pods add column if not exists last_billed_at timestamptz;
