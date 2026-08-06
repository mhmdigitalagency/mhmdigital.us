import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getActivePrintProducts, formatPrintPrice } from "@/lib/print-products";
import { getActivePrintDeals } from "@/actions/admin-deals";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Seattle Printing Services",
  description:
    "Professional printing in Seattle: business cards, flyers, brochures, banners, large-format, apparel, custom packaging, and bulk corporate print orders from MHM Digital.",
  path: "/print-services",
  keywords: [
    "Seattle printing services",
    "business cards Seattle",
    "banner printing Seattle",
    "commercial printing Seattle",
    "bulk printing Seattle",
  ],
});

export default async function PrintServicesPage() {
  const [products, deals] = await Promise.all([
    getActivePrintProducts(),
    getActivePrintDeals(),
  ]);

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden bg-linear-to-b from-brand/5 to-white px-4 py-20 xl:px-14 xxl:px-40">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-brand">Print Services</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-navy">Professional printing in Seattle</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            From quick business card runs to large-volume commercial printing — MHM Digital delivers
            professional quality with fast turnaround, proof approval, and dashboard tracking.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dashboard/print-orders/new" className="bg-brand text-white rounded-full px-8 py-3.5 font-semibold hover:opacity-90">
              Start Print Order
            </Link>
            <Link href="/quote?type=print-bulk" className="border border-brand/30 text-brand rounded-full px-8 py-3.5 font-semibold hover:bg-brand/5">
              Request Bulk Quote
            </Link>
          </div>
        </div>
      </section>

      {deals.length > 0 && (
        <section className="px-4 py-10 xl:px-14 xxl:px-40 bg-brand-navy text-white">
          <h2 className="text-xl font-bold mb-6 text-center">Current print deals</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {deals.map((deal) => (
              <div key={deal.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                {deal.badgeText && <span className="text-xs font-bold text-brand uppercase">{deal.badgeText}</span>}
                <h3 className="font-bold mt-2">{deal.title}</h3>
                {deal.discountLabel && <p className="text-brand text-sm font-semibold mt-1">{deal.discountLabel}</p>}
                <Link href={deal.buttonUrl} className="inline-flex items-center gap-1 text-sm text-brand-blue font-semibold mt-3 hover:underline">
                  {deal.buttonText} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-4 py-16 xl:px-14 xxl:px-40">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center text-brand-navy">Our Print Products</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Choose a category to configure quantities, materials, finishing, and delivery options.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((item) => {
            const priceLabel = formatPrintPrice(item.basePrice);
            return (
              <Link
                key={item.slug}
                href={`/print-services/${item.slug}`}
                className="group overflow-hidden rounded-3xl border border-gray-200 bg-white hover:border-brand/30 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-brand/5">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    aria-hidden
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-lg group-hover:text-brand transition-colors">{item.name}</h3>
                    {priceLabel && (
                      <span className="text-sm font-bold text-brand whitespace-nowrap">From {priceLabel}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-brand font-semibold mt-4">
                    Order now <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
