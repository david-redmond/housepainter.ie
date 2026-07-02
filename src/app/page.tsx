import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import LeadForm from "@/components/LeadForm";
import {
  baseUrl,
  companyName,
  facebookLink,
  facebookReviewsLink,
  instagramLink,
  phone,
  phoneTel,
  serviceAreas,
  whatsappLink,
} from "@/lib/constants";
import { servicesContent } from "@/lib/content";
import { galleryImages } from "@/lib/gallery";

const whyUs = [
  {
    title: "Free, no-obligation quotes",
    detail: "Clear, itemised pricing before any work begins — no surprises.",
  },
  {
    title: "Fully insured",
    detail: "Peace of mind on every job, for homes and commercial premises alike.",
  },
  {
    title: "Proper preparation",
    detail: "The finish is only as good as the prep — we don't cut corners on it.",
  },
  {
    title: "Reliable & tidy",
    detail: "We turn up when we say we will and leave your home clean every day.",
  },
];

export const metadata: Metadata = {
  title: "House Painters in Dublin, Wicklow & Wexford | Free Quotes",
  description:
    "Professional painters and decorators serving Dublin, Wicklow, and Wexford. Interior, exterior, and commercial painting with proper prep, quality trade paints, and a tidy finish. Get a free quote.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "House Painters in Dublin, Wicklow & Wexford | Free Quotes",
    description:
      "Professional painters and decorators serving Dublin, Wicklow, and Wexford. Interior, exterior, and commercial painting with a clean, tidy finish. Get a free quote.",
    url: baseUrl,
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    "@id": `${baseUrl}#business`,
    name: companyName,
    url: baseUrl,
    image: `${baseUrl}/opengraph-image`,
    telephone: phone,
    areaServed: serviceAreas.map((area) => area.county),
    sameAs: [facebookLink, instagramLink],
    makesOffer: servicesContent.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.name },
    })),
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
              Painting &amp; decorating · Dublin · Wicklow · Wexford
              </p>
              <h1 className="text-4xl leading-tight text-[#111111] md:text-5xl">
                House Painters in Dublin, Wicklow &amp; Wexford
              </h1>
              <p className="max-w-xl text-lg">
                Professional interior, exterior, and commercial painting — prepared properly, finished
                to last, and left clean and tidy. Fully insured, with free, no-obligation quotes.
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
              <p className="mt-3">Dublin · Wicklow · Wexford</p>
              <p className="mt-6 uppercase tracking-[0.2em] text-[#1f1f1f]">Phone</p>
              <p className="mt-3">{phone}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-[0.6fr_1fr]">
            <div>
              <h2 className="text-3xl">Our Services</h2>
              <p className="mt-4 text-sm text-[#5b5b5b]">
                From a single room to a full house repaint or commercial fit-out.
              </p>
              <Link className="mt-4 inline-block text-xs uppercase tracking-[0.2em] underline" href="/services">
                View all services
              </Link>
            </div>
            <div className="grid gap-6">
              {servicesContent.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="block border-b border-[#e6e6e6] pb-4 hover:border-black"
                >
                  <p className="text-lg text-[#1f1f1f]">{service.name}</p>
                  <p className="mt-2 text-sm">{service.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-[0.6fr_1fr]">
            <h2 className="text-3xl">Why {companyName}</h2>
            <ul className="grid gap-6 sm:grid-cols-2">
              {whyUs.map((item) => (
                <li key={item.title}>
                  <p className="text-lg text-[#1f1f1f]">{item.title}</p>
                  <p className="mt-2 text-sm">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-[0.6fr_1fr]">
            <h2 className="text-3xl">Reviews</h2>
            <div className="space-y-4">
              <p className="text-lg text-[#1f1f1f]">
                See what our customers say about our painting and decorating services.
              </p>
              <a
                href={facebookReviewsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary inline-flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Read Facebook Reviews
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-[0.6fr_1fr]">
            <div>
              <h2 className="text-3xl">Areas We Cover</h2>
              <p className="mt-4 text-sm text-[#5b5b5b]">
                A local service across three counties and the main towns in each.
              </p>
              <Link className="mt-4 inline-block text-xs uppercase tracking-[0.2em] underline" href="/areas">
                View areas we cover
              </Link>
            </div>
            <div className="grid gap-6">
              {serviceAreas.map((area) => (
                <Link
                  key={area.county}
                  href={`/areas/${area.slug}`}
                  className="block border-b border-[#e6e6e6] pb-4 hover:border-black"
                >
                  <p className="text-lg text-[#1f1f1f]">{area.county}</p>
                  <p className="mt-2 text-sm">{area.towns.join(" · ")}</p>
                </Link>
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
              <h2 className="mt-4 text-3xl">Get your free quote</h2>
              <p className="mt-3 text-sm">
                Tell us about your project and we&apos;ll come back to you — usually within one
                business day — with a clear, no-obligation quote.
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}
