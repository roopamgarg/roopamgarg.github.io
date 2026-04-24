import { Linkedin, Mail } from "lucide-react";
import { SectionLabel } from "../SectionLabel";
import { WorldMap } from "./WorldMap";
import type { ContactSpec, NavItem } from "@/types/portfolio";

interface ContactProps {
  navItem: NavItem;
  contact: ContactSpec;
}

export function Contact({ navItem, contact }: ContactProps) {
  return (
    <section
      id={navItem.id}
      aria-labelledby={`${navItem.id}-heading`}
      className="grid gap-8 px-4 py-16 md:grid-cols-[220px_minmax(0,1fr)] md:px-8 lg:grid-cols-[240px_minmax(0,1fr)]"
    >
      <div id={`${navItem.id}-heading`}>
        <SectionLabel item={navItem} />
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.8fr)]">
        <div className="card space-y-5">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-text">
              {contact.headline}
            </h3>
            <p className="text-sm text-muted">{contact.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-md border border-border/15 bg-surface-2/70 px-3 py-2 text-sm text-text transition-colors hover:border-border/25"
            >
              <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
              {contact.email}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border/15 bg-surface-2/70 px-3 py-2 text-sm text-text transition-colors hover:border-border/25"
            >
              <Linkedin className="h-4 w-4 text-accent" aria-hidden="true" />
              Connect on LinkedIn
            </a>
          </div>
        </div>

        <div className="card flex items-center justify-center p-4">
          <WorldMap highlights={[{ x: 0.331, y: 0.801 }]} />
        </div>

        <div className="card space-y-5">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-widest text-muted">
              Currently
            </div>
            <div className="text-sm font-semibold text-accent">
              {contact.status}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-widest text-muted">
              Location
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-text">
              <span aria-hidden="true">{contact.location.flag}</span>
              {contact.location.label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
