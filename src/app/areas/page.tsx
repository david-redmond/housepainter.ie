import type { Metadata } from "next";
import Link from "next/link";
import { baseUrl, serviceAreas } from "@/lib/constants";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Areas We Cover — Dublin, Wicklow & Wexford",
  description:
    "House painters and decorators covering Dublin, Wicklow, and Wexford, including the main towns in each county. Free quotes.",
  alternates: { canonical: "/areas" },
  openGraph: {
    title: "Areas We Cover — Dublin, Wicklow & Wexford",
    description:
      "House painters and decorators covering Dublin, Wicklow, and Wexford, including the main towns in each county. Free quotes.",
    url: `${baseUrl}/areas`,
  },
};

export default function AreasPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Areas", path: "/areas" },
        ])}
      />
      <h1 className="text-4xl">Areas We Cover</h1>
      <p className="mt-4 text-lg">
        We&apos;re a local painting and decorating service covering Dublin, Wicklow, and Wexford —
        including the main towns across each county. Choose your area below or request a free quote.
      </p>

      <div className="mt-10 grid gap-6">
        {serviceAreas.map((area) => (
          <Link
            key={area.slug}
            href={`/areas/${area.slug}`}
            className="block border-b border-[#e6e6e6] pb-4 hover:border-black"
          >
            <p className="text-lg text-[#1f1f1f]">{area.county}</p>
            <p className="mt-2 text-sm">{area.towns.join(" · ")}</p>
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
