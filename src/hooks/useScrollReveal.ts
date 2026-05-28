import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    // Skip if browser supports native CSS Scroll-Driven Animations
    if (
      typeof CSS !== "undefined" &&
      CSS.supports &&
      CSS.supports("(animation-timeline: view()) and (animation-range: entry)")
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Optional: unobserve once visible to prevent repeat triggers
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -80px 0px", // Trigger slightly before it fully enters
      }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
}
