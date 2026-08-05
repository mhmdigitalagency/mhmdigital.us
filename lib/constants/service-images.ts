/** Maps DB service slugs to hero/example images on individual service pages. */
const SERVICE_HERO_IMAGES: Record<string, string> = {
  branding: "/images/services/branding-graphic-design.jpg",
  "web-design-and-development": "/images/services/website-design-development.jpg",
  "mobile-app-development": "/images/services/mobile-app-development.jpg",
  "digital-marketing": "/images/services/digital-marketing.jpg",
  "animation-2d-and-3d": "/images/services/digital-marketing.jpg",
  printing: "/images/services/printing-services.jpg",
  "mobile-and-online-notarization": "/images/services/business-support.jpg",
  "digital-signage": "/images/services/digital-signage.jpg",
};

export function getServiceHeroImage(slug: string, fallback?: string | null): string {
  return SERVICE_HERO_IMAGES[slug] ?? fallback ?? "/images/services/branding-graphic-design.jpg";
}
