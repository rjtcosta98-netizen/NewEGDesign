import './servicos.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = false; // statically generated at build time

const SERVICOS_SPARKLES = [
  { left: '12%', top: 90,  animationDelay: '.4s'  },
  { left: '22%', top: 200, animationDelay: '1.8s' },
  { left: '38%', top: 60,  animationDelay: '2.5s' },
  { left: '50%', top: 155, animationDelay: '.9s'  },
  { left: '62%', top: 230, animationDelay: '3.1s' },
  { left: '74%', top: 75,  animationDelay: '1.3s' },
  { left: '84%', top: 170, animationDelay: '2.2s' },
  { left: '90%', top: 110, animationDelay: '.7s'  },
] as const;

const SITE_URL = 'https://elementgroup.pt';

export const metadata: Metadata = {
  title: 'Serviços Web & Marketing Digital | Element Group',
  description:
    'Websites, lojas online, apps e marketing digital desde 197€. Código 100% original, PageSpeed 95+, SEO incluído. Proposta grátis em 24h.',
  alternates: { canonical: '/servicos' },
  openGraph: {
    title: 'Serviços | Element Group',
    description: 'Websites, e-commerce, apps, branding e marketing digital. Desde 197€, com PageSpeed 95+ e SEO incluído.',
    url: 'https://elementgroup.pt/servicos',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

/* ─── Service data (icons rendered via switch, not stored as JSX) ─── */
type ServiceItem = {
  slug: string;
  color: string;
  popular: boolean;
  iconId: string;
  title: string;
  price: string;
  period: string;
  desc: string;
  features: readonly string[];
};

const SERVICES: ServiceItem[] = [
  {
    slug: 'criacao-de-websites',
    color: 'violet', popular: true, iconId: 'globe',
    title: 'Criação de Websites', price: 'desde 197€', period: 'pagamento único',
    desc: 'Sites profissionais à medida com PageSpeed 95+ e tecnologia moderna. Código 100% original, sem templates.',
    features: ['Design 100% à medida', 'SEO técnico incluído', 'Mobile-first & Core Web Vitals', 'Apoio pós-lançamento'],
  },
  {
    slug: 'negocios-locais',
    color: 'yellow', popular: false, iconId: 'pin',
    title: 'Negócios Locais', price: 'desde 297€', period: 'pagamento único',
    desc: 'Solução completa para negócios físicos: website + Google Maps Top 3 + SEO geo-segmentado.',
    features: ['Ficha Google otimizada', 'SEO local geo-segmentado', 'Reservas e contactos online', 'Schema markup incluído'],
  },
  {
    slug: 'loja-online',
    color: 'green', popular: false, iconId: 'shop',
    title: 'Loja Online', price: 'desde 997€', period: 'pagamento único',
    desc: 'Loja e-commerce completa com pagamentos portugueses, gestão de stock e faturação automática.',
    features: ['MBWay, Multibanco e cartão', 'Gestão de produtos e stock', 'Faturação automática', 'SEO e-commerce incluído'],
  },
  {
    slug: 'apps-mobile',
    color: 'cyan', popular: false, iconId: 'mobile',
    title: 'Apps Mobile', price: 'desde 1.497€', period: 'pagamento único',
    desc: 'Apps nativas e Progressive Web Apps para iOS e Android. Notificações push e integração com APIs.',
    features: ['iOS, Android e PWA', 'Notificações push', 'Integração com APIs externas', 'Painel de gestão incluído'],
  },
  {
    slug: 'design-grafico',
    color: 'red', popular: false, iconId: 'palette',
    title: 'Design Gráfico', price: 'desde 297€', period: 'pagamento único',
    desc: 'Logótipo + manual de marca completo. Identidade visual profissional para destacar o teu negócio.',
    features: ['Logótipo + variações', 'Manual de marca', 'Posts redes sociais', 'Ficheiros editáveis incluídos'],
  },
  {
    slug: 'redesign-migracao',
    color: 'teal', popular: false, iconId: 'pencil',
    title: 'Redesign & Migração', price: 'desde 297€', period: 'pagamento único',
    desc: 'Migra de plataforma sem perder posições no Google. Redirects 301 cuidados e SEO preservado.',
    features: ['Redirects 301 cuidados', 'Preservação de SEO', 'Performance 95+', 'Zero downtime garantido'],
  },
  {
    slug: 'marketing-digital',
    color: 'yellow', popular: false, iconId: 'megaphone',
    title: 'Marketing Digital', price: 'desde 350€', period: 'por mês',
    desc: 'Gestão contínua de redes sociais, Google Ads e SEO mensal. Relatórios mensais de performance.',
    features: ['Instagram + Facebook geridos', 'Google Ads otimizados', 'SEO mensal e relatórios', 'Conteúdo criativo incluído'],
  },
];

const PROCESS = [
  { num: '01', title: 'Diagnóstico', desc: 'Analisamos o teu negócio, a tua concorrência e o que o teu cliente procura online.' },
  { num: '02', title: 'Estratégia', desc: 'Definimos objetivos mensuráveis antes de desenhar uma linha ou escrever código.' },
  { num: '03', title: 'Execução', desc: 'Design + desenvolvimento com o teu feedback em cada etapa do processo.' },
  { num: '04', title: 'Otimização', desc: 'Lançamento, monitorização e ajustes contínuos baseados em dados reais.' },
];

const FAQS = [
  { q: 'Quanto tempo demora um projeto?', a: 'Sites institucionais entre 2–3 semanas. Lojas online e apps entre 4–8 semanas.' },
  { q: 'O SEO está incluído?', a: 'SEO técnico, schema markup e otimização on-page estão sempre incluídos nos websites.' },
  { q: 'Como funcionam os pagamentos?', a: 'Pagamento único com 5% de desconto, ou 2× prestações sem juros. MBWay, Multibanco e transferência.' },
  { q: 'Quantas alterações posso pedir?', a: 'Dentro do âmbito acordado, alterações são ilimitadas. Trabalhamos por aprovações em cada fase.' },
];

/* ─── Icon resolver ─── */
function ServiceIcon({ id }: { id: string }) {
  if (id === 'globe') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
    </svg>
  );
  if (id === 'pin') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/>
    </svg>
  );
  if (id === 'shop') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M3 9l1.5-5h15L21 9M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M3 9h18M9 13a3 3 0 0 0 6 0"/>
    </svg>
  );
  if (id === 'mobile') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>
    </svg>
  );
  if (id === 'palette') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 22a10 10 0 1 1 10-10c0 3-3 4-5 4h-2a2 2 0 0 0 0 4 2 2 0 0 1-2 2z"/>
      <circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16.5" cy="10.5" r="1"/>
    </svg>
  );
  if (id === 'pencil') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M5 13l-1.5 6 6-1.5L20 6.5 17.5 4 5 13z"/><path d="M14 7l3 3"/>
    </svg>
  );
  if (id === 'megaphone') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M3 11l18-7v16L3 13z"/><path d="M11 19l-3 2-2-1 1-5"/>
    </svg>
  );
  return null;
}

