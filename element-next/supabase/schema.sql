-- ============================================================================
-- Element Group — Storage + Schema for projects & client logos
-- Run this once in Supabase Studio → SQL Editor
-- ============================================================================

-- ---------- 1. Buckets (public read) ----------
insert into storage.buckets (id, name, public)
values
  ('project-images', 'project-images', true),
  ('client-logos',   'client-logos',   true)
on conflict (id) do nothing;

-- ---------- 2. Clients table ----------
create table if not exists public.clients (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  industry    text,
  website     text,
  logo_path   text,                       -- path in client-logos bucket
  created_at  timestamptz default now()
);

-- ---------- 3. Projects table ----------
create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  client_id    uuid references public.clients(id) on delete set null,
  description  text,
  category     text,                      -- 'website' | 'app' | 'branding' | 'marketing'
  cover_path   text,                      -- main image path in project-images bucket
  gallery      text[] default '{}',       -- additional image paths
  url          text,                      -- live link
  is_published boolean default false,
  display_order int default 0,
  published_at timestamptz,
  created_at   timestamptz default now()
);

create index if not exists projects_published_idx
  on public.projects (is_published, display_order desc, published_at desc nulls last);

-- ---------- 4. RLS ----------
alter table public.clients  enable row level security;
alter table public.projects enable row level security;

drop policy if exists "public read clients" on public.clients;
create policy "public read clients"
  on public.clients for select
  to anon, authenticated
  using (true);

drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects"
  on public.projects for select
  to anon, authenticated
  using (is_published = true);

-- No INSERT/UPDATE/DELETE policies → only service_role / Studio can write. Safe.

-- ---------- 5. Storage policies (public read; writes via Studio only) ----------
drop policy if exists "public read project-images" on storage.objects;
create policy "public read project-images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'project-images');

drop policy if exists "public read client-logos" on storage.objects;
create policy "public read client-logos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'client-logos');

-- ---------- 6. Grant table-level SELECT for the Data API ----------
grant select on public.clients  to anon, authenticated;
grant select on public.projects to anon, authenticated;
