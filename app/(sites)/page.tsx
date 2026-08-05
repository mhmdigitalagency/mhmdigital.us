import Banner from "@/components/Pages_components/Home/Banner";
import TrustSection from "@/components/Pages_components/Home/TrustSection";
import HomeServices from "@/components/Pages_components/Home/HomeServices";
import PrintServicesSection from "@/components/Pages_components/Home/PrintServicesSection";
import HomeProcess from "@/components/Pages_components/Home/HomeProcess";
import HomeTestimonials from "@/components/Pages_components/Home/HomeTestimonials";
import Case from "@/components/Pages_components/Home/Case";
import HomeCTA from "@/components/Pages_components/Home/HomeCTA";
import Contact from "@/components/Pages_components/Home/Contact";
import HomeDeals from "@/components/Pages_components/Home/HomeDeals";
import { PromotionalPopup } from "@/components/PromotionalPopup";
import { getActiveHomeDeals } from "@/actions/admin-deals";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MHM Digital | Seattle Digital Agency & Printing Services",
  description:
    "MHM Digital is a Seattle-based digital growth agency offering branding, web design, digital marketing, software development, and professional printing for startups and businesses.",
  openGraph: {
    title: "MHM Digital | Digital Growth Agency",
    description: "We Help startups & businesses grow. Branding, websites, marketing, software, and printing.",
    url: "https://mhmdigital.us",
    siteName: "MHM Digital",
    locale: "en_US",
    type: "website",
  },
};

export default async function HomePage() {
  const [services, deals] = await Promise.all([
    prisma.service.findMany({ where: { isActive: true }, take: 20 }),
    getActiveHomeDeals(),
  ]);

  return (
    <>
      <Banner />
      <TrustSection />
      <HomeDeals deals={deals} />
      <HomeServices />
      <PrintServicesSection />
      <HomeProcess />
      <Case />
      <HomeTestimonials />
      <HomeCTA />
      <Contact services={services} />
      <PromotionalPopup />
    </>
  );
}
