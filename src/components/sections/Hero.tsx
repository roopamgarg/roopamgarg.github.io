import { ArrowUpRight, Download } from "lucide-react";
import { useSectionView } from "@/hooks/useSectionView";
import { trackCtaClick, trackResumeDownload } from "@/lib/analytics";
import type { ArchitectureSpec, HeroSpec, NavItem } from "@/types/portfolio";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

interface HeroProps {
  navItem: NavItem;
  hero: HeroSpec;
  architecture: ArchitectureSpec;
}

export function Hero({ navItem, hero, architecture }: HeroProps) {
  useSectionView(navItem.id);

  return (
    <section
      id={navItem.id}
      aria-labelledby="hero-heading"
      className="relative grid min-h-[calc(100dvh-4.5rem)] items-center gap-12 border-b border-border/5 px-4 py-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-16 md:px-8 md:py-24 overflow-hidden"
    >
      {/* Decorative background glow orbs */}
      <div className="absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute right-10 bottom-10 -z-10 h-80 w-80 rounded-full bg-accent/[0.04] blur-[140px]" />

      <div className="flex flex-col gap-6 relative z-10">
        <div className="inline-flex max-w-fit items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.03] px-3.5 py-1 font-mono text-[10px] font-bold normal-case md:uppercase tracking-[0.2em] text-accent select-none">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          {hero.greeting} 👋
        </div>

        <h1
          id="hero-heading"
          className="text-5xl font-black leading-[1.05] tracking-tight text-text sm:text-6xl md:text-7xl normal-case md:uppercase font-sans"
        >
          {hero.titleLead}{" "}
          <span className="text-accent font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-accent/90 block mt-1">
            {hero.titleAccent}
          </span>
        </h1>

        <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
          {hero.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            onClick={() => trackCtaClick("view_projects", "hero")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-xs font-bold normal-case md:uppercase tracking-wider text-accent-fg transition-all hover:scale-[1.02]"
          >
            {hero.primaryCta}
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
          </a>
          
          <a
            href="https://drive.google.com/file/d/1lwOmAjjsoOb-1j1m7jlbLwTnwVcDyS9F/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackResumeDownload("hero")}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border/10 bg-surface/30 px-5 py-3 text-xs font-bold normal-case md:uppercase tracking-wider text-text transition-all hover:bg-surface/50 hover:border-border/20 hover:scale-[1.02]"
          >
            {hero.secondaryCta}
            <Download className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="relative min-w-0 flex items-center justify-center">
        {/* Glow backdrop directly behind diagram */}
        <div className="absolute inset-0 m-auto h-[80%] w-[80%] rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none" />
        <div className="relative z-10 w-full">
          <ArchitectureDiagram spec={architecture} />
        </div>
      </div>
    </section>
  );
}
