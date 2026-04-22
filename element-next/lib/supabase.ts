import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

let _client: SupabaseClient | null = null;

/**
 * Returns a memoized public Supabase client (anon scope).
 * Returns null if env vars are missing — components should handle that gracefully.
 */
export function getSupabase(): SupabaseClient | null {
  if (_client) return _client;
  if (!url || !key) return null;
  _client = createClient(url, key, {
    auth: { persistSession: false },
  });
  return _client;
}

/** Build a public URL for a file in a Supabase Storage bucket. */
export function publicAsset(bucket: string, path: string | null | undefined): string | null {
  if (!path || !url) return null;
  return `${url}/storage/v1/object/public/${bucket}/${path}`;
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
