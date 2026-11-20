import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Brain,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  Monitor,
  Moon,
  Sun,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types/portfolio";

/** All icons share one stroke width so the set reads as a single family. */
export const ICON_STROKE = 1.75;

export const icons: Record<IconName, LucideIcon> = {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Brain,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  Monitor,
  Moon,
  Sun,
  Target,
  X,
};

export function getIcon(name: IconName): LucideIcon {
  return icons[name];
}
