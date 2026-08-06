import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Book a Consultation",
  description:
    "Schedule a free consultation with MHM Digital in Seattle for web design, marketing, branding, or printing projects.",
  path: "/appointment",
  keywords: ["book consultation Seattle", "digital agency appointment", "MHM Digital consultation"],
});

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
