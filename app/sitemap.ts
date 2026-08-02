import type { MetadataRoute } from "next";
import { PRINT_SERVICES } from "@/lib/constants/services-data";

const BASE = process.env.NEXT_PUBLIC_APP_URL || "https://mhmdigital.us";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/services",
    "/print-services",
    "/portfolio",
    "/packages",
    "/quote",
    "/contact",
    "/appointment",
    "/faq",
    "/process",
    "/blog",
    "/privacy",
    "/terms-and-conditions",
    "/refund-policy",
    "/cookie-policy",
    "/accessibility",
    "/sitemap",
  ];

  const printPages = PRINT_SERVICES.map((s) => `/print-services/${s.slug}`);

  return [...staticPages, ...printPages].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
