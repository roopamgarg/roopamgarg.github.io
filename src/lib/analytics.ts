type AnalyticsTarget = "live" | "github";

let initialized = false;
let gaEnabled = false;
const ANALYTICS_DEBUG = true;

function debug(message: string, details?: unknown): void {
  if (!ANALYTICS_DEBUG) return;
  console.info(`[analytics] ${message}`, details ?? "");
}

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
  window.gtag ??= function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.clarity ??= () => {};
}

function hasAnyTrackingId(): boolean {
  return Boolean(
    import.meta.env.VITE_GA_MEASUREMENT_ID ||
      import.meta.env.VITE_CLARITY_PROJECT_ID,
  );
}

function warn(message: string, error?: unknown): void {
  console.warn(`[analytics] ${message}`, error ?? "");
}

export function initAnalytics(): void {
  if (!import.meta.env.PROD || initialized || !hasAnyTrackingId()) {
    debug("Init skipped.", {
      isProd: import.meta.env.PROD,
      initialized,
      hasAnyTrackingId: hasAnyTrackingId(),
    });
    return;
  }

  initialized = true;
  setupNoopStubs();

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const clarityId = import.meta.env.VITE_CLARITY_PROJECT_ID;
  debug("Init started.", { measurementId, clarityId });

  withIdleCallback(() => {
    debug("Idle callback fired.");
    if (measurementId) {
      void injectScript(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`)
        .then(() => {
          debug("GA script loaded.", {
            hasGoogleTagManager: Boolean((window as Window & { google_tag_manager?: unknown }).google_tag_manager),
          });
          window.gtag?.("js", new Date());
          debug("gtag js event pushed.", { dataLayerSize: window.dataLayer?.length });
          window.gtag?.("config", measurementId, {
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
          });
          debug("gtag config pushed.", { dataLayerSize: window.dataLayer?.length });
          // Force one first-hit event to make GA network verification straightforward.
          window.gtag?.("event", "page_view", {
            send_to: measurementId,
            page_location: window.location.href,
            page_path: window.location.pathname,
            page_title: document.title,
          });
          debug("page_view pushed.", { dataLayerSize: window.dataLayer?.length });
          gaEnabled = true;
        })
        .catch((error) => {
          warn("GA4 script load failed.", error);
        });
    } else {
      warn("GA4 measurement ID missing; GA4 is disabled.");
    }

    if (clarityId) {
      void injectScript("https://www.clarity.ms/tag/" + clarityId)
        .then(() => {
          window.clarity?.("start");
        })
        .catch((error) => {
          warn("Clarity script load failed.", error);
        });
    } else {
      warn("Clarity project ID missing; Clarity is disabled.");
    }
  });
}

function track(eventName: string, params: Record<string, string>): void {
  if (!gaEnabled) {
    debug(`Track skipped before GA enabled: ${eventName}`, params);
    return;
  }
  debug(`Track event: ${eventName}`, params);
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
