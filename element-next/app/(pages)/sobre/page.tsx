import type { Metadata } from "next";

export const revalidate = false; // statically generated at build time

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
    "Web Development",
    "Next.js",
    "React",
    "E-commerce",
    "SEO técnico",
    "Schema markup",
    "Performance web (Core Web Vitals)",
    "Marketing digital para PMEs",
    "Branding",
    "UI/UX design",
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
    <div className="sv-page">
      <section className="sv-hero has-atmos">
        <div className="sv-hero-label">Sobre</div>
        <h1>
          Uma agência digital<br />feita para <em>PMEs portuguesas.</em>
        </h1>
        <p className="sv-hero-sub">
          A maioria das PMEs portuguesas paga milhares de euros por sites
          lentos, com templates reciclados que ninguém encontra no Google.
          A Element Group existe para mudar isto: sites à medida com
          PageSpeed 95+, a partir de 197€, entregues em 2 a 3 semanas.
          Fundada e liderada por Ricardo Jorge, sem intermediários.
        </p>
      </section>

      <section
        style={{
          maxWidth: 820,
          margin: "0 auto",
          padding: "0 20px 60px",
          color: "var(--text)",
          lineHeight: 1.75,
          fontSize: 16,
        }}
      >
        <h2
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-.02em",
            marginTop: 32,
          }}
        >
          A nossa missão
        </h2>
        <p>
          Em Portugal, a maioria das PMEs paga entre <b>€2.000 e €5.000</b>{" "}
          por websites com performance medíocre, templates reciclados e
          plugins inseguros. A Element Group existe para mudar isto:{" "}
          <b>
            entregamos sites com PageSpeed 95+ a partir de 197€
          </b>
          , construídos sobre a mesma stack moderna que potencia produtos
          como Netflix, TikTok e GitHub (Next.js, React, Vercel) — o que
          nos permite reduzir drasticamente o tempo de produção sem
          sacrificar qualidade.
        </p>

        <h2
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-.02em",
            marginTop: 40,
          }}
        >
          Quem está por trás
        </h2>
        <p>
          <b>Ricardo Jorge</b> é o fundador e developer principal da
          Element Group. Com formação e experiência prática em
          desenvolvimento web moderno (React, Next.js, TypeScript), SEO
          técnico avançado, schema markup e otimização de Core Web Vitals,
          lidera todos os projetos de início ao fim — não há
          intermediários, account managers ou departamentos a passar o teu
          projeto entre mãos.
        </p>
        <p>
          Esta abordagem direta significa que o que pedes é o que
          entregamos: <b>resposta em horas, não dias</b>; decisões
          técnicas explicadas em português claro, não em jargão; e total
          transparência em prazos e preços.
        </p>

        <h2
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-.02em",
            marginTop: 40,
          }}
        >
          O que nos diferencia
        </h2>
        <ul style={{ paddingLeft: 22 }}>
          <li>
            <b>PageSpeed 95+</b> em todos os projetos, por defeito (não
            como upsell).
          </li>
          <li>
            <b>Código 100% à medida</b>, sem templates WordPress nem
            page builders.
          </li>
          <li>
            <b>SEO técnico + schema markup</b> incluídos, não cobrados à
            parte.
          </li>
          <li>
            <b>Apoio pós-lançamento</b> contínuo dentro do âmbito
            acordado, sem mensalidade obrigatória.
          </li>
          <li>
            <b>Preços transparentes</b> — publicados em{" "}
            <a href="/servicos" style={{ color: "#a78bfa" }}>
              /servicos
            </a>{" "}
            e em formato machine-readable para AI agents em{" "}
            <a href="/pricing.md" style={{ color: "#a78bfa" }}>
              /pricing.md
            </a>
            .
          </li>
          <li>
            <b>Propostas em 24 horas</b> via WhatsApp ou email.
          </li>
        </ul>

        <h2
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-.02em",
            marginTop: 40,
          }}
        >
          A quem servimos
        </h2>
        <p>
          Trabalhamos com <b>PMEs em todo o território português</b>{" "}
          (Continente, Madeira, Açores), remotamente. Os nossos clientes
          incluem produtores artesanais, restaurantes, clínicas, ginásios,
          associações desportivas, lojas D2C, e profissionais liberais —
          qualquer negócio que precise de uma presença digital
          profissional sem o custo de uma agência tradicional.
        </p>

        <h2
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-.02em",
            marginTop: 40,
          }}
        >
          Contacto
        </h2>
        <p>
          <b>WhatsApp:</b>{" "}
          <a
            href="https://wa.me/351930477894"
            style={{ color: "#a78bfa" }}
          >
            +351 930 477 894
          </a>
          <br />
          <b>Email:</b>{" "}
          <a
            href="mailto:info@elementgroup.pt"
            style={{ color: "#a78bfa" }}
          >
            info@elementgroup.pt
          </a>
          <br />
          <b>Localização:</b> Portugal · servimos todo o país remotamente
          <br />
          <b>Horário:</b> Segunda a Sábado, 9h–20h (resposta tipicamente
          em &lt;2 horas)
        </p>

        <p
          style={{
            marginTop: 40,
            fontSize: 13,
            color: "var(--muted-2)",
          }}
        >
          Última atualização:{" "}
          <time dateTime="2026-04-27">27 de abril de 2026</time>
        </p>
      </section>

      <section
        style={{
          maxWidth: 820,
          margin: "0 auto 80px",
          padding: "32px 28px",
          borderRadius: 18,
          border: "1px solid var(--line-2)",
          background:
            "linear-gradient(135deg, rgba(167,139,250,.08), rgba(34,211,238,.05))",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-.02em",
            margin: "0 0 10px",
          }}
        >
          Pronto para começar?
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontSize: 15,
            margin: "0 0 22px",
            lineHeight: 1.6,
          }}
        >
          Resposta em &lt;2h via WhatsApp · Proposta sem compromisso em 24h ·
          Sem pré-pagamento até aprovação
        </p>
        <a
          href="https://wa.me/351930477894?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20um%20or%C3%A7amento."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 22px",
            borderRadius: 999,
            background: "#a78bfa",
            color: "#0b0b13",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: 14.5,
          }}
        >
          Falar com o Ricardo no WhatsApp
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
      </section>

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
