import type {
  PreferenceMeta,
  ThemeMeta,
  ThemeName,
  ThemePreference,
} from "@/types/theme";

export const themes: Record<ThemeName, ThemeMeta> = {
  dark: { name: "dark", label: "Dark", icon: "Moon" },
  light: { name: "light", label: "Light", icon: "Sun" },
};

export const preferences: Record<ThemePreference, PreferenceMeta> = {
  dark: { name: "dark", label: "Dark", icon: "Moon" },
  light: { name: "light", label: "Light", icon: "Sun" },
  system: { name: "system", label: "System", icon: "Monitor" },
};

export const DEFAULT_PREFERENCE: ThemePreference = "system";
export const STORAGE_KEY = "theme-preference";

export function isThemeName(value: unknown): value is ThemeName {
  return value === "dark" || value === "light";
}

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "dark" || value === "light" || value === "system";
}
