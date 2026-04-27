import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Preços | Websites desde 197€ — Element Group Portugal",
  description:
    "Preços oficiais Element Group: websites desde 197€, lojas online desde 997€, apps mobile desde 1.497€, marketing digital desde 350€/mês. Pagamento único ou 2× sem juros.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Preços | Element Group",
    description:
      "Tabela completa de preços: websites, lojas online, apps mobile, branding e marketing digital para PMEs em Portugal.",
    url: "https://elementgroup.pt/pricing",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

type PricingItem = {
  name: string;
  slug: string;
  price: number;
  priceLabel: string;
  period: "one-time" | "monthly";
  description: string;
  includes: string[];
  delivery: string;
  idealFor: string;
  popular?: boolean;
};

const PRICING: PricingItem[] = [
  {
    name: "Criação de Websites",
    slug: "websites",
    price: 197,
    priceLabel: "desde 197€",
    period: "one-time",
    description:
      "Sites institucionais à medida com PageSpeed 95+. Código 100% original — o teu site é único e mais difícil de copiar.",
    includes: [
      "Design 100% à medida — diferente de qualquer outro site",
      "PageSpeed 95+ no lançamento, ou refazemos sem custo",
      "SEO técnico + schema markup — pronto para Google e respostas de IA (ChatGPT, Perplexity)",
      "Otimizado para telemóvel — onde 70% dos teus visitantes vão chegar",
      "Apoio pós-lançamento (90 dias) incluído — sem mensalidade obrigatória",
    ],
    delivery: "2 a 3 semanas",
    idealFor: "PMEs, profissionais liberais, startups, sites institucionais",
    popular: true,
  },
  {
    name: "Negócios Locais (Site + Google Maps Top 3)",
    slug: "negocios-locais",
    price: 297,
    priceLabel: "desde 297€",
    period: "one-time",
    description:
      "Solução completa para negócios físicos: site + ficha Google Business + SEO local geo-segmentado.",
    includes: [
      "Ficha Google Business otimizada",
      "SEO local geo-segmentado",
      "Sistema de reservas / contactos",
      "Integração WhatsApp",
      "Schema markup LocalBusiness",
    ],
    delivery: "2 a 3 semanas",
    idealFor:
      "Restaurantes, ginásios, clínicas, cabeleireiros, oficinas, comércio local",
  },
  {
    name: "Loja Online (E-commerce)",
    slug: "loja-online",
    price: 997,
    priceLabel: "desde 997€",
    period: "one-time",
    description:
      "Loja completa com pagamentos portugueses, gestão de stock, faturação automática e SEO de produtos.",
    includes: [
      "Checkout MBWay, Multibanco e cartão",
      "Gestão de produtos e stock",
      "Faturação automática portuguesa",
      "SEO de produto e categoria",
      "Painel de gestão simples",
    ],
    delivery: "4 a 6 semanas",
    idealFor: "Retalho, marcas D2C, produtores, artesanato",
  },
  {
    name: "Apps Mobile",
    slug: "apps-mobile",
    price: 1497,
    priceLabel: "desde 1.497€",
    period: "one-time",
    description:
      "Apps nativas iOS/Android e Progressive Web Apps com notificações push e integração com APIs.",
    includes: [
      "App nativa iOS + Android (ou PWA)",
      "Notificações push",
      "Integração com APIs externas",
      "Publicação na App Store / Play Store",
      "Painel de gestão incluído",
    ],
    delivery: "6 a 8 semanas",
    idealFor:
      "Serviços recorrentes, programas de fidelização, apps internas",
  },
  {
    name: "Design Gráfico & Branding",
    slug: "design-branding",
    price: 297,
    priceLabel: "desde 297€",
    period: "one-time",
    description:
      "Logótipo + manual de marca completo. Identidade visual profissional para destacar o teu negócio.",
    includes: [
      "Logótipo + variações",
      "Manual de marca",
      "Templates de posts redes sociais",
      "Ficheiros editáveis incluídos",
    ],
    delivery: "1 a 2 semanas",
    idealFor: "Novos negócios, rebranding, expansão para novos mercados",
  },
  {
    name: "Redesign & Migração",
    slug: "redesign-migracao",
    price: 297,
    priceLabel: "desde 297€",
    period: "one-time",
    description:
      "Migração de plataforma sem perder posições no Google. Redirects 301 cuidados e SEO preservado.",
    includes: [
      "Auditoria SEO inicial",
      "Redirects 301 cuidados",
      "Migração de conteúdo",
      "PageSpeed 95+ pós-migração",
      "Zero downtime garantido",
    ],
    delivery: "2 a 4 semanas",
    idealFor: "Sites antigos em WordPress / Wix / Shopify",
  },
  {
    name: "Marketing Digital",
    slug: "marketing-digital",
    price: 350,
    priceLabel: "desde 350€",
    period: "monthly",
    description:
      "Gestão contínua de Instagram, Facebook, Google Ads e SEO mensal. Relatórios mensais de performance.",
    includes: [
      "Instagram + Facebook geridos",
      "Google Ads otimizados",
      "SEO mensal e relatórios",
      "Conteúdo criativo incluído",
      "Sem fidelização anual",
    ],
    delivery: "Início imediato",
    idealFor:
      "PMEs que querem presença digital contínua sem contratar equipa interna",
  },
];

