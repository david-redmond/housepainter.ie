export const CONSENT_KEY = "sp_cookie_consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
const GA_SCRIPT_ID = "ga-gtag";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

export function getConsent(): "accepted" | "rejected" | "unknown" {
  if (typeof window === "undefined") return "unknown";
  const stored = window.localStorage.getItem(CONSENT_KEY);
  if (stored === "accepted" || stored === "rejected") return stored;
  return "unknown";
}

export function setConsent(value: "accepted" | "rejected") {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent("sp:consent-change", { detail: value }));
}

function ensureGtag() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  } as GtagFn;
}

function injectScript() {
  if (typeof document === "undefined") return;
  if (!GA_ID) return;
  if (document.getElementById(GA_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = GA_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export function setDefaultConsent() {
  if (typeof window === "undefined") return;
  ensureGtag();
  if (typeof window.gtag === "function") {
    window.gtag("consent", "default", { analytics_storage: "denied" });
  }
}

export function enableAnalytics() {
  if (!GA_ID || typeof window === "undefined") return;

  ensureGtag();
  injectScript();

  if (typeof window.gtag === "function") {
    window.gtag("consent", "default", { analytics_storage: "denied" });
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (getConsent() !== "accepted") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params ?? {});
}
