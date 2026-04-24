import { ArrowUpRight } from "lucide-react";
import { getIcon } from "@/lib/icons";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const Icon = getIcon(project.icon);

  return (
    <article className="card flex h-full flex-col gap-4">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <header className="space-y-2">
        <h3 className="text-lg font-semibold text-text">{project.name}</h3>
        <p className="text-sm leading-relaxed text-muted">
          {project.description}
        </p>
      </header>

      <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.stack.map((tech) => (
          <li key={tech} className="pill">
            {tech}
          </li>
        ))}
      </ul>

      <footer className="mt-auto flex items-center justify-between pt-4 text-sm">
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
        >
          Live
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-muted hover:text-text"
        >
          GitHub
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </footer>
    </article>
  );
}
