import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for MHM Digital LLC — how we collect, use, and protect your personal information.",
  path: "/privacy",
  keywords: ["MHM Digital privacy policy"],
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
