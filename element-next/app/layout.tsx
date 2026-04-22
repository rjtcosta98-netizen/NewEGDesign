import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
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
  name: SITE_NAME,
  description: DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  areaServed: { "@type": "Country", name: "Portugal" },
  address: { "@type": "PostalAddress", addressCountry: "PT" },
  priceRange: "€€",
  sameAs: [
    "https://www.instagram.com/elementgroup.pt",
    "https://www.facebook.com/elementgroupdigitalsolutions",
    "https://www.linkedin.com/in/elementgroup/",
    "https://www.tiktok.com/@ricardo.elementgroup.pt",
    "https://share.google/5E9OTzmucBuklhtCJ",
  ],
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    ["Que serviços oferece a Element Group?", "Criação de websites, lojas online, apps mobile, design gráfico, branding, SEO e marketing digital — soluções completas para PMEs em Portugal."],
    ["Quanto tempo demora um projeto?", "Sites institucionais entre 2 a 3 semanas. Lojas online e apps entre 4 a 8 semanas, dependendo da complexidade."],
    ["Oferecem apoio após o lançamento?", "Sim. Todos os projetos incluem apoio pós-entrega, monitorização de performance e pequenas alterações sem custo adicional."],
    ["Posso ver exemplos de trabalhos?", "Claro. Tens exemplos no portfólio em cima e podemos enviar-te casos de estudo detalhados por email."],
    ["Como funcionam os pagamentos?", "Aceitamos pagamento único com 5% de desconto, ou 2× prestações sem juros. MBWay, Multibanco e transferência bancária."],
    ["Oferecem alojamento e domínio?", "Sim. Tratamos do registo de domínio e alojamento performante com SSL incluído. Disponível como add-on mensal."],
    ["Quantas alterações posso pedir?", "Dentro do âmbito acordado, alterações são ilimitadas. Trabalhamos por aprovações em cada fase para evitar surpresas."],
    ["O SEO está incluído nos pacotes?", "SEO técnico, schema markup e otimização on-page estão sempre incluídos. SEO mensal é opcional no pacote de Marketing Digital."],
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
    <html lang="pt-PT" className={`${jakarta.variable} ${instrument.variable}`}>
      <body>
        {children}
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }}
        />
        <Script
          id="ld-faq"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }}
        />
      </body>
    </html>
  );
}
