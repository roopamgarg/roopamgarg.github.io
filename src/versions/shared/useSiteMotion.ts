import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./motion";

/**
 * Smooth scrolling (Lenis) driven by the GSAP ticker so ScrollTrigger stays in
 * sync. Skipped entirely for reduced-motion visitors, who keep native scroll.
 */
export function useSiteMotion() {
  useEffect(() => {
    // Late font swaps change line heights; re-measure every trigger once fonts settle.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
