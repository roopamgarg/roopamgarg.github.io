import { PanelLeft, PanelLeftClose } from "lucide-react";

interface SidebarToggleProps {
  visible: boolean;
  onToggle: () => void;
}

export function SidebarToggle({ visible, onToggle }: SidebarToggleProps) {
  const Icon = visible ? PanelLeftClose : PanelLeft;
  const nextLabel = visible ? "Hide sidebar" : "Show sidebar";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={nextLabel}
      aria-pressed={!visible}
      title={nextLabel}
      className="hidden h-9 w-9 items-center justify-center rounded-full border border-border/10 bg-surface/80 text-muted transition-colors hover:border-border/20 hover:text-text md:inline-flex"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
