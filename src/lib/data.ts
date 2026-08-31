import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { artworks as seedArtworks, press as seedPress } from "@/lib/seed-data";
import type { Artwork, PressFeature } from "@/lib/types";

function seedToArtwork(entry: (typeof seedArtworks)[number], index: number): Artwork {
  return {
    id: entry.slug,
    slug: entry.slug,
    title: entry.title,
    year: entry.year,
    medium: entry.medium,
    dimensions: entry.dimensions,
    description: entry.description,
    status: entry.status,
    collection: entry.collection,
    image_url: entry.imageUrl,
    featured: entry.featured,
    sort_order: index,
    placeholder_tone: entry.placeholderTone,
    created_at: new Date().toISOString(),
  };
}

function getCanonicalArtworks() {
  return seedArtworks.map(seedToArtwork).sort((a, b) => a.sort_order - b.sort_order);
}

function seedToPress(entry: (typeof seedPress)[number], index: number): PressFeature {
  return { id: String(index), sort_order: index, ...entry };
}

export async function getArtworks(): Promise<Artwork[]> {
  if (!isSupabaseConfigured()) {
    return getCanonicalArtworks();
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    return getCanonicalArtworks();
  }

  return data as Artwork[];
}

/**
 * Public gallery content. The selected refugee-crisis works ship with the site so
 * their images cannot disappear if the CMS is unavailable. A future CMS record
 * with the same slug can still override its metadata or image, and newly added
 * non-legacy CMS works continue to appear after the canonical series.
 */
export async function getPublicArtworks(): Promise<Artwork[]> {
  const canonical = getCanonicalArtworks();
  if (!isSupabaseConfigured()) return canonical;

  const cmsArtworks = await getArtworks();
  const cmsBySlug = new Map(cmsArtworks.map((artwork) => [artwork.slug, artwork]));
  const canonicalSlugs = new Set(canonical.map((artwork) => artwork.slug));

  const mergedCanonical = canonical.map((artwork) => {
    const override = cmsBySlug.get(artwork.slug);
    if (!override) return artwork;

    return {
      ...artwork,
      ...override,
      image_url: override.image_url || artwork.image_url,
      sort_order: artwork.sort_order,
    };
  });

  const additionalWorks = cmsArtworks
    .filter((artwork) => !canonicalSlugs.has(artwork.slug))
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((artwork, index) => ({
      ...artwork,
      sort_order: mergedCanonical.length + index,
    }));

  return [...mergedCanonical, ...additionalWorks];
}

export async function getFeaturedArtworks(): Promise<Artwork[]> {
  const all = await getPublicArtworks();
  const featured = all.filter((a) => a.featured);
  return featured.length ? featured : all.slice(0, 3);
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  const canonicalIndex = seedArtworks.findIndex((artwork) => artwork.slug === slug);
  const canonical =
    canonicalIndex === -1 ? null : seedToArtwork(seedArtworks[canonicalIndex], canonicalIndex);

  if (!isSupabaseConfigured()) return canonical;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return canonical;

  const cmsArtwork = data as Artwork;
  if (!canonical) return cmsArtwork;

  return {
    ...canonical,
    ...cmsArtwork,
    image_url: cmsArtwork.image_url || canonical.image_url,
    sort_order: canonical.sort_order,
  };
}

export async function getPressFeatures(): Promise<PressFeature[]> {
  if (!isSupabaseConfigured()) {
    return seedPress.map(seedToPress);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("press_features")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    return seedPress.map(seedToPress);
  }

  return data as PressFeature[];
}
