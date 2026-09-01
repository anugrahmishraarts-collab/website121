import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageTransition } from "@/components/page-transition";
import { getPressFeatures } from "@/lib/data";
import { bio } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "Journal",
  description: "Critical reviews, interviews, media coverage and artist biography for Anugrah Mishra.",
};

export default async function JournalPage() {
  const press = await getPressFeatures();

  return (
    <PageTransition>
    <div className="container-gallery pt-40 pb-28">
      <Reveal>
        <p className="eyebrow mb-4">Journal</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="font-display text-4xl md:text-6xl text-paper text-balance max-w-3xl">
          Press &amp; features
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="font-body text-lg text-paper/70 mt-6 max-w-xl leading-relaxed mb-16">
          Interviews, exhibitions and coverage of the studio&rsquo;s work, gathered in one place.
        </p>
      </Reveal>

      <ul className="max-w-3xl divide-y divide-line current-line pl-8 md:pl-12">
        {press.map((item, i) => (
          <Reveal as="li" key={item.id} delay={i * 0.04}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-6 py-8"
            >
              <div>
                <p className="font-ui text-xs tracking-[0.14em] uppercase text-ember-bright mb-2">
                  {item.publication}
                </p>
                <p className="font-display text-xl md:text-2xl text-paper group-hover:text-paper/80 transition-colors text-balance">
                  {item.title}
                </p>
                <p className="font-body text-base text-muted mt-3 max-w-xl leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
              <ArrowUpRight
                size={20}
                className="text-muted group-hover:text-ember-bright transition-colors shrink-0 mt-1"
              />
            </a>
          </Reveal>
        ))}
      </ul>

      <section className="border-t border-line mt-24 pt-20 grid lg:grid-cols-[0.7fr_1.3fr] gap-8 lg:gap-20">
        <Reveal>
          <div>
            <p className="eyebrow mb-4">Artist Bio</p>
            <h2 className="font-display text-3xl md:text-4xl text-paper text-balance">
              About Anugrah Mishra
            </h2>
          </div>
        </Reveal>
        <div className="current-line pl-8 md:pl-12">
          <Reveal delay={0.05}>
            <p className="font-body text-lg md:text-xl text-paper/80 leading-relaxed">
              {bio.short}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8">
              <Link
                href="/about"
                className="font-ui text-sm text-paper inline-flex items-center gap-2 hover:text-ember-bright transition-colors"
              >
                Full biography <ArrowRight size={16} />
              </Link>
              <a
                href="/Anugrah-Mishra-Artist-CV.pdf"
                download
                className="font-ui text-sm text-paper inline-flex items-center gap-2 hover:text-ember-bright transition-colors"
              >
                Download artist CV <Download size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
    </PageTransition>
  );
}
