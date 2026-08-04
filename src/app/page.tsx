import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroCurrent } from "@/components/hero-current";
import { Reveal } from "@/components/reveal";
import { ArtworkCard } from "@/components/artwork-card";
import { ArtworkPlaceholder } from "@/components/artwork-placeholder";
import { getFeaturedArtworks, getPressFeatures } from "@/lib/data";
import { mural, bio } from "@/lib/seed-data";

export default async function Home() {
  const [featured, press] = await Promise.all([getFeaturedArtworks(), getPressFeatures()]);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-end pb-20 md:pb-28 pt-32 overflow-hidden">
        <HeroCurrent />
        <div className="container-gallery relative">
          <Reveal>
            <p className="eyebrow mb-6">London &middot; Contemporary Painter</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-balance text-[clamp(2.4rem,6vw,5.2rem)] leading-[1.05] text-paper max-w-4xl">
              &ldquo;Painting offers what film cannot: stillness.&rdquo;
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body text-lg text-paper/75 mt-8 max-w-xl leading-relaxed">
              The studio of <span className="italic">Anugrah Mishra</span> — paintings that
              approach displacement and the refugee crisis through memory, interiors and
              stillness rather than spectacle. Winner of the Freelands Painting Prize 2024.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap items-center gap-6 mt-10">
              <Link
                href="/gallery"
                className="font-ui text-sm inline-flex items-center gap-2 bg-ember hover:bg-ember-bright text-ink px-6 py-3.5 transition-colors"
              >
                View the gallery <ArrowRight size={15} />
              </Link>
              <Link href="/about" className="font-ui text-sm link-underline text-paper/85">
                The artist&rsquo;s story
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured works */}
      <section className="container-gallery py-24 md:py-32">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow mb-3">Selected Works</p>
              <h2 className="font-display text-3xl md:text-4xl text-paper">From the gallery</h2>
            </div>
            <Link href="/gallery" className="hidden sm:inline-flex font-ui text-sm link-underline text-paper/80 items-center gap-2">
              View all works <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
          {featured.map((artwork, i) => (
            <Reveal key={artwork.id} delay={i * 0.08}>
              <ArtworkCard artwork={artwork} priority={i === 0} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link href="/gallery" className="sm:hidden mt-10 font-ui text-sm link-underline text-paper/80 inline-flex items-center gap-2">
            View all works <ArrowRight size={14} />
          </Link>
        </Reveal>
      </section>

      {/* Artist statement */}
      <section className="border-t border-line">
        <div className="container-gallery py-24 md:py-32 grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-24 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 border border-line">
              <ArtworkPlaceholder title="Anugrah Mishra, studio portrait" tone="slate" />
            </div>
          </Reveal>
          <div className="current-line pl-8 md:pl-12">
            <Reveal>
              <p className="eyebrow mb-4">The Artist</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="font-body text-xl md:text-2xl text-paper/90 leading-relaxed text-balance">
                {bio.statement}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-body italic text-lg text-slate-bright mt-8 leading-relaxed">
                &ldquo;{bio.quote}&rdquo;
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link href="/about" className="font-ui text-sm link-underline text-paper/85 inline-flex items-center gap-2 mt-10">
                Read the full story <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mural feature */}
      <section className="border-t border-line bg-ink-raised/40">
        <div className="container-gallery py-24 md:py-32 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-24 items-center">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">Public Art &middot; Cambridge</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl md:text-4xl text-paper text-balance">
                {mural.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-ui text-sm text-muted mt-3">
                {mural.size} &middot; {mural.location} &middot; commissioned by {mural.commissioner}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-body text-base text-paper/75 mt-6 leading-relaxed max-w-xl">
                {mural.description}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body italic text-paper/70 mt-6 max-w-xl">&ldquo;{mural.quote}&rdquo;</p>
            </Reveal>
            <Reveal delay={0.25}>
              <Link href="/about#mural" className="font-ui text-sm link-underline text-paper/85 inline-flex items-center gap-2 mt-8">
                More on the mural <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] border border-line">
              <ArtworkPlaceholder title="The Human Current mural" tone="ember" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Press */}
      {press.length > 0 && (
        <section className="border-t border-line">
          <div className="container-gallery py-20 md:py-24">
            <Reveal>
              <p className="eyebrow mb-8 text-center">As Featured In</p>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-8">
              {press.slice(0, 3).map((item, i) => (
                <Reveal key={item.id} delay={i * 0.08}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group border border-line hover:border-line-bright p-6 h-full transition-colors"
                  >
                    <p className="font-ui text-xs tracking-wide uppercase text-ember-bright">
                      {item.publication}
                    </p>
                    <p className="font-display text-lg text-paper mt-3 leading-snug group-hover:text-paper/80">
                      {item.title}
                    </p>
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="text-center mt-10">
                <Link href="/journal" className="font-ui text-sm link-underline text-paper/80">
                  Read the full journal
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="border-t border-line">
        <div className="container-gallery py-24 md:py-32 text-center">
          <Reveal>
            <p className="eyebrow mb-4">Enquiries</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl md:text-5xl text-paper text-balance max-w-2xl mx-auto">
              Interested in a piece, or a commission?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <Link
                href="/contact"
                className="font-ui text-sm inline-flex items-center gap-2 bg-ember hover:bg-ember-bright text-ink px-7 py-3.5 transition-colors"
              >
                Get in touch <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
