import { getIcon } from "@/lib/icons";
import type { Trait } from "@/types/portfolio";

interface TraitCardProps {
  trait: Trait;
}

export function TraitCard({ trait }: TraitCardProps) {
  const Icon = getIcon(trait.icon);
  return (
    <article className="card space-y-3">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-text">{trait.title}</h3>
      <p className="text-sm leading-relaxed text-muted">{trait.description}</p>
    </article>
  );
}
