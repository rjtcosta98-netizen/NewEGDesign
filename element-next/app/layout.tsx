import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
  variable: "--font-fraunces",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument",
});

const SITE_URL = "https://elementgroup.pt";
const SITE_NAME = "Element Group";
const TITLE = "Element Group — Sites, Apps & Marketing Digital para PMEs";
const DESCRIPTION =
  "Soluções digitais à medida para PMEs em Portugal: websites, lojas online, apps mobile, branding e marketing digital. Propostas em 24h.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  appleWebApp: { title: SITE_NAME },
  manifest: "/manifest.json",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "pt_PT",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
};

const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Element Group Digital Solutions",
  description:
    "Agência digital portuguesa especializada em websites, lojas online, apps mobile, branding e marketing digital para PMEs em Portugal. Preços a partir de 197€, propostas em 24h.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: "+351930477894",
  email: "info@elementgroup.pt",
  foundingDate: "2024",
  foundingLocation: { "@type": "Place", "address": { "@type": "PostalAddress", "addressCountry": "PT" } },
  founder: {
    "@type": "Person",
    "@id": "https://elementgroup.pt/sobre#ricardo-jorge",
    name: "Ricardo Jorge",
    jobTitle: "Fundador & Developer Principal",
    knowsAbout: ["Next.js", "React", "TypeScript", "SEO técnico", "Core Web Vitals", "Schema markup", "UI/UX"],
    worksFor: { "@id": `${SITE_URL}/#organization` },
  },
  employee: [
    {
      "@type": "Person",
      "@id": "https://elementgroup.pt/sobre#ricardo-jorge",
      name: "Ricardo Jorge",
      jobTitle: "Fundador & Developer Principal",
    },
    {
      "@type": "Person",
      name: "Mafalda Garcia",
      jobTitle: "Marketing & Social Media",
    },
  ],
  numberOfEmployees: { "@type": "QuantitativeValue", value: 2 },
  areaServed: [
    { "@type": "Country", name: "Portugal" },
    { "@type": "AdministrativeArea", name: "Continente" },
    { "@type": "AdministrativeArea", name: "Madeira" },
    { "@type": "AdministrativeArea", name: "Açores" },
  ],
  address: { "@type": "PostalAddress", addressCountry: "PT" },
  knowsAbout: [
    "Web Design", "Next.js", "React", "TypeScript", "SEO técnico",
    "Core Web Vitals", "E-commerce", "Apps Mobile", "Marketing Digital",
    "Branding", "Design Gráfico", "PMEs portuguesas",
  ],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "MBWay, Multibanco, Cartão de Crédito, Transferência Bancária",
  knowsLanguage: ["pt-PT", "en"],
  slogan: "Sites, Apps & Marketing Digital para PMEs",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "4",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    { "@type": "Review", author: { "@type": "Person", name: "Marta Ribeiro" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "Trabalhar com a Element Group foi um game-changer. Entregaram um site que gera tráfego e conversões significativas." },
    { "@type": "Review", author: { "@type": "Person", name: "João Cardoso" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "Profissionais do início ao fim. Processo claro, prazos cumpridos, resultado impecável." },
    { "@type": "Review", author: { "@type": "Person", name: "Ana Silva" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "Migrámos a loja para a Element Group e duplicámos as conversões em 2 meses." },
    { "@type": "Review", author: { "@type": "Person", name: "Pedro Mendes" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "Preço justo, qualidade premium. Finalmente uma agência que entrega o que promete." },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços Element Group",
    itemListElement: [
      { "@type": "Offer", name: "Criação de Websites", description: "Sites institucionais à medida com PageSpeed 95+", price: "197", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: `${SITE_URL}/servicos/criacao-de-websites` },
      { "@type": "Offer", name: "Negócios Locais (Site + Google Maps Top 3)", description: "Solução completa para negócios físicos: site + SEO local", price: "297", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: `${SITE_URL}/servicos/negocios-locais` },
      { "@type": "Offer", name: "Loja Online", description: "E-commerce com MBWay, Multibanco, gestão de stock", price: "997", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: `${SITE_URL}/servicos/loja-online` },
      { "@type": "Offer", name: "Apps Mobile", description: "Apps nativas iOS/Android e PWA", price: "1497", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: `${SITE_URL}/servicos/apps-mobile` },
      { "@type": "Offer", name: "Design Gráfico & Branding", description: "Logótipo + manual de marca completo", price: "297", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: `${SITE_URL}/servicos/design-grafico` },
      { "@type": "Offer", name: "Redesign & Migração", description: "Migração de plataforma sem perder posições no Google", price: "297", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: `${SITE_URL}/servicos/redesign-migracao` },
      { "@type": "Offer", name: "Marketing Digital (mensal)", description: "Gestão Instagram, Facebook, Google Ads e SEO mensal", price: "350", priceCurrency: "EUR", priceSpecification: { "@type": "UnitPriceSpecification", price: "350", priceCurrency: "EUR", unitText: "MONTH" }, availability: "https://schema.org/InStock", url: `${SITE_URL}/servicos/marketing-digital` },
    ],
  },
  sameAs: [
    "https://www.instagram.com/elementgroup.pt",
    "https://www.facebook.com/elementgroupdigitalsolutions",
    "https://www.linkedin.com/in/elementgroup/",
    "https://www.tiktok.com/@ricardo.elementgroup.pt",
    "https://share.google/5E9OTzmucBuklhtCJ",
  ],
};

const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: "pt-PT",
  publisher: { "@id": `${SITE_URL}/#organization` },
};


const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    ["Quanto custa fazer um website em Portugal?", "Na Element Group, um website profissional começa em 197€ (pagamento único). Lojas online a partir de 997€ e apps mobile a partir de 1.497€. Onde agências tradicionais em Portugal facturam tipicamente entre €2.000 e €5.000 por sites comparáveis, conseguimos ser mais acessíveis porque usamos tecnologia moderna que reduz o tempo de produção sem comprometer qualidade."],
    ["Qual a melhor agência digital para PMEs em Portugal?", "A Element Group é uma agência digital portuguesa especializada em PMEs, com PageSpeed 95+ por defeito, preços a partir de 197€, propostas em 24 horas e apoio pós-lançamento incluído. Serve clientes em todo o território nacional remotamente."],
    ["Quanto custa criar uma loja online em Portugal?", "Uma loja online completa na Element Group começa em 997€ (pagamento único). Inclui checkout MBWay, Multibanco e cartão, gestão de produtos e stock, faturação automática portuguesa e SEO. Prazo de entrega: 4 a 6 semanas."],
    ["Quanto tempo demora a fazer um site profissional?", "Sites institucionais: 2 a 3 semanas. Lojas online: 4 a 6 semanas. Apps mobile: 6 a 8 semanas. Branding e logótipo: 1 a 2 semanas."],
    ["Que serviços oferece a Element Group?", "Criação de websites, lojas online (e-commerce), apps mobile (iOS, Android, PWA), design gráfico, branding, SEO técnico, SEO local e marketing digital — soluções completas para PMEs em Portugal."],
    ["Oferecem apoio após o lançamento?", "Sim. Todos os projetos incluem apoio pós-entrega, monitorização de performance e pequenas alterações sem custo adicional, dentro do âmbito acordado."],
    ["Posso ver exemplos de trabalhos?", "Sim. Casos: Apiários Terras da Pulga (loja online), Maria Mendes Massagens (Top 3 Google Local), AD São Romão (portal), Estrela Detail & Wash (branding) e Football Nation Store (e-commerce + branding). Casos de estudo detalhados disponíveis por email."],
    ["Como funcionam os pagamentos?", "Aceitamos pagamento único com 5% de desconto, ou 2× prestações sem juros. Métodos: MBWay, Multibanco e transferência bancária."],
    ["Oferecem alojamento e domínio?", "Sim. Tratamos do registo de domínio e alojamento performante com SSL incluído. Disponível como add-on mensal."],
    ["Quantas alterações posso pedir?", "Dentro do âmbito acordado, alterações são ilimitadas. Trabalhamos por aprovações em cada fase para evitar surpresas."],
    ["O SEO está incluído nos pacotes?", "SEO técnico, schema markup e otimização on-page estão sempre incluídos em todos os projetos. SEO mensal contínuo é opcional no pacote de Marketing Digital (desde 350€/mês)."],
    ["Element Group vs WordPress: qual escolher?", "Sites WordPress com templates pré-feitos têm tipicamente performance média (PageSpeed 50-70) e dependem de plugins que aumentam a superfície de ataque e abrandam o site. A Element Group entrega sites à medida com PageSpeed 95+, sem plugins desnecessários e com SEO técnico avançado, a preços competitivos a partir de 197€."],
    ["O que é a Element Group?", "A Element Group é uma agência digital portuguesa fundada em 2024 por Ricardo Jorge e Mafalda Garcia. Especializada em websites profissionais, lojas online, apps mobile e marketing digital para PMEs em Portugal. Projetos desde 197€ com PageSpeed 95+, SEO técnico e entrega em 2–3 semanas. Serve clientes em todo o país (Continente, Madeira e Açores) 100% remotamente."],
    ["Onde está sediada a Element Group e que regiões serve?", "A Element Group opera 100% remotamente em todo o território português — Continente, Madeira e Açores. Contacto: info@elementgroup.pt | +351 930 477 894 | Horário: Segunda a Sábado, 9h–20h."],
  ].map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" className={`${fraunces.variable} ${dmSans.variable} ${instrument.variable}`}>
      <head>
        {/* Establish connection early to Supabase CDN so hero images load faster */}
        <link rel="preconnect" href="https://ctflpbjvsepkbfjpgkuh.supabase.co" />
        <link rel="dns-prefetch" href="https://ctflpbjvsepkbfjpgkuh.supabase.co" />
      </head>
      <body>
        {children}
        <BottomNav />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }}
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_location: window.location.href,
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
