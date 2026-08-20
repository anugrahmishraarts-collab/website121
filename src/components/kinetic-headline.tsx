"use client";

import { motion } from "motion/react";

/**
 * Word-by-word stagger reveal for the homepage's hero line — the one
 * signature kinetic moment on the site. Each word blurs and rises into
 * place rather than the whole line fading as a block. Runs once on
 * mount (not scroll-tied), so it's cheap: a handful of short transform/
 * opacity/filter tweens, not a scroll listener.
 */
export function KineticHeadline({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] mr-[0.28em]" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.9,
              delay: 0.15 + i * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
