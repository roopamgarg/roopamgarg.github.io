import { ArrowUpRight } from "lucide-react";
import { ICON_STROKE } from "@/lib/icons";
import type { NavItem } from "@/types/portfolio";

interface SectionHeadingProps {
  item: NavItem;
  title?: string;
  className?: string;
}

/** Headline, one-line blurb and optional outbound link, stacked vertically. */
export function SectionHeading({ item, title, className = "" }: SectionHeadingProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h2
        id={`${item.id}-heading`}
        className="text-4xl font-semibold leading-[1.05] tracking-tight text-text md:text-5xl"
      >
        {title ?? item.label}
      </h2>
      {item.blurb && (
        <p className="max-w-[46ch] text-base leading-relaxed text-muted">
          {item.blurb}
        </p>
      )}
      {item.ctaLabel && item.ctaHref && (
        <a
          href={item.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          {item.ctaLabel}
          <ArrowUpRight className="h-4 w-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
