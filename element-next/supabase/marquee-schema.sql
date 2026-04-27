-- ============================================================================
-- MARQUEE LOGOS — tabela editável para o carrossel "Negócios que confiaram em nós"
-- Suporta logo (imagem) OU iniciais (fallback estilizado).
-- Run em: Supabase Studio → SQL Editor
-- ============================================================================

-- ---------- 1. Bucket reutilizado ----------
-- Usa o bucket 'client-logos' que já existe (criado no schema.sql).
-- Se ainda não existir:
insert into storage.buckets (id, name, public)
values ('client-logos', 'client-logos', true)
on conflict (id) do nothing;

-- ---------- 2. Tabela marquee_logos ----------
create table if not exists public.marquee_logos (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,                       -- nome a mostrar (ex "Maria Mendes Massagens")
  initials      text not null,                       -- fallback (1-3 letras: "M", "AD", "FN")
  color_class   text not null default 'default',     -- 'matias' | 'pulga' | 'maria' | 'adsr' | 'estrela' | 'fns' | 'default'
  italic        boolean default false,               -- itálico nas iniciais
  logo_path     text,                                -- imagem no bucket client-logos (se preenchido, ignora as iniciais)
  website       text,
  is_published  boolean default true,
  display_order int default 0,                       -- maior = aparece primeiro
  created_at    timestamptz default now()
);

create index if not exists marquee_logos_published_idx
  on public.marquee_logos (is_published, display_order desc);

-- ---------- 3. RLS (leitura pública) ----------
alter table public.marquee_logos enable row level security;

drop policy if exists "public read marquee_logos" on public.marquee_logos;
create policy "public read marquee_logos"
  on public.marquee_logos for select
  to anon, authenticated
  using (is_published = true);

grant select on public.marquee_logos to anon, authenticated;

-- ---------- 4. Storage policy (já existe se schema.sql foi corrido, mas garante) ----------
drop policy if exists "public read client-logos" on storage.objects;
create policy "public read client-logos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'client-logos');

-- ---------- 5. Seed: os 6 logos atuais ----------
insert into public.marquee_logos
  (slug, name, initials, color_class, italic, logo_path, website, display_order)
values
  ('matias-nature',          'Matias Nature',             'MN', 'matias',  false, null, null, 100),
  ('apiarios-terras-pulga',  'Apiários Terras da Pulga',  'P',  'pulga',   false, null, null, 90),
  ('maria-mendes-massagens', 'Maria Mendes Massagens',    'M',  'maria',   true,  null, null, 80),
  ('ad-sao-romao',           'AD São Romão',              'AD', 'adsr',    false, null, null, 70),
  ('estrela-detail-wash',    'Estrela Detail & Wash',     'E',  'estrela', false, null, null, 60),
  ('football-nation-store',  'Football Nation Store',     'FN', 'fns',     false, null, 'https://www.footballnationstore.pt', 50)
on conflict (slug) do nothing;
