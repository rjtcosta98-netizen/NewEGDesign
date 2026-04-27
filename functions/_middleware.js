/**
 * Cloudflare Pages middleware — maintenance gate.
 *
 * Behaviour mirrors element-next/middleware.ts:
 *  - Default ON; disable by setting env var MAINTENANCE_MODE=false in CF dashboard.
 *  - Admins bypass via cookie eg_bypass=1.
 *  - Cookie is issued by /api/admin-bypass?key=<password>.
 *  - Default password "element2026"; override via env ADMIN_BYPASS_PASSWORD.
 */

const PASSTHROUGH = [
  /^\/maintenance\.html$/,
  /^\/api\/admin-bypass\/?$/,
  /^\/fonts\//,
  /^\/favicon/,
  /^\/apple-touch-icon/,
  /^\/og-image/,
  /^\/robots\.txt$/,
  /^\/sitemap\.xml$/,
  /^\/logo\.png$/,
];

function getCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  const match = header.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function buildCookie(value, { maxAge, clear } = {}) {
  const parts = [
    `eg_bypass=${value}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ];
  if (clear) parts.push("Max-Age=0");
  else if (maxAge) parts.push(`Max-Age=${maxAge}`);
  return parts.join("; ");
}

async function handleAdminBypass(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const password = (env && env.ADMIN_BYPASS_PASSWORD) || "element2026";

  if (request.method === "DELETE") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/maintenance.html",
        "Set-Cookie": buildCookie("", { clear: true }),
      },
    });
  }

  let key = url.searchParams.get("key");
  if (!key && request.method === "POST") {
    const ct = request.headers.get("content-type") || "";
    try {
      if (ct.includes("application/json")) {
        const body = await request.json();
        key = body.key || body.password;
      } else {
        const form = await request.formData();
        key = form.get("key") || form.get("password");
      }
    } catch (_) {}
  }

  if (!key || String(key) !== password) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
      "Set-Cookie": buildCookie("1", { maxAge: 60 * 60 * 24 * 30 }),
    },
  });
}

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);

  if (/^\/api\/admin-bypass\/?$/.test(url.pathname)) {
    return handleAdminBypass(context);
  }

  const enabled = env && env.MAINTENANCE_MODE === "true";
  if (!enabled) return next();

  if (PASSTHROUGH.some((re) => re.test(url.pathname))) return next();

  if (getCookie(request, "eg_bypass") === "1") return next();

  const target = new URL("/maintenance.html", url.origin);
  const assetRes =
    env && env.ASSETS
      ? await env.ASSETS.fetch(target)
      : await fetch(target);
  const html = await assetRes.text();
  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
