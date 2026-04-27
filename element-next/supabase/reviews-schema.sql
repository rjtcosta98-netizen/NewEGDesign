-- ============================================================================
-- REVIEWS — Tabela para os Testemunhos do Google (carrossel "Histórias de sucesso")
-- Layout não muda: continua a usar as .tx-card; só substitui o conteúdo fake
-- pelos depoimentos reais editáveis no Studio.
-- Run em: Supabase Studio → SQL Editor
-- ============================================================================

-- ---------- 1. Tabela reviews ----------
create table if not exists public.reviews (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,                -- ex: 'mariana-mendes-fns'

  -- Autor
  author_name   text not null,                       -- "Mariana Mendes"
  author_role   text,                                -- "CEO · FootballNationStore"
  initials      text,                                -- "MM" (auto-gerado se NULL)

  -- Conteúdo
  text          text not null,                       -- texto completo da review
  rating        int not null default 5 check (rating between 1 and 5),

  -- Origem
  source        text default 'google',               -- 'google' | 'facebook' | 'linkedin' | 'manual'
  source_url    text,                                -- link share.google/...

  -- Controlo
  is_published  boolean default true,
  display_order int default 0,                       -- maior = aparece primeiro
  published_at  timestamptz default now(),
  created_at    timestamptz default now()
);

create index if not exists reviews_published_idx
  on public.reviews (is_published, display_order desc, published_at desc);

-- ---------- 2. RLS (leitura pública) ----------
alter table public.reviews enable row level security;

drop policy if exists "public read reviews" on public.reviews;
create policy "public read reviews"
  on public.reviews for select
  to anon, authenticated
  using (is_published = true);

-- ---------- 3. Grant para Data API ----------
grant select on public.reviews to anon, authenticated;

-- ---------- 4. Seed: 6 reviews reais do Google ----------
insert into public.reviews
  (slug, author_name, author_role, initials, text, rating, source, source_url, display_order)
values
  ('ricardo-jesus-apiarios',
   'Ricardo Jesus',
   'CEO · Apiários Terras da Pulga',
   'RJ',
   'Recomendo totalmente o trabalho realizado na criação do meu site. Destaco o profissionalismo, a rapidez na execução e a excelente capacidade de transformar ideias em processos claros, simples e eficazes. Todo o desenvolvimento foi conduzido com grande organização, comunicação eficiente e foco na solução. O tratamento do projeto foi exemplar, com elevada qualidade técnica e prazos cumpridos de forma impressionante. Uma escolha segura para quem procura eficiência, rigor e resultados.',
   5, 'google', 'https://share.google/H3QMJkTpPyJ8QeZj0',
   100),

  ('mariana-mendes-fns',
   'Mariana Mendes',
   'CEO · FootballNationStore',
   'MM',
   'Excelente profissional, bastante atencioso, simpático e empenhado no trabalho, com grandes capacidades de oferecer o melhor aos clientes, muito paciente e sempre atento para atender ao nosso gosto. Foi uma grande ajuda para o nosso negócio sem dúvida, muito obrigado #footballnationstore 😊',
   5, 'google', 'https://share.google/7H3LofJ2z0hLfN2jM',
   90),

  ('maria-mendes-massagens',
   'Maria Mendes',
   'CEO · Maria Mendes Massagens',
   'MM', -- duplicado MM mas slug diferente — auto sobrepõe-se via z-index do carrossel
   'Desde o primeiro contacto até à entrega foi excecional! Criou o que eu pretendia há imenso tempo! Ficou um site extremamente incrível! Obrigada pela tua ajuda e pelo teu profissionalismo 🙏🏼',
   5, 'google', 'https://share.google/6OUPgDRj5uHjUkM8V',
   80),

  ('goncalo-nascimento-estrela',
   'Gonçalo Nascimento',
   'CEO · Estrela Detail & Wash',
   'GN',
   'Desde a primeira abordagem até ao conceito que pretendia foi super rápido e trabalho realizado com excelência e muito profissionalismo. Recomendo. Serviço premium. Obrigado.',
   5, 'google', 'https://share.google/SoncuGACH2IWtlZ6Y',
   70),

  ('duarte-marvanejo-adsr',
   'Duarte Marvanejo',
   'Presidente da Mesa da Assembleia Geral · ADSR',
   'DM',
   'Excelente trabalho na elaboração e design com elevados padrões de qualidade e adequação às temáticas abordadas! Um exemplo de empenho e dedicação ao trabalho... Parabéns pelo excelente trabalho!',
   5, 'google', 'https://share.google/uWFXZglT0O911oGku',
   60),

  ('jason-silva-adsr',
   'Jason Silva',
   'Presidente do Conselho Fiscal · ADSR',
   'JS',
   'Trabalho TOP na criação do site da Associação Desportiva de São Romão.',
   5, 'google', 'https://share.google/ieS3mjSztpeU3VHeX',
   50)

on conflict (slug) do update set
  author_name   = excluded.author_name,
  author_role   = excluded.author_role,
  initials      = excluded.initials,
  text          = excluded.text,
  rating        = excluded.rating,
  source        = excluded.source,
  source_url    = excluded.source_url,
  is_published  = excluded.is_published,
  display_order = excluded.display_order;
