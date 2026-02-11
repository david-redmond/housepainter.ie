import type { Metadata } from "next";
import { baseUrl, companyName } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${companyName}.`,
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service",
    description: `Terms of service for ${companyName}.`,
    url: `${baseUrl}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="text-4xl">Terms of Service</h1>
      <p className="mt-4 text-sm">Effective date: February 10, 2026</p>

      <section className="mt-10 grid gap-4 text-sm">
        <p>
          These terms govern your use of www.housepainter.ie and any quote requests submitted through
          this site. By using this site, you agree to these terms.
        </p>
      </section>

      <section className="mt-10 grid gap-4 text-sm">
        <h2 className="text-2xl">Quotes and Services</h2>
        <p>
          Quotes are provided based on the information you supply and may be adjusted after a site
          visit. All work is subject to availability, weather conditions, and a written agreement
          where required.
        </p>
      </section>

      <section className="mt-10 grid gap-4 text-sm">
        <h2 className="text-2xl">Customer Responsibilities</h2>
        <p>
          You agree to provide accurate information, ensure access to the property, and inform us of
          any relevant site conditions. You are responsible for removing or protecting personal items
          unless otherwise agreed.
        </p>
      </section>

      <section className="mt-10 grid gap-4 text-sm">
        <h2 className="text-2xl">Payments</h2>
        <p>
          Payment terms will be stated in your quote or service agreement. Late payments may incur
          additional charges as permitted by law.
        </p>
      </section>

      <section className="mt-10 grid gap-4 text-sm">
        <h2 className="text-2xl">Website Use</h2>
        <p>
          You may use this site for lawful purposes only. You must not attempt to interfere with the
          website or submit fraudulent enquiries.
        </p>
      </section>

      <section className="mt-10 grid gap-4 text-sm">
        <h2 className="text-2xl">Liability</h2>
        <p>
          We take care to keep this website accurate and up to date, but we do not guarantee that all
          information is free from errors. Our liability for losses arising from website use is
          limited to the maximum extent permitted by law.
        </p>
      </section>

      <section className="mt-10 grid gap-4 text-sm">
        <h2 className="text-2xl">Changes</h2>
        <p>
          We may update these terms from time to time. The current version will be posted on this
          page.
        </p>
      </section>
    </div>
  );
}
