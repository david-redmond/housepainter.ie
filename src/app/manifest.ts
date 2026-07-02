import type { MetadataRoute } from "next";
import { companyName } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${companyName} — House Painters in Dublin, Wicklow & Wexford`,
    short_name: companyName,
    description:
      "Superior painting and decorating services for homes and commercial properties across Dublin, Wicklow, and Wexford.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111111",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
