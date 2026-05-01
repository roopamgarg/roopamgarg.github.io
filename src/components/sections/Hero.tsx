import { ArrowUpRight, Download } from "lucide-react";
import type { ArchitectureSpec, HeroSpec, NavItem } from "@/types/portfolio";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

interface HeroProps {
  navItem: NavItem;
  hero: HeroSpec;
  architecture: ArchitectureSpec;
}

export function Hero({ navItem, hero, architecture }: HeroProps) {
  return (
    <section
      id={navItem.id}
      aria-labelledby="hero-heading"
      className="grid min-h-[calc(100dvh-4.5rem)] items-center gap-10 border-b border-border/10 px-4 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-12 md:px-8 md:py-16"
    >
      <div className="flex flex-col gap-6">
        <p className="text-sm text-muted">{hero.greeting}</p>
        <h1
          id="hero-heading"
          className="text-4xl font-bold leading-tight tracking-tight text-text md:text-5xl"
        >
          {hero.titleLead}{" "}
          <span className="text-accent">{hero.titleAccent}</span>
        </h1>
        <p className="max-w-md text-base leading-relaxed text-muted">
          {hero.description}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-fg transition-colors hover:brightness-110"
          >
            {hero.primaryCta}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://drive.google.com/file/d/1lwOmAjjsoOb-1j1m7jlbLwTnwVcDyS9F/view?usp=sharing"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-md border border-border/15 bg-surface/60 px-4 py-2 text-sm font-medium text-text transition-colors hover:border-border/25"
          >
            {hero.secondaryCta}
            <Download className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="min-w-0">
        <ArchitectureDiagram spec={architecture} />
      </div>
    </section>
  );
}
