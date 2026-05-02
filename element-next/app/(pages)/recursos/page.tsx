import './recursos.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllLeadMagnets } from '@/lib/lead-magnets';

export const revalidate = 3600; // ISR: refresh every hour

const SITE_URL = 'https://elementgroup.pt';

export const metadata: Metadata = {
  title: 'Guias e Templates Gratuitos para PMEs | Element Group',
  description:
    'Descarrega grátis os nossos guias e templates para PMEs portuguesas: Checklist SEO, Template de Brief de Website e mais. Conhecimento prático, sem jargão.',
  alternates: { canonical: `${SITE_URL}/recursos` },
  openGraph: {
    title: 'Recursos Grátis para PMEs | Element Group',
    description:
      'Guias, checklists e templates gratuitos para empresas portuguesas que querem crescer online.',
    url: `${SITE_URL}/recursos`,
    siteName: 'Element Group',
    locale: 'pt_PT',
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Element Group — Recursos Grátis' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recursos Grátis para PMEs | Element Group',
    description: 'Guias e templates gratuitos para PMEs portuguesas que querem crescer online.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

// ── JSON-LD ────────────────────────────────────────────────────────────────
function buildLD(resources: ReturnType<typeof getAllLeadMagnets>) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Recursos', item: `${SITE_URL}/recursos` },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Recursos Grátis — Element Group',
        description: 'Guias, checklists e templates gratuitos para PMEs portuguesas.',
        url: `${SITE_URL}/recursos`,
        numberOfItems: resources.length,
        itemListElement: resources.map((r, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: r.title,
          url: `${SITE_URL}/recursos/${r.slug}`,
          description: r.description,
        })),
      },
    ],
  };
}

// ── Icons ──────────────────────────────────────────────────────────────────
function CategoryIcon({ category }: { category: string }) {
  if (category === 'SEO') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M21 21l-2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function RecursosPage() {
  const resources = getAllLeadMagnets();
  const ld = buildLD(resources);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      <div className="lm-hub-page">
        {/* Hero */}
        <section className="lm-hub-hero">
          <div className="section-atmos" aria-hidden="true">
            <div className="rings"><span/><span/><span/><span/></div>
            <div className="section-sparkles">
              <span style={{left:'20%',top:'100px',animationDelay:'.6s'}}/>
              <span style={{left:'75%',top:'75px',animationDelay:'2.0s'}}/>
            </div>
          </div>
          <div className="lm-hub-hero-inner">
            <span className="lm-hub-badge">100% Grátis</span>
            <h1 className="lm-hub-title">
              Recursos para fazer{' '}
              <span className="lm-hub-title-accent">crescer o teu negócio</span>{' '}
              online
            </h1>
            <p className="lm-hub-subtitle">
              Guias práticos, checklists e templates criados pela nossa equipa para
              proprietários de PMEs portuguesas. Sem jargão. Direto ao ponto.
            </p>
            <div className="lm-hub-trust">
              <span className="lm-hub-trust-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Sem spam
              </span>
              <span className="lm-hub-trust-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Conteúdo original
              </span>
              <span className="lm-hub-trust-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Fácil de implementar
              </span>
            </div>
          </div>
        </section>

        {/* Cards grid */}
        <section className="lm-hub-grid-section">
          <div className="lm-hub-grid-inner">
            <ul className="lm-hub-grid" role="list">
              {resources.map((r) => (
                <li key={r.slug} className="lm-hub-card">
                  <div className="lm-hub-card-top">
                    <div className="lm-hub-card-meta">
                      <span className="lm-hub-card-category-icon">
                        <CategoryIcon category={r.category} />
                      </span>
                      <span className="lm-hub-card-category">{r.category}</span>
                      <span className="lm-hub-card-divider" aria-hidden="true">·</span>
                      <span className="lm-hub-card-format">{r.format}</span>
                      <span className="lm-hub-card-divider" aria-hidden="true">·</span>
                      <span className="lm-hub-card-time">{r.readTime}</span>
                    </div>
                    <h2 className="lm-hub-card-title">{r.title}</h2>
                    <p className="lm-hub-card-subtitle">{r.subtitle}</p>
                    <p className="lm-hub-card-desc">{r.description}</p>
                  </div>
                  <div className="lm-hub-card-preview">
                    <p className="lm-hub-card-preview-label">O que inclui:</p>
                    <ul className="lm-hub-card-preview-list">
                      {r.preview.slice(0, 3).map((point, i) => (
                        <li key={i} className="lm-hub-card-preview-item">
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lm-hub-card-footer">
                    <span className="lm-hub-card-free-badge">Grátis</span>
                    <Link href={`/recursos/${r.slug}`} className="lm-hub-card-cta">
                      Aceder
                      <ArrowIcon />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="lm-hub-bottom-cta">
          <div className="lm-hub-bottom-inner">
            <h2 className="lm-hub-bottom-title">Preferes falar diretamente?</h2>
            <p className="lm-hub-bottom-sub">
              A nossa equipa responde em menos de 24 horas. Sem compromisso.
            </p>
            <Link href="/contacto" className="lm-hub-bottom-btn">
              Pedir orçamento grátis
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
