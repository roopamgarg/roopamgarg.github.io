import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "sidebar-visible";

const DEFAULT_VISIBLE = false;

function readInitial(): boolean {
  if (typeof window === "undefined") return DEFAULT_VISIBLE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "true") return true;
    if (raw === "false") return false;
  } catch {
    // ignore
  }
  return DEFAULT_VISIBLE;
}

export function useSidebarVisible() {
  const [visible, setVisibleState] = useState<boolean>(() => readInitial());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(visible));
    } catch {
      // ignore
    }
  }, [visible]);

  const setVisible = useCallback((next: boolean) => {
    setVisibleState(next);
  }, []);

  const toggle = useCallback(() => {
    setVisibleState((v) => !v);
  }, []);

  return { visible, setVisible, toggle };
}
