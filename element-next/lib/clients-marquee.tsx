import { cache } from "react";
import { getSupabase, publicAsset } from "./supabase";
import { esc } from "./utils";

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

const fetchMarqueeLogos = cache(async (): Promise<MarqueeLogo[]> => {
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
});

function fallbackMarqueeLogos(): MarqueeLogo[] {
  return [
    {
      id: "fallback-logo-1",
      slug: "maria-mendes",
      name: "Maria Mendes Massagens",
      initials: "MM",
      color_class: "maria",
      italic: true,
      logo_path: null,
      website: null,
      is_published: true,
      display_order: 100,
    },
    {
      id: "fallback-logo-2",
      slug: "ad-sao-romao",
      name: "AD São Romão",
      initials: "AD",
      color_class: "adsr",
      italic: false,
      logo_path: null,
      website: null,
      is_published: true,
      display_order: 90,
    },
    {
      id: "fallback-logo-3",
      slug: "estrela-detail-wash",
      name: "Estrela Detail & Wash",
      initials: "EDW",
      color_class: "estrela",
      italic: false,
      logo_path: null,
      website: null,
      is_published: true,
      display_order: 80,
    },
    {
      id: "fallback-logo-4",
      slug: "football-nation-store",
      name: "Football Nation Store",
      initials: "FNS",
      color_class: "fns",
      italic: false,
      logo_path: null,
      website: null,
      is_published: true,
      display_order: 70,
    },
    {
      id: "fallback-logo-5",
      slug: "matias-nature",
      name: "Matias Nature",
      initials: "MN",
      color_class: "matias",
      italic: true,
      logo_path: null,
      website: null,
      is_published: true,
      display_order: 60,
    },
  ];
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
  const source = rows.length > 0 ? rows : fallbackMarqueeLogos();

  const cycle1 = source.map((p) => renderLogoItem(p, false)).join("\n        ");
  const cycle2 = source.map((p) => renderLogoItem(p, true)).join("\n        ");

  return `<!-- ciclo 1 -->\n        ${cycle1}\n        <!-- ciclo 2 (duplicado para loop infinito) -->\n        ${cycle2}`;
}
