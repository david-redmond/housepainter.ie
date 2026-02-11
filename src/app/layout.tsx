import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { companyName, phone, phoneTel, serviceAreasSummary, whatsappLink } from "@/lib/constants";
import CookieBanner from "@/components/CookieBanner";
import CookiePreferencesLink from "@/components/CookiePreferencesLink";
import MobileNav from "@/components/MobileNav";
import SocialIcons from "@/components/SocialIcons";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.housepainter.ie"),
  title: {
    default: "Southeast Painters | House Painters in Dublin, Wicklow & Wexford",
    template: `%s | ${companyName}`,
  },
  description:
    "Premium painting and decorating services for homes and commercial properties across Dublin, Wicklow, and Wexford.",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://www.housepainter.ie",
    siteName: companyName,
    title: "Southeast Painters | House Painters in Dublin, Wicklow & Wexford",
    description:
      "Premium painting and decorating services for homes and commercial properties across Dublin, Wicklow, and Wexford.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Southeast Painters | House Painters in Dublin, Wicklow & Wexford",
    description:
      "Premium painting and decorating services for homes and commercial properties across Dublin, Wicklow, and Wexford.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IE">
      <body className="antialiased">
        <div className="min-h-screen bg-white">
          <header className="section-divider relative">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
              <Link href="/" className="flex items-center">
                <Image
                  src="/south-east-painter-logo-no-bg.png"
                  alt={companyName}
                  width={256}
                  height={102}
                  className="w-64 h-auto"
                  priority
                />
              </Link>
              <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.2em] text-[#1f1f1f] md:flex">
                <Link href="/" className="hover:text-black">
                  Home
                </Link>
                <Link href="/gallery" className="hover:text-black">
                  Gallery
                </Link>
                <Link href="/#quote" className="hover:text-black">
                  Get a Quote
                </Link>
              </nav>
              <div className="hidden items-center gap-3 md:flex">
                <a className="btn btn-secondary" href={`tel:${phoneTel}`}>
                  Call
                </a>
                <a className="btn btn-primary" href={whatsappLink}>
                  WhatsApp
                </a>
              </div>
              <MobileNav />
            </div>
          </header>

          <main>{children}</main>

          <footer className="section-divider mt-20">
            <div className="mx-auto w-full max-w-6xl px-6 py-12">
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#1f1f1f]">{companyName}</p>
                  <p className="mt-3 text-sm text-[#5b5b5b]">Superior painting and decorating services.</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#1f1f1f]">Service Areas</p>
                  <p className="mt-3 text-sm text-[#5b5b5b]">{serviceAreasSummary}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#1f1f1f]">Contact</p>
                  <p className="mt-3 text-sm text-[#5b5b5b]">Phone: {phone}</p>
                  <p className="text-sm text-[#5b5b5b]">
                    WhatsApp: <a className="underline" href={whatsappLink}>Message us</a>
                  </p>
                  <div className="mt-3">
                    <SocialIcons />
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-[#e6e6e6] pt-6 text-xs uppercase tracking-[0.2em] text-[#5b5b5b]">
                <Link href="/privacy" className="hover:text-black">Privacy</Link>
                <Link href="/terms" className="hover:text-black">Terms</Link>
                <Link href="/cookies" className="hover:text-black">Cookies</Link>
                <Link href="/disclaimer" className="hover:text-black">Disclaimer</Link>
                <CookiePreferencesLink />
              </div>
            </div>
          </footer>
        </div>

        <CookieBanner />
      </body>
    </html>
  );
}
