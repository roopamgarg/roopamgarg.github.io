import { ArrowUpRight, Github } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { useSectionView } from "@/hooks/useSectionView";
import { ICON_STROKE } from "@/lib/icons";
import { trackProjectClick } from "@/lib/analytics";
import type { NavItem, Project, ProjectSnippet } from "@/types/portfolio";

interface ProjectsProps {
  navItem: NavItem;
  projects: Project[];
}

/*
 * Bento rhythm on md+: row one is wide + narrow, row two is narrow + wide.
 * Wide media is 16:10 and narrow media is 4:5 so both cells in a row share
 * the same media height. Below md everything stacks at 16:10.
 */
const LAYOUT = [
  { span: "md:col-span-4", media: "md:aspect-[16/10]" },
  { span: "md:col-span-2", media: "md:aspect-[4/5]" },
  { span: "md:col-span-2", media: "md:aspect-[4/5]" },
  { span: "md:col-span-4", media: "md:aspect-[16/10]" },
];

export function Projects({ navItem, projects }: ProjectsProps) {
  useSectionView(navItem.id);

  return (
    <section
      id={navItem.id}
      aria-labelledby={`${navItem.id}-heading`}
      className="container-page py-20 md:py-28"
    >
      <SectionHeading item={navItem} className="mb-12 md:mb-14" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {projects.map((project, i) => (
          <ProjectTile
            key={project.name}
            project={project}
            layout={LAYOUT[i % LAYOUT.length]}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectTile({
  project,
  layout,
}: {
  project: Project;
  layout: (typeof LAYOUT)[number];
}) {
  const href = project.live ?? project.github;

  return (
    <article
      className={`group flex flex-col rounded-2xl border border-border/[0.08] bg-surface p-2.5 transition-colors duration-300 hover:border-accent/35 ${layout.span}`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => trackProjectClick(project.name, project.live ? "live" : "github")}
        className={`relative block aspect-[16/10] overflow-hidden rounded-xl border border-border/[0.06] bg-surface-2 ${layout.media}`}
      >
        {project.image ? (
          <img
            src={project.image.src}
            alt=""
            loading="lazy"
            decoding="async"
            width={1200}
            height={750}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        ) : project.snippet ? (
          <SnippetPanel snippet={project.snippet} />
        ) : null}
      </a>

      <div className="flex flex-1 flex-col gap-3 px-3 pb-3 pt-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight text-text">
            {project.name}
          </h3>
          <div className="flex shrink-0 items-center gap-1">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProjectClick(project.name, "live")}
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
              >
                Live
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} aria-hidden="true" />
                <span className="sr-only">: {project.name}</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProjectClick(project.name, "github")}
                aria-label={`${project.name} source on GitHub`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-text"
              >
                <Github className="h-4 w-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <p className="max-w-[60ch] text-[15px] leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

const KEYWORDS = new Set(["import", "from", "export", "default", "const"]);

function SnippetPanel({ snippet }: { snippet: ProjectSnippet }) {
  return (
    <div className="flex h-full w-full flex-col justify-center bg-[radial-gradient(120%_90%_at_100%_0%,rgb(var(--color-accent)/0.14),transparent_60%)] p-5 sm:p-8">
      <div className="w-full overflow-hidden rounded-xl border border-border/10 bg-bg/80 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
        <div className="border-b border-border/[0.08] px-4 py-2.5 font-mono text-xs text-muted">
          {snippet.title}
        </div>
        <pre className="overflow-x-auto px-4 py-4 font-mono text-[12px] leading-relaxed text-text sm:text-[13px]">
          <code>
            {snippet.code.split(/("[^"]*"|\b[a-z]+\b)/g).map((part, i) => {
              if (part.startsWith('"'))
                return (
                  <span key={i} className="text-accent">
                    {part}
                  </span>
                );
              if (KEYWORDS.has(part))
                return (
                  <span key={i} className="text-muted">
                    {part}
                  </span>
                );
              return part;
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}
