import { ArtworkForm } from "@/components/admin/artwork-form";
import { createArtwork } from "@/app/admin/actions";

export default function NewArtworkPage() {
  return (
    <div>
      <p className="eyebrow mb-3">Artworks</p>
      <h1 className="font-display text-3xl text-paper mb-10">Add a new artwork</h1>
      <ArtworkForm action={createArtwork} submitLabel="Publish artwork" />
    </div>
  );
}
