import { useEffect } from "react";
import { trackSectionView } from "@/lib/analytics";

export function useSectionView(sectionId: string, threshold = 0.5) {
  useEffect(() => {
    const node = document.getElementById(sectionId);
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            trackSectionView(sectionId);
          }
        });
      },
      { threshold: [threshold] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [sectionId, threshold]);
}
