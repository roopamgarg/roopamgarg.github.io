import type { NavItem } from "@/types/portfolio";

interface SectionLabelProps {
  item: NavItem;
  targetHref?: string;
}

export function SectionLabel({ item, targetHref }: SectionLabelProps) {
  return (
    <div className="space-y-3 md:sticky md:top-24">
      <div className="section-number">{item.num}</div>
      <h2 className="text-2xl font-semibold tracking-tight text-text">
        {item.label}
      </h2>
      {item.blurb && (
        <p className="max-w-[16rem] text-sm leading-relaxed text-muted">
          {item.blurb}
        </p>
      )}
      {item.ctaLabel && targetHref && (
        <a
          href={targetHref}
          className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          {item.ctaLabel}
          <span aria-hidden="true">{"\u2192"}</span>
        </a>
      )}
    </div>
  );
}
