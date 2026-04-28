-- ============================================================================
-- BLOG POSTS — tabela para artigos do blog Element Group
-- Otimizado para SEO: metadata por artigo, FAQ, schema.org
-- Run em: Supabase Studio → SQL Editor
-- ============================================================================

-- ---------- 1. Bucket público para imagens de capa ----------
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- ---------- 2. Tabela blog_posts ----------
create table if not exists public.blog_posts (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,

  -- Conteúdo principal
  title            text not null,
  excerpt          text not null,                        -- resumo (~160 chars) para listagem
  content          text not null,                        -- HTML do artigo completo

  -- SEO
  meta_title       text,                                 -- se null, usa title
  meta_description text,                                 -- se null, usa excerpt
  cover_image      text,                                 -- path no bucket blog-images

  -- Classificação
  category         text not null default 'Geral',        -- ex: "Websites", "No-Code", "Social Media"
  tags             text[] not null default '{}',

  -- Metadados do artigo
  reading_time_min int not null default 5,
  author           text not null default 'Element Group',

  -- Controlo de publicação
  is_published     boolean not null default false,
  display_order    int not null default 0,
  published_at     timestamptz default now(),
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

create index if not exists blog_posts_published_idx
  on public.blog_posts (is_published, display_order desc, published_at desc);

create index if not exists blog_posts_category_idx
  on public.blog_posts (category) where is_published = true;

-- ---------- 3. RLS (apenas leitura pública) ----------
alter table public.blog_posts enable row level security;

drop policy if exists "public read blog_posts" on public.blog_posts;
create policy "public read blog_posts"
  on public.blog_posts for select
  to anon, authenticated
  using (is_published = true);

-- ---------- 4. Storage policy ----------
drop policy if exists "public read blog-images" on storage.objects;
create policy "public read blog-images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'blog-images');

-- ---------- 5. Grant ----------
grant select on public.blog_posts to anon, authenticated;

-- ---------- 6. Função para updated_at automático ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- ---------- 7. Seed: primeiro artigo SEO ----------
insert into public.blog_posts (
  slug, title, excerpt, content,
  meta_title, meta_description,
  category, tags, reading_time_min, author,
  is_published, display_order, published_at
) values (
  'por-que-toda-empresa-precisa-de-um-website-em-2026',
  'Por Que Toda Empresa Precisa de um Website em 2026 (E o Que Acontece se Não Tiver)',
  'Em 2026, não ter website é o equivalente a fechar as portas ao teu negócio. Descobre as 5 razões pelas quais a tua empresa precisa de presença digital e como começar hoje.',
  '<p>Em 2026, quando alguém ouve falar de um negócio, faz sempre a mesma coisa: pesquisa no Google. Se não encontrar nada, não existe. Simples assim. Neste artigo explico-te por que um website profissional deixou de ser opcional — e o que podes perder por cada dia que adias esta decisão.</p>

<h2>O Consumidor Português Pesquisa Antes de Comprar</h2>
<p>Mais de 87% dos consumidores pesquisam online antes de fazer qualquer compra ou contratar qualquer serviço — mesmo quando o negócio é local. Se o teu restaurante, clínica, oficina ou loja não aparecer nessa pesquisa, o cliente vai ao teu concorrente. Não por má vontade, mas porque foi isso que o Google mostrou.</p>
<p>E não, uma página de Instagram não resolve. Vou explicar porquê já a seguir.</p>

<h2>5 Razões Pelas Quais a Tua Empresa Precisa de um Website em 2026</h2>

<h3>1. Credibilidade que as Redes Sociais Não Conseguem Dar</h3>
<p>Uma página de Instagram mostra o teu trabalho. Um website profissional prova que és sério. É a diferença entre um panfleto e uma montra. Clientes de maior valor — contratos maiores, projetos premium — procuram sempre um website antes de confiar num fornecedor.</p>
<p>Já perdeste negócios porque um potencial cliente não encontrou o teu website? Provavelmente sim. Só não sabias.</p>

<h3>2. O Google Não Indexa o Teu Instagram</h3>
<p>As redes sociais são jardins fechados. O teu conteúdo no Instagram não aparece em pesquisas no Google. Com um website, cada página que crias é uma porta de entrada para novos clientes — 24 horas por dia, sem pagar publicidade.</p>
<p>Um artigo de blog bem escrito pode trazer visitas durante <strong>anos</strong> depois de publicado. Uma publicação no Instagram desaparece do feed em 48 horas.</p>

<h3>3. Tu Controlas a Experiência (e os Dados)</h3>
<p>No Instagram, amanhã podem mudar o algoritmo e as tuas publicações deixam de aparecer. No teu website, tens controlo total: design, mensagens, preços, formulários, e-mail marketing. É teu. Para sempre.</p>
<p>Além disso, consegues saber exatamente quantas pessoas visitaram, de onde vieram e o que fizeram — informação que as redes sociais nunca te darão por completo.</p>

<h3>4. Aparece nos Resultados Locais do Google</h3>
<p>"Restaurante em Braga", "explicadora em Lisboa", "eletricista no Porto" — milhares de pesquisas com intenção de compra imediata acontecem todos os dias. Para apareceres nessas pesquisas, precisas de um website com SEO local. Uma página de Facebook não é suficiente.</p>
<p>A nossa cliente <strong>Maria Mendes Massagens</strong> atingiu o Top 3 do Google Local em menos de 90 dias após o lançamento do website. O negócio cresceu sem gastar um euro em publicidade paga.</p>

<h3>5. Automatiza o Teu Negócio Enquanto Dormes</h3>
<p>Formulários de contacto, marcações online, orçamentos automáticos, loja virtual. Um bom website trabalha por ti 24 horas por dia, 7 dias por semana. Cada hora que investes a criar conteúdo pode gerar clientes durante anos.</p>

<h2>"Mas Tenho Redes Sociais, Não Chega?"</h2>
<p>Esta é a objeção que ouvimos mais vezes. A resposta honesta: não chega. As redes sociais são excelentes para criar comunidade e visibilidade — mas não substituem um website por três razões fundamentais:</p>
<ul>
<li>Não aparecem no Google de forma orgânica</li>
<li>Podes perder a conta ou o alcance a qualquer momento</li>
<li>Não consegues personalizar a experiência de compra</li>
</ul>
<p>O ideal é ter ambos — e fazer com que se complementem. O website é a tua base. As redes sociais são o megafone.</p>

<h2>Website vs. App — O Que Precisas Primeiro?</h2>
<p>Para a maioria dos negócios, um website profissional (ou uma PWA — Progressive Web App) é suficiente e o ponto de partida certo. Uma app nativa faz sentido quando tens funcionalidades muito específicas: notificações push, acesso offline, integração com hardware.</p>
<p>Boa notícia: hoje, com tecnologia No-Code, conseguimos entregar ambos a um custo muito mais acessível do que há 5 anos. Não precisas de escolher entre um e outro desde o início.</p>

<h2>Quanto Custa Criar um Website Profissional em 2026?</h2>
<p>Os preços variam muito consoante a complexidade. Um website institucional simples pode começar nos 500€. Uma loja online completa com integrações de pagamento fica entre 1.500€ e 5.000€.</p>
<p>O que deves perguntar não é "quanto custa?" mas sim <strong>"qual é o retorno?"</strong>. Um website que te traz 3 novos clientes por mês paga-se em semanas.</p>
<p>Na Element Group trabalhamos com PMEs portuguesas há vários anos. Os resultados falam por si: a loja da <strong>Football Nation Store</strong> atingiu 95+ de PageSpeed e triplicou as vendas orgânicas. Os <strong>Apiários Terras da Pulga</strong> conseguiram um PageSpeed de 100 pontos e passaram a vender mel online sem intermediários. Podes ver mais no nosso <a href="/portfolio">portfólio</a>.</p>

<h2>O Próximo Passo é Simples</h2>
<p>Não existe o momento perfeito para criar o teu website. Existe apenas o momento em que decides que o teu negócio merece crescer.</p>
<p>Se chegaste até aqui, já deste o primeiro passo. Fala connosco — fazemos uma <strong>análise gratuita</strong> da tua presença digital e apresentamos uma proposta em 24 horas.</p>

<h2>Perguntas Frequentes</h2>
<dl>
<dt>Preciso de saber programação para ter um website?</dt>
<dd>Não. Com as tecnologias atuais — incluindo as soluções No-Code que utilizamos — criamos websites profissionais sem que precises de escrever uma linha de código.</dd>

<dt>Quanto tempo demora a criar um website?</dt>
<dd>Um website institucional pode estar pronto em 7 a 14 dias úteis. Uma loja online entre 2 a 4 semanas, dependendo da complexidade.</dd>

<dt>Um website ajuda mesmo o SEO do meu negócio local?</dt>
<dd>Sim. Um website otimizado para SEO local é uma das formas mais eficazes de aparecer em pesquisas do tipo "serviço + cidade". A nossa cliente Maria Mendes Massagens atingiu o Top 3 no Google Local em menos de 90 dias.</dd>

<dt>Posso gerir o conteúdo do website depois de entregue?</dt>
<dd>Sim. Todos os nossos websites incluem formação e acesso ao painel de gestão para poderes atualizar textos, imagens e produtos de forma autónoma.</dd>
</dl>',
  'Por Que Toda Empresa Precisa de um Website em 2026 | Element Group',
  'Em 2026, não ter website é o equivalente a fechar as portas ao negócio. Descobre as 5 razões pelas quais a tua empresa precisa de presença digital e como começar hoje.',
  'Websites',
  array['website para empresas', 'presença digital', 'criar website', 'agência digital Portugal', 'SEO local'],
  6,
  'Element Group',
  true,
  100,
  now()
) on conflict (slug) do nothing;
