import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageSeo = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
};

// Builds per-page metadata with canonical URL and Open Graph tags filled in.
export function buildMetadata({ title, description, path = "/", image }: PageSeo): Metadata {
  const desc = description ?? siteConfig.description;
  const img = image ?? siteConfig.ogImage;

  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: { title, description: desc, url: path, images: [img] },
    twitter: { card: "summary_large_image", title, description: desc, images: [img] },
  };
}
