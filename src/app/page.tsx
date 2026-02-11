import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import LeadForm from "@/components/LeadForm";
import { baseUrl, companyName, phone, phoneTel, serviceAreas, whatsappLink } from "@/lib/constants";
import { galleryImages } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "House Painter in Dublin, Wicklow, Wexford & Waterford",
  description:
    "Superior painting and decorating services for homes and commercial properties across Dublin, Wicklow, Wexford, and Waterford.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "House Painter in Dublin, Wicklow, Wexford & Waterford",
    description:
      "Superior painting and decorating services for homes and commercial properties across Dublin, Wicklow, Wexford, and Waterford.",
    url: baseUrl,
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    name: companyName,
    url: baseUrl,
    telephone: phone,
    areaServed: serviceAreas.map((area) => area.county),
    sameAs: [],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="section-divider">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#5b5b5b]">
                Traditional painting & decorating
              </p>
              <h1 className="text-4xl leading-tight text-[#111111] md:text-5xl">
                House Painter in Dublin, Wicklow, Wexford & Waterford — Get a Free Quote
              </h1>
              <p className="max-w-xl text-lg">
                Superior painting & decorating services. Interior, exterior, and commercial work.
              </p>
              <div className="flex flex-wrap gap-4">
                <a className="btn btn-primary" href="#quote">
                  Request a Quote
                </a>
                <a className="btn btn-secondary" href={`tel:${phoneTel}`}>
                  Call
                </a>
                <a className="btn btn-muted" href={whatsappLink}>
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="border-l border-[#e6e6e6] pl-8 text-sm text-[#5b5b5b]">
              <p className="uppercase tracking-[0.2em] text-[#1f1f1f]">Service Area</p>
              <p className="mt-3">Dublin · Wicklow · Wexford · Waterford</p>
              <p className="mt-6 uppercase tracking-[0.2em] text-[#1f1f1f]">Phone</p>
              <p className="mt-3">{phone}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-[0.6fr_1fr]">
            <h2 className="text-3xl">Services</h2>
            <div className="grid gap-6">
              {[
                "Interior Painting",
                "Exterior Painting",
                "Commercial",
                "Wallpapering",
                "Woodwork",
                "Floor sanding",
              ].map((service) => (
                <div key={service} className="border-b border-[#e6e6e6] pb-4 text-lg text-[#1f1f1f]">
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-[0.6fr_1fr]">
            <h2 className="text-3xl">Why {companyName}</h2>
            <ul className="grid gap-4 text-lg text-[#1f1f1f]">
              <li>Fully insured</li>
              <li>Experienced, tidy finish</li>
              <li>Free quotes</li>
              <li>Reliable scheduling</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-[0.6fr_1fr]">
            <h2 className="text-3xl">Areas Served</h2>
            <div className="grid gap-6">
              {serviceAreas.map((area) => (
                <div key={area.county} className="border-b border-[#e6e6e6] pb-4">
                  <p className="text-lg text-[#1f1f1f]">{area.county}</p>
                  <p className="mt-2 text-sm">{area.towns.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl">Gallery</h2>
            <Link className="text-xs uppercase tracking-[0.2em] text-[#1f1f1f] underline" href="/gallery">
              View full gallery
            </Link>
          </div>
          <div className="mt-8">
            <GalleryGrid images={galleryImages.slice(0, 6)} priorityCount={3} />
          </div>
        </div>
      </section>

      <section id="quote">
        <div className="mx-auto w-full max-w-4xl px-6 py-20">
          <div className="grid gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#5b5b5b]">Request a quote</p>
              <h2 className="mt-4 text-3xl">Tell us about your project</h2>
              <p className="mt-3 text-sm">
                Share the details below and we will follow up with a tailored quote.
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}
