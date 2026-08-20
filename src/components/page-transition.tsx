import { ViewTransition } from "react";
import type { ReactNode } from "react";

const DIRECTIONAL = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
} as const;

/**
 * Maps the `transitionTypes` a <Link> was tagged with (see nav.tsx,
 * artwork-card.tsx, etc — "nav-forward" for going deeper, "nav-back" for
 * returning) to a directional slide on this page's content. Must be used
 * inside each page.tsx, not layout.tsx — layouts persist across
 * navigations, so their own enter/exit would never fire.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={DIRECTIONAL} exit={DIRECTIONAL} default="none">
      {children}
    </ViewTransition>
  );
}
