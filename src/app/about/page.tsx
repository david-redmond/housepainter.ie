import type { Metadata } from "next";
import Link from "next/link";
import { baseUrl, companyName, phoneTel, serviceAreasProse, whatsappLink } from "@/lib/constants";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: `About ${companyName} — Painters & Decorators`,
  description: `${companyName} is an owner-run painting and decorating service covering Dublin, Wicklow, and Wexford. Quality prep, tidy work, and free quotes.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${companyName}`,
    description: `${companyName} — an owner-run painting and decorating service across Dublin, Wicklow, and Wexford.`,
    url: `${baseUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <h1 className="text-4xl">About {companyName}</h1>

      <div className="mt-8 grid gap-4 text-lg">
        <p>
          {companyName} is an owner-run painting and decorating service covering {serviceAreasProse}.
          We take on interior and exterior work for homes and businesses — from a single room to a
          full house repaint — and we do it the way we&apos;d want it done in our own home.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl">How we work</h2>
        <div className="mt-4 grid gap-4 text-sm">
          <p>
            The finish is only as good as the preparation, so that&apos;s where we put the effort:
            protecting your floors and furniture, filling and sanding, priming where it&apos;s needed,
            and using quality trade paints that hold up over time. On exterior work we plan around the
            Irish weather so every coat cures properly and lasts.
          </p>
          <p>
            Just as importantly, we turn up when we say we will, keep you updated, and leave the place
            clean at the end of every day. A tidy, well-run job is part of the service — not an extra.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl">Why homeowners choose us</h2>
        <ul className="mt-4 grid gap-3 text-sm">
          <li className="border-b border-[#e6e6e6] pb-3">Free, no-obligation quotes with clear pricing</li>
          <li className="border-b border-[#e6e6e6] pb-3">Fully insured work</li>
          <li className="border-b border-[#e6e6e6] pb-3">Thorough preparation and quality trade paints</li>
          <li className="border-b border-[#e6e6e6] pb-3">Reliable scheduling and a clean, tidy finish</li>
          <li className="border-b border-[#e6e6e6] pb-3">Local service across {serviceAreasProse}</li>
        </ul>
      </section>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link className="btn btn-primary" href="/#quote">
          Request a Quote
        </Link>
        <a className="btn btn-secondary" href={`tel:${phoneTel}`}>
          Call
        </a>
        <a className="btn btn-muted" href={whatsappLink}>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
