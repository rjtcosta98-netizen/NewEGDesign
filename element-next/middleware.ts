import { NextRequest, NextResponse } from "next/server";

/**
 * Maintenance gate.
 * - When MAINTENANCE_MODE === "true", every public route is rewritten
 *   to /maintenance.html.
 * - Default is OFF (site live). Set env MAINTENANCE_MODE=true to enable.
 * - Admins bypass by setting cookie `eg_bypass=1` via /api/admin-bypass.
 * - Static assets, fonts, /_next, the maintenance page itself and the
 *   admin bypass endpoint are excluded from the gate.
 */
export const config = {
  matcher: [
    "/((?!_next/|api/admin-bypass|maintenance\\.html|fonts/|favicon|apple-touch-icon|og-image|robots\\.txt|sitemap\\.xml|logo\\.png).*)",
  ],
};

export function middleware(req: NextRequest) {
  const enabled = process.env.MAINTENANCE_MODE === "true";
  if (!enabled) return NextResponse.next();

  const bypass = req.cookies.get("eg_bypass")?.value;
  if (bypass === "1") return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/maintenance.html";
  url.search = "";
  return NextResponse.rewrite(url);
}
