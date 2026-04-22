import {
  getSupabase,
  publicAsset,
  PROJECT_IMAGES,
  type Project,
  type Client,
} from "./supabase";

type Row = Project & { client: Client | null };
type Variant = 1 | 2 | 3 | 4;

const COLOR_CYCLE = ["violet", "green", "cyan", "yellow"] as const;

async function getProjects(): Promise<Row[]> {
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
}

function variantFor(category: string | null, index: number): Variant {
  const c = (category ?? "").toLowerCase();
  if (/(loja|shop|ecommerce|e-commerce|store)/.test(c)) return 2;
  if (/(bistro|restaur|local|food|negóc|negoc)/.test(c)) return 3;
  if (/(app|mobile|ios|android|fitness|saúde|saude)/.test(c)) return 4;
  if (/(web|site|website|brand|design|landing)/.test(c)) return 1;
  return ((index % 4) + 1) as Variant;
}

function esc(s: string | null | undefined): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
  if (projects.length === 0) return "";

  return projects
    .map((p, i) => {
      const color = COLOR_CYCLE[i % COLOR_CYCLE.length];
      const WA_URL = "https://wa.me/351930477894?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20um%20or%C3%A7amento.";
      const href = p.url ?? WA_URL;
      const external = true;
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
