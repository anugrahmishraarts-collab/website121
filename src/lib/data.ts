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
    image_url: null,
    featured: entry.featured,
    sort_order: index,
    placeholder_tone: entry.placeholderTone,
    created_at: new Date().toISOString(),
  };
}

function seedToPress(entry: (typeof seedPress)[number], index: number): PressFeature {
  return { id: String(index), sort_order: index, ...entry };
}

export async function getArtworks(): Promise<Artwork[]> {
  if (!isSupabaseConfigured()) {
    return seedArtworks.map(seedToArtwork).sort((a, b) => a.sort_order - b.sort_order);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    return seedArtworks.map(seedToArtwork);
  }

  return data as Artwork[];
}

export async function getFeaturedArtworks(): Promise<Artwork[]> {
  const all = await getArtworks();
  const featured = all.filter((a) => a.featured);
  return featured.length ? featured : all.slice(0, 3);
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  if (!isSupabaseConfigured()) {
    const index = seedArtworks.findIndex((a) => a.slug === slug);
    if (index === -1) return null;
    return seedToArtwork(seedArtworks[index], index);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return data as Artwork;
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
