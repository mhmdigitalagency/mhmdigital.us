import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus } from "lucide-react";
import { MAIN_SERVICES } from "@/lib/constants/services-data";

export default function HomeServices() {
  return (
    <section className="py-20 bg-[#fafafa]" aria-labelledby="services-heading">
      <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Minus className="text-[#FF3B3B]" aria-hidden />
            <p className="text-[#FF3B3B] font-bold uppercase tracking-wider text-sm">Our Services</p>
          </div>
          <h2 id="services-heading" className="text-3xl md:text-5xl font-bold max-w-2xl leading-tight">
            Full-service digital solutions for modern businesses
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MAIN_SERVICES.map((service) => (
            <article
              key={service.slug}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white hover:shadow-lg hover:border-red-100 transition-all"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-red-50/30">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  aria-hidden
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#FF3B3B] transition-colors mb-1">
                  {service.name}
                </h3>
                {service.startingPrice && (
                  <p className="text-sm text-[#FF3B3B] font-semibold mb-3">{service.startingPrice}</p>
                )}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{service.description}</p>
                <ul className="text-xs text-gray-500 space-y-1 mb-5">
                  {service.benefits.slice(0, 3).map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={service.href.startsWith("http") ? service.href : `/services`}
                    className="text-sm font-semibold text-[#FF3B3B] hover:underline inline-flex items-center gap-1"
                    {...(service.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    Learn More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link href="/quote" className="text-sm font-semibold text-gray-700 hover:text-[#FF3B3B] ml-auto">
                    Request a Quote
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
