import './servico-detail.css';
import type { Metadata } from 'next';

export const revalidate = false; // data from static services-data.ts, rebuilt on deploy

const SVC_SPARKLES = [
  { left: '8%',  top: 80,  animationDelay: '.3s'  },
  { left: '20%', top: 190, animationDelay: '1.6s' },
  { left: '35%', top: 50,  animationDelay: '2.4s' },
  { left: '52%', top: 145, animationDelay: '.8s'  },
  { left: '65%', top: 220, animationDelay: '2.9s' },
  { left: '78%', top: 65,  animationDelay: '1.2s' },
  { left: '88%', top: 160, animationDelay: '2.1s' },
] as const;
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  SERVICE_PAGES,
  getServiceBySlug,
  getRelatedServices,
  buildServiceJsonLd,
  buildServiceBreadcrumbLd,
  buildServiceFaqLd,
  buildServiceHowToLd,
  buildWaLink,
} from '@/lib/services-data';
import { ServiceTheme } from '@/components/ServiceTheme';

/* ── Static params ──────────────────────────────────────────────────── */
export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

/* ── Metadata ───────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/servicos/${slug}` },
    openGraph: {
      title: service.ogTitle,
      description: service.ogDescription,
      url: `https://elementgroup.pt/servicos/${slug}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
  };
}

/* ── Icon resolver ──────────────────────────────────────────────────── */
function ServiceIcon({ id, size = 28 }: { id: string; size?: number }) {
  const s = `${size}`;
  if (id === 'globe') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
    </svg>
  );
  if (id === 'pin') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/>
    </svg>
  );
  if (id === 'shop') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l1.5-5h15L21 9M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M3 9h18M9 13a3 3 0 0 0 6 0"/>
    </svg>
  );
  if (id === 'mobile') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>
    </svg>
  );
  if (id === 'palette') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22a10 10 0 1 1 10-10c0 3-3 4-5 4h-2a2 2 0 0 0 0 4 2 2 0 0 1-2 2z"/>
      <circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16.5" cy="10.5" r="1"/>
    </svg>
  );
  if (id === 'pencil') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 13l-1.5 6 6-1.5L20 6.5 17.5 4 5 13z"/><path d="M14 7l3 3"/>
    </svg>
  );
  if (id === 'megaphone') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 11l18-7v16L3 13z"/><path d="M11 19l-3 2-2-1 1-5"/>
    </svg>
  );
  return null;
}

/* ── Deliverable icon resolver ──────────────────────────────────────── */
function DelivIcon({ id }: { id: string }) {
  const icons: Record<string, React.ReactNode> = {
    brush: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-1.5 1.52-2.07 2.04.58 1 1.74 1.55 2.91 1.55 1.64 0 3.18-1.17 3.17-2.58-.01-1.67-1.02-3.03-1.01-4.03z"/></svg>,
    speed: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    seo: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/><path d="M11 8v3l2 2"/></svg>,
    mobile: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/></svg>,
    code: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    support: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24"/></svg>,
    maps: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>,
    schema: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M21 14h-3a4 4 0 0 0-4 4v3"/></svg>,
    calendar: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
    reviews: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    payment: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
    stock: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 8h14M5 12h14M5 16h14"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg>,
    invoice: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6M9 17h4"/></svg>,
    analytics: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    apple: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/></svg>,
    bell: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    api: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="2" x2="12" y2="22"/></svg>,
    dashboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    store: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l1.5-5h15L21 9M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M3 9h18"/></svg>,
    logo: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>,
    book: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    social: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>,
    files: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>,
    print: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
    mockup: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    redirect: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5"/></svg>,
    uptime: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    audit: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    monitor: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 10l2 2 4-4"/></svg>,
    instagram: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>,
    ads: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 11l18-7v16L3 13z"/><path d="M11 19l-3 2-2-1 1-5"/></svg>,
    content: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
    strategy: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  };
  return <>{icons[id] ?? icons['code']}</>;
}

const PROCESS_STEPS = [
  { num: '01', title: 'Diagnóstico', desc: 'Analisamos o negócio, a concorrência e o que o teu cliente procura online.' },
  { num: '02', title: 'Estratégia', desc: 'Definimos objetivos mensuráveis antes de desenhar uma linha ou escrever código.' },
  { num: '03', title: 'Execução', desc: 'Design + desenvolvimento com o teu feedback em cada etapa do processo.' },
  { num: '04', title: 'Lançamento', desc: 'Entrega final, monitorização e ajustes contínuos baseados em dados reais.' },
];

