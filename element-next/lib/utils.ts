/**
 * Escapes HTML special characters for safe insertion into HTML strings.
 * Used across all server-side HTML renderers (projects-grid, hero-projects, etc.)
 */
export function esc(s: string | null | undefined): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
