import { useTheme } from "@/theme/useTheme";
import { getIcon, ICON_STROKE } from "@/lib/icons";

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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/10 text-muted transition-colors hover:border-border/20 hover:text-text active:scale-[0.96]"
    >
      <Icon className="h-4 w-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
    </button>
  );
}
