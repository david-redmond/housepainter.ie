import type { Metadata } from "next";
import Link from "next/link";
import { baseUrl, phone, phoneTel, whatsappLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thanks for your quote request. We'll be in touch shortly.",
  alternates: {
    canonical: "/thank-you",
  },
  openGraph: {
    title: "Thank You",
    description: "Thanks for your quote request. We'll be in touch shortly.",
    url: `${baseUrl}/thank-you`,
  },
};

export default function ThankYouPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-24">
      <div className="section-divider pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[#5b5b5b]">Request received</p>
        <h1 className="mt-4 text-4xl">Thank you for your enquiry.</h1>
        <p className="mt-4 text-sm">
          We will review your details and respond within 1 business day. If your request is urgent,
          call us directly on {phone}.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link className="btn btn-secondary" href="/">
          Back to Home
        </Link>
        <a className="btn btn-primary" href={`tel:${phoneTel}`}>
          Call
        </a>
        <a className="btn btn-muted" href={whatsappLink}>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
