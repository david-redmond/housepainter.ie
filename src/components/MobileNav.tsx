"use client";

import Link from "next/link";
import { useState } from "react";
import { phoneTel, whatsappLink } from "@/lib/constants";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="text-xs uppercase tracking-[0.2em] text-[#1f1f1f]"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute left-0 top-[72px] z-50 w-full border-t border-[#e6e6e6] bg-white px-6 py-6"
        >
          <div className="grid gap-4 text-sm uppercase tracking-[0.2em] text-[#1f1f1f]">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/services" onClick={() => setOpen(false)}>
              Services
            </Link>
            <Link href="/areas" onClick={() => setOpen(false)}>
              Areas
            </Link>
            <Link href="/gallery" onClick={() => setOpen(false)}>
              Gallery
            </Link>
            <Link href="/faq" onClick={() => setOpen(false)}>
              FAQ
            </Link>
            <Link href="/#quote" onClick={() => setOpen(false)}>
              Request a Quote
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn btn-secondary" href={`tel:${phoneTel}`} onClick={() => setOpen(false)}>
              Call
            </a>
            <a className="btn btn-primary" href={whatsappLink} onClick={() => setOpen(false)}>
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
