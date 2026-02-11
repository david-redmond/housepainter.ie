import type { Metadata } from "next";
import { baseUrl, companyName } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Website disclaimer for ${companyName}.`,
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: "Disclaimer",
    description: `Website disclaimer for ${companyName}.`,
    url: `${baseUrl}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="text-4xl">Disclaimer</h1>
      <p className="mt-4 text-sm">Effective date: February 10, 2026</p>

      <section className="mt-10 grid gap-4 text-sm">
        <p>
          The information on this website is provided for general information purposes only. While
          we strive to keep content accurate and current, we make no warranties about the
          completeness, reliability, or availability of the information.
        </p>
        <p>
          Any reliance you place on the information on this site is at your own risk. We are not
          liable for any loss or damage arising from the use of this website.
        </p>
        <p>
          Links to third-party websites are provided for convenience. We do not control or endorse
          the content of those sites.
        </p>
      </section>
    </div>
  );
}
