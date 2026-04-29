import type { Metadata } from 'next';
import Link from 'next/link';
import ParceriasForm from './ParceriasForm';

const SITE_URL = 'https://elementgroup.pt';

export const metadata: Metadata = {
  title: 'Programa de Parceiros — Ganhe até 10% por Referência | Element Group',
  description:
    'Torna-te parceiro da Element Group e ganha até 10% do valor de cada projeto que nos encaminhes. Contabilistas, consultores, designers e comerciais — sem custos, sem burocracia.',
  alternates: { canonical: `${SITE_URL}/parcerias` },
  openGraph: {
    title: 'Programa de Parceiros — Ganhe até 10% | Element Group',
    description:
      'Refere clientes à Element Group e ganha uma comissão de até 10% por cada projeto fechado. Simples, transparente, sem custos.',
    url: `${SITE_URL}/parcerias`,
    siteName: 'Element Group',
    locale: 'pt_PT',
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Programa de Parceiros — Element Group' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Programa de Parceiros — Ganhe até 10% | Element Group',
    description: 'Refere clientes à Element Group e ganha uma comissão de até 10% por projeto fechado.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

const LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Parcerias', item: `${SITE_URL}/parcerias` },
      ],
    },
    {
      '@type': 'WebPage',
      url: `${SITE_URL}/parcerias`,
      name: 'Programa de Parceiros — Element Group',
      description: 'Programa de referenciação com comissão de até 10% por projeto para contabilistas, consultores, designers e comerciais.',
      inLanguage: 'pt-PT',
      publisher: {
        '@type': 'Organization',
        name: 'Element Group',
        url: SITE_URL,
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quanto posso ganhar como parceiro?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ganhas até 10% do valor do projeto fechado. Para um website de 500€ são 50€; para um e-commerce de 1500€ são 150€. O valor exato é acordado por projeto.' },
        },
        {
          '@type': 'Question',
          name: 'Como funciona o pagamento da comissão?',
          acceptedAnswer: { '@type': 'Answer', text: 'A comissão é paga após o cliente efetuar o pagamento do projeto à Element Group, por transferência bancária ou MBWay.' },
        },
        {
          '@type': 'Question',
          name: 'Preciso de ter conhecimentos técnicos?',
          acceptedAnswer: { '@type': 'Answer', text: 'Não. Só precisas de conhecer pessoas ou empresas que possam beneficiar dos nossos serviços. Nós tratamos de todo o processo técnico e comercial.' },
        },
        {
          '@type': 'Question',
          name: 'Existe algum custo para me tornar parceiro?',
          acceptedAnswer: { '@type': 'Answer', text: 'Absolutamente nenhum. O programa é 100% gratuito. Só ganhas quando fechamos um projeto com o teu referido.' },
        },
      ],
    },
  ],
};

const STEPS = [
  {
    num: '01',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Conheces alguém',
    body: 'Tens um cliente, amigo ou conhecido que precisa de um website, loja online ou presença digital.',
  },
  {
    num: '02',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Apresentas-nos',
    body: 'Partilhas o contacto ou apresentas diretamente — via WhatsApp, email ou pessoalmente. Nós tratamos do resto.',
  },
  {
    num: '03',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Recebes a comissão',
    body: 'Quando o projeto é fechado e pago, transferimos a tua comissão — até 10% do valor total do projeto.',
  },
];

const EXAMPLES = [
  { label: 'Website simples', value: '197€', commission: '~20€', tag: 'Pacote Start' },
  { label: 'Website profissional', value: '500€', commission: '~50€', tag: 'Pacote Pro' },
  { label: 'Loja online', value: '1.200€', commission: '~120€', tag: 'E-commerce' },
  { label: 'Projeto personalizado', value: '3.000€', commission: '~300€', tag: 'Custom' },
];

const PROFILES = [
  { icon: '📋', label: 'Contabilistas & TOCs', body: 'Tens clientes que precisam de melhorar a presença online do negócio.' },
  { icon: '🏢', label: 'Consultores de negócio', body: 'Acompanhas empresas em crescimento que precisam de uma estratégia digital.' },
  { icon: '🎨', label: 'Designers & Criativos', body: 'Fazes branding ou design e os teus clientes precisam de website.' },
  { icon: '🏠', label: 'Agentes imobiliários', body: 'Tens uma rede de proprietários e empresários que podem beneficiar.' },
  { icon: '📸', label: 'Fotógrafos & Videomakers', body: 'Os teus clientes têm negócios que precisam de se mostrar online.' },
  { icon: '💼', label: 'Comerciais & Empreendedores', body: 'Tens uma rede vasta e sabes identificar quem precisa de presença digital.' },
];

