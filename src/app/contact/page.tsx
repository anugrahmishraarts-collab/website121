import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { getArtworkBySlug } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about a piece, a commission, or a public art enquiry.",
};

type SearchParams = Promise<{ artwork?: string }>;

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const { artwork: artworkSlug } = await searchParams;
  const artwork = artworkSlug ? await getArtworkBySlug(artworkSlug) : null;

  return (
    <div className="container-gallery pt-40 pb-28">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow mb-4">Contact</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-4xl md:text-5xl text-paper text-balance">
              Get in touch
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body text-lg text-paper/70 mt-6 leading-relaxed max-w-md">
              For enquiries about acquiring a piece, commissions, exhibitions, or public art
              projects — send a message and Anugrah will reply directly.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-body italic text-muted mt-10">
              Based in London, United Kingdom.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactForm artworkSlug={artwork?.slug} artworkTitle={artwork?.title} />
        </Reveal>
      </div>
    </div>
  );
}
