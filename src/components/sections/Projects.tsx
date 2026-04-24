import { SectionLabel } from "../SectionLabel";
import { ProjectCard } from "./ProjectCard";
import type { NavItem, Project } from "@/types/portfolio";

interface ProjectsProps {
  navItem: NavItem;
  projects: Project[];
}

export function Projects({ navItem, projects }: ProjectsProps) {
  return (
    <section
      id={navItem.id}
      aria-labelledby={`${navItem.id}-heading`}
      className="grid gap-8 border-b border-border/10 px-4 py-16 md:grid-cols-[220px_minmax(0,1fr)] md:px-8 lg:grid-cols-[240px_minmax(0,1fr)]"
    >
      <div id={`${navItem.id}-heading`}>
        <SectionLabel item={navItem} targetHref={`#${navItem.id}`} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
