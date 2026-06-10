import { ArrowUpRight } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { trackProjectClick } from "@/lib/analytics";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const Icon = getIcon(project.icon);

  return (
    <article className="card group flex h-full flex-col gap-4">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/20">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <header className="space-y-2">
        <h3 className="text-lg font-semibold text-text transition-colors duration-300 group-hover:text-accent">
          {project.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-muted/80">
          {project.description}
        </p>
      </header>

      <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.stack.map((tech) => (
          <li key={tech} className="pill transition-colors duration-300 group-hover:bg-accent/15 group-hover:text-accent">
            {tech}
          </li>
        ))}
      </ul>

      <footer
        className={`mt-auto flex items-center pt-4 text-sm ${project.live ? "justify-between" : "justify-end"}`}
      >
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProjectClick(project.name, "live")}
            className="group/link inline-flex items-center gap-1 font-medium text-accent hover:brightness-110"
          >
            Live
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackProjectClick(project.name, "github")}
          className="group/link inline-flex items-center gap-1 font-medium text-muted transition-colors hover:text-text"
        >
          GitHub
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </footer>
    </article>
  );
}
