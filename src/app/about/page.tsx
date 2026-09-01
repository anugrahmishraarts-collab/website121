import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageTransition } from "@/components/page-transition";
import { bio, mural } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Anugrah Mishra is a London-based contemporary painter exploring displacement, memory and stillness. Winner of the Freelands Painting Prize 2024.",
};

export default function AboutPage() {
  return (
    <PageTransition>
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
          <div className="relative aspect-[4/5] border border-line max-w-md overflow-hidden bg-ink-raised">
            <Image
              src="/images/anugrah-mishra-artist.webp"
              alt="Anugrah Mishra standing in front of a painting from the Refugee Crisis Series"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="object-cover object-[35%_center]"
            />
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
          <Reveal delay={0.15}>
            <a
              href="/Anugrah-Mishra-Artist-CV.pdf"
              download
              className="btn-primary font-ui text-sm inline-flex items-center gap-2 bg-ember hover:bg-ember-bright text-ink px-6 py-3.5 mt-10 transition-colors"
            >
              <Download size={16} /> Download artist CV
            </a>
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
        <div className="container-gallery py-24 md:py-32">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-20 items-center">
            <Reveal>
              <div className="relative aspect-[3/2] border border-line overflow-hidden bg-ink">
                <Image
                  src="/mural/the-human-current-pathway.webp"
                  alt="The Human Current mural extending along the pathway at Jesus Green Lido"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <p className="eyebrow mb-4">Public Art</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-display text-3xl md:text-5xl text-paper text-balance">
                  {mural.title}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-ui text-sm text-muted mt-3">
                  {mural.year} &middot; {mural.size} &middot; {mural.location}
                </p>
                <p className="font-ui text-xs tracking-wide uppercase text-ember-bright mt-2">
                  Commissioned by {mural.commissioner}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-4 mt-16">
            {mural.images.map((image, index) => (
              <Reveal
                key={image.src}
                delay={Math.min(index * 0.04, 0.2)}
                className={
                  index === 0
                    ? "md:col-span-2 lg:col-span-8"
                    : index === 1
                      ? "lg:col-span-4"
                      : "lg:col-span-3"
                }
              >
                <figure
                  className={`relative overflow-hidden border border-line bg-ink ${
                    index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 62vw"
                        : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    }
                    className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
    </PageTransition>
  );
}
