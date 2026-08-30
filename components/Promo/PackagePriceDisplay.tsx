import {
  applySitePromo,
  formatPromoPrice,
  SITE_PROMO_LABEL,
  SITE_PROMO_PERCENT,
  type PromoPriceResult,
} from "@/lib/promotions";

type PackagePriceDisplayProps = {
  amount: number;
  packageSlug?: string | null;
  serviceName?: string | null;
  packageName?: string | null;
  suffix?: string;
  size?: "md" | "lg";
  showSavings?: boolean;
};

function getPromoResult(props: PackagePriceDisplayProps): PromoPriceResult {
  return applySitePromo(props.amount, props.packageSlug, {
    serviceName: props.serviceName,
    packageName: props.packageName,
  });
}

export function packageHasPromo(props: Omit<PackagePriceDisplayProps, "suffix" | "size" | "showSavings">) {
  return getPromoResult(props).promoApplied;
}

export default function PackagePriceDisplay({
  amount,
  packageSlug,
  serviceName,
  packageName,
  suffix = "",
  size = "md",
  showSavings = true,
}: PackagePriceDisplayProps) {
  const promo = getPromoResult({ amount, packageSlug, serviceName, packageName });
  const priceClass = size === "lg" ? "text-3xl font-extrabold" : "text-2xl font-bold";
  const savings = Math.round((promo.originalPrice - promo.finalPrice) * 100) / 100;

  if (!promo.promoApplied) {
    return (
      <div>
        <p className={`${priceClass} text-gray-900`}>
          {Number.isInteger(amount) ? `$ ${amount}.00` : `$ ${amount.toFixed(2)}`}
          {suffix}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          {SITE_PROMO_LABEL}
        </span>
        <span className="inline-flex rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-bold text-brand">
          -{SITE_PROMO_PERCENT}%
        </span>
      </div>
      <div className="flex flex-wrap items-baseline gap-2">
        <p className={`${priceClass} text-brand`}>
          {formatPromoPrice(promo.finalPrice)}
          {suffix}
        </p>
        <p className="text-lg text-gray-400 line-through">
          $ {promo.originalPrice.toFixed(2)}
          {suffix}
        </p>
      </div>
      {showSavings && savings > 0 && (
        <p className="text-sm font-medium text-brand-blue">You save $ {savings.toFixed(2)}{suffix.trim()}</p>
      )}
    </div>
  );
}
