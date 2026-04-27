import { getSupabase, publicAsset } from "./supabase";

const LOGO_BUCKET = "client-logos";

export type MarqueeLogo = {
  id: string;
  slug: string;
  name: string;
  initials: string;
  color_class: string | null;
  italic: boolean | null;
  logo_path: string | null;
  website: string | null;
  is_published: boolean;
  display_order: number;
};

function esc(s: string | null | undefined): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function fetchMarqueeLogos(): Promise<MarqueeLogo[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("marquee_logos")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: false });

  if (error) {
    console.error("[marquee_logos] fetch error:", error.message);
    return [];
  }
  return (data ?? []) as MarqueeLogo[];
}

function renderLogoMark(p: MarqueeLogo): string {
  const cover = publicAsset(LOGO_BUCKET, p.logo_path);
  if (cover) {
    return `<span class="g-mark g-mark-img"><img src="${esc(cover)}" alt="${esc(p.name)}" loading="lazy" decoding="async"/></span>`;
  }
  const colorClass = p.color_class && p.color_class !== "default" ? ` ${esc(p.color_class)}` : "";
  const italic = p.italic ? ' style="font-style:italic"' : "";
  return `<span class="g-mark${colorClass}"${italic}>${esc(p.initials)}</span>`;
}

function renderLogoItem(p: MarqueeLogo, ariaHidden: boolean): string {
  const aria = ariaHidden ? ' aria-hidden="true"' : "";
  const mark = renderLogoMark(p);
  return `<div class="m-logo"${aria}>${mark}<span>${esc(p.name)}</span></div>`;
}

/**
 * Returns the HTML string for the clients marquee items.
 * Replaces <!-- MARQUEE_LOGOS_MARKER --> inside .marquee-track in _body.html.
 * Renders the list twice (cycle 1 + duplicate) to keep the infinite scroll loop.
 */
export async function renderMarqueeLogosHTML(): Promise<string> {
  const rows = await fetchMarqueeLogos();
  if (rows.length === 0) return "";

  const cycle1 = rows.map((p) => renderLogoItem(p, false)).join("\n        ");
  const cycle2 = rows.map((p) => renderLogoItem(p, true)).join("\n        ");

  return `<!-- ciclo 1 -->\n        ${cycle1}\n        <!-- ciclo 2 (duplicado para loop infinito) -->\n        ${cycle2}`;
}
