import { useTheme } from "@/theme/useTheme";
import { getIcon } from "@/lib/icons";

export function ThemeToggle() {
  const { preference, cyclePreference, preferences } = useTheme();
  const meta = preferences[preference];
  const Icon = getIcon(meta.icon);

  const cycleOrder: Array<keyof typeof preferences> = [
    "dark",
    "light",
    "system",
  ];
  const nextIndex =
    (cycleOrder.indexOf(preference) + 1) % cycleOrder.length;
  const nextLabel = preferences[cycleOrder[nextIndex]].label;

  return (
    <button
      type="button"
      onClick={cyclePreference}
      aria-label={`Theme: ${meta.label}. Click to switch to ${nextLabel}.`}
      title={`Theme: ${meta.label}`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/10 bg-surface/80 text-muted transition-colors hover:text-text hover:border-border/20"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
