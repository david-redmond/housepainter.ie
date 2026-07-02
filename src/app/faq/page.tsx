import type { Metadata } from "next";
import Link from "next/link";
import { baseUrl } from "@/lib/constants";
import { faqItems } from "@/lib/content";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Painting & Decorating FAQ — Quotes, Timelines & More",
  description:
    "Common questions about our painting and decorating services: free quotes, pricing factors, timelines, areas covered, and how Irish weather affects exterior work.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Painting & Decorating FAQ",
    description:
      "Common questions about our painting and decorating services: quotes, timelines, areas covered, and more.",
    url: `${baseUrl}/faq`,
  },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <JsonLd data={faqJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <h1 className="text-4xl">Frequently Asked Questions</h1>
      <p className="mt-4 text-lg">
        Everything you need to know before you get in touch. Still have a question? Just ask.
      </p>

      <div className="mt-10 grid gap-8">
        {faqItems.map((item) => (
          <div key={item.question} className="border-b border-[#e6e6e6] pb-6">
            <h2 className="text-xl text-[#1f1f1f]">{item.question}</h2>
            <p className="mt-3 text-sm">{item.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link className="btn btn-primary" href="/#quote">
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