const FAQS = [
  {
    q: 'Quanto posso ganhar exatamente?',
    a: 'A comissão é até 10% do valor do projeto. O exato depende do projeto e é sempre acordado antes de encaminhares o cliente. Para referência: um website a 500€ = 50€ para ti; um e-commerce a 1.500€ = 150€.',
  },
  {
    q: 'Quando recebo o pagamento?',
    a: 'A comissão é paga após o cliente efetuar o pagamento do projeto à Element Group. Tipicamente no prazo de 5 dias úteis após a confirmação do pagamento, por transferência bancária ou MBWay.',
  },
  {
    q: 'Preciso de contrato ou empresa?',
    a: 'Não é obrigatório. Para valores acima de 1.000€ anuais em comissões, recomendamos formalizar por recibo verde. Para valores menores, tratamos de forma simples e direta.',
  },
  {
    q: 'O que acontece se o cliente não fechar?',
    a: 'Não ganhas nada nesse caso — mas também não perdes nada. Só há comissão quando o projeto é fechado e pago. Sem riscos para ti.',
  },
  {
    q: 'Posso referir múltiplos clientes?',
    a: 'Claro! Não há limite de referências. Quanto mais clientes encaminhares, mais ganhas. Cada projeto é tratado individualmente.',
  },
  {
    q: 'Tenho de acompanhar o projeto?',
    a: 'Não. A tua função é apenas a apresentação inicial. Nós tratamos de todo o processo: proposta, execução, entrega e suporte. Tu ficas com a comissão.',
  },
];

