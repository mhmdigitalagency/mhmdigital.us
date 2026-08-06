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
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Seattle Digital Agency & Printing Services",
  description:
    "MHM Digital helps Seattle startups and businesses grow with web design, branding, digital marketing, software development, digital signage, and professional printing.",
  path: "/",
  keywords: [
    "Seattle digital agency",
    "web design Seattle",
    "printing services Seattle",
    "digital marketing agency Seattle",
    "MHM Digital",
  ],
});

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