const PRICING_LD = {
  "@context": "https://schema.org",
  "@graph": PRICING.map((p) => ({
    "@type": "Service",
    "@id": `https://elementgroup.pt/pricing#${p.slug}`,
    name: p.name,
    description: p.description,
    provider: { "@id": "https://elementgroup.pt/#organization" },
    areaServed: { "@type": "Country", name: "Portugal" },
    serviceType: p.name,
    offers: {
      "@type": "Offer",
      price: String(p.price),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `https://elementgroup.pt/pricing#${p.slug}`,
      ...(p.period === "monthly"
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: String(p.price),
              priceCurrency: "EUR",
              unitText: "MONTH",
            },
          }
        : {}),
    },
  })),
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: "https://elementgroup.pt/" },
    { "@type": "ListItem", position: 2, name: "Preços", item: "https://elementgroup.pt/pricing" },
  ],
};

export default function PricingPage() {
  return (
    <div className="sv-page">
      <section className="sv-hero has-atmos">
        <div className="sv-hero-label">Preços</div>
        <h1>
          Preços transparentes,<br />sem <em>letras pequenas.</em>
        </h1>
        <p className="sv-hero-sub">
          Última atualização:{" "}
          <time dateTime="2026-04-27">27 de abril de 2026</time>. Todos os
          valores em EUR sem IVA. Pagamento único com 5% desconto, ou 2×
          prestações sem juros (MBWay, Multibanco, transferência bancária).
        </p>
      </section>

      <div className="sv-grid-wrap">
        <div className="sv-grid">
          {PRICING.map((p) => (
            <article
              key={p.slug}
              id={p.slug}
              className="sv-card"
              data-color={p.popular ? "violet" : "cyan"}
            >
              <div className="sv-card__bar" />
              {p.popular && <span className="sv-card__pop">Popular</span>}
              <h3 className="sv-card__title">{p.name}</h3>
              <div className="sv-card__price">
                <b>{p.priceLabel}</b>
                <small>
                  {p.period === "monthly" ? "por mês" : "pagamento único"}
                </small>
              </div>
              <p className="sv-card__desc">{p.description}</p>
              <ul className="sv-card__list">
                {p.includes.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <p
                style={{
                  margin: "14px 0 4px",
                  fontSize: 12.5,
                  color: "var(--muted-2)",
                }}
              >
                <b style={{ color: "var(--muted)" }}>Prazo:</b> {p.delivery}
              </p>
              <p
                style={{
                  margin: "0 0 16px",
                  fontSize: 12.5,
                  color: "var(--muted-2)",
                }}
              >
                <b style={{ color: "var(--muted)" }}>Ideal para:</b>{" "}
                {p.idealFor}
              </p>
              <a
                href={`https://wa.me/351930477894?text=${encodeURIComponent(
                  `Olá! Tenho interesse no serviço "${p.name}". Podiam enviar um orçamento?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sv-card__cta"
              >
                Pedir orçamento — grátis em 24h
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>

      <section
        style={{
          padding: "0 20px 32px",
          maxWidth: 1080,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 }}>
          Todos os orçamentos são <b>sem compromisso</b> · Resposta em <b>menos de 24h</b> · <b>Sem pré-pagamento</b> até aprovação da proposta
        </p>
      </section>

      <section
        style={{
          padding: "0 20px 80px",
          maxWidth: 1080,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 13, color: "var(--muted-2)" }}>
          Versão machine-readable para AI agents:{" "}
          <a
            href="/pricing.md"
            style={{ color: "var(--muted)", textDecoration: "underline" }}
          >
            /pricing.md
          </a>{" "}
          ·{" "}
          <a
            href="/llms.txt"
            style={{ color: "var(--muted)", textDecoration: "underline" }}
          >
            /llms.txt
          </a>
        </p>
      </section>

      <Script
        id="ld-pricing"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRICING_LD) }}
      />
      <Script
        id="ld-pricing-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }}
      />
    </div>
  );
}
