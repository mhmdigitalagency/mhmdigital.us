import ProcessPageContent from "@/components/Pages_components/Process/ProcessPageContent";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Our Process",
  description:
    "See how MHM Digital delivers websites, marketing, software, and printing projects — from quote and discovery through launch and support.",
  path: "/process",
  keywords: ["digital agency process", "web design process Seattle", "print production process"],
});

export default function ProcessPage() {
  return <ProcessPageContent />;
}
