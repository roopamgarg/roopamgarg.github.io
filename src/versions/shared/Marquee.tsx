import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "./motion";

/**
 * Seamless loop: the content is rendered twice and the track slides by half its
 * width. Reduced-motion visitors see the first copy standing still.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          track.current,
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, duration, ease: "none", repeat: -1 },
        );
      });
      return () => mm.revert();
    },
    { scope: track },
  );

  return (
    <div className={`flex overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max shrink-0 will-change-transform">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
