import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Tag } from "lucide-react";
import SitePromoBanner from "@/components/Promo/SitePromoBanner";
import { SITE_PROMO_PERCENT, isSitePromoActive } from "@/lib/promotions";

type Deal = {
  id: string;
  title: string;
  description: string | null;
  badgeText: string | null;
  discountLabel: string | null;
  imageUrl: string | null;
  buttonText: string;
  buttonUrl: string;
  category: string | null;
};

export default function HomeDeals({ deals }: { deals: Deal[] }) {
  if (deals.length === 0) return null;

  const showSitePromo = isSitePromoActive();

  return (
    <section className="py-16 bg-linear-to-b from-white via-red-50/20 to-white" aria-labelledby="deals-heading">
      <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Minus className="text-brand" aria-hidden />
            <p className="text-brand font-bold uppercase tracking-wider text-sm">Special Offers</p>
          </div>
          <h2 id="deals-heading" className="text-3xl md:text-4xl font-bold text-brand-navy">
            Current deals & promotions
          </h2>
          {showSitePromo && (
            <SitePromoBanner className="mx-auto mt-6 max-w-3xl text-left md:text-center" />
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <article
              key={deal.id}
              className={`group relative overflow-hidden rounded-3xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${
                index === 0 ? "border-brand/30 ring-1 ring-brand/10" : "border-gray-200"
              }`}
            >
              {showSitePromo && deal.category === "promo" && (
                <span className="absolute top-4 left-4 z-10 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-white">
                  -{SITE_PROMO_PERCENT}%
                </span>
              )}

              {deal.imageUrl ? (
                <div className="relative aspect-16/10 bg-gray-100">
                  <Image src={deal.imageUrl} alt="" fill className="object-cover" aria-hidden />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </div>
              ) : (
                <div className="aspect-16/10 bg-linear-to-br from-brand/5 to-brand-blue/5 flex items-center justify-center">
                  <Tag className="h-12 w-12 text-brand/40" aria-hidden />
                </div>
              )}

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {deal.badgeText && (
                    <span className="rounded-full bg-brand-navy px-3 py-1 text-xs font-bold text-white uppercase tracking-wide">
                      {deal.badgeText}
                    </span>
                  )}
                  {deal.discountLabel && (
                    <span className="text-sm font-semibold text-brand">{deal.discountLabel}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 text-brand-navy">{deal.title}</h3>
                {deal.description && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">{deal.description}</p>
                )}
                <Link
                  href={deal.buttonUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm font-semibold text-brand-blue group-hover:bg-brand group-hover:text-white transition-colors"
                >
                  {deal.buttonText} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
