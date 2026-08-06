import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: "Seattle digital agency and professional printing services.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#fc331b",
    icons: [
      {
        src: "/images/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
