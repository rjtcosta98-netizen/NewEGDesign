import type { Metadata } from "next";
import Link from "next/link";
import "./sobre.css";

export const revalidate = false;

export const metadata: Metadata = {
  title: "Sobre a Element Group — Agência Digital em Portugal",
  description:
    "Conhece a Element Group: a agência digital portuguesa que entrega sites à medida com PageSpeed 95+, a partir de 197€, sem intermediários. Fundada por Ricardo Jorge.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "Sobre a Element Group",
    description:
      "Agência digital independente em Portugal. Tecnologia moderna, preços transparentes desde 197€, propostas em 24h.",
    url: "https://elementgroup.pt/sobre",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://elementgroup.pt/sobre#ricardo-jorge",
  name: "Ricardo Jorge",
  jobTitle: "Fundador & Developer Principal",
  worksFor: { "@id": "https://elementgroup.pt/#organization" },
  url: "https://elementgroup.pt/sobre",
  nationality: { "@type": "Country", name: "Portugal" },
  knowsAbout: [
    "Web Development", "Next.js", "React", "E-commerce",
    "SEO técnico", "Schema markup", "Core Web Vitals",
    "Marketing digital para PMEs", "Branding", "UI/UX design",
  ],
  knowsLanguage: ["pt-PT", "en"],
  sameAs: [
    "https://www.linkedin.com/in/elementgroup/",
    "https://www.instagram.com/elementgroup.pt",
    "https://www.tiktok.com/@ricardo.elementgroup.pt",
  ],
};

const ABOUT_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: "https://elementgroup.pt/sobre",
  name: "Sobre a Element Group",
  inLanguage: "pt-PT",
  about: { "@id": "https://elementgroup.pt/#organization" },
  mainEntity: { "@id": "https://elementgroup.pt/sobre#ricardo-jorge" },
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: "https://elementgroup.pt/" },
    { "@type": "ListItem", position: 2, name: "Sobre", item: "https://elementgroup.pt/sobre" },
  ],
};

const DIFFERENTIATORS = [
  {
    accent: "default",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "PageSpeed 95+ por defeito",
    desc: "Não é um extra. Todos os projetos são entregues com performance de topo — incluída no preço base.",
  },
  {
    accent: "cyan",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Código 100% à medida",
    desc: "Sem WordPress, sem templates reciclados, sem page builders. O teu site é único e construído de raiz.",
  },
  {
    accent: "green",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    title: "SEO técnico incluído",
    desc: "Schema markup, Core Web Vitals e otimização on-page fazem parte de todos os projetos — não são cobrados à parte.",
  },
  {
    accent: "blue",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Sem intermediários",
    desc: "Falas diretamente com o developer. O que pedes é o que entregamos — sem account managers nem departamentos.",
  },
  {
    accent: "orange",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Proposta em 24 horas",
    desc: "Recebes um orçamento detalhado e sem compromisso no próprio dia — sem reuniões de descoberta obrigatórias.",
  },
  {
    accent: "pink",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Apoio pós-lançamento",
    desc: "Acompanhamento contínuo após a entrega, dentro do âmbito acordado, sem mensalidade obrigatória.",
  },
];

const CLIENT_TYPES = [
  "Restaurantes & Cafés",
  "Clínicas & Saúde",
  "Ginásios & Fitness",
  "Lojas D2C",
  "Profissionais Liberais",
  "Associações",
  "Produtores Artesanais",
  "Hotéis & Alojamento",
  "Serviços Locais",
  "E-commerce",
];

