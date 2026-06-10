import type { NavItem } from "@/types/portfolio";

interface SectionLabelProps {
  item: NavItem;
  targetHref?: string;
}

export function SectionLabel({ item, targetHref }: SectionLabelProps) {
  return (
    <div className="space-y-4 md:sticky md:top-24 select-none">
      <div className="flex items-center gap-2 font-mono text-xs capitalize tracking-[0.2em] text-accent font-semibold">
        <span>{item.num}</span>
        <span className="h-[1.5px] w-10 bg-accent/50" aria-hidden="true" />
      </div>
      <h2 className="text-3xl font-black tracking-tight text-text capitalize sm:text-4xl">
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
          className="group inline-flex items-center gap-1.5 text-xs font-bold capitalize tracking-wider text-accent hover:brightness-110"
        >
          {item.ctaLabel}
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">{"\u2192"}</span>
        </a>
      )}
    </div>
  );
}
