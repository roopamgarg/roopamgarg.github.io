import { SectionLabel } from "../SectionLabel";
import { TerminalWindow } from "./TerminalWindow";
import { TraitCard } from "./TraitCard";
import type { AboutSpec, NavItem } from "@/types/portfolio";

interface AboutProps {
  navItem: NavItem;
  about: AboutSpec;
}

export function About({ navItem, about }: AboutProps) {
  return (
    <section
      id={navItem.id}
      aria-labelledby={`${navItem.id}-heading`}
      className="grid gap-8 border-b border-border/10 px-4 py-16 md:grid-cols-[220px_minmax(0,1fr)] md:px-8 lg:grid-cols-[240px_minmax(0,1fr)]"
    >
      <div id={`${navItem.id}-heading`}>
        <SectionLabel item={navItem} />
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <TerminalWindow lines={about.whoami} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {about.traits.map((trait) => (
            <TraitCard key={trait.title} trait={trait} />
          ))}
        </div>
      </div>
    </section>
  );
}
