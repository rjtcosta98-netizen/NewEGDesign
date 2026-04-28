import { cache } from "react";
import {
  getSupabase,
  publicAsset,
  PROJECT_IMAGES,
  type Project,
  type Client,
} from "./supabase";
import { esc } from "./utils";

type Row = Project & { client: Client | null };
type Variant = 1 | 2 | 3 | 4;

const COLOR_CYCLE = ["violet", "green", "cyan", "yellow"] as const;

const getProjects = cache(async (): Promise<Row[]> => {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("projects")
    .select(
      "id, slug, title, description, category, cover_path, gallery, url, is_published, display_order, published_at, client:clients(id, slug, name, industry, website, logo_path)"
    )
    .eq("is_published", true)
    .order("display_order", { ascending: false })
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("[projects] fetch error:", error.message);
    return [];
  }
  return (data ?? []) as unknown as Row[];
});

function fallbackProjects(): Row[] {
  return [
    {
      id: "fallback-project-1",
      slug: "apiarios-terras-pulga",
      title: "Apiários Terras da Pulga",
      client_id: null,
      description: "Loja online para venda de mel e produtos apícolas com checkout MBWay e Multibanco.",
      category: "website",
      cover_path: null,
      gallery: [],
      url: null,
      is_published: true,
      display_order: 110,
      published_at: null,
      client: { id: "c1", slug: "apiarios", name: "Apiários Terras da Pulga", industry: null, website: null, logo_path: null },
    },
    {
      id: "fallback-project-2",
      slug: "maria-mendes-massagens",
      title: "Maria Mendes Massagens",
      client_id: null,
      description: "Website com sistema de marcações online para centro de massagens terapêuticas.",
      category: "website",
      cover_path: null,
      gallery: [],
      url: null,
      is_published: true,
      display_order: 100,
      published_at: null,
      client: { id: "c2", slug: "maria", name: "Maria Mendes Massagens", industry: null, website: null, logo_path: null },
    },
    {
      id: "fallback-project-3",
      slug: "ad-sao-romao",
      title: "AD São Romão",
      client_id: null,
      description: "Website institucional para associação desportiva local com calendário de jogos e notícias.",
      category: "website",
      cover_path: null,
      gallery: [],
      url: null,
      is_published: true,
      display_order: 90,
      published_at: null,
      client: { id: "c3", slug: "ad-sr", name: "AD São Romão", industry: null, website: null, logo_path: null },
    },
    {
      id: "fallback-project-4",
      slug: "estrela-detail-wash",
      title: "Estrela Detail & Wash",
      client_id: null,
      description: "Website profissional para serviço de detailing e lavagem automóvel com marcações online.",
      category: "website",
      cover_path: null,
      gallery: [],
      url: null,
      is_published: true,
      display_order: 80,
      published_at: null,
      client: { id: "c4", slug: "estrela", name: "Estrela Detail & Wash", industry: null, website: null, logo_path: null },
    },
    {
      id: "fallback-project-5",
      slug: "football-nation-store-branding",
      title: "Football Nation Store — Branding",
      client_id: null,
      description: "Logótipo e cartão de visita profissional para e-commerce de camisolas de clubes.",
      category: "branding",
      cover_path: null,
      gallery: [],
      url: null,
      is_published: true,
      display_order: 70,
      published_at: null,
      client: { id: "c5", slug: "fns", name: "Football Nation Store", industry: null, website: null, logo_path: null },
    },
    {
      id: "fallback-project-6",
      slug: "matias-nature",
      title: "Matias Nature",
      client_id: null,
      description: "E-commerce + App PWA para marca de produtos naturais. Catálogo, checkout e área de cliente.",
      category: "website",
      cover_path: null,
      gallery: [],
      url: null,
      is_published: true,
      display_order: 60,
      published_at: null,
      client: { id: "c6", slug: "matias", name: "Matias Nature", industry: null, website: null, logo_path: null },
    },
  ];
}

