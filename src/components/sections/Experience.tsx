import { SectionLabel } from "../SectionLabel";
import { CodeWindow } from "./CodeWindow";
import { TechStack } from "./TechStack";
import { Timeline } from "./Timeline";
import type { ExperienceItem, NavItem } from "@/types/portfolio";

interface ExperienceProps {
  navItem: NavItem;
  experience: ExperienceItem[];
  techStack: string[];
  codeSnippet: string;
}

export function Experience({
  navItem,
  experience,
  techStack,
  codeSnippet,
}: ExperienceProps) {
  return (
    <section
      id={navItem.id}
      aria-labelledby={`${navItem.id}-heading`}
      className="grid gap-8 border-b border-border/10 px-4 py-16 md:grid-cols-[220px_minmax(0,1fr)] md:px-8 lg:grid-cols-[240px_minmax(0,1fr)]"
    >
      <div id={`${navItem.id}-heading`}>
        <SectionLabel item={navItem} targetHref={`#${navItem.id}`} />
      </div>

      <div className="grid min-w-0 gap-8 md:grid-cols-2 md:gap-10">
        <div className="card min-w-0 overflow-hidden">
          <Timeline items={experience} />
        </div>
        <div className="min-w-0 flex flex-col gap-6">
          <div className="card min-w-0">
            <TechStack items={techStack} />
          </div>
          <CodeWindow code={codeSnippet} />
        </div>
      </div>
    </section>
  );
}
