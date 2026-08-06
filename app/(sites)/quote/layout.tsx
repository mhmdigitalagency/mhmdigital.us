import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Get a Free Quote",
  description:
    "Request a free quote from MHM Digital for web design, branding, digital marketing, software development, digital signage, or commercial printing in Seattle.",
  path: "/quote",
  keywords: [
    "free web design quote Seattle",
    "printing quote Seattle",
    "digital marketing quote",
    "MHM Digital quote",
  ],
});

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
