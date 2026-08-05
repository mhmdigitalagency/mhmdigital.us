import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus } from "lucide-react";
import { PRINT_SERVICES } from "@/lib/constants/services-data";

export default function PrintServicesSection() {
  return (
    <section className="py-20 bg-linear-to-b from-red-50/40 to-white" aria-labelledby="print-heading">
      <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="rounded-[32px] border border-red-100 bg-white p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Minus className="text-[#FF3B3B]" aria-hidden />
            <p className="text-[#FF3B3B] font-bold uppercase tracking-wider text-sm">Print Services</p>
          </div>

          <div className="mb-10 max-w-2xl">
            <h2 id="print-heading" className="text-3xl md:text-4xl font-bold mb-4">
              Professional printing — small orders to commercial volume
            </h2>
            <p className="text-gray-600 leading-relaxed">
              MHM Digital handles everything from quick business card runs to large-format banners,
              bulk corporate orders, and custom packaging. Upload your design, request a proof, and
              track production from your dashboard.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {PRINT_SERVICES.map((item) => (
              <Link
                key={item.slug}
                href={`/print-services/${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-200 hover:border-red-200 hover:shadow-md transition-all"
              >
                <div className="relative aspect-4/3 bg-red-50/20">
                  <Image src={item.image} alt="" fill className="object-cover" aria-hidden />
                </div>
                <div className="p-3 text-center">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-[#FF3B3B] transition-colors">
                    {item.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Link
              href="/print-services"
              className="inline-flex items-center justify-center gap-2 bg-[#FF3B3B] text-white rounded-full px-7 py-3.5 font-semibold hover:bg-red-600 transition-colors"
            >
              Order Printing <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/quote?type=print-bulk"
              className="inline-flex items-center justify-center gap-2 border border-red-200 text-red-600 rounded-full px-7 py-3.5 font-semibold hover:bg-red-50 transition-colors"
            >
              Request a Bulk Quote
            </Link>
            <Link
              href="/contact?subject=print"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 rounded-full px-7 py-3.5 font-semibold hover:bg-gray-50 transition-colors"
            >
              Talk to a Print Specialist
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
