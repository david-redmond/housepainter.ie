import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { baseUrl, companyName, phoneTel, serviceAreas, serviceAreasProse, whatsappLink } from "@/lib/constants";
import { getService, servicesContent } from "@/lib/content";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ service: string }>;
}

export function generateStaticParams() {
  return servicesContent.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service } = await params;
  const content = getService(service);
  if (!content) return {};

  const title = `${content.name} in Dublin, Wicklow & Wexford`;
  return {
    title,
    description: content.summary,
    alternates: { canonical: `/services/${content.slug}` },
    openGraph: {
      title,
      description: content.summary,
      url: `${baseUrl}/services/${content.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { service } = await params;
  const content = getService(service);
  if (!content) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.name,
    serviceType: content.name,
    description: content.summary,
    url: `${baseUrl}/services/${content.slug}`,
    provider: {
      "@type": "HousePainter",
      "@id": `${baseUrl}#business`,
      name: companyName,
      url: baseUrl,
    },
    areaServed: serviceAreas.map((area) => area.county),
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <JsonLd data={serviceJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: content.name, path: `/services/${content.slug}` },
        ])}
      />

      <p className="text-xs uppercase tracking-[0.3em] text-[#5b5b5b]">Services</p>
      <h1 className="mt-4 text-4xl">{content.name} in Dublin, Wicklow &amp; Wexford</h1>
      <p className="mt-6 text-lg">{content.intro}</p>

      <section className="mt-10">
        <h2 className="text-2xl">What&apos;s included</h2>
        <ul className="mt-4 grid gap-3 text-sm">
          {content.included.map((item) => (
            <li key={item} className="border-b border-[#e6e6e6] pb-3 text-[#1f1f1f]">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 grid gap-4 text-sm">
        {content.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <p className="mt-8 text-sm text-[#5b5b5b]">Serving {serviceAreasProse}.</p>

      <div className="mt-10 flex flex-wrap gap-4">
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

      <div className="mt-12 flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-[#1f1f1f]">
        <Link className="underline" href="/services">
          All services
        </Link>
        <Link className="underline" href="/areas">
          Areas we cover
        </Link>
        <Link className="underline" href="/faq">
          FAQ
        </Link>
      </div>
    </div>
  );
}
