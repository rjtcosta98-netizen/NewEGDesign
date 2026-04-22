-- ============================================================================
-- Limpa tudo e adiciona os 4 projetos do screenshot.
-- Run em: Supabase Studio → SQL Editor
-- ============================================================================

-- Limpar dados anteriores (demo + teste)
delete from public.projects;
delete from public.clients;

-- Clientes
insert into public.clients (slug, name, industry, website) values
  ('football-nation-store', 'Football Nation Store', 'Desporto · E-commerce', 'https://www.footballnationstore.pt'),
  ('apiarios-terras-pulga', 'Apiários Terras da Pulga', 'Artesanal · Apicultura', null),
  ('maria-mendes-massagens', 'Maria Mendes Massagens', 'Saúde & Bem-Estar', null);

-- Projetos (display_order maior = aparece primeiro)
insert into public.projects
  (slug, title, client_id, description, category, is_published, display_order, published_at)
select
  v.slug, v.title, c.id, v.description, v.category, true, v.display_order, now() - (v.days || ' days')::interval
from (values
  ('football-nation-branding',
   'Football Nation Store',
   'football-nation-store',
   'Logótipo e cartão de visita profissional para e-commerce de camisolas de clubes.',
   'Branding',
   100, 1),

  ('football-nation-loja',
   'Football Nation Store',
   'football-nation-store',
   'Loja online completa para venda de camisolas de futebol com catálogo, pagamentos e SEO.',
   'Loja Online',
   90, 5),

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
join public.clients c on c.slug = v.client_slug;
