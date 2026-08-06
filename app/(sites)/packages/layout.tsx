import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Packages & Pricing",
  description:
    "Browse MHM Digital service packages for branding, web design, mobile apps, digital marketing, animation, and digital signage with transparent pricing.",
  path: "/packages",
  keywords: ["web design packages Seattle", "digital marketing packages", "MHM Digital pricing"],
});

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
