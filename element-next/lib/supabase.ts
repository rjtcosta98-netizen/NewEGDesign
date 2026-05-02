import { cache } from 'react';
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * Returns a per-request memoized public Supabase client (anon scope).
 * React.cache() deduplicates calls within a single render pass.
 * Returns null if env vars are missing — components should handle that gracefully.
 */
export const getSupabase = cache((): SupabaseClient | null => {
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false },
  });
});

/** Build a public URL for a file in a Supabase Storage bucket. */
export function publicAsset(bucket: string, path: string | null | undefined): string | null {
  if (!path || !url) return null;
  return `${url}/storage/v1/object/public/${bucket}/${path}`;
}

/**
 * Build an optimised image URL via the Supabase Image Transform API.
 * Converts to WebP and resizes server-side, reducing payload significantly.
 * Falls back to null when path or project URL is missing.
 */
export function publicAssetOptimized(
  bucket: string,
  path: string | null | undefined,
  options: { width?: number; height?: number; quality?: number } = {}
): string | null {
  if (!path || !url) return null;
  const { width = 800, quality = 80 } = options;
  const params = new URLSearchParams({ format: "webp", quality: String(quality) });
  if (width) params.set("width", String(width));
  if (options.height) params.set("height", String(options.height));
  return `${url}/storage/v1/render/image/public/${bucket}/${path}?${params}`;
}

export const PROJECT_IMAGES = "project-images";
export const CLIENT_LOGOS = "client-logos";

export type Client = {
  id: string;
  slug: string;
  name: string;
  industry: string | null;
  website: string | null;
  logo_path: string | null;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  client_id: string | null;
  description: string | null;
  category: string | null;
  cover_path: string | null;
  gallery: string[];
  url: string | null;
  is_published: boolean;
  display_order: number;
  published_at: string | null;
};
