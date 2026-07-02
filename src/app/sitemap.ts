import type { MetadataRoute } from "next";
import { baseUrl, serviceAreas } from "@/lib/constants";
import { servicesContent } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    ...servicesContent.map((s) => `/services/${s.slug}`),
    "/areas",
    ...serviceAreas.map((a) => `/areas/${a.slug}`),
    "/about",
    "/faq",
    "/gallery",
    "/privacy",
    "/terms",
    "/cookies",
    "/disclaimer",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
