import type { Metadata } from "next";
import Link from "next/link";
import { phoneTel } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.3em] text-[#5b5b5b]">Error 404</p>
      <h1 className="mt-4 text-4xl">We couldn&apos;t find that page.</h1>
      <p className="mt-4 text-sm">
        The page you were looking for may have moved or no longer exists. Let&apos;s get you back on
        track.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link className="btn btn-primary" href="/">
          Back to Home
        </Link>
        <Link className="btn btn-secondary" href="/#quote">
          Request a Quote
        </Link>
        <a className="btn btn-muted" href={`tel:${phoneTel}`}>
          Call
        </a>
      </div>
    </div>
  );
}
