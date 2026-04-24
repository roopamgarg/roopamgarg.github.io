import type { ExperienceItem } from "@/types/portfolio";

interface TimelineProps {
  items: ExperienceItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="space-y-8">
      {items.map((item) => (
        <li
          key={item.period}
          className="grid grid-cols-[110px_minmax(0,1fr)] gap-4 md:grid-cols-[130px_minmax(0,1fr)] md:gap-6"
        >
          <div className="pt-1 font-mono text-xs text-muted">
            {item.period}
          </div>
          <div className="space-y-1.5 border-l border-border/10 pl-4 md:pl-6">
            <div className="text-sm font-semibold text-text">{item.role}</div>
            <div className="text-sm text-accent">{item.company}</div>
            <p className="text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
