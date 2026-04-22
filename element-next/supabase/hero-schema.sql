-- ============================================================================
-- HERO PROJECTS — bucket + tabela separada para os cards do hero rotator
-- (os cards com letra/emoji + badge de métrica + Ver Live)
-- Layout NÃO muda; só liga os cards a dados editáveis.
-- Run em: Supabase Studio → SQL Editor
-- ============================================================================

-- ---------- 1. Bucket público para imagens do hero (opcional) ----------
insert into storage.buckets (id, name, public)
values ('hero-images', 'hero-images', true)
on conflict (id) do nothing;

-- ---------- 2. Tabela hero_projects ----------
create table if not exists public.hero_projects (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,

  -- Conteúdo do card
  title         text not null,                          -- h4
  description   text not null,                          -- p
  category      text not null,                          -- div.cat (ex: "E-commerce · Desporto")
  tags          text[] not null default '{}',           -- 3 tags max recomendado

  -- Preview lateral
  glyph         text not null,                          -- letra ou emoji (F, ⚽, P, M, ...)
  glyph_color   text default '#c0a8ff',                 -- cor da letra (CSS color)
  glyph_italic  boolean default false,                  -- estilo itálico (caso "M" da Maria Mendes)

  -- Badge (canto superior direito)
  badge_value   text not null,                          -- "100", "100%", "Top 3", "95+", "14 dias"
  badge_label   text not null,                          -- "PageSpeed", "Satisfação", "Google Local"
  badge_color   text default '#c0a8ff',                 -- cor do valor

  -- Link "Ver Live"
  live_url      text,                                   -- URL real (abre em nova aba)

  -- Imagem opcional (se quiseres usar foto em vez de glyph no futuro)
  image_path    text,                                   -- path no bucket hero-images

  -- Controlo
  is_published  boolean default true,
  display_order int default 0,                          -- maior = aparece primeiro
  published_at  timestamptz default now(),
  created_at    timestamptz default now()
);

create index if not exists hero_projects_published_idx
  on public.hero_projects (is_published, display_order desc, published_at desc);

-- ---------- 3. RLS (apenas leitura pública) ----------
alter table public.hero_projects enable row level security;

drop policy if exists "public read hero_projects" on public.hero_projects;
create policy "public read hero_projects"
  on public.hero_projects for select
  to anon, authenticated
  using (is_published = true);

-- ---------- 4. Storage policy (leitura pública do bucket) ----------
drop policy if exists "public read hero-images" on storage.objects;
create policy "public read hero-images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'hero-images');

-- ---------- 5. Grant para a Data API ----------
grant select on public.hero_projects to anon, authenticated;

-- ---------- 6. Seed: os 6 cards atuais (idênticos ao layout) ----------
insert into public.hero_projects
  (slug, title, description, category, tags, glyph, glyph_color, glyph_italic,
   badge_value, badge_label, badge_color, live_url, display_order)
values
  ('apiarios-terras-pulga',
   'Apiários Terras da Pulga',
   'Loja online para venda de mel e produtos apícolas com checkout MBWay e Multibanco.',
   'E-commerce · Artesanal',
   array['E-commerce','MBWay','SEO'],
   'P', '#c0a8ff', false,
   '100', 'PageSpeed', '#c0a8ff',
   null, 100),

  ('maria-mendes-massagens',
   'Maria Mendes Massagens',
   'Website com sistema de marcações online para centro de massagens terapêuticas.',
   'Saúde & Bem-Estar',
   array['Marcações','SEO Local','WhatsApp'],
   'M', '#f6e3d4', true,
   'Top 3', 'Google Local', '#fdba74',
   null, 90),

  ('ad-sao-romao',
   'AD São Romão',
   'Website institucional para associação desportiva local com calendário de jogos e notícias.',
   'Desporto · Institucional',
   array['Website','Notícias','Calendário'],
   'A', '#9ec5ff', false,
   '14 dias', 'Tempo de entrega', '#7dd3fc',
   null, 80),

  ('estrela-detail-wash',
   'Estrela Detail & Wash',
   'Website profissional para serviço de detailing e lavagem automóvel com marcações online.',
   'Automóvel · Serviços',
   array['Website','Marcações','Local'],
   'E', '#fca5a5', false,
   '100%', 'Satisfação', '#fca5a5',
   null, 70),

  ('football-nation-store-branding',
   'Football Nation Store',
   'Logótipo e cartão de visita profissional para e-commerce de camisolas de clubes.',
   'Design Gráfico',
   array['Branding','Print','Identidade'],
   'F', '#facc15', false,
   '100%', 'Satisfação', '#c0a8ff',
   null, 60),

  ('football-nation-store-loja',
   'Football Nation Store',
   'Loja online completa para venda de camisolas de futebol com catálogo, pagamentos e SEO.',
   'E-commerce · Desporto',
   array['Loja Online','Stock','SEO'],
   '⚽', '#facc15', false,
   '95+', 'PageSpeed', '#86efac',
   'https://www.footballnationstore.pt', 50)
on conflict (slug) do nothing;
