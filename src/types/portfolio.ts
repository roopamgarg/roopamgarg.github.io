export type IconName =
  | "Mail"
  | "Linkedin"
  | "Github"
  | "Download"
  | "ArrowUpRight"
  | "ArrowRight"
  | "Sun"
  | "Moon"
  | "Monitor"
  | "Brain"
  | "Boxes"
  | "BookOpen"
  | "Target"
  | "Menu"
  | "X";

export interface NavItem {
  id: string;
  label: string;
  blurb?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectSnippet {
  title: string;
  code: string;
}

export interface Project {
  name: string;
  description: string;
  stack: string[];
  live?: string;
  github?: string;
  image?: ProjectImage;
  snippet?: ProjectSnippet;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
}

export interface Trait {
  icon: IconName;
  title: string;
  description: string;
}

export interface ArchitectureSpec {
  clients: string[];
  gateway: string;
  services: string[];
  stores: string[];
  connections?: Array<{
    service: string;
    stores: string[];
  }>;
  footer: string;
}

export interface HeroSpec {
  greeting: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  resumeHref: string;
}

export interface AboutSpec {
  statement: string;
  statementMuted: string;
  portrait: ProjectImage;
  traits: Trait[];
}

export interface ContactSpec {
  headline: string;
  description: string;
  email: string;
  linkedin: string;
  github: string;
  status: string;
  location: string;
}

export interface Portfolio {
  brand: string;
  nav: NavItem[];
  hero: HeroSpec;
  architecture: ArchitectureSpec;
  projects: Project[];
  experience: ExperienceItem[];
  techStack: string[];
  about: AboutSpec;
  contact: ContactSpec;
}
