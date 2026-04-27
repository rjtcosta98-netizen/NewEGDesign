import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = "https://elementgroup.pt";
  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/servicos`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/portfolio`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/sobre`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/llms.txt`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/pricing.md`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
