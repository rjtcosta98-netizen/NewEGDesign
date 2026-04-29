import './portfolio.css';
import { cache } from 'react';
import type { Metadata } from 'next';
import {
  getSupabase,
  publicAsset,
  PROJECT_IMAGES,
  type Project,
  type Client,
} from '@/lib/supabase';
import PortfolioClient, { type PortfolioProject } from '@/components/PortfolioClient';

const SITE_URL = 'https://elementgroup.pt';

export const revalidate = 300; // ISR: refresh every 5 min

export const metadata: Metadata = {
  title: 'Portfólio de Projetos Digitais | Element Group',
  description:
    'Conheça os nossos projetos: websites, lojas online, apps mobile e branding. PageSpeed verificável, resultados reais. Agência web Element Group, Portugal.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfólio | Element Group',
    description: 'Projetos reais com resultados verificáveis. Websites, e-commerce, apps e branding em Portugal.',
    url: 'https://elementgroup.pt/portfolio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

/* ─── Static fallback data ─── */
const STATIC_PROJECTS: PortfolioProject[] = [
  {
    id: 'matias-nature-portugal',
    slug: 'matias-nature-portugal',
    title: 'Matias Nature — E-commerce + App PWA',
    client: 'Matias Nature',
    category: 'E-commerce',
    image: '/images/MNSITE.webp',
    url: 'https://www.matiasnature.com',
    year: '2025',
    headline: 'De plataformas terceiras a reservas 100% diretas.',
    deliverables: ['Website E-commerce', 'App PWA', 'Social Media'],
    results: [
      { value: '+25%', label: 'Reservas diretas em 90 dias' },
      { value: 'PageSpeed 96', label: 'Performance desktop' },
      { value: '+30%', label: 'Retorno de clientes (app)' },
    ],
    testimonial: {
      text: 'Desde o primeiro contato até a entrega foi excecional!',
      author: 'Cliente Matias Nature',
    },
    source: 'static',
  },
  {
    id: 'football-nation-store-loja',
    slug: 'football-nation-store-loja',
    title: 'Football Nation Store — Loja Online',
    client: 'Football Nation Store',
    category: 'E-commerce',
    image: '/images/FOOTBALLNATIONWEB.webp',
    url: null,
    year: '2026',
    headline: 'Do logótipo à loja online. Camisolas de futebol ao mundo inteiro.',
    deliverables: ['Loja Online E-commerce', 'SEO', 'Mobile-First'],
    results: [
      { value: 'E-commerce', label: 'Loja online completa' },
      { value: 'PageSpeed 95+', label: 'Performance mobile & desktop' },
      { value: 'SEO Ready', label: 'Otimizado para Google' },
    ],
    testimonial: {
      text: 'Da identidade visual ao website — tudo ficou perfeito.',
      author: 'Football Nation Store',
    },
    source: 'static',
  },
  {
    id: 'apiarios-terras-pulga',
    slug: 'apiarios-terras-pulga',
    title: 'Apiários Terras da Pulga — E-commerce',
    client: 'Apiários Terras da Pulga',
    category: 'E-commerce',
    image: '/images/APIARIOSWEB.webp',
    url: 'https://apiariosterrasdapulga.pt',
    year: '2026',
    headline: 'Tradição encontra digital. Vendas 24h/dia.',
    deliverables: ['Website & E-commerce', 'SEO', 'Branding'],
    results: [
      { value: '+40%', label: 'Vendas online em 60 dias' },
      { value: 'PageSpeed 95', label: 'Performance desktop' },
      { value: 'Top 3', label: 'Google em termos locais' },
    ],
    testimonial: {
      text: 'Recomendo totalmente. Excelente capacidade de transformar ideias em processos claros.',
      author: 'Ricardo Jesus, Proprietário',
    },
    source: 'static',
  },
  {
    id: 'maria-mendes-massagens',
    slug: 'maria-mendes-massagens',
    title: 'Maria Mendes Massagens — Website',
    client: 'Maria Mendes Massagens',
    category: 'Websites',
    image: '/images/MARIAWEB.webp',
    url: null,
    year: '2026',
    headline: 'De plataforma gratuita a website profissional. Marcações 24/7.',
    deliverables: ['Website Profissional', 'Performance', 'SEO Técnico'],
    results: [
      { value: 'PageSpeed 100', label: 'Performance mobile & desktop' },
      { value: '<1s', label: 'Tempo de carregamento' },
      { value: '10 dias', label: 'Do brief ao site live' },
    ],
    testimonial: {
      text: 'Recomendo totalmente. Profissionalismo e rapidez na execução.',
      author: 'Maria Mendes, Proprietária',
    },
    source: 'static',
  },
  {
    id: 'ad-sao-romao',
    slug: 'ad-sao-romao',
    title: 'AD São Romão — Website Institucional',
    client: 'Assoc. Desportiva São Romão',
    category: 'Websites',
    image: '/images/ADSRWEB.webp',
    url: 'https://adsaoromao.pt',
    year: '2026',
    headline: 'Uma associação com presença digital à altura da sua história.',
    deliverables: ['Website Institucional', 'SEO', 'Mobile-First'],
    results: [
      { value: '92/100', label: 'SEO Score' },
      { value: '10 dias', label: 'Do brief ao site live' },
      { value: 'PageSpeed 100', label: 'Performance' },
    ],
    testimonial: {
      text: 'Excelente trabalho! O site ficou moderno e profissional.',
      author: 'Associação Desportiva São Romão',
    },
    source: 'static',
  },
  {
    id: 'estrela-detail-wash',
    slug: 'estrela-detail-wash',
    title: 'Estrela Detail & Wash — Branding',
    client: 'Estrela Detail & Wash',
    category: 'Design',
    image: '/images/BannerEstrela.webp',
    url: null,
    year: '2026',
    headline: 'Uma marca premium para um serviço de excelência automóvel.',
    deliverables: ['Logótipo Profissional', 'Banner Promocional'],
    results: [
      { value: '100%', label: 'Satisfação do cliente' },
      { value: 'Premium', label: 'Posicionamento da marca' },
    ],
    testimonial: {
      text: 'Ficou exatamente como imaginávamos — profissional e com impacto.',
      author: 'Estrela Detail & Wash',
    },
    source: 'static',
  },
  {
    id: 'football-nation-store-branding',
    slug: 'football-nation-store-branding',
    title: 'Football Nation Store — Branding',
    client: 'Football Nation Store',
    category: 'Design',
    image: '/images/mockuplogofootball.webp',
    url: null,
    year: '2026',
    headline: 'Identidade visual de raiz para e-commerce de futebol.',
    deliverables: ['Logótipo Profissional', 'Cartão de Visita'],
    results: [
      { value: '100%', label: 'Satisfação do cliente' },
      { value: 'Premium', label: 'Posicionamento da marca' },
    ],
    testimonial: {
      text: 'Superou as expectativas! O logótipo ficou profissional e com a identidade certa.',
      author: 'Football Nation Store',
    },
    source: 'static',
  },
];

/* ─── Supabase fetch ─── */
type SupabaseRow = Project & { client: Client | null };

const fetchFromSupabase = cache(async (): Promise<PortfolioProject[]> => {
  const sb = getSupabase();
  if (!sb) return [];

  const { data, error } = await sb
    .from('projects')
    .select(
      'id, slug, title, description, category, cover_path, gallery, url, is_published, display_order, published_at, client:clients(id, slug, name, industry, website, logo_path)'
    )
    .eq('is_published', true)
    .order('display_order', { ascending: false })
    .order('published_at', { ascending: false, nullsFirst: false });

  if (error) {
    console.error('[portfolio] fetch error:', error.message);
    return [];
  }

  return ((data ?? []) as unknown as SupabaseRow[]).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    client: p.client?.name ?? p.title,
    category: p.category ?? 'Websites',
    image: publicAsset(PROJECT_IMAGES, p.cover_path),
    url: p.url ?? null,
    year: p.published_at ? new Date(p.published_at).getFullYear().toString() : '2026',
    headline: p.description ?? '',
    deliverables: [],
    results: [],
    testimonial: undefined,
    source: 'supabase' as const,
  }));
});

