export type ArtworkStatus = "available" | "inquire" | "sold";

export type Artwork = {
  id: string;
  slug: string;
  title: string;
  year: string | null;
  medium: string | null;
  dimensions: string | null;
  description: string;
  status: ArtworkStatus;
  collection: string | null;
  image_url: string | null;
  featured: boolean;
  sort_order: number;
  placeholder_tone: "ember" | "slate" | "ink";
  created_at: string;
};

export type PressFeature = {
  id: string;
  title: string;
  publication: string;
  url: string;
  excerpt: string;
  sort_order: number;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  artwork_id: string | null;
  artwork_title: string | null;
  created_at: string;
};
