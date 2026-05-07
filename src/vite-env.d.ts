/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_CLARITY_PROJECT_ID?: string;
  /** When `"true"`, GA4 sends with debug_mode so events show in Admin → DebugView */
  readonly VITE_GA_DEBUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  /** Clarity queue stub or full SDK; stub exposes `.q` until the tag script replaces behavior. */
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
}
