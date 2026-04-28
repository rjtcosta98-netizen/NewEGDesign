import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getBlogPosts, formatDate } from "@/lib/blog";

export const revalidate = 3600; // ISR: refresh every hour

const SITE_URL = "https://elementgroup.pt";

export const metadata: Metadata = {
  title: "Blog | Dicas de Marketing Digital, Websites e Apps | Element Group",
  description:
    "Artigos práticos sobre websites, apps no-code e marketing digital para PMEs portuguesas. Aprende a crescer o teu negócio online com a Element Group.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog Element Group — Marketing Digital e Websites para PMEs",
    description:
      "Artigos práticos sobre websites, apps no-code e marketing digital para PMEs portuguesas.",
    url: `${SITE_URL}/blog`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const BLOG_LD = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog`,
  url: `${SITE_URL}/blog`,
  name: "Blog Element Group",
  description:
    "Artigos sobre websites, apps no-code e marketing digital para PMEs portuguesas.",
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Element Group",
    url: SITE_URL,
  },
  inLanguage: "pt-PT",
};

const CATEGORY_COLORS: Record<string, string> = {
  Websites: "var(--blue)",
  "No-Code": "var(--violet-2)",
  "Social Media": "var(--cyan)",
  Geral: "var(--muted)",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Script
        id="blog-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOG_LD) }}
      />

      <section className="blog-hero">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Blog</span>
            <h1 className="section-title">
              Dicas para fazer o teu negócio{" "}
              <em>crescer online</em>
            </h1>
            <p className="section-sub">
              Artigos práticos sobre websites, apps no-code e marketing digital
              escritos pela equipa da Element Group.
            </p>
          </div>
        </div>
      </section>

      <section className="blog-list-section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="blog-empty">
              <p>Novos artigos em breve. Segue-nos no Instagram para ser o primeiro a saber.</p>
              <a
                href="https://www.instagram.com/elementgroup.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Seguir no Instagram
              </a>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((post) => (
                <article key={post.id} className="blog-card">
                  {post.cover_image && (
                    <Link href={`/blog/${post.slug}`} className="blog-card-img-wrap">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="blog-card-img"
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>
                  )}
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span
                        className="blog-card-cat"
                        style={{
                          color: CATEGORY_COLORS[post.category] ?? "var(--muted)",
                        }}
                      >
                        {post.category}
                      </span>
                      <span className="blog-card-sep">·</span>
                      <span className="blog-card-time">
                        {post.reading_time_min} min de leitura
                      </span>
                    </div>

                    <h2 className="blog-card-title">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="blog-card-excerpt">{post.excerpt}</p>

                    <div className="blog-card-footer">
                      {post.published_at && (
                        <time
                          dateTime={post.published_at}
                          className="blog-card-date"
                        >
                          {formatDate(post.published_at)}
                        </time>
                      )}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="blog-card-read"
                        aria-label={`Ler artigo: ${post.title}`}
                      >
                        Ler artigo →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="blog-cta-section">
        <div className="container">
          <div className="blog-cta-inner">
            <div>
              <h2 className="blog-cta-title">
                Pronto para fazer o teu negócio crescer online?
              </h2>
              <p className="blog-cta-sub">
                Fala connosco. Análise gratuita da tua presença digital e proposta em 24 horas.
              </p>
            </div>
            <Link href="/servicos" className="btn-primary">
              Ver Serviços
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
