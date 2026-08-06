/** Predefined print order settings — customers select options; they cannot edit catalog products. */

export const PRINT_QUANTITY_OPTIONS = [
  { value: "50", label: "50" },
  { value: "100", label: "100" },
  { value: "250", label: "250" },
  { value: "500", label: "500" },
  { value: "1000", label: "1,000" },
  { value: "2500", label: "2,500" },
  { value: "5000", label: "5,000" },
] as const;

export const PRINT_SIZE_OPTIONS = [
  { value: "standard", label: "Standard size for this product" },
  { value: "3.5x2", label: "3.5 × 2 in (business card)" },
  { value: "4x6", label: "4 × 6 in (postcard)" },
  { value: "8.5x11", label: "8.5 × 11 in (letter)" },
  { value: "11x17", label: "11 × 17 in (tabloid)" },
  { value: "18x24", label: "18 × 24 in (poster)" },
  { value: "24x36", label: "24 × 36 in (large poster)" },
  { value: "36x48", label: "36 × 48 in (banner)" },
] as const;

export const PRINT_MATERIAL_OPTIONS = [
  { value: "14pt-cardstock", label: "14pt cardstock" },
  { value: "16pt-matte", label: "16pt matte" },
  { value: "16pt-gloss", label: "16pt gloss" },
  { value: "100lb-gloss", label: "100lb gloss text" },
  { value: "vinyl-outdoor", label: "Vinyl (outdoor)" },
  { value: "fabric-banner", label: "Fabric / banner material" },
  { value: "team-recommend", label: "Let our team recommend" },
] as const;

export const PRINT_FINISHING_OPTIONS = [
  { value: "none", label: "None" },
  { value: "matte-lamination", label: "Matte lamination" },
  { value: "gloss-lamination", label: "Gloss lamination" },
  { value: "uv-coating", label: "UV coating" },
  { value: "rounded-corners", label: "Rounded corners" },
  { value: "die-cut", label: "Die cut" },
  { value: "team-recommend", label: "Let our team recommend" },
] as const;

export const PRINT_TURNAROUND_OPTIONS = [
  { value: "standard", label: "Standard (5–7 business days)" },
  { value: "rush", label: "Rush (2–3 business days)" },
  { value: "same-week", label: "Same week (when available)" },
] as const;

export function labelForOption(
  options: readonly { value: string; label: string }[],
  value: string
) {
  return options.find((o) => o.value === value)?.label ?? value;
}
