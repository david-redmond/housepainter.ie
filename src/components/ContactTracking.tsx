"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Delegated click tracking for contact affordances (tel:, WhatsApp).
 * Mounted once in the layout so every phone/WhatsApp link is tracked
 * without wrapping each anchor individually.
 */
export default function ContactTracking() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackEvent("phone_click", { location: window.location.pathname });
      } else if (href.includes("wa.me") || href.startsWith("whatsapp:")) {
        trackEvent("whatsapp_click", { location: window.location.pathname });
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
