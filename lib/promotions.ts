/** Branding promo: 10% off all branding packages except Starter until Sep 30, 2026. */

export const BRANDING_PROMO_PERCENT = 10;

/** End of Sep 30, 2026 11:59:59 PM Pacific */
export const BRANDING_PROMO_ENDS_AT = new Date("2026-10-01T06:59:59.999Z");

export const BRANDING_PROMO_LABEL = "10% off — ends Sep 30";

export const BRANDING_STARTER_SLUG = "branding-starter";

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

export function isBrandingPromoActive(now: Date = new Date()): boolean {
  return now.getTime() < BRANDING_PROMO_ENDS_AT.getTime();
}

export function isBrandingPromoEligible(
  packageSlug: string | null | undefined,
  context?: PromoContext
): boolean {
  if (packageSlug === BRANDING_STARTER_SLUG) return false;

  if (packageSlug?.startsWith("branding-")) {
    return true;
  }

  const serviceName = context?.serviceName?.trim();
  const packageName = context?.packageName?.trim();

  if (serviceName === "Branding" && packageName && packageName !== "Starter") {
    return true;
  }

  return false;
}

export function applyBrandingPromo(
  price: number,
  packageSlug: string | null | undefined,
  context?: PromoContext,
  now: Date = new Date()
): PromoPriceResult {
  const originalPrice = price;

  if (
    price <= 0 ||
    !isBrandingPromoActive(now) ||
    !isBrandingPromoEligible(packageSlug, context)
  ) {
    return { originalPrice, finalPrice: originalPrice, promoApplied: false };
  }

  const discount = Math.round(originalPrice * (BRANDING_PROMO_PERCENT / 100) * 100) / 100;
  const finalPrice = Math.round((originalPrice - discount) * 100) / 100;

  return {
    originalPrice,
    finalPrice,
    promoApplied: true,
    promoLabel: BRANDING_PROMO_LABEL,
  };
}

export function formatPromoPrice(amount: number): string {
  return Number.isInteger(amount) ? `$ ${amount}.00` : `$ ${amount.toFixed(2)}`;
}
