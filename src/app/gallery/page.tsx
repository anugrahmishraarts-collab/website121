import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { GalleryGrid } from "@/components/gallery-grid";
import { PageTransition } from "@/components/page-transition";
import { getArtworks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Paintings and prints by Anugrah Mishra.",
};

export default async function GalleryPage() {
  const artworks = await getArtworks();

  return (
    <PageTransition>
      <div className="container-gallery pt-40 pb-28">
        <Reveal>
          <p className="eyebrow mb-4">The Collection</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display text-4xl md:text-6xl text-paper text-balance max-w-3xl">
            Gallery
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-body text-lg text-paper/70 mt-6 max-w-xl leading-relaxed mb-16">
            Original paintings and limited-run canvas prints. Each piece is available to enquire
            about directly with the studio.
          </p>
        </Reveal>

        <GalleryGrid artworks={artworks} />
      </div>
    </PageTransition>
  );
}
