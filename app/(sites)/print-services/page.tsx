import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRINT_SERVICES } from "@/lib/constants/services-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Print Services | MHM Digital — Seattle Printing",
  description:
    "Professional printing services in Seattle. Business cards, flyers, banners, large-format, bulk corporate orders, and custom packaging from MHM Digital.",
};

export default function PrintServicesPage() {
  return (
    <div className="pb-20">
      <section className="relative overflow-hidden bg-linear-to-b from-red-50/50 to-white px-4 py-20 xl:px-14 xxl:px-40">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF3B3B]/10 blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#FF3B3B]">Print Services</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional printing in Seattle</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            From quick business card runs to large-volume commercial printing — MHM Digital delivers
            professional quality with fast turnaround, proof approval, and dashboard tracking.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dashboard/print-orders/new" className="bg-[#FF3B3B] text-white rounded-full px-8 py-3.5 font-semibold hover:bg-red-600">
              Start Print Order
            </Link>
            <Link href="/quote?type=print-bulk" className="border border-red-200 text-red-600 rounded-full px-8 py-3.5 font-semibold hover:bg-red-50">
              Request Bulk Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 xl:px-14 xxl:px-40">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">Our Print Products</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Choose a category to configure quantities, materials, finishing, and delivery options.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PRINT_SERVICES.map((item) => (
            <Link
              key={item.slug}
              href={`/print-services/${item.slug}`}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white hover:border-red-200 hover:shadow-lg transition-all"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-red-50/20">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  aria-hidden
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg group-hover:text-[#FF3B3B] transition-colors">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.description}</p>
                <span className="inline-flex items-center gap-1 text-sm text-[#FF3B3B] font-semibold mt-4">
                  Order now <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-12 xl:px-14 xxl:px-40 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Small Orders & Commercial Volume</h2>
          <p className="text-gray-600 mb-6">
            Whether you need 100 business cards or 10,000 brochures, we scale to your needs with
            competitive pricing, design support, and reliable delivery.
          </p>
          <Link href="/contact?subject=print" className="text-[#FF3B3B] font-semibold hover:underline">
            Talk to a Print Specialist →
          </Link>
        </div>
      </section>
    </div>
  );
}
