-- ============================================================================
-- 5 demo projects to test the grid layout.
-- Run in Supabase Studio → SQL Editor.
-- Cover images are NULL → ProjectsGrid falls back to the animated mockup design.
-- Add real images later by uploading to project-images / client-logos buckets.
-- ============================================================================

with new_clients as (
  insert into public.clients (slug, name, industry, website) values
    ('aurora-estudio',  'Aurora Estúdio',  'Design',     'https://aurora.example'),
    ('verde-co',        'Verde & Co.',     'Retalho',    'https://verdeco.example'),
    ('norte-bistro',    'Norte Bistro',    'Restauração','https://nortebistro.example'),
    ('pulse-fit',       'Pulse Fit',       'Saúde',      'https://pulsefit.example'),
    ('luma-skincare',   'Luma Skincare',   'Beleza',     'https://luma.example')
  on conflict (slug) do update set name = excluded.name
  returning id, slug
)
insert into public.projects
  (slug, title, client_id, description, category, is_published, display_order, published_at)
select
  v.slug,
  v.title,
  c.id,
  v.description,
  v.category,
  true,
  v.display_order,
  now() - (v.days || ' days')::interval
from (values
  ('aurora-website',     'Website Aurora Estúdio',  'aurora-estudio', 'Website institucional · Lisboa',         'Web Design',     90, 1),
  ('verde-co-shop',      'Loja Online Verde & Co.', 'verde-co',       'E-commerce · Porto',                     'Loja Online',    80, 3),
  ('norte-bistro-site',  'Site Norte Bistro',       'norte-bistro',   'Negócio local · Braga',                  'Negócio Local',  70, 5),
  ('pulse-fit-app',      'App Pulse Fit',           'pulse-fit',      'Aplicação iOS & Android',                'App Mobile',     60, 7),
  ('luma-brand',         'Branding Luma Skincare',  'luma-skincare',  'Identidade visual · Lisboa',             'Branding',       50, 10)
) as v(slug, title, client_slug, description, category, display_order, days)
join new_clients c on c.slug = v.client_slug
on conflict (slug) do update
  set title = excluded.title,
      description = excluded.description,
      category = excluded.category,
      is_published = true,
      display_order = excluded.display_order;
