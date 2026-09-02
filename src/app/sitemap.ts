import type { MetadataRoute } from "next";
import { publishedResearch } from "@/lib/research";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/solutions`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/sectors`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/research`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const pages: MetadataRoute.Sitemap = routes.map((page) => ({
    ...page,
    lastModified: now,
  }));

  const entries: MetadataRoute.Sitemap = publishedResearch().map((entry) => ({
    url: `${site.url}/research/${entry.slug}`,
    lastModified: new Date(`${entry.date}T00:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...pages, ...entries];
}
