import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Tag } from "lucide-react";

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

  return (
    <section className="py-16 bg-white" aria-labelledby="deals-heading">
      <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Minus className="text-[#EE3D33]" aria-hidden />
            <p className="text-[#EE3D33] font-bold uppercase tracking-wider text-sm">Special Offers</p>
          </div>
          <h2 id="deals-heading" className="text-3xl md:text-4xl font-bold">
            Current deals & promotions
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <article
              key={deal.id}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow"
            >
              {deal.imageUrl ? (
                <div className="relative aspect-16/10 bg-gray-100">
                  <Image src={deal.imageUrl} alt="" fill className="object-cover" aria-hidden />
                </div>
              ) : (
                <div className="aspect-16/10 bg-linear-to-br from-red-50 to-white flex items-center justify-center">
                  <Tag className="h-12 w-12 text-[#EE3D33]/40" aria-hidden />
                </div>
              )}
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {deal.badgeText && (
                    <span className="rounded-full bg-[#EE3D33] px-3 py-1 text-xs font-bold text-white uppercase tracking-wide">
                      {deal.badgeText}
                    </span>
                  )}
                  {deal.discountLabel && (
                    <span className="text-sm font-semibold text-[#EE3D33]">{deal.discountLabel}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                {deal.description && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">{deal.description}</p>
                )}
                <Link
                  href={deal.buttonUrl}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#EE3D33] group-hover:gap-3 transition-all"
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
