import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { GalleryGrid } from "@/components/gallery-grid";
import { PageTransition } from "@/components/page-transition";
import { getPublicArtworks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "The Refugee Crisis Series and selected paintings by Anugrah Mishra.",
};

export default async function GalleryPage() {
  const artworks = await getPublicArtworks();
  const refugeeSeries = artworks.filter(
    (artwork) => artwork.collection === "Refugee Crisis Series"
  );
  const earlierPaintings = artworks.filter(
    (artwork) => artwork.collection !== "Refugee Crisis Series"
  );

  return (
    <PageTransition>
      <div className="container-gallery pt-40 pb-28">
        <Reveal>
          <p className="eyebrow mb-4">The Collections</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display text-4xl md:text-6xl text-paper text-balance max-w-3xl">
            Gallery
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-body text-lg text-paper/70 mt-6 max-w-xl leading-relaxed mb-16">
            Original paintings from Anugrah Mishra&rsquo;s refugee series and wider studio
            practice. Each work is available to enquire about directly with the studio.
          </p>
        </Reveal>

        <section aria-labelledby="refugee-series-heading">
          <Reveal>
            <p className="eyebrow mb-3">Current Series</p>
            <h2
              id="refugee-series-heading"
              className="font-display text-3xl md:text-4xl text-paper mb-5"
            >
              Refugee Crisis Series
            </h2>
            <p className="font-body text-base text-paper/70 leading-relaxed max-w-2xl mb-12">
              Paintings exploring displacement as a psychological condition through memory,
              interiors, archetypal figures and stillness.
            </p>
          </Reveal>
          <GalleryGrid artworks={refugeeSeries} />
        </section>

        {earlierPaintings.length > 0 && (
          <section
            aria-labelledby="earlier-paintings-heading"
            className="mt-28 pt-16 border-t border-line"
          >
            <Reveal>
              <p className="eyebrow mb-3">From the Studio</p>
              <h2
                id="earlier-paintings-heading"
                className="font-display text-3xl md:text-4xl text-paper mb-5"
              >
                Earlier Paintings
              </h2>
              <p className="font-body text-base text-paper/70 leading-relaxed max-w-2xl mb-12">
                Portraits, landscapes and studies from the wider painting practice.
              </p>
            </Reveal>
            <GalleryGrid artworks={earlierPaintings} />
          </section>
        )}
      </div>
    </PageTransition>
  );
}
