import type { NavItem } from "@/types/portfolio";

interface TechMarqueeProps {
  navItem: NavItem;
  items: string[];
}

/** Breadth of tools that don't each need attention: one slow marquee. */
export function TechMarquee({ navItem, items }: TechMarqueeProps) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden ? "true" : undefined}
      className="flex shrink-0 flex-wrap items-center gap-x-12 gap-y-3 pr-12"
    >
      {items.map((item) => (
        <li
          key={item}
          className="whitespace-nowrap text-2xl font-medium tracking-tight text-muted transition-colors duration-200 hover:text-text md:text-3xl"
        >
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <section
      id={navItem.id}
      aria-labelledby={`${navItem.id}-heading`}
      className="border-y border-border/[0.07] py-10 md:py-12"
    >
      <h2 id={`${navItem.id}-heading`} className="sr-only">
        Tech stack
      </h2>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
