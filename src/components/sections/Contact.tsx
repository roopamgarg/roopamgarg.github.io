import { Github, Linkedin, Mail } from "lucide-react";
import { useSectionView } from "@/hooks/useSectionView";
import { ICON_STROKE } from "@/lib/icons";
import { trackCtaClick } from "@/lib/analytics";
import type { ContactSpec, NavItem } from "@/types/portfolio";

interface ContactProps {
  navItem: NavItem;
  contact: ContactSpec;
  brand: string;
}

export function Contact({ navItem, contact, brand }: ContactProps) {
  useSectionView(navItem.id);
  const year = new Date().getFullYear();

  return (
    <section
      id={navItem.id}
      aria-labelledby={`${navItem.id}-heading`}
      className="border-t border-border/[0.07]"
    >
      <div className="container-page pb-10 pt-20 md:pt-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="space-y-6 lg:col-span-8">
            <h2
              id={`${navItem.id}-heading`}
              className="text-5xl font-semibold leading-[1] tracking-[-0.025em] text-text md:text-7xl lg:text-[5.5rem]"
            >
              {contact.headline}
            </h2>
            <p className="max-w-[40ch] text-lg leading-relaxed text-muted">
              {contact.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`mailto:${contact.email}`}
                onClick={() => trackCtaClick("email", "contact")}
                className="btn-primary"
              >
                <Mail className="h-4 w-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
                {contact.email}
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCtaClick("linkedin", "contact")}
                className="btn-secondary"
              >
                <Linkedin className="h-4 w-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
                Connect on LinkedIn
              </a>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-6 lg:col-span-4 lg:justify-self-end">
            <div className="space-y-1.5">
              <dt className="text-sm text-muted">Currently</dt>
              <dd className="flex items-center gap-2 text-base font-medium text-text">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {contact.status}
              </dd>
            </div>
            <div className="space-y-1.5">
              <dt className="text-sm text-muted">Based in</dt>
              <dd className="text-base font-medium text-text">{contact.location}</dd>
            </div>
          </dl>
        </div>

        <footer className="mt-24 flex flex-col-reverse gap-4 border-t border-border/[0.07] pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {brand}
          </p>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-text"
          >
            <Github className="h-4 w-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
            github.com/roopamgarg
          </a>
        </footer>
      </div>
    </section>
  );
}