const RE_ECOMMERCE = /(loja|shop|ecommerce|e-commerce|store)/;
const RE_LOCAL     = /(bistro|restaur|local|food|negóc|negoc)/;
const RE_APP       = /(app|mobile|ios|android|fitness|saúde|saude)/;
const RE_WEB       = /(web|site|website|brand|design|landing)/;

function variantFor(category: string | null, index: number): Variant {
  const c = (category ?? "").toLowerCase();
  if (RE_ECOMMERCE.test(c)) return 2;
  if (RE_LOCAL.test(c))     return 3;
  if (RE_APP.test(c))       return 4;
  if (RE_WEB.test(c))       return 1;
  return ((index % 4) + 1) as Variant;
}

function screenBody(variant: Variant, cover: string | null, alt: string): string {
  if (cover) {
    return `<div style="position:relative;flex:1;min-height:160px;border-radius:8px;overflow:hidden;border:1px solid var(--line)"><img src="${esc(cover)}" alt="${esc(alt)}" loading="lazy" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"/></div>`;
  }
  switch (variant) {
    case 1:
      return `<div class="wks-hero"><div class="wks-h1"></div><div class="wks-h2"></div><div class="wks-cta"></div></div><div class="wks-grid"><i></i><i></i><i></i></div>`;
    case 2:
      return `<div class="wks-shop"><div class="wks-prod"><div class="wks-img"></div><div class="wks-pl"></div><div class="wks-pp"></div></div><div class="wks-prod"><div class="wks-img"></div><div class="wks-pl"></div><div class="wks-pp"></div></div><div class="wks-prod"><div class="wks-img"></div><div class="wks-pl"></div><div class="wks-pp"></div></div><div class="wks-prod"><div class="wks-img"></div><div class="wks-pl"></div><div class="wks-pp"></div></div></div>`;
    case 3:
      return `<div class="wks-bistro"><div class="wks-bh"></div><div class="wks-bs"></div><div class="wks-bbtn"></div></div><div class="wks-cards"><i></i><i></i><i></i></div>`;
    case 4:
      return `<div class="wks-app"><div class="wks-circle"></div><div class="wks-stats"><i></i><i></i><i></i></div></div>`;
  }
}

/**
 * Returns the HTML string for the live portfolio cards. Designed to
 * replace the marker inside <div class="wk-grid"> in _body.html so that
 * the cards render as direct grid children (CSS grid 2-up layout works).
 */
export async function renderProjectsGridHTML(): Promise<string> {
  const projects = await getProjects();
  const source = projects.length > 0 ? projects : fallbackProjects();

  return source
    .map((p, i) => {
      const color = COLOR_CYCLE[i % COLOR_CYCLE.length];
      const href = p.url ?? '/contacto';
      const external = !!p.url;
      const clientName = p.client?.name ?? p.title;
      const cover = publicAsset(PROJECT_IMAGES, p.cover_path);
      const variant = variantFor(p.category, i);
      const target = external ? ` target="_blank" rel="noopener noreferrer"` : "";
      const navExtraSpan = variant === 1 ? "<span></span>" : "";

      return `<a class="wk-card reveal" href="${esc(href)}" data-color="${color}"${target}>
        <div class="wk-thumb">
          <div class="wk-mock">
            <div class="wk-bar"><i></i><i></i><i></i></div>
            <div class="wk-screen wk-screen-${variant}">
              <div class="wks-nav"><b>${esc(clientName)}</b><span></span><span></span>${navExtraSpan}</div>
              ${screenBody(variant, cover, p.title)}
            </div>
          </div>
        </div>
        <div class="wk-meta">
          <div class="wk-titles">
            <h3>${esc(p.title)}</h3>
            ${p.description ? `<p>${esc(p.description)}</p>` : ""}
          </div>
          ${p.category ? `<span class="wk-tag">${esc(p.category)}</span>` : ""}
        </div>
      </a>`;
    })
    .join("");
}
