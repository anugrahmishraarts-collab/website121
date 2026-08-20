"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * reducedMotion="user" makes every motion.* component in the tree
 * (including Reveal's whileInView fades) automatically honor the OS-level
 * prefers-reduced-motion setting — cross-fading instead of animating
 * transforms. The global CSS reduced-motion rule in globals.css only
 * covers native CSS transitions/animations, not Framer Motion's
 * JS-driven ones, so this is the piece that actually reaches scroll reveals.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
