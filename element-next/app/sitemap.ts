import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const base = "https://elementgroup.pt";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/servicos`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/portfolio`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/sobre`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/llms.txt`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/pricing.md`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];

  const posts = await getBlogPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
