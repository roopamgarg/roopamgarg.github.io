import { BookOpen, Boxes, Brain, Target, type LucideIcon } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import type { IconName, Project } from "@/types/portfolio";

/** All three versions read the same data file as the live site. */
export const p = portfolio;
export const current = portfolio.experience[0];
export const year = new Date().getFullYear();

export const projectsMeta = portfolio.nav.find((n) => n.id === "projects");
export const experienceMeta = portfolio.nav.find((n) => n.id === "experience");

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
];

/** Domains taken from the projects and roles in the data file. */
export const focusAreas = [
  "Real-time systems",
  "AI agents",
  "Payments",
  "Frontend at scale",
  "Desktop apps",
  "Browser games",
];

export const picsum = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const projectHref = (project: Project) => project.live ?? project.github ?? "#";

/** "Observe.AI" -> "OA", "Five9" -> "F9", "Juspay" -> "JU". */
export const monogram = (name: string) => {
  const parts = name.split(/[^A-Za-z0-9]+/).filter(Boolean);
  if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
  const digit = name.match(/\d/);
  return (name[0] + (digit ? digit[0] : name[1])).toUpperCase();
};

export const TRAIT_ICONS: Partial<Record<IconName, LucideIcon>> = {
  Brain,
  Boxes,
  BookOpen,
  Target,
};