const SERVICES_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/servicos`,
      name: 'Serviços Web & Marketing Digital | Element Group',
      description: 'Websites, lojas online, apps e marketing digital desde 197€. Código 100% original, PageSpeed 95+, SEO incluído. Proposta grátis em 24h.',
      url: `${SITE_URL}/servicos`,
      inLanguage: 'pt-PT',
      publisher: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: { '@id': `${SITE_URL}/servicos#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/servicos#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Serviços', item: `${SITE_URL}/servicos` },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Serviços Element Group',
      description: 'Catálogo completo de serviços digitais da Element Group',
      itemListElement: [
        { '@type': 'ListItem', position: 1, url: `${SITE_URL}/servicos/criacao-de-websites`, name: 'Criação de Websites' },
        { '@type': 'ListItem', position: 2, url: `${SITE_URL}/servicos/negocios-locais`, name: 'Negócios Locais' },
        { '@type': 'ListItem', position: 3, url: `${SITE_URL}/servicos/loja-online`, name: 'Loja Online' },
        { '@type': 'ListItem', position: 4, url: `${SITE_URL}/servicos/apps-mobile`, name: 'Apps Mobile' },
        { '@type': 'ListItem', position: 5, url: `${SITE_URL}/servicos/design-grafico`, name: 'Design Gráfico' },
        { '@type': 'ListItem', position: 6, url: `${SITE_URL}/servicos/redesign-migracao`, name: 'Redesign & Migração' },
        { '@type': 'ListItem', position: 7, url: `${SITE_URL}/servicos/marketing-digital`, name: 'Marketing Digital' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quanto tempo demora um projeto?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sites institucionais entre 2–3 semanas. Lojas online e apps entre 4–8 semanas.' },
        },
        {
          '@type': 'Question',
          name: 'O SEO está incluído?',
          acceptedAnswer: { '@type': 'Answer', text: 'SEO técnico, schema markup e otimização on-page estão sempre incluídos nos websites.' },
        },
        {
          '@type': 'Question',
          name: 'Como funcionam os pagamentos?',
          acceptedAnswer: { '@type': 'Answer', text: 'Pagamento único com 5% de desconto, ou 2× prestações sem juros. MBWay, Multibanco e transferência.' },
        },
        {
          '@type': 'Question',
          name: 'Quantas alterações posso pedir?',
          acceptedAnswer: { '@type': 'Answer', text: 'Dentro do âmbito acordado, alterações são ilimitadas. Trabalhamos por aprovações em cada fase.' },
        },
      ],
    },
  ],
};

