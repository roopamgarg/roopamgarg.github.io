import { useSectionView } from "@/hooks/useSectionView";
import { getIcon, ICON_STROKE } from "@/lib/icons";
import type { AboutSpec, NavItem } from "@/types/portfolio";

interface AboutProps {
  navItem: NavItem;
  about: AboutSpec;
}

export function About({ navItem, about }: AboutProps) {
  useSectionView(navItem.id);

  return (
    <section
      id={navItem.id}
      aria-labelledby={`${navItem.id}-heading`}
      className="container-page py-20 md:py-28"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4 lg:col-span-3">
          <img
            src={about.portrait.src}
            alt={about.portrait.alt}
            width={440}
            height={440}
            loading="lazy"
            decoding="async"
            className="aspect-square w-40 rounded-2xl border border-border/[0.08] object-cover md:w-full md:max-w-[260px]"
          />
        </div>

        <div className="md:col-span-8 lg:col-span-9">
          <h2 id={`${navItem.id}-heading`} className="sr-only">
            {navItem.label}
          </h2>
          <p className="max-w-[28ch] text-3xl font-medium leading-[1.2] tracking-tight text-text md:text-4xl lg:text-[2.75rem]">
            {about.statement}{" "}
            <span className="text-muted">{about.statementMuted}</span>
          </p>
        </div>
      </div>

      <dl className="mt-16 grid gap-x-8 gap-y-10 border-t border-border/[0.08] pt-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
        {about.traits.map((trait) => {
          const Icon = getIcon(trait.icon);
          return (
            <div key={trait.title} className="space-y-3">
              <dt className="flex items-center gap-2.5 text-base font-semibold text-text">
                <Icon className="h-[18px] w-[18px] text-accent" strokeWidth={ICON_STROKE} aria-hidden="true" />
                {trait.title}
              </dt>
              <dd className="max-w-[36ch] text-[15px] leading-relaxed text-muted">
                {trait.description}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
