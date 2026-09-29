import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Static routes for now; product and category URLs get added from the API later.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/category`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];
}
