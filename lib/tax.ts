/** Seattle, WA combined state + local sales tax rate */
export const SEATTLE_SALES_TAX_RATE = 0.1025;

export const SEATTLE_SALES_TAX_LABEL = "Seattle sales tax (10.25%)";

export type TaxBreakdown = {
  subtotal: number;
  tax: number;
  total: number;
};

/** Calculate tax from a subtotal in cents */
export function calculateSeattleTaxFromCents(subtotalCents: number): TaxBreakdown {
  const tax = Math.round(subtotalCents * SEATTLE_SALES_TAX_RATE);
  return {
    subtotal: subtotalCents,
    tax,
    total: subtotalCents + tax,
  };
}

/** Calculate tax from a subtotal in dollars */
export function calculateSeattleTaxFromDollars(subtotalDollars: number): TaxBreakdown {
  const subtotalCents = Math.round(subtotalDollars * 100);
  return calculateSeattleTaxFromCents(subtotalCents);
}

export function formatDollars(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export function formatCents(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}
