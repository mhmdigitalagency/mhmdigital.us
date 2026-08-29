/** Site-wide promo: 10% off all packages except Starter tiers until Sep 30, 2026. */

export const SITE_PROMO_PERCENT = 10;

/** End of Sep 30, 2026 11:59:59 PM Pacific */
export const SITE_PROMO_ENDS_AT = new Date("2026-10-01T06:59:59.999Z");

export const SITE_PROMO_LABEL = "10% off — ends Sep 30";

/** @deprecated Use SITE_PROMO_LABEL */
export const BRANDING_PROMO_LABEL = SITE_PROMO_LABEL;

export type PromoPriceResult = {
  originalPrice: number;
  finalPrice: number;
  promoApplied: boolean;
  promoLabel?: string;
};

type PromoContext = {
  serviceName?: string | null;
  packageName?: string | null;
};

export function isSitePromoActive(now: Date = new Date()): boolean {
  return now.getTime() < SITE_PROMO_ENDS_AT.getTime();
}

/** @deprecated Use isSitePromoActive */
export const isBrandingPromoActive = isSitePromoActive;

export function isStarterPackage(
  packageSlug: string | null | undefined,
  packageName?: string | null
): boolean {
  const name = packageName?.trim();
  if (name?.toLowerCase() === "starter") return true;
  if (packageSlug?.endsWith("-starter")) return true;
  return false;
}

export function isSitePromoEligible(
  packageSlug: string | null | undefined,
  context?: PromoContext
): boolean {
  const packageName = context?.packageName?.trim();

  if (isStarterPackage(packageSlug, packageName)) {
    return false;
  }

  if (packageSlug) return true;

  return Boolean(packageName && packageName !== "Starter");
}

/** @deprecated Use isSitePromoEligible */
export const isBrandingPromoEligible = isSitePromoEligible;

export function applySitePromo(
  price: number,
  packageSlug: string | null | undefined,
  context?: PromoContext,
  now: Date = new Date()
): PromoPriceResult {
  const originalPrice = price;

  if (
    price <= 0 ||
    !isSitePromoActive(now) ||
    !isSitePromoEligible(packageSlug, context)
  ) {
    return { originalPrice, finalPrice: originalPrice, promoApplied: false };
  }

  const discount = Math.round(originalPrice * (SITE_PROMO_PERCENT / 100) * 100) / 100;
  const finalPrice = Math.round((originalPrice - discount) * 100) / 100;

  return {
    originalPrice,
    finalPrice,
    promoApplied: true,
    promoLabel: SITE_PROMO_LABEL,
  };
}

/** @deprecated Use applySitePromo */
export const applyBrandingPromo = applySitePromo;

export function formatPromoPrice(amount: number): string {
  return Number.isInteger(amount) ? `$ ${amount}.00` : `$ ${amount.toFixed(2)}`;
}
