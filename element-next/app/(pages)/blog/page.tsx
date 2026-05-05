import './blog.css';
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from 'react';
import { getBlogPosts, formatDate } from "@/lib/blog";

export const revalidate = 3600; // ISR: refresh every hour

const SITE_URL = "https://elementgroup.pt";

export const metadata: Metadata = {
  title: "Blog de Marketing Digital e Websites | Element Group",
  description:
    "Guias práticos sobre criação de websites, SEO local, lojas online e marketing digital para PMEs portuguesas, escritos pela equipa Element Group desde 2024.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog Element Group — Marketing Digital e Websites para PMEs",
    description:
      "Guias sobre websites, SEO local, e-commerce e marketing digital para PMEs em Portugal. Escritos pela equipa Element Group.",
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
    "Artigos sobre websites, apps mobile e marketing digital para PMEs portuguesas.",
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

const BLOG_SPARKLES = [
  { left: '18%', top: '90px',  animationDelay: '.4s'  },
  { left: '72%', top: '70px',  animationDelay: '1.9s' },
  { left: '85%', top: '160px', animationDelay: '.9s'  },
] as const;

async function BlogPostsList() {
  const posts = await getBlogPosts();
  return (
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
                      width={1200}
                      height={675}
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
                      aria-label={`Ler artigo → ${post.title}`}
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
  );
}

function BlogPostsSkeleton() {
  return (
    <section className="blog-list-section" aria-busy="true">
      <div className="container">
        <div className="blog-grid">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="blog-card blog-card--skeleton" style={{ minHeight: 320 }} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOG_LD) }}
      />

      <section className="blog-hero">
        <div className="section-atmos" aria-hidden="true">
          <div className="rings"><span/><span/><span/><span/></div>
          <div className="section-sparkles">
            {BLOG_SPARKLES.map((s, i) => (
              <span key={i} style={s} />
            ))}
          </div>
        </div>
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Blog</span>
            <h1 className="section-title">
              Dicas de Marketing Digital{" "}
              <em>e Websites para PMEs</em>
            </h1>
            <p className="section-sub">
              Artigos práticos sobre websites, apps mobile e marketing digital
              escritos pela equipa da Element Group.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<BlogPostsSkeleton />}>
        <BlogPostsList />
      </Suspense>

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
