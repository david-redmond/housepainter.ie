import type { Attribution } from "@/lib/validators";

const STORAGE_KEY = "sp_first_touch";

/**
 * Returns first-touch attribution (UTM params, referrer, landing path).
 * The first visit is persisted so later form submits keep original attribution.
 */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return undefined;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Attribution;
    }
  } catch {
    // ignore storage/parse errors and fall back to current values
  }

  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || "";
  const sameHostReferrer = referrer.includes(window.location.host);

  const attribution: NonNullable<Attribution> = {
    source: params.get("utm_source") ?? undefined,
    medium: params.get("utm_medium") ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
    term: params.get("utm_term") ?? undefined,
    content: params.get("utm_content") ?? undefined,
    referrer: !referrer || sameHostReferrer ? undefined : referrer,
    landingPath: window.location.pathname + window.location.search,
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // storage may be unavailable (private mode); non-fatal
  }

  return attribution;
}
