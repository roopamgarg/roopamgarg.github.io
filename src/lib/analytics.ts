type AnalyticsTarget = "live" | "github";

let initialized = false;
let enabled = false;

function injectScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(script);
  });
}

function withIdleCallback(fn: () => void): void {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
  };

  if (typeof w.requestIdleCallback === "function") {
    w.requestIdleCallback(fn, { timeout: 3000 });
    return;
  }

  window.setTimeout(fn, 1200);
}

function setupNoopStubs(): void {
  window.dataLayer ??= [];
  window.gtag ??= (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.clarity ??= () => {};
}

function hasTrackingIds(): boolean {
  return Boolean(
    import.meta.env.VITE_GA_MEASUREMENT_ID &&
      import.meta.env.VITE_CLARITY_PROJECT_ID,
  );
}

function warn(message: string, error?: unknown): void {
  console.warn(`[analytics] ${message}`, error ?? "");
}

export function initAnalytics(): void {
  if (!import.meta.env.PROD || initialized || !hasTrackingIds()) {
    return;
  }

  initialized = true;
  enabled = true;
  setupNoopStubs();

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID!;
  const clarityId = import.meta.env.VITE_CLARITY_PROJECT_ID!;

  withIdleCallback(() => {
    void injectScript(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`)
      .then(() => {
        window.gtag?.("js", new Date());
        window.gtag?.("config", measurementId, {
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
        });
      })
      .catch((error) => {
        warn("GA4 script load failed.", error);
      });

    void injectScript("https://www.clarity.ms/tag/" + clarityId)
      .then(() => {
        window.clarity?.("start");
      })
      .catch((error) => {
        warn("Clarity script load failed.", error);
      });
  });
}

function track(eventName: string, params: Record<string, string>): void {
  if (!enabled) return;
  window.gtag?.("event", eventName, params);
}

const seenSections = new Set<string>();

export function trackSectionView(sectionId: string): void {
  if (seenSections.has(sectionId)) return;
  seenSections.add(sectionId);
  track("section_view", { section_id: sectionId });
}

export function trackCtaClick(ctaName: string, location: string): void {
  track("cta_click", { cta_name: ctaName, location });
}

export function trackProjectClick(
  projectName: string,
  target: AnalyticsTarget,
): void {
  track("project_click", { project_name: projectName, target });
}

export function trackResumeDownload(location: string): void {
  track("resume_download", { location });
}
