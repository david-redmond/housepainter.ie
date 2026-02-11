import type { Metadata } from "next";
import { baseUrl, companyName, phone } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${companyName}.`,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy",
    description: `Privacy policy for ${companyName}.`,
    url: `${baseUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="text-4xl">Privacy Policy</h1>
      <p className="mt-4 text-sm">Effective date: February 10, 2026</p>

      <section className="mt-10 grid gap-4 text-sm">
        <p>
          {companyName} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy and is committed to protecting
          your personal data. This policy explains how we collect, use, and store information when you
          use www.housepainter.ie.
        </p>
        <p>
          We are the data controller for the information collected on this site. For privacy
          questions, contact us at {phone}.
        </p>
      </section>

      <section className="mt-10 grid gap-4 text-sm">
        <h2 className="text-2xl">Information We Collect</h2>
        <ul className="list-disc pl-5 text-sm text-[#5b5b5b]">
          <li>Contact details such as name, phone number, email address, and address or Eircode.</li>
          <li>Project details you provide in the quote request form.</li>
          <li>Basic usage analytics when you accept analytics cookies.</li>
        </ul>
      </section>

      <section className="mt-10 grid gap-4 text-sm">
        <h2 className="text-2xl">How We Use Your Information</h2>
        <ul className="list-disc pl-5 text-sm text-[#5b5b5b]">
          <li>To respond to your quote request and communicate about your project.</li>
          <li>To plan site visits or service delivery.</li>
          <li>To improve our website and services (analytics only with your consent).</li>
        </ul>
      </section>

      <section className="mt-10 grid gap-4 text-sm">
        <h2 className="text-2xl">Lawful Basis</h2>
        <p>
          We process your personal data to take steps at your request before entering into a contract
          and to pursue our legitimate interests in providing services. Analytics data is processed
          only after you provide consent via the cookie banner.
        </p>
      </section>

      <section className="mt-10 grid gap-4 text-sm">
        <h2 className="text-2xl">Retention</h2>
        <p>
          We retain quote enquiries for as long as necessary to provide the service and meet legal or
          accounting obligations. Analytics data retention is managed through Google Analytics.
        </p>
      </section>

      <section className="mt-10 grid gap-4 text-sm">
        <h2 className="text-2xl">Your Rights</h2>
        <p>
          You have the right to request access, correction, deletion, or restriction of your personal
          data, and to object to certain processing. You may also withdraw consent for analytics at
          any time by changing your cookie preferences.
        </p>
      </section>

      <section className="mt-10 grid gap-4 text-sm">
        <h2 className="text-2xl">Third Parties</h2>
        <p>
          We use trusted service providers to run this site and deliver emails. These providers only
          process your data on our instructions. We do not sell your personal information.
        </p>
      </section>

      <section className="mt-10 grid gap-4 text-sm">
        <h2 className="text-2xl">Updates</h2>
        <p>
          We may update this policy from time to time. The latest version will always be available on
          this page.
        </p>
      </section>
    </div>
  );
}
