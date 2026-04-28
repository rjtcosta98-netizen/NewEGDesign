import type { Metadata } from 'next';
import Script from 'next/script';
import { ContactForm } from './ContactForm';

const SITE_URL = 'https://elementgroup.pt';

export const metadata: Metadata = {
  title: 'Contacto | Element Group — Orçamento Gratuito em 24h',
  description:
    'Fala connosco. Formulário de contacto, email e telefone. Respondemos com uma proposta personalizada e gratuita em menos de 24 horas. Sem compromisso.',
  alternates: { canonical: '/contacto' },
  openGraph: {
    title: 'Contactar a Element Group',
    description:
      'Proposta personalizada e gratuita em menos de 24h. Sem letras pequenas, sem compromisso.',
    url: `${SITE_URL}/contacto`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const CONTACT_LD = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${SITE_URL}/contacto`,
  name: 'Contacto — Element Group',
  inLanguage: 'pt-PT',
  about: { '@id': `${SITE_URL}/#organization` },
  mainEntity: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Element Group',
    telephone: '+351930477894',
    email: 'info@elementgroup.pt',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+351930477894',
      email: 'info@elementgroup.pt',
      contactType: 'customer service',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      availableLanguage: ['Portuguese'],
      areaServed: 'PT',
    },
  },
};

const BREADCRUMB_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início',   item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Contacto', item: `${SITE_URL}/contacto` },
  ],
};

function isOpenNow(): boolean {
  try {
    const lisbon = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Europe/Lisbon' }),
    );
    const day  = lisbon.getDay();
    const hour = lisbon.getHours();
    return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
  } catch {
    return false;
  }
}

export default function ContactoPage() {
  const open = isOpenNow();

  return (
    <div className="ct-page">
      <Script
        id="ld-contact"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_LD) }}
      />
      <Script
        id="ld-ct-bc"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }}
      />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="ct-hero has-atmos">
        <div className="section-atmos" aria-hidden="true">
          <div className="rings">
            <span /><span /><span /><span /><span /><span />
          </div>
          <div className="section-sparkles">
            <span style={{ left: '8%',  top: 55,  animationDelay: '.3s'  }} />
            <span style={{ left: '22%', top: 175, animationDelay: '1.6s' }} />
            <span style={{ left: '78%', top: 65,  animationDelay: '1.2s' }} />
            <span style={{ left: '88%', top: 150, animationDelay: '2.1s' }} />
          </div>
        </div>
        <div className="ct-hero-glow" aria-hidden="true" />

        <div className="ct-hero-eyebrow">
          <span className="ct-status-dot" data-open={String(open)} aria-hidden="true" />
          {open ? 'Disponíveis agora' : 'Respondemos em breve'}
        </div>

        <h1 className="ct-h1">
          Vamos falar sobre<br />o teu <em>projeto.</em>
        </h1>
        <p className="ct-hero-sub">
          Proposta personalizada e gratuita em menos de 24&nbsp;horas.
          Sem letras pequenas, sem compromisso.
        </p>
      </section>

      {/* ══ MAIN GRID ══════════════════════════════════════════════════════ */}
      <div className="ct-grid-wrap">
        <div className="ct-grid">

          {/* ── Form column ── */}
          <div className="ct-form-col">
            <ContactForm />
          </div>

          {/* ── Info column ── */}
          <aside className="ct-info-col" aria-label="Informações de contacto">
            <div className="ct-info-card">

              {/* Status bar */}
              <div className="ct-status-row">
                <span className="ct-status-pill" data-open={String(open)}>
                  <span className="ct-status-pip" />
                  {open ? 'Abertos agora' : 'Fora de horário'}
                </span>
                <span className="ct-status-time">Resposta em &lt;&nbsp;24h</span>
              </div>

              {/* Contact items */}
              <div className="ct-info-items">
                <a href="mailto:info@elementgroup.pt" className="ct-info-item">
                  <div className="ct-info-item-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="4" width="20" height="16" rx="3" />
                      <path d="m2 7 10 7 10-7" />
                    </svg>
                  </div>
                  <div className="ct-info-item-body">
                    <span className="ct-info-item-label">Email</span>
                    <span className="ct-info-item-val">info@elementgroup.pt</span>
                  </div>
                  <svg className="ct-info-item-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </a>

                <a href="tel:+351930477894" className="ct-info-item">
                  <div className="ct-info-item-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 1.94z" />
                    </svg>
                  </div>
                  <div className="ct-info-item-body">
                    <span className="ct-info-item-label">Telefone</span>
                    <span className="ct-info-item-val">+351 930 477 894</span>
                  </div>
                  <svg className="ct-info-item-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </a>

                <a
                  href="https://wa.me/351930477894?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20um%20or%C3%A7amento."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-info-item ct-info-item--wa"
                >
                  <div className="ct-info-item-icon ct-info-item-icon--wa">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                  </div>
                  <div className="ct-info-item-body">
                    <span className="ct-info-item-label">WhatsApp</span>
                    <span className="ct-info-item-val">Mensagem direta</span>
                  </div>
                  <svg className="ct-info-item-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </a>
              </div>

              {/* Hours */}
              <div className="ct-hours">
                <div className="ct-hours-title">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Horário de atendimento
                </div>
                <div className="ct-hours-grid">
                  <span>Segunda a Sexta</span>
                  <span>9h – 18h</span>
                  <span>Sábado & Domingo</span>
                  <span className="ct-hours-closed">Encerrado</span>
                </div>
              </div>

              {/* Promise */}
              <div className="ct-promise">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Proposta gratuita &nbsp;·&nbsp; Sem compromisso &nbsp;·&nbsp; Resposta em &lt;&nbsp;24h
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
