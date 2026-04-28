import { getSupabase } from "@/lib/supabase";

export const BLOG_IMAGES = "blog-images";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  cover_image: string | null;
  category: string;
  tags: string[];
  reading_time_min: number;
  author: string;
  is_published: boolean;
  display_order: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogPostSummary = Pick<
  BlogPost,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "cover_image"
  | "category"
  | "tags"
  | "reading_time_min"
  | "author"
  | "published_at"
>;

/** Returns all published posts ordered by display_order desc, then published_at desc. */
export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title, excerpt, cover_image, category, tags, reading_time_min, author, published_at"
    )
    .eq("is_published", true)
    .order("display_order", { ascending: false })
    .order("published_at", { ascending: false });

  if (error || !data) return [];
  return data as BlogPostSummary[];
}

/** Returns a single published post by slug. */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) return null;
  return data as BlogPost;
}

/** Returns all published slugs — used for generateStaticParams. */
export async function getBlogPostSlugs(): Promise<{ slug: string }[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("is_published", true);

  if (error || !data) return [];
  return data as { slug: string }[];
}

/** Returns posts by category. */
export async function getBlogPostsByCategory(
  category: string
): Promise<BlogPostSummary[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title, excerpt, cover_image, category, tags, reading_time_min, author, published_at"
    )
    .eq("is_published", true)
    .eq("category", category)
    .order("display_order", { ascending: false })
    .order("published_at", { ascending: false });

  if (error || !data) return [];
  return data as BlogPostSummary[];
}

/** Format a date string to Portuguese locale. */
export function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
