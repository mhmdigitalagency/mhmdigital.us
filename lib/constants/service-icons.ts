import {
  Brush,
  Globe,
  ShoppingCart,
  Smartphone,
  Megaphone,
  Search,
  Share2,
  Target,
  Workflow,
  Database,
  Printer,
  Briefcase,
  Monitor,
  Clapperboard,
  FileCheck,
  type LucideIcon,
} from "lucide-react";

const SLUG_ICON_MAP: Record<string, LucideIcon> = {
  branding: Brush,
  "branding-graphic-design": Brush,
  "web-design-and-development": Globe,
  "website-design-development": Globe,
  "ecommerce-development": ShoppingCart,
  "mobile-app-development": Smartphone,
  "digital-marketing": Megaphone,
  seo: Search,
  "social-media-management": Share2,
  "paid-advertising": Target,
  "business-automation": Workflow,
  "crm-saas-solutions": Database,
  printing: Printer,
  "printing-services": Printer,
  "business-support": Briefcase,
  "digital-signage": Monitor,
  "animation-2d-and-3d": Clapperboard,
  "mobile-and-online-notarization": FileCheck,
};

export function getServiceIcon(slug: string, name?: string): LucideIcon {
  if (SLUG_ICON_MAP[slug]) return SLUG_ICON_MAP[slug];

  const normalized = name?.toLowerCase() ?? "";
  if (normalized.includes("brand")) return Brush;
  if (normalized.includes("web") || normalized.includes("website")) return Globe;
  if (normalized.includes("mobile") || normalized.includes("app")) return Smartphone;
  if (normalized.includes("market")) return Megaphone;
  if (normalized.includes("seo")) return Search;
  if (normalized.includes("social")) return Share2;
  if (normalized.includes("print")) return Printer;
  if (normalized.includes("signage") || normalized.includes("sign")) return Monitor;

  return Briefcase;
}
