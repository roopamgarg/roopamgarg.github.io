import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ThemeName, ThemePreference } from "@/types/theme";
import {
  DEFAULT_PREFERENCE,
  STORAGE_KEY,
  isThemePreference,
  preferences,
  themes,
} from "./themes";

interface ThemeContextValue {
  preference: ThemePreference;
  resolvedTheme: ThemeName;
  setPreference: (pref: ThemePreference) => void;
  cyclePreference: () => void;
  preferences: typeof preferences;
  themes: typeof themes;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const SYSTEM_QUERY = "(prefers-color-scheme: dark)";

function readSystemTheme(): ThemeName {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia(SYSTEM_QUERY).matches ? "dark" : "light";
}

function readStoredPreference(): ThemePreference {
  if (typeof window === "undefined") return DEFAULT_PREFERENCE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return isThemePreference(raw) ? raw : DEFAULT_PREFERENCE;
  } catch {
    return DEFAULT_PREFERENCE;
  }
}

function resolve(preference: ThemePreference, system: ThemeName): ThemeName {
  return preference === "system" ? system : preference;
}

const CYCLE: ThemePreference[] = ["dark", "light", "system"];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(() =>
    readStoredPreference(),
  );
  const [systemTheme, setSystemTheme] = useState<ThemeName>(() =>
    readSystemTheme(),
  );

  const resolvedTheme = useMemo(
    () => resolve(preference, systemTheme),
    [preference, systemTheme],
  );

  useEffect(() => {
    if (preference !== "system") return;
    const mq = window.matchMedia(SYSTEM_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [preference]);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    const metaThemeColor = document.getElementById("meta-theme-color");
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        resolvedTheme === "dark" ? "#0a0e1a" : "#ffffff",
      );
    }
  }, [resolvedTheme]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      document.documentElement.classList.add("theme-ready");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors (private mode etc.)
    }
  }, []);

  const cyclePreference = useCallback(() => {
    setPreferenceState((current) => {
      const idx = CYCLE.indexOf(current);
      const next = CYCLE[(idx + 1) % CYCLE.length];
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      preference,
      resolvedTheme,
      setPreference,
      cyclePreference,
      preferences,
      themes,
    }),
    [preference, resolvedTheme, setPreference, cyclePreference],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
