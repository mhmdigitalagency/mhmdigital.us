import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "public/images/portfolio");
mkdirSync(outDir, { recursive: true });

const palettes = [
  ["#ff2f3d", "#991b1b"],
  ["#0f172a", "#334155"],
  ["#1e3a5f", "#2563eb"],
  ["#14532d", "#22c55e"],
  ["#581c87", "#a855f7"],
  ["#92400e", "#f59e0b"],
  ["#134e4a", "#14b8a6"],
  ["#7f1d1d", "#ef4444"],
];

function escapeXml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function coverSvg(title, subtitle, [c1, c2], variant = 0) {
  const accent = variant % 2 === 0 ? "white" : "rgba(255,255,255,0.12)";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#bg)"/>
  <circle cx="1350" cy="180" r="220" fill="${accent}" opacity="0.35"/>
  <circle cx="220" cy="820" r="180" fill="${accent}" opacity="0.25"/>
  <rect x="120" y="720" width="420" height="8" rx="4" fill="rgba(255,255,255,0.35)"/>
  <rect x="120" y="760" width="280" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
  <text x="120" y="520" fill="white" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="700">${escapeXml(title)}</text>
  <text x="120" y="610" fill="rgba(255,255,255,0.82)" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="500">${escapeXml(subtitle)}</text>
  <text x="120" y="140" fill="rgba(255,255,255,0.55)" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="600" letter-spacing="6">MHM DIGITAL PORTFOLIO</text>
</svg>`;
}

const projects = [
  ["primeprint-online-cover", "PrimePrint Online", "Print ordering platform", 0],
  ["primeprint-online-1", "PrimePrint Online", "Guided ordering flow", 1],
  ["primeprint-online-2", "PrimePrint Online", "File upload & checkout", 2],
  ["primeprint-online-3", "PrimePrint Online", "Order tracking dashboard", 3],
  ["primeprint-app-cover", "PrimePrint App", "Mobile print ecosystem", 4],
  ["primeprint-app-1", "PrimePrint App", "Customer mobile experience", 5],
  ["primeprint-app-2", "PrimePrint App", "Store pickup workflow", 6],
  ["primeprint-app-3", "PrimePrint App", "Partner store tools", 7],
  ["notary-public-cover", "Notary Public", "Signing agent services", 0],
  ["notary-public-1", "Notary Public", "Document signing", 1],
  ["notary-public-2", "Notary Public", "Mobile notary booking", 2],
  ["notary-public-3", "Notary Public", "Business compliance support", 3],
  ["mybosa-cover", "MyBosa", "Education platform", 2],
  ["mybosa-1", "MyBosa", "Program discovery", 3],
  ["mybosa-2", "MyBosa", "Scholarship pathways", 4],
  ["mybosa-3", "MyBosa", "Student support hub", 5],
  ["madda-walabu-cover", "Madda Walabu", "Nonprofit community", 5],
  ["madda-walabu-1", "Madda Walabu", "Youth programs", 6],
  ["madda-walabu-2", "Madda Walabu", "Community events", 7],
  ["madda-walabu-3", "Madda Walabu", "Outreach design", 0],
  ["waguess-cover", "WAGUESS", "Streetwear brand", 1],
  ["waguess-1", "WAGUESS", "Brand identity", 2],
  ["waguess-2", "WAGUESS", "Shopify storefront", 3],
  ["waguess-3", "WAGUESS", "Campaign graphics", 4],
  ["truuf-cover", "TRUUF Food", "Restaurant brand", 5],
  ["truuf-1", "TRUUF Food", "Menu design", 6],
  ["truuf-2", "TRUUF Food", "Brand collateral", 7],
  ["truuf-3", "TRUUF Food", "Digital presence", 0],
  ["avaria-market-cover", "Avaria Market", "Marketplace concept", 1],
  ["northwest-seafood-cover", "Northwest Seafood", "Seafood marketplace", 2],
  ["a-z-mofila-cover", "A-Z Mofila", "Delivery application", 3],
  ["glow-by-k-cover", "Glow by K", "Beauty branding", 4],
  ["ro-motors-cover", "RO'MOTORS", "Automotive graphics", 5],
  ["guy-akakpo-cover", "Guy Akakpo", "Professional portfolio", 6],
  ["el-sabor-katracho-cover", "El Sabor Katracho", "Honduran restaurant", 7],
  ["el-sabor-katracho-1", "El Sabor Katracho", "Menu presentation", 0],
  ["el-sabor-katracho-2", "El Sabor Katracho", "Online ordering", 1],
  ["el-sabor-katracho-3", "El Sabor Katracho", "Brand experience", 2],
  ["taamine-cover", "Taamine", "Insurance comparison", 3],
  ["taamine-1", "Taamine", "Category navigation", 4],
  ["taamine-2", "Taamine", "Offer comparison", 5],
  ["taamine-3", "Taamine", "Customer journey", 6],
  ["bmf-technology-cover", "BMF Technology", "Corporate technology", 7],
  ["bmf-technology-1", "BMF Technology", "Service presentation", 0],
  ["bmf-technology-2", "BMF Technology", "Industry solutions", 1],
  ["bmf-technology-3", "BMF Technology", "Project showcase", 2],
];

for (const [file, title, subtitle, paletteIndex] of projects) {
  const svg = coverSvg(title, subtitle, palettes[paletteIndex % palettes.length], paletteIndex);
  writeFileSync(join(outDir, `${file}.svg`), svg);
}

console.log(`Generated ${projects.length} portfolio cover SVGs in ${outDir}`);