export default async function PortfolioPage() {
  const supabaseProjects = await fetchFromSupabase();
  const projects = supabaseProjects.length > 0 ? supabaseProjects : STATIC_PROJECTS;

  const statsProjects = projects.length;

  const portfolioLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/portfolio`,
        name: 'Portfólio de Projetos Digitais | Element Group',
        description: 'Conheça os nossos projetos: websites, lojas online, apps mobile e branding. PageSpeed verificável, resultados reais.',
        url: `${SITE_URL}/portfolio`,
        inLanguage: 'pt-PT',
        publisher: { '@id': `${SITE_URL}/#organization` },
        breadcrumb: { '@id': `${SITE_URL}/portfolio#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/portfolio#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Portfólio', item: `${SITE_URL}/portfolio` },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Projetos Element Group',
        description: `${statsProjects}+ projetos digitais entregues em Portugal`,
        itemListElement: projects.slice(0, 10).map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/portfolio/${p.slug}`,
          name: p.title,
        })),
      },
    ],
  };

  return (
    <div className="pf-page">
      {/* ── Hero ── */}
      <section className="pf-hero has-atmos">
        {/* Atmospheric decorations */}
        <div className="section-atmos" aria-hidden="true">
          <div className="rings"><span /><span /><span /><span /><span /><span /></div>
          <div className="section-sparkles">
            {[
              { left: '14%', top: 80, delay: 0.3 },
              { left: '24%', top: 180, delay: 1.6 },
              { left: '36%', top: 55, delay: 2.1 },
              { left: '48%', top: 150, delay: 0.8 },
              { left: '56%', top: 220, delay: 3.3 },
              { left: '64%', top: 70, delay: 1.2 },
              { left: '72%', top: 160, delay: 2.7 },
              { left: '80%', top: 95, delay: 0.6 },
              { left: '86%', top: 200, delay: 2.4 },
              { left: '92%', top: 130, delay: 1.0 },
            ].map((s, i) => (
              <span
                key={i}
                style={{ left: s.left, top: s.top, animationDelay: `${s.delay}s` }}
              />
            ))}
          </div>
        </div>

        {/* Hero content */}
        <div className="pf-hero-label">
          <span />
          Portfólio
        </div>

        <h1>
          Projetos reais.<br />
          <em>Resultados verificáveis.</em>
        </h1>

        <p className="pf-hero-sub">
          Não usamos mockups embelezados. Cada projeto tem URL real, PageSpeed verificável e —
          quando possível — métricas de resultado concretas.
        </p>

        {/* Stats strip */}
        <div className="pf-stats">
          <div className="pf-stat">
            <span className="pf-stat-num">{statsProjects}+</span>
            <span className="pf-stat-label">Projetos entregues</span>
          </div>
          <div className="pf-stat">
            <span className="pf-stat-num">5.0</span>
            <span className="pf-stat-label">Rating Google</span>
          </div>
          <div className="pf-stat">
            <span className="pf-stat-num">100%</span>
            <span className="pf-stat-label">Reviews 5 estrelas</span>
          </div>
          <div className="pf-stat">
            <span className="pf-stat-num">&lt;2h</span>
            <span className="pf-stat-label">Tempo de resposta</span>
          </div>
        </div>
      </section>

      {/* ── Interactive client section (filters + grid) ── */}
      <PortfolioClient projects={projects} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioLd) }}
      />
    </div>
  );
}
