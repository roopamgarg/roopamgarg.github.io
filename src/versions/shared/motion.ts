import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

/**
 * Media-query conditions shared by every version. All scroll-driven motion is
 * registered under `motion`, so visitors who ask for reduced motion get the
 * static end state of every animation.
 */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 768px)",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
