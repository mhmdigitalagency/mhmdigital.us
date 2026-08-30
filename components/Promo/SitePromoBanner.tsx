import {
  SITE_PROMO_ENDS_AT,
  SITE_PROMO_LABEL,
  SITE_PROMO_PERCENT,
  isSitePromoActive,
} from "@/lib/promotions";

export function getPromoDaysRemaining(now: Date = new Date()): number {
  const ms = SITE_PROMO_ENDS_AT.getTime() - now.getTime();
  if (ms <= 0) return 0;
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

type SitePromoBannerProps = {
  className?: string;
};

export default function SitePromoBanner({ className = "" }: SitePromoBannerProps) {
  if (!isSitePromoActive()) return null;

  const daysLeft = getPromoDaysRemaining();
  const endsLabel =
    daysLeft <= 1 ? "Ends tomorrow" : daysLeft > 0 ? `Ends in ${daysLeft} days` : "Ends Sep 30";

  return (
    <div
      className={`rounded-2xl border border-brand/20 bg-linear-to-r from-brand/10 via-white to-brand-blue/10 px-5 py-4 text-center shadow-sm ${className}`}
      role="status"
    >
      <p className="text-sm font-semibold text-brand-navy md:text-base">
        <span className="mr-2 inline-flex rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
          {SITE_PROMO_PERCENT}% off
        </span>
        Save on Growth, Ultimate, and all non-Starter packages. Starter tiers excluded.{" "}
        <span className="text-brand">{endsLabel}</span>
      </p>
      <p className="mt-1 text-xs text-gray-500">{SITE_PROMO_LABEL}</p>
    </div>
  );
}
