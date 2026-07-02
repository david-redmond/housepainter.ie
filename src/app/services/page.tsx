import type { Metadata } from "next";
import Link from "next/link";
import { baseUrl, serviceAreasProse } from "@/lib/constants";
import { servicesContent } from "@/lib/content";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Painting & Decorating Services",
  description:
    "Interior, exterior, and commercial painting, wallpapering, and woodwork across Dublin, Wicklow, and Wexford. Free quotes.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Painting & Decorating Services",
    description:
      "Interior, exterior, and commercial painting, wallpapering, and woodwork across Dublin, Wicklow, and Wexford. Free quotes.",
    url: `${baseUrl}/services`,
  },
};

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <h1 className="text-4xl">Painting &amp; Decorating Services</h1>
      <p className="mt-4 text-lg">
        Professional interior, exterior, and commercial painting, wallpapering, and woodwork —
        prepared properly and finished to last. Serving {serviceAreasProse}.
      </p>

      <div className="mt-10 grid gap-6">
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

      <div className="mt-12">
        <Link className="btn btn-primary" href="/#quote">
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
