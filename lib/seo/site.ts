import { CONTACT_EMAIL, CONTACT_PHONE, OFFICE_ADDRESS } from "@/lib/constants/site";

export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://mhmdigital.us").replace(/\/$/, "");
export const SITE_NAME = "MHM Digital";

export const DEFAULT_OG_IMAGE = "/images/home_banner.jpg";

export const DEFAULT_KEYWORDS = [
  "digital agency Seattle",
  "web design Seattle",
  "Seattle printing services",
  "commercial printing Seattle",
  "digital marketing Seattle",
  "branding agency Seattle",
  "business cards Seattle",
  "SEO services Seattle",
  "website development Seattle",
  "bulk printing Seattle",
  "MHM Digital",
] as const;

export const SITE_DESCRIPTION =
  "MHM Digital is a Seattle digital agency offering web design, branding, digital marketing, software development, digital signage, and professional printing for startups and growing businesses.";

export const BUSINESS = {
  name: SITE_NAME,
  legalName: "MHM Digital LLC",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  phone: CONTACT_PHONE,
  address: OFFICE_ADDRESS,
  geo: {
    latitude: 47.5206,
    longitude: -122.2659,
  },
  priceRange: "$$",
  areaServed: ["Seattle", "Washington", "United States"],
  sameAs: [
    "https://www.linkedin.com/company/mhm-digital/",
    "https://www.facebook.com/mhmdigital",
    "https://www.instagram.com/mhmdigital",
  ],
} as const;

export function absoluteUrl(path = ""): string {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
