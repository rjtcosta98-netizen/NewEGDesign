-- ============================================================================
-- PROJECTS — Seed da tabela `projects` (grelha "Trabalhos")
-- Mesmos 6 projetos usados no hero (hero_projects), agora também na grid principal.
-- Run em: Supabase Studio → SQL Editor
--
-- NOTA sobre cover_path:
--   - É o path dentro do bucket `project-images` (público).
--   - Faz upload das imagens (1600×1000 px, 16:10) para esse bucket
--     com exatamente os nomes indicados abaixo. Se ainda não tens a imagem,
--     deixa o campo NULL e a card faz fallback para o mockup gráfico.
-- ============================================================================

insert into public.projects
  (slug, title, description, category, cover_path, url, is_published, display_order, published_at)
values
  ('matias-nature',
   'Matias Nature',
   'E-commerce + App PWA para marca de produtos naturais. Catálogo, checkout e área de cliente.',
   'website',
   'matias-nature.jpg',
   'https://www.matiasnature.com',
   true, 110, now()),

  ('apiarios-terras-pulga',
   'Apiários Terras da Pulga',
   'Loja online para venda de mel e produtos apícolas com checkout MBWay e Multibanco.',
   'website',
   'apiarios-terras-pulga.jpg',
   null,
   true, 100, now()),

  ('maria-mendes-massagens',
   'Maria Mendes Massagens',
   'Website com sistema de marcações online para centro de massagens terapêuticas.',
   'website',
   'maria-mendes-massagens.jpg',
   null,
   true, 90, now()),

  ('ad-sao-romao',
   'AD São Romão',
   'Website institucional para associação desportiva local com calendário de jogos e notícias.',
   'website',
   'ad-sao-romao.jpg',
   null,
   true, 80, now()),

  ('estrela-detail-wash',
   'Estrela Detail & Wash',
   'Website profissional para serviço de detailing e lavagem automóvel com marcações online.',
   'website',
   'estrela-detail-wash.jpg',
   null,
   true, 70, now()),

  ('football-nation-store-branding',
   'Football Nation Store — Branding',
   'Logótipo e cartão de visita profissional para e-commerce de camisolas de clubes.',
   'branding',
   'football-nation-store-branding.jpg',
   null,
   true, 60, now()),

  ('football-nation-store-loja',
   'Football Nation Store — Loja Online',
   'Loja online completa para venda de camisolas de futebol com catálogo, pagamentos e SEO.',
   'website',
   'football-nation-store-loja.jpg',
   'https://www.footballnationstore.pt',
   true, 50, now())

on conflict (slug) do update set
  title         = excluded.title,
  description   = excluded.description,
  category      = excluded.category,
  cover_path    = coalesce(excluded.cover_path, public.projects.cover_path),
  url           = excluded.url,
  is_published  = excluded.is_published,
  display_order = excluded.display_order;
