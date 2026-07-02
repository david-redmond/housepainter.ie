import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { baseUrl, companyName, phoneTel, serviceAreas, whatsappLink } from "@/lib/constants";
import { servicesContent } from "@/lib/content";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ county: string }>;
}

function getArea(slug: string) {
  return serviceAreas.find((area) => area.slug === slug);
}

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ county: area.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { county } = await params;
  const area = getArea(county);
  if (!area) return {};

  const title = `House Painters in ${area.county}`;
  const description = `Interior and exterior painting and decorating in ${area.county}, including ${area.towns.join(", ")}. Free, no-obligation quotes.`;
  return {
    title,
    description,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: { title, description, url: `${baseUrl}/areas/${area.slug}` },
  };
}

export default async function AreaDetailPage({ params }: PageProps) {
  const { county } = await params;
  const area = getArea(county);
  if (!area) notFound();

  const areaJsonLd = {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    "@id": `${baseUrl}#business`,
    name: companyName,
    url: `${baseUrl}/areas/${area.slug}`,
    areaServed: [area.county, ...area.towns],
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <JsonLd data={areaJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Areas", path: "/areas" },
          { name: area.county, path: `/areas/${area.slug}` },
        ])}
      />

      <p className="text-xs uppercase tracking-[0.3em] text-[#5b5b5b]">Areas We Cover</p>
      <h1 className="mt-4 text-4xl">House Painters in {area.county}</h1>
      <p className="mt-6 text-lg">
        Looking for a reliable painter and decorator in {area.county}? We provide professional
        interior and exterior painting for homes and businesses across the county — with proper
        preparation, quality trade paints, and a clean, tidy finish. Every quote is free and with no
        obligation.
      </p>
      <p className="mt-4 text-sm">
        Whether it&apos;s a single room, a full house repaint, or exterior work built to handle the
        Irish weather, we&apos;ll give you a clear price and a realistic timeframe.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl">Towns we cover in {area.county}</h2>
        <p className="mt-3 text-sm">{area.towns.join(" · ")}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl">Services in {area.county}</h2>
        <ul className="mt-3 grid gap-2 text-sm">
          {servicesContent.map((service) => (
            <li key={service.slug}>
              <Link className="underline" href={`/services/${service.slug}`}>
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

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

      <div className="mt-12">
        <Link className="text-xs uppercase tracking-[0.2em] text-[#1f1f1f] underline" href="/areas">
          All areas
        </Link>
      </div>
    </div>
  );
}
