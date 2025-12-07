
create extension if not exists "uuid-ossp";
create table if not exists public.documents (
  id uuid primary key default uuid_generate_v4(),
  content text not null,
  type text not null,
  lang text not null,
  theme text default 'onedark',
  font_size int default 16,
  filename text,
  is_public boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.documents enable row level security;
create policy if not exists "allow insert" on public.documents for insert to anon, authenticated with check (true);
create policy if not exists "allow select" on public.documents for select to anon, authenticated using (true);