export default function ParceriasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }}
      />

      <div className="par-page">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="par-hero">
          <div className="par-hero-glow-a" aria-hidden="true" />
          <div className="par-hero-glow-b" aria-hidden="true" />
          <div className="par-hero-inner">
            <div className="par-hero-badge">
              <span className="par-hero-badge-dot" />
              Programa de Parceiros
            </div>

            <div className="par-hero-commission">
              <span className="par-commission-num">10</span>
              <div className="par-commission-meta">
                <span className="par-commission-pct">%</span>
                <span className="par-commission-label">de comissão<br />por projeto</span>
              </div>
            </div>

            <h1 className="par-hero-title">
              Conheces alguém que<br />
              precisa de um website?
            </h1>
            <p className="par-hero-sub">
              Apresenta-nos e ganha até <strong>10% do valor do projeto</strong>, sem custos, sem burocracia e sem precisar de saber nada de tecnologia.
            </p>

            <div className="par-hero-actions">
              <a href="#candidatura" className="par-btn-primary">
                Quero ser parceiro
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
              <a href="https://wa.me/351930477894?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20Programa%20de%20Parceiros%20da%20Element%20Group." target="_blank" rel="noopener noreferrer" className="par-btn-ghost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                Falar no WhatsApp
              </a>
            </div>

            <div className="par-hero-trust">
              {['Sem custos de entrada', 'Pagamento garantido', 'Sem limite de referências'].map((t) => (
                <span key={t} className="par-hero-trust-item">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMO FUNCIONA ────────────────────────────────────────── */}
        <section className="par-steps-section">
          <div className="par-section-inner">
            <div className="par-section-header">
              <span className="par-eyebrow">Como funciona</span>
              <h2 className="par-section-title">Em 3 passos simples</h2>
            </div>
            <div className="par-steps-grid">
              {STEPS.map((step, i) => (
                <div key={i} className="par-step">
                  <div className="par-step-top">
                    <span className="par-step-num">{step.num}</span>
                    <div className="par-step-icon">{step.icon}</div>
                  </div>
                  <h3 className="par-step-title">{step.title}</h3>
                  <p className="par-step-body">{step.body}</p>
                  {i < STEPS.length - 1 && (
                    <div className="par-step-arrow" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CALCULADORA ──────────────────────────────────────────── */}
        <section className="par-calc-section">
          <div className="par-section-inner">
            <div className="par-section-header">
              <span className="par-eyebrow">Exemplos reais</span>
              <h2 className="par-section-title">Quanto podes ganhar</h2>
              <p className="par-section-sub">
                Cada projeto é diferente. Aqui estão alguns exemplos com os valores dos nossos pacotes.
              </p>
            </div>
            <div className="par-calc-grid">
              {EXAMPLES.map((ex) => (
                <div key={ex.label} className="par-calc-card">
                  <span className="par-calc-tag">{ex.tag}</span>
                  <p className="par-calc-label">{ex.label}</p>
                  <div className="par-calc-values">
                    <div className="par-calc-value-block">
                      <span className="par-calc-value-label">Valor projeto</span>
                      <span className="par-calc-value par-calc-value--project">{ex.value}</span>
                    </div>
                    <div className="par-calc-arrow" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="par-calc-value-block">
                      <span className="par-calc-value-label">A tua comissão</span>
                      <span className="par-calc-value par-calc-value--commission">{ex.commission}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="par-calc-note">
              * Valores aproximados. A comissão exata é acordada individualmente antes de cada referência.
            </p>
          </div>
        </section>

        {/* ── QUEM PODE ────────────────────────────────────────────── */}
        <section className="par-profiles-section">
          <div className="par-section-inner">
            <div className="par-section-header">
              <span className="par-eyebrow">Quem pode participar</span>
              <h2 className="par-section-title">Perfeito para quem<br />tem uma rede</h2>
            </div>
            <div className="par-profiles-grid">
              {PROFILES.map((p) => (
                <div key={p.label} className="par-profile-card">
                  <span className="par-profile-icon" role="img" aria-label="">{p.icon}</span>
                  <div>
                    <h3 className="par-profile-title">{p.label}</h3>
                    <p className="par-profile-body">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="par-profiles-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Não te vês aqui? Não há problema. Qualquer pessoa que conheça empresas ou profissionais é bem-vinda.
            </div>
          </div>
        </section>

        {/* ── O QUE GANHAS ─────────────────────────────────────────── */}
        <section className="par-benefits-section">
          <div className="par-section-inner">
            <div className="par-benefits-layout">
              <div className="par-benefits-left">
                <span className="par-eyebrow">Vantagens</span>
                <h2 className="par-section-title">Simples, transparente,<br />sem letras pequenas</h2>
                <p className="par-section-sub">
                  Criámos um programa que funciona da forma mais direta possível.
                  Sem pontos, sem tiers, sem burocracia.
                </p>
                <a href="#candidatura" className="par-btn-primary">
                  Candidatar agora →
                </a>
              </div>
              <ul className="par-benefits-list" role="list">
                {[
                  { title: 'Até 10% de comissão', body: 'Por cada projeto fechado com o teu referido, independentemente do serviço.' },
                  { title: 'Sem custos de entrada', body: 'O programa é 100% gratuito. Não pagas nada para participar.' },
                  { title: 'Pagamento garantido', body: 'Pagas só quando o cliente paga — sem risco de crédito para ti.' },
                  { title: 'Sem limite de referências', body: 'Podes referir quantos clientes quiseres. Cada um conta.' },
                  { title: 'Sem burocracia técnica', body: 'Só precisas de nos apresentar. Nós tratamos de todo o processo.' },
                  { title: 'Parceria a longo prazo', body: 'Se o cliente fizer projetos futuros, a parceria continua a aplicar-se.' },
                ].map((b) => (
                  <li key={b.title} className="par-benefit-item">
                    <span className="par-benefit-check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <span className="par-benefit-title">{b.title}</span>
                      <span className="par-benefit-body">{b.body}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="par-faq-section">
          <div className="par-section-inner par-section-inner--narrow">
            <div className="par-section-header">
              <span className="par-eyebrow">Dúvidas frequentes</span>
              <h2 className="par-section-title">Tudo o que precisas saber</h2>
            </div>
            <div className="par-faq-list">
              {FAQS.map((f, i) => (
                <details key={i} className="par-faq-item">
                  <summary className="par-faq-q">
                    {f.q}
                    <span className="par-faq-chevron" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="par-faq-a">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CANDIDATURA FORM ─────────────────────────────────────── */}
        <section className="par-form-section">
          <div className="par-section-inner par-section-inner--narrow">
            <ParceriasForm />
            <div className="par-form-alt">
              <p>Preferes falar diretamente?</p>
              <a
                href="https://wa.me/351930477894?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Programa%20de%20Parceiros%20da%20Element%20Group."
                target="_blank"
                rel="noopener noreferrer"
                className="par-wa-link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                Fala connosco no WhatsApp →
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
