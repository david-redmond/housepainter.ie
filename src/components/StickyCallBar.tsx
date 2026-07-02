"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getConsent } from "@/lib/analytics";
import { phoneTel } from "@/lib/constants";

/**
 * Persistent mobile conversion bar. Rendered only after the visitor has made a
 * cookie decision so it never overlaps the cookie banner.
 */
export default function StickyCallBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const evaluate = () => setShow(getConsent() !== "unknown");
    evaluate();

    window.addEventListener("sp:consent-change", evaluate);
    window.addEventListener("sp:cookie-preferences", evaluate);
    return () => {
      window.removeEventListener("sp:consent-change", evaluate);
      window.removeEventListener("sp:cookie-preferences", evaluate);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e6e6e6] bg-white md:hidden">
      <div className="grid grid-cols-2">
        <a
          className="flex items-center justify-center gap-2 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#1f1f1f]"
          href={`tel:${phoneTel}`}
        >
          Call
        </a>
        <Link
          className="flex items-center justify-center gap-2 bg-[#111111] py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white"
          href="/#quote"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
