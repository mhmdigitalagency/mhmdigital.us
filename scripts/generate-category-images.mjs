import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const BRAND_RED = "#FF3B3B";
const BRAND_DARK = "#0f172a";

const outServices = join(process.cwd(), "public/images/services");
const outPrint = join(process.cwd(), "public/images/print");
mkdirSync(outServices, { recursive: true });
mkdirSync(outPrint, { recursive: true });

function escapeXml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function categorySvg(title, subtitle, iconPath, accent = BRAND_RED) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#fef2f2"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" rx="32" fill="url(#bg)"/>
  <rect x="48" y="48" width="88" height="88" rx="24" fill="${accent}"/>
  <g transform="translate(72,72) scale(1.8)" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    ${iconPath}
  </g>
  <rect x="48" y="420" width="180" height="6" rx="3" fill="${accent}" opacity="0.35"/>
  <text x="48" y="200" fill="${BRAND_DARK}" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700">${escapeXml(title)}</text>
  <text x="48" y="250" fill="#64748b" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="500">${escapeXml(subtitle)}</text>
  <circle cx="680" cy="120" r="90" fill="${accent}" opacity="0.08"/>
  <circle cx="720" cy="480" r="60" fill="${accent}" opacity="0.06"/>
</svg>`;
}

const icons = {
  palette: '<path d="M4 14l4-8 4 8"/><path d="M2 14h12"/>',
  globe: '<circle cx="8" cy="8" r="6"/><path d="M2 8h12M8 2a10 10 0 0 1 0 12M8 2a10 10 0 0 0 0 12"/>',
  cart: '<path d="M2 3h2l2 10h8l2-7H6"/><circle cx="8" cy="16" r="1.5"/><circle cx="14" cy="16" r="1.5"/>',
  mobile: '<rect x="4" y="1" width="8" height="14" rx="2"/><path d="M7 13h2"/>',
  megaphone: '<path d="M2 8h3l5-3v10l-5-3H2z"/><path d="M12 5v6"/>',
  search: '<circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/>',
  share: '<circle cx="5" cy="5" r="2"/><circle cx="11" cy="5" r="2"/><circle cx="8" cy="11" r="2"/><path d="M6.5 6.5l1 3M9.5 6.5l-1 3"/>',
  target: '<circle cx="8" cy="8" r="6"/><circle cx="8" cy="8" r="3"/><circle cx="8" cy="8" r="1" fill="white"/>',
  workflow: '<rect x="1" y="3" width="5" height="4" rx="1"/><rect x="9" y="3" width="5" height="4" rx="1"/><rect x="5" y="10" width="5" height="4" rx="1"/><path d="M3.5 7v1.5h9V7M8 8.5V10"/>',
  cloud: '<path d="M4 12h8a3 3 0 0 0 0-6 4 4 0 0 0-7.5 1.5A2.5 2.5 0 0 0 4 12z"/>',
  printer: '<path d="M3 6h10v6H3z"/><path d="M5 4h6v2H5zM5 12h6v2H5z"/><circle cx="12" cy="9" r="1" fill="white"/>',
  document: '<path d="M4 2h6l4 4v10H4z"/><path d="M10 2v4h4"/><path d="M6 10h6M6 13h4"/>',
  card: '<rect x="2" y="4" width="12" height="8" rx="1.5"/><path d="M2 8h12"/>',
  flyer: '<rect x="3" y="2" width="10" height="12" rx="1"/><path d="M6 6h6M6 9h4"/>',
  brochure: '<rect x="2" y="3" width="5" height="10" rx="1"/><rect x="9" y="3" width="5" height="10" rx="1"/>',
  poster: '<rect x="3" y="2" width="10" height="12" rx="1"/><path d="M6 6h6M6 9h6M6 12h4"/>',
  banner: '<rect x="1" y="5" width="14" height="6" rx="1"/><path d="M1 8H15"/>',
  sign: '<path d="M3 14V6l5-3 5 3v8"/><path d="M8 14v2"/>',
  sticker: '<circle cx="8" cy="8" r="6"/><path d="M5 8l2 2 4-4"/>',
  label: '<rect x="2" y="5" width="12" height="6" rx="3"/><path d="M5 8h6"/>',
  shirt: '<path d="M5 4l3-2 3 2 2-1v3l-1 9H4L3 6l2-1z"/>',
  marketing: '<path d="M2 10l4-6 3 4 3-2 4 4"/><path d="M2 14h12"/>',
  box: '<path d="M2 6l6-3 6 3v8l-6 3-6-3z"/><path d="M8 3v14M2 6l6 3 6-3"/>',
  format: '<rect x="1" y="3" width="14" height="10" rx="1"/><path d="M1 8h14M8 3v10"/>',
  bulk: '<rect x="2" y="4" width="5" height="5" rx="1"/><rect x="9" y="4" width="5" height="5" rx="1"/><rect x="2" y="11" width="5" height="5" rx="1"/><rect x="9" y="11" width="5" height="5" rx="1"/>',
};

const services = [
  ["branding-graphic-design", "Branding & Design", "Identity, logos, and visual systems", "palette"],
  ["website-design-development", "Web Design & Dev", "Modern websites that convert", "globe"],
  ["ecommerce-development", "E-commerce", "Online stores built for sales", "cart"],
  ["mobile-app-development", "Mobile Apps", "iOS and Android applications", "mobile"],
  ["digital-marketing", "Digital Marketing", "Campaigns that drive growth", "megaphone"],
  ["seo", "SEO", "Search visibility and organic traffic", "search"],
  ["social-media-management", "Social Media", "Content and community management", "share"],
  ["paid-advertising", "Paid Advertising", "Google, Meta, and display ads", "target"],
  ["business-automation", "Automation", "Workflows and integrations", "workflow"],
  ["crm-saas-solutions", "CRM & SaaS", "Custom platforms and dashboards", "cloud"],
  ["printing-services", "Printing", "Professional print production", "printer"],
  ["business-support", "Business Support", "Notary and documentation services", "document"],
];

const printItems = [
  ["business-cards", "Business Cards", "Premium card stock and finishes", "card"],
  ["flyers", "Flyers", "Promotional handouts and inserts", "flyer"],
  ["brochures", "Brochures", "Tri-fold and multi-page layouts", "brochure"],
  ["posters", "Posters", "High-impact visual displays", "poster"],
  ["banners", "Banners", "Indoor and outdoor signage", "banner"],
  ["signs", "Signs", "Wayfinding and storefront signs", "sign"],
  ["stickers", "Stickers", "Custom die-cut stickers", "sticker"],
  ["labels", "Labels", "Product and shipping labels", "label"],
  ["apparel-dtf", "Apparel & DTF", "Custom apparel and transfers", "shirt"],
  ["marketing-materials", "Marketing Materials", "Campaign print collateral", "marketing"],
  ["custom-packaging", "Custom Packaging", "Branded boxes and sleeves", "box"],
  ["large-format", "Large Format", "Posters, banners, and displays", "format"],
  ["bulk-orders", "Bulk Orders", "Corporate and high-volume runs", "bulk"],
];

for (const [slug, title, subtitle, iconKey] of services) {
  writeFileSync(join(outServices, `${slug}.svg`), categorySvg(title, subtitle, icons[iconKey]));
}

for (const [slug, title, subtitle, iconKey] of printItems) {
  writeFileSync(join(outPrint, `${slug}.svg`), categorySvg(title, subtitle, icons[iconKey]));
}

console.log(`Generated ${services.length} service and ${printItems.length} print category SVGs`);
