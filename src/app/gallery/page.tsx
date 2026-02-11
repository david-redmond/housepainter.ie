import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import { baseUrl, companyName } from "@/lib/constants";
import { galleryImages } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Recent interior and exterior work from ${companyName}.`,
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery",
    description: `Recent interior and exterior work from ${companyName}.`,
    url: `${baseUrl}/gallery`,
  },
};

export default function GalleryPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="section-divider pb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[#5b5b5b]">Portfolio</p>
        <h1 className="mt-4 text-4xl">Gallery</h1>
        <p className="mt-3 text-sm">A selection of recent work across the southeast.</p>
      </div>

      <div className="mt-10">
        <GalleryGrid images={galleryImages} priorityCount={6} />
      </div>
    </div>
  );
}
