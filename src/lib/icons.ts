import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  Brain,
  Code2,
  CreditCard,
  Download,
  Folder,
  Linkedin,
  Lock,
  Mail,
  Monitor,
  Moon,
  PanelLeft,
  PanelLeftClose,
  Sun,
  Target,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types/portfolio";

export const icons: Record<IconName, LucideIcon> = {
  Code2,
  Lock,
  CreditCard,
  Folder,
  Mail,
  Linkedin,
  Download,
  ArrowUpRight,
  Sun,
  Moon,
  Monitor,
  Brain,
  Boxes,
  BookOpen,
  Target,
  PanelLeft,
  PanelLeftClose,
};

export function getIcon(name: IconName): LucideIcon {
  return icons[name];
}
