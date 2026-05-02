import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getBlogPost,
  getBlogPostSlugs,
  getBlogPosts,
  formatDate,
  type BlogPost,
} from "@/lib/blog";

export const revalidate = 3600;

const SITE_URL = "https://elementgroup.pt";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Artigo não encontrado | Element Group" };

  const title = post.meta_title ?? post.title;
  const description = post.meta_description ?? post.excerpt;
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: post.published_at ?? undefined,
      authors: [post.author],
      images: post.cover_image
        ? [{ url: post.cover_image, width: 1200, height: 630 }]
        : [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

/** Map known author names to their Person entity. Falls back to Organization. */
function buildAuthorLD(authorName: string) {
  const name = authorName.trim();

  if (name.toLowerCase() === "ricardo jorge") {
    return {
      "@type": "Person",
      "@id": `${SITE_URL}/sobre#ricardo-jorge`,
      name: "Ricardo Jorge",
      url: `${SITE_URL}/sobre`,
      jobTitle: "CEO & Co-Fundador",
      worksFor: { "@id": `${SITE_URL}/#organization` },
    };
  }

  if (!name || name.toLowerCase() === "element group") {
    return {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Element Group",
    };
  }

  // Generic person fallback for any other author name
  return {
    "@type": "Person",
    name,
    worksFor: { "@id": `${SITE_URL}/#organization` },
  };
}

function buildArticleLD(post: BlogPost) {
  // published_at can be null — fall back to created_at so datePublished is always present
  const datePublished = post.published_at ?? post.created_at;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/blog/${post.slug}`,
    url: `${SITE_URL}/blog/${post.slug}`,
    headline: post.title,
    description: post.excerpt,
    datePublished,
    dateModified: post.updated_at ?? datePublished,
    author: buildAuthorLD(post.author),
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Element Group",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    inLanguage: "pt-PT",
    articleSection: post.category,
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
    image: post.cover_image ?? `${SITE_URL}/og-image.jpg`,
  };
}

function buildBreadcrumbLD(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };
}

function buildFaqLD(content: string) {
  const dtMatches = [...content.matchAll(/<dt>([\s\S]*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/g)];
  if (dtMatches.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dtMatches.map(([, q, a]) => ({
      "@type": "Question",
      name: q.replace(/<[^>]+>/g, "").trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: a.replace(/<[^>]+>/g, "").trim(),
      },
    })),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogPost(slug),
    getBlogPosts(),
  ]);

  if (!post) notFound();

  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const articleLD = buildArticleLD(post);
  const faqLD = buildFaqLD(post.content);
  const breadcrumbLD = buildBreadcrumbLD(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />
      {faqLD && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
        />
      )}

      <article className="blog-post">
        <header className="blog-post-header">
          <div className="container blog-post-header-inner">
            <nav className="blog-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Início</Link>
              <span aria-hidden="true">›</span>
              <Link href="/blog">Blog</Link>
              <span aria-hidden="true">›</span>
              <span>{post.category}</span>
            </nav>

            <div className="blog-post-meta">
              <span className="blog-card-cat">{post.category}</span>
              <span className="blog-card-sep">·</span>
              <span className="blog-card-time">{post.reading_time_min} min de leitura</span>
              {post.published_at && (
                <>
                  <span className="blog-card-sep">·</span>
                  <time dateTime={post.published_at} className="blog-card-date">
                    {formatDate(post.published_at)}
                  </time>
                </>
              )}
            </div>

            <h1 className="blog-post-title">{post.title}</h1>
            <p className="blog-post-excerpt">{post.excerpt}</p>

            {post.tags.length > 0 && (
              <div className="tags blog-post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {post.cover_image && (
          <div className="blog-post-cover">
            <div className="container">
              <img
                src={post.cover_image}
                alt={post.title}
                className="blog-post-cover-img"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        )}

        <div className="blog-post-layout container">
          <div
            className="blog-post-content prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <aside className="blog-post-sidebar">
            <div className="blog-sidebar-cta">
              <p className="blog-sidebar-cta-label">Precisas de ajuda?</p>
              <h3 className="blog-sidebar-cta-title">
                Análise gratuita da tua presença digital
              </h3>
              <p className="blog-sidebar-cta-sub">
                Respondemos em 24 horas com uma proposta personalizada.
              </p>
              <a
                href="https://wa.me/351930477894"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Falar no WhatsApp
              </a>
            </div>

            {related.length > 0 && (
              <div className="blog-sidebar-related">
                <h3 className="blog-sidebar-related-title">Artigos relacionados</h3>
                <ul className="blog-sidebar-related-list">
                  {related.map((rp) => (
                    <li key={rp.slug}>
                      <Link href={`/blog/${rp.slug}`} className="blog-sidebar-related-link">
                        {rp.title}
                      </Link>
                      <span className="blog-card-time">
                        {rp.reading_time_min} min de leitura
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        <section className="blog-post-footer-cta">
          <div className="container">
            <div className="blog-cta-inner">
              <div>
                <h2 className="blog-cta-title">
                  Pronto para dar o próximo passo?
                </h2>
                <p className="blog-cta-sub">
                  Fala connosco. Análise gratuita e proposta em 24 horas.
                </p>
              </div>
              <Link href="/servicos" className="btn-primary">
                Ver Serviços
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
