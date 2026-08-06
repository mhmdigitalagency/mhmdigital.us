import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Terms and Conditions",
  description: "Terms and Conditions for using MHM Digital services, website, and print orders.",
  path: "/terms-and-conditions",
  keywords: ["MHM Digital terms and conditions"],
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
