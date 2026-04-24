import type { IconName } from "./portfolio";

export type ThemeName = "dark" | "light";
export type ThemePreference = ThemeName | "system";

export interface ThemeMeta {
  name: ThemeName;
  label: string;
  icon: IconName;
}

export interface PreferenceMeta {
  name: ThemePreference;
  label: string;
  icon: IconName;
}
