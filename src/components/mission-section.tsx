import { Reveal } from "@/components/reveal";

export function MissionSection() {
  return (
    <section
      id="mission"
      aria-labelledby="mission-heading"
      className="border-t border-line bg-ink-raised/20 scroll-mt-24"
    >
      <div className="container-gallery py-24 md:py-32">
        <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-12 lg:gap-24">
          <Reveal>
            <div>
              <p className="eyebrow mb-4">Inquisitive Arts</p>
              <h2
                id="mission-heading"
                className="font-display text-3xl md:text-5xl text-paper text-balance"
              >
                Mission
              </h2>
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.05}>
              <p className="font-body text-lg md:text-xl text-paper/90 leading-relaxed">
                Inquisitive Arts is an independent, artist-led practice built around curiosity,
                critical thinking and the belief that art can do more than simply decorate a
                space.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-body text-base md:text-lg text-paper/72 leading-relaxed">
                Its mission is to create thoughtful, visually ambitious work that encourages
                people to question, reflect and connect with the places, histories and human
                experiences around them. Through painting, public art and site-responsive
                projects, Inquisitive Arts explores how contemporary art can carry meaning while
                remaining accessible beyond traditional gallery settings.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="font-body text-base md:text-lg text-paper/72 leading-relaxed">
                The practice is founded on the idea that art should not exist only as an object to
                be viewed, but as a way of opening conversations, revealing overlooked stories and
                giving spaces a stronger sense of identity and memory.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="font-body text-base md:text-lg text-paper/72 leading-relaxed">
                As Inquisitive Arts develops, the ambition is to build a sustainable independent
                practice capable of delivering significant public-art commissions, collaborative
                projects and socially engaged work while maintaining a clear artistic vision,
                professional integrity and commitment to meaningful cultural impact.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="font-display text-2xl md:text-3xl text-paper leading-snug border-t border-line pt-8 mt-8 text-balance">
                Inquisitive Arts is not about filling spaces with art. It is about creating work
                that gives those spaces something to say.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
