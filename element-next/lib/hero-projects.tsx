import { cache } from "react";
import { getSupabase, publicAsset } from "./supabase";
import { esc } from "./utils";

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

const fetchHeroProjects = cache(async (): Promise<HeroProject[]> => {
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
});

function fallbackHeroProjects(): HeroProject[] {
  return [
    {
      id: "fallback-hero-1",
      slug: "maria-mendes-massagens",
      title: "Maria Mendes Massagens",
      description: "Website com sistema de marcações online para centro de massagens terapêuticas.",
      category: "Negócio local",
      tags: ["SEO Local", "WhatsApp"],
      glyph: "MM",
      glyph_color: null,
      glyph_italic: false,
      badge_value: "95+",
      badge_label: "PAGESPEED",
      badge_color: null,
      live_url: null,
      image_path: null,
      is_published: true,
      display_order: 100,
      published_at: null,
    },
    {
      id: "fallback-hero-2",
      slug: "ad-sao-romao",
      title: "AD São Romão",
      description: "Website institucional para associação desportiva local com calendário de jogos e notícias.",
      category: "Institucional",
      tags: ["Website", "Notícias", "Calendário"],
      glyph: "AD",
      glyph_color: null,
      glyph_italic: false,
      badge_value: "14 dias",
      badge_label: "TEMPO DE ENTREGA",
      badge_color: null,
      live_url: null,
      image_path: null,
      is_published: true,
      display_order: 90,
      published_at: null,
    },
    {
      id: "fallback-hero-3",
      slug: "estrela-detail-wash",
      title: "Estrela Detail & Wash",
      description: "Website profissional para serviço de detailing e lavagem automóvel com marcações online.",
      category: "Automóvel · Serviços",
      tags: ["Website", "Marcações", "Local"],
      glyph: "EDW",
      glyph_color: null,
      glyph_italic: true,
      badge_value: "100%",
      badge_label: "SATISFAÇÃO",
      badge_color: null,
      live_url: null,
      image_path: null,
      is_published: true,
      display_order: 80,
      published_at: null,
    },
    {
      id: "fallback-hero-4",
      slug: "football-nation-store",
      title: "Football Nation Store",
      description: "Logótipo e cartão de visita profissional para e-commerce de camisolas de clubes.",
      category: "Design gráfico",
      tags: ["Branding", "Print", "Identidade"],
      glyph: "FNS",
      glyph_color: null,
      glyph_italic: false,
      badge_value: "100%",
      badge_label: "SATISFAÇÃO",
      badge_color: null,
      live_url: null,
      image_path: null,
      is_published: true,
      display_order: 70,
      published_at: null,
    },
  ];
}

const CASE_STUDY_ICON =
  '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

const EXTERNAL_ICON =
  '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M9 7h8v8"/></svg>';

/**
 * Returns the HTML string for the hero portfolio rotator cards.
 * Replaces <!-- HERO_PROJECTS_MARKER --> inside .hp-track in _body.html.
 * Clicking the card navigates to /portfolio/[slug]; live URL opens separately.
 */
export async function renderHeroProjectsHTML(): Promise<string> {
  const rows = await fetchHeroProjects();
  const source = rows.length > 0 ? rows : fallbackHeroProjects();

  return source
    .map((p) => {
      const glyphStyleParts: string[] = [];
      if (p.glyph_italic) glyphStyleParts.push("font-style:italic");
      if (p.glyph_color) glyphStyleParts.push(`color:${p.glyph_color}`);
      const glyphStyle = glyphStyleParts.length
        ? ` style="${glyphStyleParts.join(";")}"`
        : "";
      const badgeStyle = p.badge_color ? ` style="color:${p.badge_color}"` : "";

      const cover = publicAsset(HERO_BUCKET, p.image_path);
      const previewBody = cover
        ? `<img src="${esc(cover)}" alt="${esc(p.title)}" loading="lazy" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"/>`
        : `<span class="glyph"${glyphStyle}>${esc(p.glyph)}</span>`;

      const tagsHtml = (p.tags ?? [])
        .map((t) => `<span class="tag">${esc(t)}</span>`)
        .join("");

      // Live external link — stop propagation so card click still goes to case study
      const liveBtn = p.live_url
        ? `<a class="live" href="${esc(p.live_url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" title="Ver site ao vivo">Ver Site ${EXTERNAL_ICON}</a>`
        : `<span class="live">Case Study ${CASE_STUDY_ICON}</span>`;

      return `<a class="proj" href="/portfolio/${esc(p.slug)}">
        <div class="preview">
          ${liveBtn}
          ${previewBody}
          <div class="badge"><b${badgeStyle}>${esc(p.badge_value)}</b><small>${esc(p.badge_label)}</small></div>
        </div>
        <div class="info">
          <div class="cat">${esc(p.category)}</div>
          <h4>${esc(p.title)}</h4>
          <p>${esc(p.description)}</p>
          <div class="tags">${tagsHtml}</div>
        </div>
      </a>`;
    })
    .join("\n");
}
