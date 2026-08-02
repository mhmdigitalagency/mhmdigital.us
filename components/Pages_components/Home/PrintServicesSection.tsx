import Link from "next/link";
import { ArrowRight, Minus, Printer } from "lucide-react";
import { PRINT_SERVICES } from "@/lib/constants/services-data";

export default function PrintServicesSection() {
  return (
    <section className="py-20 bg-linear-to-b from-red-50/40 to-white" aria-labelledby="print-heading">
      <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="rounded-[32px] border border-red-100 bg-white p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Minus className="text-red-500" aria-hidden />
            <p className="text-red-500 font-bold uppercase tracking-wider text-sm">Print Services</p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10">
            <div className="max-w-2xl">
              <h2 id="print-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Professional printing — small orders to commercial volume
              </h2>
              <p className="text-gray-600 leading-relaxed">
                MHM Digital handles everything from quick business card runs to large-format banners,
                bulk corporate orders, and custom packaging. Upload your design, request a proof, and
                track production from your dashboard.
              </p>
            </div>
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center">
              <Printer className="h-8 w-8 text-white" aria-hidden />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-10">
            {PRINT_SERVICES.map((item) => (
              <Link
                key={item.slug}
                href={`/print-services/${item.slug}`}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-colors text-center"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Link
              href="/print-services"
              className="inline-flex items-center justify-center gap-2 bg-red-500 text-white rounded-full px-7 py-3.5 font-semibold hover:bg-red-600 transition-colors"
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
              href="/dashboard/files"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 rounded-full px-7 py-3.5 font-semibold hover:bg-gray-50 transition-colors"
            >
              Upload Your Design
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