export default function ServicosPage() {
  return (
    <div className="sv-page">
      {/* ── Hero ── */}
      <section className="sv-hero has-atmos">
        <div className="section-atmos" aria-hidden="true">
          <div className="rings"><span /><span /><span /><span /><span /><span /></div>
          <div className="section-sparkles">
            {SERVICOS_SPARKLES.map((s, i) => (
              <span key={i} style={s} />
            ))}
          </div>
        </div>

        {/* Floating ambient chips — desktop only */}
        <div className="sv-hero-floats" aria-hidden="true">
          <div className="sv-hf sv-hf--a">
            <span className="sv-hf-ic sv-hf-ic--violet">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
            </span>
            <span>120+ projetos</span>
          </div>
          <div className="sv-hf sv-hf--b">
            <span className="sv-hf-ic sv-hf-ic--green">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            </span>
            <span>Tráfego +318%</span>
          </div>
          <div className="sv-hf sv-hf--c">
            <span className="sv-hf-ic sv-hf-ic--gold">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>
            </span>
            <span>Resposta &lt;2h</span>
          </div>
        </div>

        <div className="sv-hero-label">Serviços</div>
        <h1>Soluções digitais<br />que <em>geram resultados.</em></h1>
        <p className="sv-hero-sub">
          Outros cobram €2.000–€5.000. Connosco começa em <strong>197€</strong> — porque usamos tecnologia moderna que
          nos torna mais rápidos. Mesma qualidade, preço justo.
        </p>

        <div className="sv-hero-actions">
          <a href="/contacto" className="sv-hero-cta">
            Pedir orçamento grátis
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#sv-grid" className="sv-hero-link">
            Ver todos os serviços
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 13l7 7 7-7"/></svg>
          </a>
        </div>

        <div className="sv-hero-trust">
          <span className="sv-hero-trust-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l4 4L19 6"/></svg>
            Entrega 10–21 dias
          </span>
          <span className="sv-trust-sep" aria-hidden="true"></span>
          <span className="sv-hero-trust-item" title="30 dias de correção de bugs e ajustes pós-lançamento, sem custo adicional">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-12V5l-8-3-8 3v5c0 8 8 12 8 12z"/></svg>
            Garantia 30 dias
          </span>
          <span className="sv-trust-sep" aria-hidden="true"></span>
          <span className="sv-hero-trust-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Proposta grátis 24h
          </span>
        </div>
      </section>

      {/* ── Services grid ── */}
      <div className="sv-grid-wrap" id="sv-grid">
        <div className="sv-grid">
          {SERVICES.map((s, i) => (
            <article key={i} className="sv-card" data-color={s.color}>
              <div className="sv-card__bar" />
              {s.popular && <span className="sv-card__pop">Popular</span>}
              <div className="sv-card__icon"><ServiceIcon id={s.iconId} /></div>
              <h3 className="sv-card__title">{s.title}</h3>
              <div className="sv-card__price">
                <b>{s.price}</b>
                <small>{s.period}</small>
              </div>
              <p className="sv-card__desc">{s.desc}</p>
              <ul className="sv-card__list">
                {s.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <div className="sv-card__actions">
                <Link
                  href={`/servicos/${s.slug}`}
                  className="sv-card__cta sv-card__cta--main"
                >
                  Ver detalhes
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M13 5l7 7-7 7"/>
                  </svg>
                </Link>
                <a
                  href={`https://wa.me/351930477894?text=${encodeURIComponent(`Olá! Tenho interesse no serviço de ${s.title}. Podiam enviar um orçamento?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sv-card__cta sv-card__cta--ghost"
                  aria-label={`Pedir orçamento para ${s.title} via WhatsApp`}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── Guarantee band ── */}
      <div className="sv-guarantee">
        <div className="sv-guarantee-inner">
          <p className="sv-guarantee-text">
            Preço justo, qualidade premium. Finalmente uma agência que{' '}
            <b>entrega o que promete</b> — sem desculpas nem surpresas.
          </p>
          <div className="sv-guarantee-trust">
            <span className="sv-guarantee-item" title="30 dias de correção de bugs e ajustes pós-lançamento, sem custo adicional">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Garantia 30 dias
            </span>
            <span className="sv-guarantee-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              Sem mensalidades obrigatórias
            </span>
            <span className="sv-guarantee-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              Código 100% seu
            </span>
          </div>
        </div>
      </div>

      {/* ── Process ── */}
      <section className="sv-process">
        <div className="sv-process-head">
          <span className="eyebrow">Processo</span>
          <h2 className="section-title" style={{ marginTop: 18 }}>
            Como funciona<br />o nosso <em>processo.</em>
          </h2>
          <p className="section-sub" style={{ marginTop: 14 }}>
            Cada projeto segue a mesma metodologia rigorosa. Sem atalhos, sem surpresas.
          </p>
        </div>
        <div className="sv-steps">
          {PROCESS.map((step, i) => (
            <div key={i} className="sv-step">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="sv-step-dot" />
                <span className="sv-step-num">{step.num}</span>
              </div>
              <h3 className="sv-step-title">{step.title}</h3>
              <p className="sv-step-body">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sv-faq-section">
        <div className="sv-faq-grid">
          {FAQS.map((faq, i) => (
            <div key={i} className="sv-faq-card">
              <p className="sv-faq-q">{faq.q}</p>
              <p className="sv-faq-a">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_LD) }}
      />

      {/* ── CTA ── */}
      <section className="sv-cta-section">
        <div className="sv-cta-box">

          {/* Text column */}
          <div className="sv-cta-text">
            <div className="sv-cta-badge"><span /> Disponíveis para novos projetos</div>
            <h2>Vamos construir<br />algo <em>extraordinário.</em></h2>
            <p>Proposta personalizada gratuita em menos de 24 horas. Consultoria inicial sem compromisso.</p>
          </div>

          {/* Divider */}
          <div className="sv-cta-divider" aria-hidden="true" />

          {/* Action column */}
          <div className="sv-cta-actions">
            <a
              href="https://wa.me/351930477894?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary sv-cta-btn"
            >
              Pedir orçamento grátis
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </a>
            <div className="sv-cta-trust">
              <span title="30 dias de correção de bugs e ajustes pós-lançamento, sem custo adicional">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Garantia 30 dias
              </span>
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Sem compromisso
              </span>
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Resposta &lt;2h
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