/* ── Page ───────────────────────────────────────────────────────────── */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service.relatedSlugs);
  const waLink = buildWaLink(service.title);

  return (
    <div className="svc-page" data-color={service.color}>

      {/* ── Theme injection ── */}
      <ServiceTheme color={service.color} />

      {/* ── JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceJsonLd(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceBreadcrumbLd(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceFaqLd(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceHowToLd(service)) }}
      />

      {/* ── Accent top line ── */}
      <div className="svc-top-line" aria-hidden="true" />

      {/* ── Breadcrumb ── */}
      <nav className="svc-breadcrumb" aria-label="Navegação estrutural">
        <Link href="/">Início</Link>
        <span aria-hidden="true">/</span>
        <Link href="/servicos">Serviços</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{service.title}</span>
      </nav>

      {/* ── Service definition (GEO/AI extractable) ── */}
      {service.definition && (
        <p className="svc-definition">{service.definition}</p>
      )}

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="svc-hero has-atmos">
        {/* Atmospheric decorations */}
        <div className="section-atmos" aria-hidden="true">
          <div className="rings"><span /><span /><span /><span /><span /><span /></div>
          <div className="section-sparkles">
            {SVC_SPARKLES.map((s, i) => (
              <span key={i} style={s} />
            ))}
          </div>
        </div>
        {/* Accent glow radial */}
        <div className="svc-hero-glow" aria-hidden="true" />

        {/* Icon */}
        <div className="svc-hero-icon" aria-hidden="true">
          <div className="svc-hero-icon-ring" />
          <ServiceIcon id={service.iconId} size={34} />
        </div>

        {/* Eyebrow */}
        <div className="svc-eyebrow">{service.title}</div>

        {/* H1 */}
        <h1 className="svc-h1">
          {service.h1}<br /><em>{service.h1Em}</em>
        </h1>

        {/* Subtext */}
        <p className="svc-hero-sub">{service.heroSub}</p>

        {/* Price card */}
        <div className="svc-price-card">
          <div className="svc-price-card-price">
            <span className="svc-price-val">{service.price}</span>
            <span className="svc-price-period">{service.period}</span>
          </div>
          <div className="svc-price-card-divider" aria-hidden="true" />
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary svc-price-cta">
            Pedir orçamento grátis
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Trust badges */}
        <div className="svc-trust-row">
          {['Proposta em 24h', 'Garantia 30 dias', 'Sem compromisso', 'Código 100% seu'].map((t) => (
            <span key={t} className="svc-trust-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ══ DELIVERABLES ═════════════════════════════════════════════════ */}
      <section className="svc-section">
        <div className="svc-section-label">O que inclui</div>
        <h2 className="svc-section-title">
          Tudo o que recebes<br /><em>neste serviço.</em>
        </h2>
        <div className="svc-deliv-grid">
          {service.deliverables.map((d, i) => (
            <div key={i} className="svc-deliv-card">
              <span className="svc-deliv-bg-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="svc-deliv-icon-wrap">
                <DelivIcon id={d.icon} />
              </div>
              <h3 className="svc-deliv-title">{d.label}</h3>
              <p className="svc-deliv-desc">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ WHY US ═══════════════════════════════════════════════════════ */}
      <section className="svc-why-wrap">
        <div className="svc-why-inner">
          <div className="svc-why-left">
            <div className="svc-section-label">Porquê a Element Group</div>
            <h2 className="svc-section-title" style={{ textAlign: 'left' }}>
              O que nos torna<br /><em>diferentes.</em>
            </h2>
            <p className="svc-why-sub">
              Não somos uma agência genérica. Somos especialistas que trabalham com PMEs portuguesas e conhecem os detalhes que fazem a diferença.
            </p>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary svc-why-cta">
              Falar connosco
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          <div className="svc-why-right">
            {service.differentiators.map((d, i) => (
              <div key={i} className="svc-why-item">
                <span className="svc-why-num">{d.num}</span>
                <div>
                  <h3 className="svc-why-item-title">{d.title}</h3>
                  <p className="svc-why-item-desc">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══════════════════════════════════════════════════════ */}
      <section className="svc-section svc-process-section">
        <div className="svc-section-label">Processo</div>
        <h2 className="svc-section-title">
          Como funciona<br /><em>passo a passo.</em>
        </h2>
        <div className="svc-process-timeline">
          {/* Connecting line (desktop) */}
          <div className="svc-process-line" aria-hidden="true" />
          {PROCESS_STEPS.map((step, i) => (
            <div key={i} className="svc-process-step">
              <div className="svc-process-node">
                <span>{step.num}</span>
              </div>
              <h3 className="svc-process-title">{step.title}</h3>
              <p className="svc-process-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════ */}
      <section className="svc-section">
        <div className="svc-section-label">FAQ</div>
        <h2 className="svc-section-title">
          Perguntas frequentes<br /><em>sobre este serviço.</em>
        </h2>
        <div className="svc-faq-list">
          {service.faqs.map((faq, i) => (
            <details key={i} className="svc-faq-item">
              <summary className="svc-faq-q">
                <span>{faq.q}</span>
                <span className="svc-faq-chevron" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </summary>
              <p className="svc-faq-a">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ══ RELATED ══════════════════════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="svc-section svc-related-section">
          <div className="svc-section-label">Outros serviços</div>
          <h2 className="svc-section-title">
            Completa a tua<br /><em>presença digital.</em>
          </h2>
          <div className="svc-related-grid">
            {related.map((rel) => (
              <Link key={rel.slug} href={`/servicos/${rel.slug}`} className="svc-related-card" data-color={rel.color}>
                <div className="svc-related-card-top">
                  <div className="svc-related-icon">
                    <ServiceIcon id={rel.iconId} size={22} />
                  </div>
                  <div className="svc-related-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M5 12h14M13 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
                <div className="svc-related-name">{rel.title}</div>
                <div className="svc-related-price">{rel.price}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ══ CTA ══════════════════════════════════════════════════════════ */}
      <section className="sv-cta-section">
        <div className="sv-cta-box svc-cta-box">
          <div className="svc-cta-glow" aria-hidden="true" />
          <div className="sv-cta-badge"><span /> Disponíveis para novos projetos</div>
          <h2>Vamos falar sobre<br />o teu <em>projeto.</em></h2>
          <p>Proposta personalizada e gratuita em menos de 24 horas. Consultoria inicial sem compromisso.</p>
          <div className="sv-cta-actions">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '15px 32px', fontSize: 15 }}>
              Pedir orçamento grátis
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </a>
            <div className="sv-cta-trust">
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Garantia 30 dias
              </span>
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Sem compromisso
              </span>
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Resposta &lt;2h
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
