import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";
import { SERVICE_PAGES } from "@/lib/services-data";
import { getAllLeadMagnetSlugs } from "@/lib/lead-magnets";
import { getAllCaseStudiesDB } from "@/lib/case-studies-db";

const BASE = "https://elementgroup.pt";

// Approximate site launch — used for static pages that don't have a real date.
// Update this when the site has major content refreshes.
const LAUNCH_DATE = new Date("2025-06-01");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Primary pages ──────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,          lastModified: LAUNCH_DATE, changeFrequency: "weekly"  },
    { url: `${BASE}/servicos`,  lastModified: LAUNCH_DATE, changeFrequency: "monthly" },
    { url: `${BASE}/portfolio`, lastModified: LAUNCH_DATE, changeFrequency: "monthly" },
    { url: `${BASE}/sobre`,     lastModified: LAUNCH_DATE, changeFrequency: "monthly" },
    { url: `${BASE}/contacto`,  lastModified: LAUNCH_DATE, changeFrequency: "monthly" },
    { url: `${BASE}/parcerias`, lastModified: LAUNCH_DATE, changeFrequency: "monthly" },
    { url: `${BASE}/recursos`,  lastModified: LAUNCH_DATE, changeFrequency: "monthly" },
    // Blog index reflects when last post was published — set dynamically below
  ];

  // ── Legal pages — rarely change ────────────────────────────────────────
  const legalRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/politica-de-privacidade`, lastModified: LAUNCH_DATE, changeFrequency: "yearly" },
    { url: `${BASE}/politica-de-cookies`,     lastModified: LAUNCH_DATE, changeFrequency: "yearly" },
    { url: `${BASE}/termos-e-condicoes`,      lastModified: LAUNCH_DATE, changeFrequency: "yearly" },
    { url: `${BASE}/resolucao-de-litigios`,   lastModified: LAUNCH_DATE, changeFrequency: "yearly" },
  ];

  // ── Service detail pages (static data) ────────────────────────────────
  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_PAGES.map((s) => ({
    url: `${BASE}/servicos/${s.slug}`,
    lastModified: LAUNCH_DATE,
    changeFrequency: "monthly" as const,
  }));

  // ── Resource (lead magnet) detail pages (static data) ─────────────────
  const resourceRoutes: MetadataRoute.Sitemap = getAllLeadMagnetSlugs().map((slug) => ({
    url: `${BASE}/recursos/${slug}`,
    lastModified: LAUNCH_DATE,
    changeFrequency: "monthly" as const,
  }));

  // ── Portfolio / case study detail pages (Supabase) ────────────────────
  const caseStudies = await getAllCaseStudiesDB();
  const portfolioRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${BASE}/portfolio/${cs.slug}`,
    // Use year field as best available date proxy (e.g. "2026" → 2026-01-01)
    lastModified: cs.year ? new Date(`${cs.year}-01-01`) : LAUNCH_DATE,
    changeFrequency: "monthly" as const,
  }));

  // ── Blog posts (Supabase) — use real published_at dates ───────────────
  const posts = await getBlogPosts();
  const blogIndexLastMod = posts.length > 0 && posts[0].published_at
    ? new Date(posts[0].published_at)
    : LAUNCH_DATE;

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : LAUNCH_DATE,
    changeFrequency: "monthly" as const,
  }));

  const blogIndexRoute: MetadataRoute.Sitemap = [
    { url: `${BASE}/blog`, lastModified: blogIndexLastMod, changeFrequency: "weekly" },
  ];

  return [
    ...staticRoutes,
    ...blogIndexRoute,
    ...legalRoutes,
    ...serviceRoutes,
    ...resourceRoutes,
    ...portfolioRoutes,
    ...blogRoutes,
  ];
}
