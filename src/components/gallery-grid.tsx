"use client";

import { useMemo, useState, useTransition, ViewTransition } from "react";
import { Reveal } from "@/components/reveal";
import { ArtworkCard } from "@/components/artwork-card";
import { cn } from "@/lib/utils";
import type { Artwork } from "@/lib/types";

export function GalleryGrid({ artworks }: { artworks: Artwork[] }) {
  const collections = useMemo(() => {
    const set = new Set(artworks.map((a) => a.collection).filter(Boolean) as string[]);
    return ["All", ...Array.from(set)];
  }, [artworks]);

  const [active, setActive] = useState("All");
  // Plain setState doesn't activate <ViewTransition> — only useTransition,
  // Suspense, or useDeferredValue do — so the filter crossfade below needs
  // the state change wrapped in startTransition to actually animate.
  const [, startTransition] = useTransition();

  const filtered =
    active === "All" ? artworks : artworks.filter((a) => a.collection === active);

  return (
    <div>
      {collections.length > 2 && (
        <div className="flex flex-wrap gap-3 mb-14 font-ui text-sm">
          {collections.map((c) => (
            <button
              key={c}
              onClick={() => startTransition(() => setActive(c))}
              className={cn(
                "px-4 py-2 border transition-colors",
                active === c
                  ? "border-ember bg-ember/10 text-ember-bright"
                  : "border-line text-paper/70 hover:border-line-bright hover:text-paper"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <ViewTransition key={active} name="gallery-grid" share="auto" enter="auto" default="none">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
          {filtered.map((artwork, i) => (
            <Reveal key={artwork.id} delay={(i % 3) * 0.06}>
              <ArtworkCard artwork={artwork} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="font-body text-muted text-center py-20">No works in this collection yet.</p>
        )}
      </ViewTransition>
    </div>
  );
}
