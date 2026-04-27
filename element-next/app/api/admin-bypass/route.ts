import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

const ADMIN_PASSWORD = process.env.ADMIN_BYPASS_PASSWORD || "element2026";
const COOKIE_NAME = "eg_bypass";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function ok(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.set(COOKIE_NAME, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  });
  return res;
}

function fail(req: NextRequest) {
  return NextResponse.redirect(new URL("/maintenance.html?err=1", req.url));
}

export async function GET(req: NextRequest) {
  const key = new URL(req.url).searchParams.get("key") ?? "";
  if (key === ADMIN_PASSWORD) return ok(req);
  return new NextResponse("Not found", { status: 404 });
}

export async function POST(req: NextRequest) {
  let key = "";
  const ct = req.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    const body = await req.json().catch(() => ({}));
    key = String(body?.key ?? "");
  } else {
    const fd = await req.formData().catch(() => null);
    key = fd ? String(fd.get("key") ?? "") : "";
  }
  if (key === ADMIN_PASSWORD) return ok(req);
  return fail(req);
}

export async function DELETE(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/maintenance.html", req.url));
  res.cookies.delete(COOKIE_NAME);
  return res;
}
