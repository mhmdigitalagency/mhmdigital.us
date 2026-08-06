import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Contact MHM Digital in Seattle",
  description:
    "Contact MHM Digital for web design, digital marketing, branding, and printing in Seattle. Call, email, or send a message to start your project.",
  path: "/contact",
  keywords: ["contact MHM Digital", "Seattle digital agency contact", "printing quote Seattle"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
