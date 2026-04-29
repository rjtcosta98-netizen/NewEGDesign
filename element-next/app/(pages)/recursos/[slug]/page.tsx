import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getLeadMagnet, getAllLeadMagnetSlugs } from '@/lib/lead-magnets';
import LeadMagnetForm from './LeadMagnetForm';

const SITE_URL = 'https://elementgroup.pt';

// ── Static params ──────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllLeadMagnetSlugs().map((slug) => ({ slug }));
}

export const revalidate = false;

// ── Metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getLeadMagnet(slug);
  if (!resource) return {};

  const url = `${SITE_URL}/recursos/${slug}`;
  return {
    title: resource.metaTitle,
    description: resource.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: resource.metaTitle,
      description: resource.metaDescription,
      url,
      siteName: 'Element Group',
      locale: 'pt_PT',
      type: 'article',
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: resource.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resource.metaTitle,
      description: resource.metaDescription,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

// ── JSON-LD ────────────────────────────────────────────────────────────────
function buildLD(slug: string, resource: ReturnType<typeof getLeadMagnet>) {
  if (!resource) return null;
  const url = `${SITE_URL}/recursos/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Recursos', item: `${SITE_URL}/recursos` },
          { '@type': 'ListItem', position: 3, name: resource.title, item: url },
        ],
      },
      {
        '@type': 'Article',
        headline: resource.title,
        description: resource.metaDescription,
        url,
        author: {
          '@type': 'Organization',
          name: 'Element Group',
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Element Group',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/og-image.jpg`,
          },
        },
        dateModified: new Date().toISOString().split('T')[0],
        inLanguage: 'pt-PT',
        isAccessibleForFree: true,
        genre: resource.category,
        keywords: [resource.category, 'PME', 'Portugal', resource.title].join(', '),
      },
    ],
  };
}

// ── Icons ──────────────────────────────────────────────────────────────────
function IconClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconFile() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6M8 13h8M8 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getLeadMagnet(slug);
  if (!resource) notFound();

  const ld = buildLD(slug, resource);

  return (
    <>
      {ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      )}

      <main className="lm-resource-page">
        {/* Breadcrumb */}
        <nav className="lm-breadcrumb" aria-label="Navegação">
          <Link href="/" className="lm-breadcrumb-link">Início</Link>
          <span className="lm-breadcrumb-sep" aria-hidden="true">/</span>
          <Link href="/recursos" className="lm-breadcrumb-link">Recursos</Link>
          <span className="lm-breadcrumb-sep" aria-hidden="true">/</span>
          <span className="lm-breadcrumb-current" aria-current="page">{resource.title}</span>
        </nav>

        <div className="lm-resource-layout">
          {/* Left: info + gate */}
          <div className="lm-resource-main">
            {/* Category & meta */}
            <div className="lm-resource-meta-row">
              <span className="lm-resource-category">{resource.category}</span>
              <span className="lm-resource-meta-item">
                <IconClock />
                {resource.readTime}
              </span>
              <span className="lm-resource-meta-item">
                <IconFile />
                {resource.format}
              </span>
            </div>

            {/* Title */}
            <h1 className="lm-resource-title">
              {resource.title}
              <span className="lm-resource-title-sub">{resource.subtitle}</span>
            </h1>
            <p className="lm-resource-desc">{resource.description}</p>

            {/* Preview bullets — visible before gate */}
            <div className="lm-resource-preview">
              <p className="lm-resource-preview-label">O que vais encontrar:</p>
              <ul className="lm-resource-preview-list">
                {resource.preview.map((p, i) => (
                  <li key={i} className="lm-resource-preview-item">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gate form / Content reveal */}
            <LeadMagnetForm resource={resource} />
          </div>

          {/* Right: sticky sidebar */}
          <aside className="lm-resource-sidebar">
            <div className="lm-sidebar-card">
              <p className="lm-sidebar-card-label">Mais recursos</p>
              <Link href="/recursos" className="lm-sidebar-back">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Ver todos os recursos
              </Link>
            </div>
            <div className="lm-sidebar-card lm-sidebar-cta-card">
              <p className="lm-sidebar-cta-label">Precisas de ajuda?</p>
              <p className="lm-sidebar-cta-text">
                A nossa equipa está disponível para implementar tudo isto por ti.
              </p>
              <Link href="/contacto" className="lm-sidebar-cta-btn">
                Falar connosco →
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
