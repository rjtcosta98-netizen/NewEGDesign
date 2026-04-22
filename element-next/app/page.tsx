import fs from "node:fs";
import path from "node:path";
import InlineScripts from "@/components/InlineScripts";
import { renderProjectsGridHTML } from "@/lib/projects-grid";
import { renderHeroProjectsHTML } from "@/lib/hero-projects";

export const revalidate = 300;

const GRID_MARKER = "<!-- SUPABASE_PROJECTS_GRID_GRID -->";
const HERO_MARKER = "<!-- HERO_PROJECTS_MARKER -->";
const RAW_HTML = fs.readFileSync(
  path.join(process.cwd(), "app", "_body.html"),
  "utf8"
);
const SCRIPTS = fs.readFileSync(
  path.join(process.cwd(), "app", "_scripts.js"),
  "utf8"
);

export default async function Page() {
  const [gridHtml, heroHtml] = await Promise.all([
    renderProjectsGridHTML(),
    renderHeroProjectsHTML(),
  ]);
  const html = RAW_HTML
    .replace(GRID_MARKER, gridHtml)
    .replace(HERO_MARKER, heroHtml);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <InlineScripts code={SCRIPTS} />
    </>
  );
}
