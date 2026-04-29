import './case-study.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCaseStudyDB, getAllCaseStudySlugsDB, getAllCaseStudiesDB } from '@/lib/case-studies-db';
import { SITE_URL_CS, type CaseStudy, type CaseStudyResult } from '@/lib/case-studies';

/* ─── Static params ─── */
export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugsDB();
  return slugs.map((slug) => ({ slug }));
}

/* ─── SEO metadata ─── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyDB(slug);
  if (!cs) return {};
  return {
    title: cs.metaTitle,
    description: cs.metaDescription,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      title: cs.metaTitle,
      description: cs.metaDescription,
      url: `${SITE_URL_CS}/portfolio/${slug}`,
      images: cs.image ? [{ url: cs.image, width: 1200, height: 630 }] : [{ url: '/og-image.jpg', width: 1200, height: 630 }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: cs.metaTitle,
      description: cs.metaDescription,
    },
  };
}

/* ─── Structured data ─── */
function buildLD(cs: CaseStudy) {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL_CS}/` },
      { '@type': 'ListItem', position: 2, name: 'Portfólio', item: `${SITE_URL_CS}/portfolio` },
      { '@type': 'ListItem', position: 3, name: cs.client, item: `${SITE_URL_CS}/portfolio/${cs.slug}` },
    ],
  };

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.title,
    description: cs.metaDescription,
    image: cs.image ? `${SITE_URL_CS}${cs.image}` : `${SITE_URL_CS}/og-image.jpg`,
    author: {
      '@type': 'Organization',
      name: 'Element Group',
      url: SITE_URL_CS,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Element Group',
      url: SITE_URL_CS,
      logo: { '@type': 'ImageObject', url: `${SITE_URL_CS}/logo.png` },
    },
    datePublished: `${cs.year}-01-01`,
    dateModified: `${cs.year}-06-01`,
    about: { '@type': 'Thing', name: cs.client },
    ...(cs.testimonial && {
      review: {
        '@type': 'Review',
        reviewBody: cs.testimonial.text,
        author: { '@type': 'Person', name: cs.testimonial.author },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
    }),
  };

  return { breadcrumb, article };
}

/* ─── Icon helpers ─── */
function ResultIcon({ icon }: { icon?: CaseStudyResult['icon'] }) {
  if (icon === 'up') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
  if (icon === 'speed') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
  if (icon === 'star') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3 7h7l-5.5 4.5 2 7.5L12 17l-6.5 4 2-7.5L2 9h7z" />
    </svg>
  );
  if (icon === 'clock') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  );
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ─── Check icon for solution highlights ─── */
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ─── Page component ─── */
export default async function CaseStudyPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const cs = await getCaseStudyDB(slug);
  if (!cs) notFound();

  const { breadcrumb, article } = buildLD(cs);
  const [prevCs, nextCs] = await Promise.all([
    cs.prevSlug ? getCaseStudyDB(cs.prevSlug) : Promise.resolve(null),
    cs.nextSlug ? getCaseStudyDB(cs.nextSlug) : Promise.resolve(null),
  ]);

  return (
    <div className="cs-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />

      {/* ── BREADCRUMB ── */}
      <nav className="cs-breadcrumb" aria-label="Navegação de migalhas">
        <Link href="/">Início</Link>
        <span aria-hidden="true">›</span>
        <Link href="/portfolio">Portfólio</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{cs.client}</span>
      </nav>

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <header className="cs-hero">
        {/* Background image */}
        {cs.image && (
          <div className="cs-hero-img">
            <img src={cs.image} alt={cs.heroHeadline} width={1600} height={900} />
          </div>
        )}
        <div className="cs-hero-overlay" aria-hidden="true" />

        <div className="cs-hero-inner">
          {/* Tags */}
          <div className="cs-hero-tags">
            <span className="cs-tag">{cs.category}</span>
            <span className="cs-tag cs-tag--year">{cs.year}</span>
          </div>

          {/* Headline */}
          <h1 className="cs-hero-title">{cs.heroHeadline}</h1>
          <p className="cs-hero-sub">{cs.heroSub}</p>

          {/* Key results — 3 badges */}
          <div className="cs-hero-results" aria-label="Resultados principais">
            {cs.keyResults.map((r, i) => (
              <div key={i} className="cs-hero-result">
                <span className="cs-hero-result-icon">
                  <ResultIcon icon={r.icon} />
                </span>
                <div>
                  <span className="cs-hero-result-val">{r.value}</span>
                  <span className="cs-hero-result-label">{r.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ══ CONTEXT BAR ═══════════════════════════════════════════════════ */}
      <div className="cs-context">
        <div className="cs-context-inner">
          <div className="cs-context-item">
            <span className="cs-context-label">Cliente</span>
            <span className="cs-context-val">{cs.client}</span>
          </div>
          <div className="cs-context-item">
            <span className="cs-context-label">Categoria</span>
            <span className="cs-context-val">{cs.category}</span>
          </div>
          <div className="cs-context-item">
            <span className="cs-context-label">Ano</span>
            <span className="cs-context-val">{cs.year}</span>
          </div>
          <div className="cs-context-item">
            <span className="cs-context-label">Entregáveis</span>
            <span className="cs-context-val cs-context-pills">
              {cs.deliverables.map((d, i) => (
                <span key={i} className="cs-pill">{d}</span>
              ))}
            </span>
          </div>
          {cs.url && (
            <a
              href={cs.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-live-btn"
            >
              <span className="cs-live-dot" />
              Ver site
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* ══ BODY CONTENT ══════════════════════════════════════════════════ */}
      <div className="cs-body">

        {/* ── 01 CHALLENGE ── */}
        <section className="cs-section" aria-labelledby="cs-challenge-title">
          <div className="cs-section-inner">
            <div className="cs-section-label">
              <span className="cs-step">01</span>
              <span>Desafio</span>
            </div>
            <div className="cs-section-content">
              <h2 id="cs-challenge-title" className="cs-section-title">
                {cs.challenge.title ?? 'O Desafio'}
              </h2>
              {cs.challenge.body.map((p, i) => (
                <p key={i} className="cs-body-text">{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ── 02 SOLUTION ── */}
        <section className="cs-section cs-section--alt" aria-labelledby="cs-solution-title">
          <div className="cs-section-inner">
            <div className="cs-section-label">
              <span className="cs-step">02</span>
              <span>Solução</span>
            </div>
            <div className="cs-section-content">
              <h2 id="cs-solution-title" className="cs-section-title">
                {cs.solution.title ?? 'A Solução'}
              </h2>
              {cs.solution.body.map((p, i) => (
                <p key={i} className="cs-body-text">{p}</p>
              ))}
              <ul className="cs-highlights" aria-label="Destaques da solução">
                {cs.solution.highlights.map((h, i) => (
                  <li key={i} className="cs-highlight-item">
                    <span className="cs-highlight-icon"><CheckIcon /></span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 03 RESULTS ── */}
        <section className="cs-section" aria-labelledby="cs-results-title">
          <div className="cs-section-inner">
            <div className="cs-section-label">
              <span className="cs-step">03</span>
              <span>Resultados</span>
            </div>
            <div className="cs-section-content">
              <h2 id="cs-results-title" className="cs-section-title">
                {cs.results.title ?? 'Resultados'}
              </h2>
              <div className="cs-result-grid" aria-label="Métricas de resultado">
                {cs.results.items.map((r, i) => (
                  <div key={i} className="cs-result-card">
                    <span className="cs-result-icon">
                      <ResultIcon icon={r.icon} />
                    </span>
                    <span className="cs-result-val">{r.value}</span>
                    <span className="cs-result-label">{r.label}</span>
                  </div>
                ))}
              </div>
              {cs.results.body && (
                <p className="cs-body-text cs-results-note">{cs.results.body}</p>
              )}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL ── */}
        {cs.testimonial && (
          <section className="cs-testimonial-wrap" aria-label="Testemunho do cliente">
            <div className="cs-testimonial">
              <div className="cs-testimonial-quotes" aria-hidden="true">&ldquo;</div>
              <blockquote className="cs-testimonial-text">
                {cs.testimonial.text}
              </blockquote>
              <footer className="cs-testimonial-footer">
                <div className="cs-testimonial-stars" aria-label="5 estrelas">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#facc15" aria-hidden="true">
                      <path d="M12 2l3 7h7l-5.5 4.5 2 7.5L12 17l-6.5 4 2-7.5L2 9h7z" />
                    </svg>
                  ))}
                </div>
                <div>
                  <span className="cs-testimonial-author">{cs.testimonial.author}</span>
                  {cs.testimonial.role && (
                    <span className="cs-testimonial-role">{cs.testimonial.role}</span>
                  )}
                </div>
              </footer>
            </div>
          </section>
        )}

      </div>

      {/* ══ NEXT PROJECT NAVIGATION ════════════════════════════════════════ */}
      <nav className="cs-nav-projects" aria-label="Navegar entre projetos">
        <div className="cs-nav-projects-inner">
          {prevCs ? (
            <Link href={`/portfolio/${prevCs.slug}`} className="cs-nav-project cs-nav-project--prev">
              <span className="cs-nav-direction">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Projeto anterior
              </span>
              <span className="cs-nav-client">{prevCs.client}</span>
            </Link>
          ) : <div />}

          <Link href="/portfolio" className="cs-nav-all">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            Ver portfólio
          </Link>

          {nextCs ? (
            <Link href={`/portfolio/${nextCs.slug}`} className="cs-nav-project cs-nav-project--next">
              <span className="cs-nav-direction">
                Próximo projeto
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span className="cs-nav-client">{nextCs.client}</span>
            </Link>
          ) : <div />}
        </div>
      </nav>

      {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
      <section className="cs-cta" aria-labelledby="cs-cta-title">
        <div className="cs-cta-inner">
          <div className="cs-cta-badge">
            <span className="cs-cta-pip" />
            Disponíveis para novos projetos
          </div>
          <h2 id="cs-cta-title" className="cs-cta-title">
            Quer resultados<br />
            <em>como estes?</em>
          </h2>
          <p className="cs-cta-sub">
            Proposta personalizada em menos de 24h. Sem compromisso. Respondemos sempre.
          </p>
          <div className="cs-cta-actions">
            <a href="/contacto" className="btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
              Pedir orçamento grátis
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="https://wa.me/351930477894?text=Ol%C3%A1!%20Vi%20o%20vosso%20portf%C3%B3lio%20e%20gostaria%20de%20falar%20sobre%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              className="cs-cta-wa"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
          <div className="cs-cta-trust">
            <span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Garantia 30 dias
            </span>
            <span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Proposta gratuita
            </span>
            <span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              Resposta &lt;24h
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
