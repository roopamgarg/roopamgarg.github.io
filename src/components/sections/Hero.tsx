import { ArrowRight, Download } from "lucide-react";
import type { CSSProperties } from "react";
import { useSectionView } from "@/hooks/useSectionView";
import { ICON_STROKE } from "@/lib/icons";
import { trackCtaClick, trackResumeDownload } from "@/lib/analytics";
import type { ArchitectureSpec, HeroSpec, NavItem } from "@/types/portfolio";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

interface HeroProps {
  navItem: NavItem;
  hero: HeroSpec;
  architecture: ArchitectureSpec;
}

const delay = (ms: number) => ({ "--hero-delay": `${ms}ms` }) as CSSProperties;

export function Hero({ navItem, hero, architecture }: HeroProps) {
  useSectionView(navItem.id);

  return (
    <section
      id={navItem.id}
      aria-labelledby="hero-heading"
      className="container-page flex min-h-[calc(100dvh-4rem)] flex-col justify-center gap-10 py-12 md:gap-12 md:py-16 lg:py-20"
    >
      <div className="space-y-5">
        <p
          className="hero-enter-item font-mono text-sm text-muted"
          style={delay(0)}
        >
          {hero.greeting}
        </p>

        <h1
          id="hero-heading"
          className="hero-enter-item text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.025em] text-text sm:text-6xl lg:text-[4.25rem] xl:text-[5rem]"
          style={delay(90)}
        >
          <span className="block">{hero.titleLead}</span>
          <span className="block text-accent">{hero.titleAccent}</span>
        </h1>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-8 lg:col-span-4 lg:pt-2">
          <p
            className="hero-enter-item max-w-[34ch] text-lg leading-relaxed text-muted"
            style={delay(180)}
          >
            {hero.description}
          </p>

          <div
            className="hero-enter-item flex flex-wrap items-center gap-3"
            style={delay(260)}
          >
            <a
              href="#projects"
              onClick={() => trackCtaClick("view_projects", "hero")}
              className="btn-primary group"
            >
              {hero.primaryCta}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={ICON_STROKE}
                aria-hidden="true"
              />
            </a>
            <a
              href={hero.resumeHref} download
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackResumeDownload("hero")}
              className="btn-secondary"
            >
              {hero.secondaryCta}
              <Download className="h-4 w-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
            </a>
          </div>
        </div>

        <figure
          className="hero-enter-item min-w-0 rounded-2xl border border-border/[0.08] bg-surface/70 p-4 sm:p-6 lg:col-span-8"
          style={delay(320)}
        >
          <ArchitectureDiagram spec={architecture} />
          <figcaption className="sr-only">
            Example service architecture: clients through an API gateway to
            services and data stores, with shared observability.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
