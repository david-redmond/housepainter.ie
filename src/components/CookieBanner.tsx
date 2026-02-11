"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_KEY, enableAnalytics, getConsent, setConsent, setDefaultConsent } from "@/lib/analytics";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setDefaultConsent();

    const consent = getConsent();
    if (consent === "accepted") {
      enableAnalytics();
      setVisible(false);
      return;
    }

    if (consent === "rejected") {
      setVisible(false);
      return;
    }

    setVisible(true);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(CONSENT_KEY);
      }
      setVisible(true);
    };

    window.addEventListener("sp:cookie-preferences", handler);
    return () => window.removeEventListener("sp:cookie-preferences", handler);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e6e6e6] bg-white px-6 py-5"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm text-[#1f1f1f]">
            We use analytics cookies to understand how visitors use this site and improve performance.
            You can learn more in our <Link className="underline" href="/cookies">cookie policy</Link>.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              setConsent("accepted");
              enableAnalytics();
              setVisible(false);
            }}
          >
            Accept analytics cookies
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => {
              setConsent("rejected");
              setVisible(false);
            }}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
