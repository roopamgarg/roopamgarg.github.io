import { useEffect, useRef } from "react";

export function InteractiveGrid() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      el.style.setProperty("--grid-mx", "50%");
      el.style.setProperty("--grid-my", "40%");
      return;
    }

    let rafId = 0;
    let nextX = window.innerWidth / 2;
    let nextY = window.innerHeight / 2;

    const apply = () => {
      el.style.setProperty("--grid-mx", `${nextX}px`);
      el.style.setProperty("--grid-my", `${nextY}px`);
      rafId = 0;
    };

    const onMove = (event: PointerEvent) => {
      nextX = event.clientX;
      nextY = event.clientY;
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        ["--grid-mx" as string]: "50%",
        ["--grid-my" as string]: "40%",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--color-border) / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--color-border) / 0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 65% at 50% 45%, rgb(0 0 0) 45%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 65% at 50% 45%, rgb(0 0 0) 45%, transparent 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(260px circle at var(--grid-mx) var(--grid-my), rgb(var(--color-accent) / 0.13), transparent 60%)",
        }}
      />
    </div>
  );
}
