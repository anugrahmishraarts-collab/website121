import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ArtworkPlaceholder } from "@/components/artwork-placeholder";
import { ArtworkCard } from "@/components/artwork-card";
import { getArtworkBySlug, getArtworks } from "@/lib/data";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);
  if (!artwork) return {};
  return {
    title: artwork.title,
    description: artwork.description,
  };
}

export default async function ArtworkPage({ params }: { params: Params }) {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);
  if (!artwork) notFound();

  const all = await getArtworks();
  const more = all.filter((a) => a.slug !== artwork.slug).slice(0, 3);

  const statusLabel =
    artwork.status === "sold" ? "Sold" : artwork.status === "available" ? "Available" : "Enquire to purchase";

  return (
    <div className="container-gallery pt-40 pb-28">
      <Reveal>
        <Link href="/gallery" className="font-ui text-sm link-underline text-paper/70 inline-flex items-center gap-2 mb-12">
          <ArrowLeft size={14} /> Back to gallery
        </Link>
      </Reveal>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14 lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] border border-line bg-ink-raised">
            {artwork.image_url ? (
              <Image
                src={artwork.image_url}
                alt={artwork.title}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 55vw, 90vw"
              />
            ) : (
              <ArtworkPlaceholder title={artwork.title} tone={artwork.placeholder_tone} />
            )}
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.05}>
            <p className="eyebrow mb-4">{artwork.collection ?? "Original Work"}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl md:text-5xl text-paper text-balance">{artwork.title}</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-ui text-sm text-muted mt-4">
              {[artwork.medium, artwork.year].filter(Boolean).join(", ")}
              {artwork.dimensions && artwork.dimensions !== "TBC" ? ` · ${artwork.dimensions}` : ""}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="font-body text-lg text-paper/80 mt-8 leading-relaxed">
              {artwork.description}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="flex items-center gap-4 mt-10 pt-8 border-t border-line">
              <span className="font-ui text-xs tracking-[0.14em] uppercase text-slate-bright border border-line px-3 py-1.5">
                {statusLabel}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <Link
              href={`/contact?artwork=${encodeURIComponent(artwork.slug)}`}
              className="font-ui text-sm inline-flex items-center gap-2 bg-ember hover:bg-ember-bright text-ink px-6 py-3.5 transition-colors mt-8"
            >
              Enquire about this piece <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </div>

      {more.length > 0 && (
        <div className="mt-32 pt-16 border-t border-line">
          <Reveal>
            <p className="eyebrow mb-10">More from the studio</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
            {more.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.08}>
                <ArtworkCard artwork={a} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
