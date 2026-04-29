import type { Metadata } from "next";
import "./sobre.css";

export const revalidate = false;

export const metadata: Metadata = {
  title: "Sobre a Element Group — Agência Digital Portugal",
  description:
    "Conhece a Element Group, agência digital portuguesa. Especialistas em websites, lojas online, apps e marketing digital para PMEs portuguesas.",
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
    "Web Development","Next.js","React","E-commerce","SEO técnico",
    "Schema markup","Performance web (Core Web Vitals)","Marketing digital para PMEs","Branding","UI/UX design",
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

export default function SobrePage() {
  return (
    <div className="sob-page">

      {/* ── HERO ── */}
      <section className="sob-hero has-atmos">
        <div className="section-atmos" aria-hidden="true">
          <div className="rings"><span /></div>
          <div className="section-sparkles">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} style={{ top: `${10 + i * 8}%`, left: `${5 + i * 9}%`, animationDelay: `${i * 0.4}s` }} />
            ))}
          </div>
        </div>

        <div className="sob-hero-label">
          <span />
          Sobre nós
        </div>
        <h1>
          Uma agência digital<br />feita para <em>PMEs portuguesas.</em>
        </h1>
        <p className="sob-hero-sub">
          A maioria das PMEs portuguesas paga milhares por sites lentos, templates reciclados
          e plugins inseguros. A Element Group existe para mudar isso: websites à medida com
          PageSpeed 95+, a partir de 197€, entregues em 2 a 3 semanas.
        </p>
        <div className="sob-hero-actions">
          <a href="/contacto" className="btn-primary">
            Pedir orçamento grátis
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <a href="/portfolio" className="btn-ghost">Ver portfolio</a>
        </div>

        <div className="sob-stats-bar">
          <div className="sob-stat">
            <span className="sob-stat-num">95+</span>
            <span className="sob-stat-label">PageSpeed Score</span>
          </div>
          <div className="sob-stat">
            <span className="sob-stat-num">197€</span>
            <span className="sob-stat-label">A partir de</span>
          </div>
          <div className="sob-stat">
            <span className="sob-stat-num">2–3 sem</span>
            <span className="sob-stat-label">Tempo de entrega</span>
          </div>
          <div className="sob-stat">
            <span className="sob-stat-num">&lt;2h</span>
            <span className="sob-stat-label">Resposta WhatsApp</span>
          </div>
        </div>
      </section>

      {/* ── MISSÃO ── */}
      <section className="sob-section">
        <div className="sob-section-head">
          <div className="sob-section-label">A nossa missão</div>
          <h2 className="sob-section-title">
            Tecnologia de topo <em>acessível</em> a todos
          </h2>
          <p className="sob-section-sub">
            Construímos sobre a mesma stack que potencia Netflix, TikTok e GitHub — a preços que fazem sentido para PMEs.
          </p>
        </div>

        <div className="sob-mission-grid">
          <div className="sob-mission-main reveal">
            <div className="sob-mission-eyebrow">Por que existimos</div>
            <h3 className="sob-mission-title">
              Sites à medida com <em>performance real</em>, sem o custo de uma agência tradicional.
            </h3>
            <p className="sob-mission-body">
              Em Portugal, a maioria das PMEs paga entre <b>€2.000 e €5.000</b> por websites
              com performance medíocre, templates reciclados e plugins inseguros.
              A Element Group existe para mudar isto: entregamos sites com <b>PageSpeed 95+
              a partir de 197€</b>, construídos sobre Next.js, React e Cloudflare — a mesma
              stack moderna de empresas como Netflix, TikTok e GitHub.
            </p>
            <ul className="sob-mission-list">
              {[
                "Código 100% à medida, sem templates WordPress",
                "SEO técnico + schema markup incluídos, não cobrados à parte",
                "Apoio pós-lançamento contínuo sem mensalidade obrigatória",
                "Propostas em 24 horas via WhatsApp ou email",
                "Preços transparentes publicados em /servicos",
              ].map((item) => (
                <li key={item}>
                  <span className="sob-mission-check">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="sob-info-card reveal">
            <div className="sob-info-card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>O que nos diferencia</h3>
            <p>
              <b>PageSpeed 95+</b> em todos os projetos, por defeito (não como upsell).
              Cada site é construído de raiz com otimização de Core Web Vitals desde o primeiro commit.
            </p>
          </div>

          <div className="sob-info-card reveal">
            <div className="sob-info-card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
              </svg>
            </div>
            <h3>A quem servimos</h3>
            <p>
              <b>PMEs em todo o território português</b> (Continente, Madeira, Açores), remotamente.
              Produtores artesanais, restaurantes, clínicas, ginásios, lojas D2C e profissionais liberais.
            </p>
          </div>
        </div>
      </section>

      {/* ── EQUIPA ── */}
      <section className="sob-section" style={{ paddingTop: 0 }}>
        <div className="sob-section-head">
          <div className="sob-section-label">A equipa</div>
          <h2 className="sob-section-title">
            Quem está <em>por trás</em>
          </h2>
        </div>

        <div className="sob-team-card reveal">
          <div className="sob-team-avatar">R</div>
          <div className="sob-team-info">
            <div className="sob-team-role">Fundador & Developer Principal</div>
            <h3 className="sob-team-name">Ricardo Jorge</h3>
            <p className="sob-team-bio">
              Com formação e experiência prática em <b>desenvolvimento web moderno</b> (React, Next.js,
              TypeScript), SEO técnico avançado, schema markup e otimização de Core Web Vitals, lidera
              todos os projetos de início ao fim — sem intermediários, sem account managers, sem
              departamentos a passar o teu projeto entre mãos.
              <br /><br />
              Esta abordagem direta significa <b>resposta em horas, não dias</b>; decisões técnicas
              explicadas em português claro; e total transparência em prazos e preços.
            </p>
            <div className="sob-team-links">
              <a href="https://www.linkedin.com/in/elementgroup/" target="_blank" rel="noopener noreferrer" className="sob-team-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
              </a>
              <a href="https://www.instagram.com/elementgroup.pt" target="_blank" rel="noopener noreferrer" className="sob-team-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                Instagram
              </a>
              <a href="https://wa.me/351930477894" target="_blank" rel="noopener noreferrer" className="sob-team-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS ── */}
      <section className="sob-section" style={{ paddingTop: 0 }}>
        <div className="sob-section-head">
          <div className="sob-section-label">Diferenciais</div>
          <h2 className="sob-section-title">
            Por que a Element Group <em>é diferente</em>
          </h2>
          <p className="sob-section-sub">
            Não somos uma agência tradicional com processos lentos e margens inflacionadas.
          </p>
        </div>

        <div className="sob-diff-grid">
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              ),
              title: "PageSpeed 95+ por defeito",
              desc: "Otimização de Core Web Vitals em todos os projetos, como padrão — não como upsell pago.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
              ),
              title: "Código 100% à medida",
              desc: "Nada de templates WordPress, page builders, ou plugins inseguros. Stack moderna, limpa e rápida.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              ),
              title: "SEO técnico incluído",
              desc: "Schema markup, sitemap dinâmico, metadata otimizada e Open Graph — tudo incluído, sem custo extra.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              ),
              title: "Sem intermediários",
              desc: "O Ricardo lida diretamente contigo em todos os projetos. Nada passa por account managers ou departamentos.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
              ),
              title: "Preços transparentes",
              desc: "Publicamos os preços em /servicos e em /pricing.md (machine-readable para AI agents). Sem surpresas.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              ),
              title: "Resposta em &lt;2 horas",
              desc: "Segunda a Sábado, 9h–20h. Proposta sem compromisso em 24h. Sem pré-pagamento até aprovação.",
            },
          ].map((card) => (
            <div key={card.title} className="sob-diff-card reveal">
              <div className="sob-diff-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: card.desc }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section className="sob-contact-strip">
        <div className="sob-section-head" style={{ marginBottom: 36 }}>
          <div className="sob-section-label">Contacto</div>
          <h2 className="sob-section-title">Fala <em>connosco</em></h2>
        </div>
        <div className="sob-contact-grid">
          <a href="https://wa.me/351930477894?text=Olá!%20Gostaria%20de%20pedir%20um%20orçamento." target="_blank" rel="noopener noreferrer" className="sob-contact-item reveal">
            <div className="sob-contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </div>
            <div className="sob-contact-label">WhatsApp</div>
            <div className="sob-contact-val">+351 930 477 894</div>
          </a>
          <a href="mailto:info@elementgroup.pt" className="sob-contact-item reveal">
            <div className="sob-contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div className="sob-contact-label">Email</div>
            <div className="sob-contact-val">info@elementgroup.pt</div>
          </a>
          <div className="sob-contact-item">
            <div className="sob-contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
              </svg>
            </div>
            <div className="sob-contact-label">Localização</div>
            <div className="sob-contact-val">Portugal<br /><small>Servimos todo o país remotamente</small></div>
          </div>
          <div className="sob-contact-item">
            <div className="sob-contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div className="sob-contact-label">Horário</div>
            <div className="sob-contact-val">Seg–Sáb, 9h–20h<br /><small>Resposta típica em &lt;2 horas</small></div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="sob-cta-wrap">
        <div className="sob-cta-box reveal">
          <div className="sob-cta-badge">
            <span />
            Pronto para começar?
          </div>
          <h2>Transforma o teu negócio <em>online</em></h2>
          <p>
            Resposta em &lt;2h via WhatsApp · Proposta sem compromisso em 24h ·
            Sem pré-pagamento até aprovação
          </p>
          <div className="sob-cta-actions">
            <a href="https://wa.me/351930477894?text=Olá!%20Gostaria%20de%20pedir%20um%20orçamento." target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "15px 28px", fontSize: 15 }}>
              Falar com o Ricardo no WhatsApp
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a href="/contacto" className="btn-ghost">
              Formulário de contacto
            </a>
            <div className="sob-cta-trust">
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                PageSpeed 95+
              </span>
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Sem pré-pagamento
              </span>
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Entrega em 2–3 semanas
              </span>
            </div>
          </div>
        </div>
      </div>

      <p style={{ textAlign: "center", padding: "0 20px 40px", fontSize: 12, color: "var(--muted-2)" }}>
        Última atualização: <time dateTime="2026-04-27">27 de abril de 2026</time>
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
    </div>
  );
}
