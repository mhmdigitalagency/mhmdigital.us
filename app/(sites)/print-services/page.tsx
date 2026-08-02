import Link from "next/link";
import { ArrowRight, Printer } from "lucide-react";
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
      <section className="bg-linear-to-b from-red-50/50 to-white px-4 py-16 xl:px-14 xxl:px-40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500 mb-6">
            <Printer className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Print Services</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            From quick business card runs to large-volume commercial printing — MHM Digital delivers
            professional quality with fast turnaround, proof approval, and dashboard tracking.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dashboard/print-orders/new" className="bg-red-500 text-white rounded-full px-8 py-3.5 font-semibold hover:bg-red-600">
              Start Print Order
            </Link>
            <Link href="/quote?type=print-bulk" className="border border-red-200 text-red-600 rounded-full px-8 py-3.5 font-semibold hover:bg-red-50">
              Request Bulk Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 xl:px-14 xxl:px-40">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Print Products</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRINT_SERVICES.map((item) => (
            <Link
              key={item.slug}
              href={`/print-services/${item.slug}`}
              className="group rounded-2xl border p-6 hover:border-red-200 hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-lg group-hover:text-red-500 transition-colors">{item.name}</h3>
              <p className="text-sm text-gray-500 mt-2">Custom quantities, specs, and finishing available.</p>
              <span className="inline-flex items-center gap-1 text-sm text-red-500 font-semibold mt-4">
                Order now <ArrowRight className="h-3.5 w-3.5" />
              </span>
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
          <Link href="/contact?subject=print" className="text-red-500 font-semibold hover:underline">
            Talk to a Print Specialist →
          </Link>
        </div>
      </section>
    </div>
  );
}
