import { SectionHeading } from "../SectionHeading";
import { useSectionView } from "@/hooks/useSectionView";
import type { ExperienceItem, NavItem } from "@/types/portfolio";

interface ExperienceProps {
  navItem: NavItem;
  experience: ExperienceItem[];
}

export function Experience({ navItem, experience }: ExperienceProps) {
  useSectionView(navItem.id);

  return (
    <section
      id={navItem.id}
      aria-labelledby={`${navItem.id}-heading`}
      className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-12"
    >
      <div className="lg:col-span-4">
        <SectionHeading item={navItem} className="lg:sticky lg:top-28" />
      </div>

      <ol className="divide-y divide-border/[0.08] lg:col-span-8">
        {experience.map((item) => (
          <li
            key={item.period}
            className="grid gap-3 py-8 first:pt-0 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8"
          >
            <p className="pt-1.5 font-mono text-sm text-muted">{item.period}</p>
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold tracking-tight text-text">
                {item.role}
                <span className="text-muted"> at </span>
                <span className="text-accent">{item.company}</span>
              </h3>
              <p className="max-w-[60ch] text-base leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
