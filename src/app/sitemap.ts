import type { MetadataRoute } from "next";
import { getPublicArtworks } from "@/lib/data";

const SITE_URL = "https://www.inquisitivearts.com";

// Read the same current artwork list as the public gallery on every request.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const artworks = await getPublicArtworks();
  const pages = ["/", "/gallery", "/about", "/journal", "/contact"];

  return [
    ...pages.map((path) => ({ url: new URL(path, SITE_URL).href })),
    ...artworks.map((artwork) => ({
      url: `${SITE_URL}/gallery/${encodeURIComponent(artwork.slug)}`,
      ...(artwork.image_url
        ? { images: [new URL(artwork.image_url, SITE_URL).href] }
        : {}),
    })),
  ];
}
