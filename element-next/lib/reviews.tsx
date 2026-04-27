import { getSupabase, publicAsset } from "./supabase";

const AVATAR_BUCKET = "review-avatars";

export type Review = {
  id: string;
  slug: string;
  author_name: string;
  author_role: string | null;
  initials: string | null;
  avatar_path: string | null;
  text: string;
  rating: number;
  source: string | null;
  source_url: string | null;
  is_published: boolean;
  display_order: number;
  published_at: string | null;
};

function esc(s: string | null | undefined): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const QUOTE_SVG =
  '<svg class="tx-quote" width="42" height="34" viewBox="0 0 38 32" fill="currentColor"><path d="M0 18C0 8 6 2 16 0v6c-5 1-8 5-8 10h8v16H0V18zm22 0c0-10 6-16 16-18v6c-5 1-8 5-8 10h8v16H22V18z"/></svg>';

async function fetchReviews(): Promise<Review[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("reviews")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: false })
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("[reviews] fetch error:", error.message);
    return [];
  }
  return (data ?? []) as Review[];
}

/**
 * Returns the HTML string for the testimonial carousel cards.
 * Replaces <!-- REVIEWS_MARKER --> inside .tx-stage in _body.html.
 * Markup matches the original .tx-card so existing CSS + JS work unchanged.
 */
export async function renderReviewsHTML(): Promise<string> {
  const rows = await fetchReviews();
  if (rows.length === 0) return "";

  return rows
    .map((r, idx) => {
      const initials = (r.initials ?? deriveInitials(r.author_name)).slice(0, 3);
      const stars = Array.from({ length: Math.max(0, Math.min(5, r.rating)) })
        .map(() => "<span></span>")
        .join("");

      const avatar = publicAsset(AVATAR_BUCKET, r.avatar_path);
      const avatarInner = avatar
        ? `<img src="${esc(avatar)}" alt="${esc(r.author_name)}" loading="lazy" decoding="async"/>`
        : esc(initials);

      return `<article class="tx-card" data-i="${idx}">
        <div class="tx-bar"></div>
        ${QUOTE_SVG}
        <p class="tx-text">${esc(r.text)}</p>
        <div class="tx-stars">${stars}</div>
        <div class="tx-author">
          <div class="tx-av${avatar ? " has-photo" : ""}" data-i="${esc(initials)}">${avatarInner}</div>
          <div><b>${esc(r.author_name)}</b><small>${esc(r.author_role ?? "")}</small></div>
        </div>
      </article>`;
    })
    .join("\n");
}
