import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { getArtworks } from "@/lib/data";
import { ArtworkPlaceholder } from "@/components/artwork-placeholder";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteArtwork } from "@/app/admin/actions";

export default async function AdminArtworksPage() {
  const artworks = await getArtworks();

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-10">
        <div>
          <p className="eyebrow mb-3">Manage</p>
          <h1 className="font-display text-3xl text-paper">Artworks</h1>
        </div>
        <Link
          href="/admin/artworks/new"
          className="font-ui text-sm inline-flex items-center gap-2 bg-ember hover:bg-ember-bright text-ink px-5 py-2.5 transition-colors"
        >
          <Plus size={15} /> New artwork
        </Link>
      </div>

      <div className="border border-line divide-y divide-line">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="flex items-center gap-4 p-4">
            <div className="relative w-14 h-16 shrink-0 bg-ink-raised">
              {artwork.image_url ? (
                <Image src={artwork.image_url} alt={artwork.title} fill className="object-cover" />
              ) : (
                <ArtworkPlaceholder title={artwork.title} tone={artwork.placeholder_tone} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base text-paper truncate">{artwork.title}</p>
              <p className="font-ui text-xs text-muted mt-0.5">
                {artwork.collection} &middot; {artwork.status}
              </p>
            </div>
            <Link
              href={`/admin/artworks/${artwork.id}`}
              className="font-ui text-xs inline-flex items-center gap-1.5 text-paper/70 hover:text-paper transition-colors"
            >
              <Pencil size={13} /> Edit
            </Link>
            <DeleteButton
              action={deleteArtwork.bind(null, artwork.id)}
              confirmMessage={`Delete "${artwork.title}"? This cannot be undone.`}
            />
          </div>
        ))}
        {artworks.length === 0 && (
          <p className="p-8 text-center font-body text-muted">No artworks yet.</p>
        )}
      </div>
    </div>
  );
}
