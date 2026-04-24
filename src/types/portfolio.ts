export type IconName =
  | "Code2"
  | "Lock"
  | "CreditCard"
  | "Folder"
  | "Mail"
  | "Linkedin"
  | "Download"
  | "ArrowUpRight"
  | "Sun"
  | "Moon"
  | "Monitor"
  | "Brain"
  | "Boxes"
  | "BookOpen"
  | "Target";

export interface NavItem {
  id: string;
  num: string;
  label: string;
  blurb?: string;
  ctaLabel?: string;
}

export interface Project {
  name: string;
  icon: IconName;
  description: string;
  stack: string[];
  live: string;
  github: string;
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
  footer: string;
}

export interface HeroSpec {
  greeting: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface AboutSpec {
  whoami: string[];
  traits: Trait[];
}

export interface ContactSpec {
  headline: string;
  description: string;
  email: string;
  linkedin: string;
  status: string;
  location: { label: string; flag: string };
}

export interface Portfolio {
  brand: string;
  nav: NavItem[];
  hero: HeroSpec;
  architecture: ArchitectureSpec;
  projects: Project[];
  experience: ExperienceItem[];
  techStack: string[];
  codeSnippet: string;
  about: AboutSpec;
  contact: ContactSpec;
}
