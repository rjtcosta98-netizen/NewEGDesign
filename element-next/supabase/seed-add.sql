-- ============================================================================
-- Adiciona os projetos do screenshot (mantém os existentes).
-- Run em: Supabase Studio → SQL Editor
-- ============================================================================

-- Novos clientes (não toca nos existentes graças a ON CONFLICT)
insert into public.clients (slug, name, industry, website) values
  ('apiarios-terras-pulga',  'Apiários Terras da Pulga', 'Artesanal · Apicultura', null),
  ('maria-mendes-massagens', 'Maria Mendes Massagens',   'Saúde & Bem-Estar',     null)
on conflict (slug) do nothing;

-- Novos projetos
insert into public.projects
  (slug, title, client_id, description, category, is_published, display_order, published_at)
select
  v.slug, v.title, c.id, v.description, v.category, true, v.display_order, now() - (v.days || ' days')::interval
from (values
  ('football-nation-branding',
   'Football Nation Store',
   'Football-Nation-Store',  -- usa o slug que já existe
   'Logótipo e cartão de visita profissional para e-commerce de camisolas de clubes.',
   'Branding',
   90, 1),

  ('apiarios-terras-pulga-loja',
   'Apiários Terras da Pulga',
   'apiarios-terras-pulga',
   'Loja online para venda de mel e produtos apícolas com checkout MBWay e Multibanco.',
   'Loja Online',
   80, 10),

  ('maria-mendes-website',
   'Maria Mendes Massagens',
   'maria-mendes-massagens',
   'Website com sistema de marcações online para centro de massagens terapêuticas.',
   'Negócio Local',
   70, 14)
) as v(slug, title, client_slug, description, category, display_order, days)
join public.clients c on c.slug = v.client_slug
on conflict (slug) do nothing;
