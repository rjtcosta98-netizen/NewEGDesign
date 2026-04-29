// @ts-ignore – bundled as raw string via webpack asset/source (edge-safe)
import RAW_HTML from './_body.html';
// @ts-ignore – bundled as raw string via webpack asset/source (edge-safe)
import SCRIPTS from './_scripts.js';
import InlineScripts from "@/components/InlineScripts";
import { renderProjectsGridHTML } from "@/lib/projects-grid";
import { renderHeroProjectsHTML } from "@/lib/hero-projects";
import { renderMarqueeLogosHTML } from "@/lib/clients-marquee";
import { renderReviewsHTML } from "@/lib/reviews";

export const revalidate = 300;

const GRID_MARKER = "<!-- SUPABASE_PROJECTS_GRID_GRID -->";
const HERO_MARKER = "<!-- HERO_PROJECTS_MARKER -->";
const MARQUEE_MARKER = "<!-- MARQUEE_LOGOS_MARKER -->";
const REVIEWS_MARKER = "<!-- REVIEWS_MARKER -->";

export default async function Page() {
  const [gridHtml, heroHtml, marqueeHtml, reviewsHtml] = await Promise.all([
    renderProjectsGridHTML(),
    renderHeroProjectsHTML(),
    renderMarqueeLogosHTML(),
    renderReviewsHTML(),
  ]);
  const html = RAW_HTML
    .replace(GRID_MARKER, gridHtml)
    .replace(HERO_MARKER, heroHtml)
    .replace(MARQUEE_MARKER, marqueeHtml)
    .replace(REVIEWS_MARKER, reviewsHtml);

  // Extract first hero image URL for LCP preload hint
  const lcpMatch = heroHtml.match(/<img[^>]*src="([^"]+)"[^>]*fetchpriority="high"/);
  const lcpImageUrl = lcpMatch?.[1] ?? null;

  return (
    <>
      {lcpImageUrl && (
        <link rel="preload" as="image" href={lcpImageUrl} fetchPriority="high" />
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <InlineScripts code={SCRIPTS} />
    </>
  );
}
