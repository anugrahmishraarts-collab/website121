import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ArtworkPlaceholder } from "@/components/artwork-placeholder";
import { bio, mural } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Anugrah Mishra is a London-based contemporary painter exploring displacement, memory and stillness. Winner of the Freelands Painting Prize 2024.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="container-gallery pt-40 pb-20">
        <Reveal>
          <p className="eyebrow mb-4">About</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display text-4xl md:text-6xl text-paper text-balance max-w-3xl">
            {bio.name}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-ui text-sm text-muted mt-4">{bio.location}</p>
        </Reveal>
      </section>

      <section className="container-gallery pb-24 grid lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-24">
        <Reveal>
          <div className="relative aspect-[4/5] border border-line max-w-md">
            <ArtworkPlaceholder title="Anugrah Mishra" tone="ink" />
          </div>
        </Reveal>
        <div className="current-line pl-8 md:pl-12">
          <Reveal>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-paper/90 text-balance">
              {bio.statement}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body italic text-lg text-slate-bright mt-8 leading-relaxed">
              &ldquo;{bio.quote}&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-line">
        <div className="container-gallery py-24">
          <Reveal>
            <p className="eyebrow mb-12">A Life in Painting</p>
          </Reveal>
          <ol className="space-y-10 max-w-2xl current-line pl-8 md:pl-12">
            {bio.timeline.map((item, i) => (
              <Reveal as="li" key={item.year} delay={i * 0.05}>
                <p className="font-ui text-xs tracking-[0.14em] uppercase text-ember-bright mb-1.5">
                  {item.year}
                </p>
                <p className="font-body text-base md:text-lg text-paper/85 leading-relaxed">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Mural */}
      <section id="mural" className="border-t border-line bg-ink-raised/40 scroll-mt-24">
        <div className="container-gallery py-24 grid lg:grid-cols-[1fr_1fr] gap-14 items-center">
          <Reveal>
            <div className="relative aspect-[4/3] border border-line">
              <ArtworkPlaceholder title="The Human Current mural" tone="ember" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow mb-4">Public Art</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl md:text-4xl text-paper text-balance">
                {mural.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-ui text-sm text-muted mt-3">
                {mural.size} &middot; {mural.location}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-body text-base text-paper/75 mt-6 leading-relaxed">
                {mural.description}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body italic text-paper/70 mt-6">&ldquo;{mural.quote}&rdquo;</p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
