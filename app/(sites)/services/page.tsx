import { Minus } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Banner from "@/components/Pages_components/Services/Banner";
import ServiceItem from "@/components/Pages_components/Services/ServiceItem";
import { MAIN_SERVICES } from "@/lib/constants/services-data";
import { getServiceIcon } from "@/lib/constants/service-icons";
import { getPublicServices } from "@/lib/site-services";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Digital Marketing & Web Services in Seattle",
  description:
    "Explore MHM Digital services: branding, web design, e-commerce, mobile apps, SEO, digital marketing, digital signage, automation, and commercial printing in Seattle.",
  path: "/services",
  keywords: [
    "Seattle web design services",
    "branding agency Seattle",
    "SEO company Seattle",
    "digital marketing services Seattle",
    "e-commerce development Seattle",
  ],
});

const ADDITIONAL_SERVICES = MAIN_SERVICES.filter((s) =>
  ["business-automation", "crm-saas-solutions"].includes(s.slug)
);

const page = async () => {
  const services = await getPublicServices();

  return (
    <>
      <div className="mt-25 pb-37.5 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-10 xl:mb-6">
          <div className="w-full xl:w-[52%]">
            <div className="flex items-end gap-2">
              <Minus className="text-red-500" />
              <h5 className="text-red-500 text-xl font-semibold">Our Services</h5>
            </div>
            <h2 className="text-3xl md:text-[55px] font-bold leading-tight mb-4">
              High-impact services
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-5 w-full">
          {services.map((service) => (
            <div key={service.id}>
              <ServiceItem service={service} />
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="mb-8">
            <div className="flex items-end gap-2">
              <Minus className="text-red-500" />
              <h5 className="text-red-500 text-xl font-semibold">Additional Services</h5>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mt-2">
              More ways we can help
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADDITIONAL_SERVICES.map((service) => {
              const Icon = getServiceIcon(service.slug, service.name);
              return (
                <Link
                  key={service.slug}
                  href={service.href.startsWith("http") ? service.href : service.href}
                  {...(service.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex flex-col gap-4 border rounded-[32px] bg-white px-8 py-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-red-100 transition-colors h-full"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                    <Icon className="h-7 w-7" aria-hidden />
                  </span>
                  <h4 className="text-xl font-bold">{service.name}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{service.description}</p>
                  <span className="flex items-center gap-2 text-red-500 font-bold text-sm">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Banner />
    </>
  );
};

export default page;
