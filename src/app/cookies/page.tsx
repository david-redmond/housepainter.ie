import type { Metadata } from "next";
import { baseUrl, companyName } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie policy for ${companyName}.`,
  alternates: {
    canonical: "/cookies",
  },
  openGraph: {
    title: "Cookie Policy",
    description: `Cookie policy for ${companyName}.`,
    url: `${baseUrl}/cookies`,
  },
};

export default function CookiesPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="text-4xl">Cookie Policy</h1>
      <p className="mt-4 text-sm">Effective date: February 10, 2026</p>

      <section className="mt-10 grid gap-4 text-sm">
        <p>
          This website uses cookies to ensure the site works properly and, with your consent, to
          measure site usage. You can manage your preferences at any time via the "Change cookie
          preferences" link in the footer.
        </p>
      </section>

      <section className="mt-10 grid gap-4 text-sm">
        <h2 className="text-2xl">Essential Cookies</h2>
        <p>
          Essential cookies are required for core site functionality. These do not require consent
          and are typically session-based.
        </p>
      </section>

      <section className="mt-10 grid gap-4 text-sm">
        <h2 className="text-2xl">Analytics Cookies (Google Analytics 4)</h2>
        <p>
          With your permission, we use Google Analytics 4 to understand how visitors interact with
          the site. Typical cookies include "_ga" and "_ga_*" which help distinguish users and track
          sessions. These cookies do not identify you personally.
        </p>
        <p>
          We set analytics cookies only after you accept them. If you reject analytics cookies, no
          analytics scripts are loaded.
        </p>
      </section>
    </div>
  );
}
