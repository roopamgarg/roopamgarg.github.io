import type { ExperienceItem } from "@/types/portfolio";

interface TimelineProps {
  items: ExperienceItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="space-y-8">
      {items.map((item, idx) => (
        <li
          key={item.period}
          className="group grid gap-2 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-4 md:grid-cols-[130px_minmax(0,1fr)] md:gap-6"
        >
          <div className="pt-1 font-mono text-xs text-muted transition-colors duration-300 group-hover:text-text">
            {item.period}
          </div>
          <div className="min-w-0 space-y-1.5 border-l border-border/15 group-hover:border-accent/35 pl-4 md:pl-6 transition-colors duration-300 relative">
            {/* Elegant magnetic timeline node */}
            <span
              className={[
                "absolute -left-[5.5px] top-1.5 h-[10px] w-[10px] rounded-full border-2 border-bg transition-all duration-300",
                idx === 0
                  ? "bg-accent group-hover:scale-125"
                  : "bg-muted group-hover:bg-accent group-hover:scale-125",
              ].join(" ")}
              aria-hidden="true"
            />
            <div className="text-sm font-black normal-case md:uppercase tracking-wider text-text transition-colors duration-300 group-hover:text-accent">{item.role}</div>
            <div className="text-xs font-bold normal-case md:uppercase tracking-wider text-accent/80 transition-colors duration-300 group-hover:text-accent">{item.company}</div>
            <p className="text-sm leading-relaxed text-muted pt-1">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
