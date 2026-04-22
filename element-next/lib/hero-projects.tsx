import { getSupabase, publicAsset } from "./supabase";

const HERO_BUCKET = "hero-images";

export type HeroProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  glyph: string;
  glyph_color: string | null;
  glyph_italic: boolean | null;
  badge_value: string;
  badge_label: string;
  badge_color: string | null;
  live_url: string | null;
  image_path: string | null;
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

async function fetchHeroProjects(): Promise<HeroProject[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("hero_projects")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: false })
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("[hero_projects] fetch error:", error.message);
    return [];
  }
  return (data ?? []) as HeroProject[];
}

const LIVE_ICON =
  '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M9 7h8v8"/></svg>';

/**
 * Returns the HTML string for the hero portfolio rotator cards.
 * Replaces <!-- HERO_PROJECTS_MARKER --> inside .hp-track in _body.html.
 * Markup matches the original .proj cards exactly so no CSS changes needed.
 */
export async function renderHeroProjectsHTML(): Promise<string> {
  const rows = await fetchHeroProjects();
  if (rows.length === 0) return "";

  return rows
    .map((p) => {
      const glyphStyleParts: string[] = [];
      if (p.glyph_italic) glyphStyleParts.push("font-style:italic");
      if (p.glyph_color) glyphStyleParts.push(`color:${p.glyph_color}`);
      const glyphStyle = glyphStyleParts.length
        ? ` style="${glyphStyleParts.join(";")}"`
        : "";
      const badgeStyle = p.badge_color ? ` style="color:${p.badge_color}"` : "";

      const liveAttrs = p.live_url
        ? ` style="cursor:pointer" onclick="window.open('${esc(p.live_url)}','_blank','noopener,noreferrer')"`
        : "";

      const cover = publicAsset(HERO_BUCKET, p.image_path);
      const previewBody = cover
        ? `<img src="${esc(cover)}" alt="${esc(p.title)}" loading="lazy" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"/>`
        : `<span class="glyph"${glyphStyle}>${esc(p.glyph)}</span>`;

      const tagsHtml = (p.tags ?? [])
        .map((t) => `<span class="tag">${esc(t)}</span>`)
        .join("");

      return `<div class="proj"${liveAttrs}>
        <div class="preview">
          <span class="live">Ver Live ${LIVE_ICON}</span>
          ${previewBody}
          <div class="badge"><b${badgeStyle}>${esc(p.badge_value)}</b><small>${esc(p.badge_label)}</small></div>
        </div>
        <div class="info">
          <div class="cat">${esc(p.category)}</div>
          <h4>${esc(p.title)}</h4>
          <p>${esc(p.description)}</p>
          <div class="tags">${tagsHtml}</div>
        </div>
      </div>`;
    })
    .join("\n");
}
