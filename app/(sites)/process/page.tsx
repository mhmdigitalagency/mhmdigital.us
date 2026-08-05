import ProcessPageContent from "@/components/Pages_components/Process/ProcessPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Process | MHM Digital",
  description:
    "Learn how MHM Digital takes projects from quote to delivery — a clear six-step process for websites, marketing, software, and printing.",
};

export default function ProcessPage() {
  return <ProcessPageContent />;
}
