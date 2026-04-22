import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: "https://elementgroup.pt/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
