import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { ArtworkPlaceholder } from "@/components/artwork-placeholder";
import type { Artwork } from "@/lib/types";

export function ArtworkCard({ artwork, priority = false }: { artwork: Artwork; priority?: boolean }) {
  return (
    <Link
      href={`/gallery/${artwork.slug}`}
      transitionTypes={["nav-forward"]}
      className="group lift-card block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-raised border border-line transition-colors duration-500 group-hover:border-line-bright">
        <ViewTransition name={`artwork-${artwork.slug}`} share="morph" default="none">
          {artwork.image_url ? (
            <Image
              src={artwork.image_url}
              alt={artwork.title}
              fill
              priority={priority}
              className="object-cover transition-transform duration-[1.1s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.06]"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            />
          ) : (
            <div className="transition-transform duration-[1.1s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.06] w-full h-full">
              <ArtworkPlaceholder title={artwork.title} tone={artwork.placeholder_tone} />
            </div>
          )}
        </ViewTransition>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_0_1px_var(--glass-border-bright)]" />
        {artwork.status === "sold" && (
          <span className="absolute top-3 right-3 font-ui text-[10px] tracking-[0.14em] uppercase glass text-paper/85 px-2.5 py-1">
            Sold
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg text-paper leading-snug transition-colors duration-300 group-hover:text-ember-bright">
            {artwork.title}
          </h3>
          <p className="font-ui text-xs text-muted mt-1">
            {artwork.medium}
            {artwork.year ? `, ${artwork.year}` : ""}
          </p>
        </div>
        {artwork.dimensions && artwork.dimensions !== "TBC" && (
          <p className="font-ui text-xs text-muted whitespace-nowrap mt-1">{artwork.dimensions}</p>
        )}
      </div>
    </Link>
  );
}