export default function SobrePage() {
  return (
    <div className="sb-page">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="sb-hero">
        <div className="section-atmos" aria-hidden="true">
          <div className="rings"><span/><span/><span/><span/></div>
          <div className="section-sparkles">
            <span style={{left:'12%',top:'110px',animationDelay:'.5s'}}/>
            <span style={{left:'78%',top:'80px',animationDelay:'2.1s'}}/>
            <span style={{left:'91%',top:'200px',animationDelay:'1.1s'}}/>
          </div>
        </div>
        <div className="sb-hero__label">Sobre nós</div>
        <h1 className="sb-hero__h1">
          Websites à medida,<br />sem intermediários,<br />para <em>PMEs portuguesas.</em>
        </h1>
        <p className="sb-hero__sub">
          A maioria das agências em Portugal cobra €2.000–€5.000 por templates reciclados
          que ninguém encontra no Google. A Element Group existe para mudar isso: sites
          construídos de raiz com PageSpeed 95+, a partir de 197€, entregues em 2–3 semanas.
        </p>
        <div className="sb-hero__ctas">
          <a
            href="https://wa.me/351930477894?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20um%20or%C3%A7amento."
            target="_blank"
            rel="noopener noreferrer"
            className="sb-btn-primary"
          >
            Pedir orçamento gratuito
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <Link href="/servicos" className="sb-btn-secondary">
            Ver serviços e preços
          </Link>
        </div>

        <div className="sb-stats">
          <div className="sb-stat">
            <div className="sb-stat__val">95+</div>
            <div className="sb-stat__label">PageSpeed Score</div>
          </div>
          <div className="sb-stat">
            <div className="sb-stat__val">24h</div>
            <div className="sb-stat__label">Proposta enviada</div>
          </div>
          <div className="sb-stat">
            <div className="sb-stat__val">197€</div>
            <div className="sb-stat__label">Desde</div>
          </div>
          <div className="sb-stat">
            <div className="sb-stat__val">5★</div>
            <div className="sb-stat__label">Avaliação Google</div>
          </div>
        </div>
      </section>

      {/* ── Missão ───────────────────────────────────────────── */}
      <div className="sb-container">
        <section className="sb-section sb-section--first">
          <div className="sb-two-col">
            <div>
              <p className="sb-section-eyebrow">A nossa missão</p>
              <h2 className="sb-section-h2">
                PMEs portuguesas merecem<br /><em>tecnologia de topo.</em>
              </h2>
              <p className="sb-section-body">
                Em Portugal, um site profissional com WordPress e um template pré-feito
                chega a custar <b>€3.000–€5.000</b> — e ainda fica lento, cheio de plugins
                e difícil de encontrar no Google.
              </p>
              <p className="sb-section-body">
                A Element Group usa a mesma stack moderna que potencia a Netflix, o TikTok
                e o GitHub — <b>Next.js, React e Vercel</b> — para entregar sites mais
                rápidos, mais seguros e melhor posicionados, a uma fração do custo
                tradicional. Sem compromissos, sem letra pequena.
              </p>
            </div>
            <div className="sb-quote-block">
              <p className="sb-quote-text">
                "O objetivo não é ser a agência mais barata. É ser a que entrega mais
                valor por cada euro investido — com transparência total, do primeiro
                contacto à entrega final."
              </p>
              <p className="sb-quote-author">
                — <span>Ricardo Jorge</span>, Fundador da Element Group
              </p>
            </div>
          </div>
        </section>

        {/* ── Fundador ──────────────────────────────────────────── */}
        <section className="sb-section">
          <div className="sb-two-col sb-two-col--flipped">
            <div>
              <p className="sb-section-eyebrow">Quem está por trás</p>
              <h2 className="sb-section-h2">
                Uma pessoa.<br /><em>Responsabilidade total.</em>
              </h2>
              <p className="sb-section-body">
                A Element Group não tem account managers, departamentos nem reuniões de
                apresentação inúteis. Quando falas connosco, falas diretamente com
                <b> Ricardo Jorge</b> — o developer que vai construir o teu projeto.
              </p>
              <p className="sb-section-body">
                Isso significa <b>resposta em horas</b>, decisões técnicas explicadas em
                português claro, e total transparência em prazos e preços. O que está
                no contrato é o que entregamos — sem surpresas.
              </p>
            </div>
            <div className="sb-two-col-media">
              <div className="sb-founder-card">
                <div className="sb-founder-avatar">R</div>
                <div className="sb-founder-name">Ricardo Jorge</div>
                <div className="sb-founder-role">Fundador &amp; Developer Principal</div>
                <p className="sb-founder-bio">
                  Especializado em <b>Next.js, React e TypeScript</b>, com foco em
                  SEO técnico avançado, schema markup e otimização de Core Web Vitals.
                  Lidera todos os projetos do início ao fim — sem intermediários.
                </p>
                <div className="sb-founder-skills">
                  {["Next.js", "React", "TypeScript", "SEO técnico", "Core Web Vitals", "Schema markup", "UI/UX"].map((s) => (
                    <span key={s} className="sb-skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Diferenciais ──────────────────────────────────────── */}
        <section className="sb-section">
          <p className="sb-section-eyebrow">O que nos diferencia</p>
          <h2 className="sb-section-h2" style={{ marginBottom: 32 }}>
            Não é marketing. É a <em>forma como trabalhamos.</em>
          </h2>
          <div className="sb-diff-grid">
            {DIFFERENTIATORS.map((d) => (
              <div key={d.title} className="sb-diff-card" data-accent={d.accent}>
                <div className="sb-diff-icon">{d.icon}</div>
                <div className="sb-diff-title">{d.title}</div>
                <div className="sb-diff-desc">{d.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Clientes ──────────────────────────────────────────── */}
        <section className="sb-section">
          <p className="sb-section-eyebrow">A quem servimos</p>
          <h2 className="sb-section-h2">
            PMEs em todo o <em>território nacional.</em>
          </h2>
          <p className="sb-clients-intro">
            Trabalhamos 100% remotamente com negócios em todo o país —
            <b> Continente, Madeira e Açores</b>. Os nossos clientes são pequenas e médias
            empresas que precisam de uma presença digital profissional sem o custo de uma
            agência tradicional.
          </p>
          <div className="sb-client-types">
            {CLIENT_TYPES.map((type) => (
              <div key={type} className="sb-client-type">
                <span className="sb-client-type-dot" />
                {type}
              </div>
            ))}
          </div>
        </section>

        {/* ── Contacto ──────────────────────────────────────────── */}
        <section className="sb-section">
          <p className="sb-section-eyebrow">Contacto</p>
          <h2 className="sb-section-h2">
            Fala connosco <em>hoje.</em>
          </h2>
          <p className="sb-section-body">
            Resposta típica em menos de 2 horas. WhatsApp, email ou formulário — escolhe
            o que for mais cómodo para ti.
          </p>
          <div className="sb-contact-grid">
            <a
              href="https://wa.me/351930477894"
              target="_blank"
              rel="noopener noreferrer"
              className="sb-contact-item"
            >
              <div className="sb-contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <div>
                <div className="sb-contact-label">WhatsApp</div>
                <div className="sb-contact-value">+351 930 477 894</div>
              </div>
            </a>
            <a
              href="mailto:info@elementgroup.pt"
              className="sb-contact-item"
            >
              <div className="sb-contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="sb-contact-label">Email</div>
                <div className="sb-contact-value">info@elementgroup.pt</div>
              </div>
            </a>
            <div className="sb-contact-item" style={{ cursor: "default" }}>
              <div className="sb-contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                </svg>
              </div>
              <div>
                <div className="sb-contact-label">Localização</div>
                <div className="sb-contact-value">Portugal · todo o país</div>
              </div>
            </div>
            <div className="sb-contact-item" style={{ cursor: "default" }}>
              <div className="sb-contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <div className="sb-contact-label">Horário</div>
                <div className="sb-contact-value">Seg–Sáb · 9h–20h</div>
              </div>
            </div>
          </div>

          <p className="sb-updated">
            Última atualização: <time dateTime="2026-04-29">29 de abril de 2026</time>
          </p>
        </section>
      </div>

      {/* ── CTA banner ───────────────────────────────────────── */}
      <div className="sb-container">
        <div className="sb-cta">
          <h2 className="sb-cta__h2">Pronto para começar?</h2>
          <p className="sb-cta__sub">
            Orçamento gratuito em 24h · Sem pré-pagamento até aprovação ·
            Resposta em &lt;2h via WhatsApp
          </p>
          <div className="sb-cta__actions">
            <a
              href="https://wa.me/351930477894?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              className="sb-btn-primary"
            >
              Falar com o Ricardo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <Link href="/contacto" className="sb-btn-secondary">
              Formulário de contacto
            </Link>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }}
      />
    </div>
  );
}
