import { notFound } from "next/navigation";
import { ArtworkForm } from "@/components/admin/artwork-form";
import { updateArtwork } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";
import type { Artwork } from "@/lib/types";

type Params = Promise<{ id: string }>;

export default async function EditArtworkPage({ params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("artworks").select("*").eq("id", id).maybeSingle();

  if (!data) notFound();
  const artwork = data as Artwork;

  return (
    <div>
      <p className="eyebrow mb-3">Artworks</p>
      <h1 className="font-display text-3xl text-paper mb-10">Edit &ldquo;{artwork.title}&rdquo;</h1>
      <ArtworkForm action={updateArtwork.bind(null, id)} artwork={artwork} submitLabel="Save changes" />
    </div>
  );
}
