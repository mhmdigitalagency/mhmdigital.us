export type ServiceItem = {
  slug: string;
  name: string;
  description: string;
  benefits: string[];
  icon: string;
  image: string;
  href: string;
};

export type PrintServiceItem = {
  name: string;
  slug: string;
  description: string;
  image: string;
};

const serviceImage = (slug: string) => `/images/services/${slug}.jpg`;
const printImage = (slug: string) => `/images/print/${slug}.jpg`;

export const MAIN_SERVICES: ServiceItem[] = [
  {
    slug: "branding-graphic-design",
    name: "Branding and Graphic Design",
    description: "Build a memorable brand identity with logos, visual systems, and marketing collateral.",
    benefits: ["Brand strategy", "Logo design", "Style guides", "Marketing assets"],
    icon: serviceImage("branding-graphic-design"),
    image: serviceImage("branding-graphic-design"),
    href: "/services",
  },
  {
    slug: "website-design-development",
    name: "Website Design and Development",
    description: "Custom websites that convert visitors into customers with modern design and performance.",
    benefits: ["Responsive design", "CMS integration", "SEO-ready", "Fast loading"],
    icon: serviceImage("website-design-development"),
    image: serviceImage("website-design-development"),
    href: "/services",
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    description: "Online stores built for sales, inventory management, and seamless checkout experiences.",
    benefits: ["Product catalogs", "Secure checkout", "Order management", "Analytics"],
    icon: serviceImage("ecommerce-development"),
    image: serviceImage("ecommerce-development"),
    href: "/services",
  },
  {
    slug: "mobile-app-development",
    name: "Mobile Application Development",
    description: "Native and cross-platform mobile apps for iOS and Android.",
    benefits: ["iOS & Android", "User-friendly UX", "API integration", "App store launch"],
    icon: serviceImage("mobile-app-development"),
    image: serviceImage("mobile-app-development"),
    href: "/services",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    description: "Data-driven campaigns that grow your audience, leads, and revenue.",
    benefits: ["Campaign strategy", "Content marketing", "Analytics", "Conversion optimization"],
    icon: serviceImage("digital-marketing"),
    image: serviceImage("digital-marketing"),
    href: "/services",
  },
  {
    slug: "seo",
    name: "SEO",
    description: "Improve search visibility and organic traffic with technical and content SEO.",
    benefits: ["Keyword research", "On-page SEO", "Technical audits", "Local SEO"],
    icon: serviceImage("seo"),
    image: serviceImage("seo"),
    href: "/services",
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    description: "Consistent, on-brand social presence across all major platforms.",
    benefits: ["Content calendar", "Community management", "Paid social", "Reporting"],
    icon: serviceImage("social-media-management"),
    image: serviceImage("social-media-management"),
    href: "/services",
  },
  {
    slug: "paid-advertising",
    name: "Paid Advertising",
    description: "Google, Meta, and display ads optimized for ROI and lead generation.",
    benefits: ["Ad strategy", "Creative design", "A/B testing", "Performance tracking"],
    icon: serviceImage("paid-advertising"),
    image: serviceImage("paid-advertising"),
    href: "/services",
  },
  {
    slug: "business-automation",
    name: "Business Automation",
    description: "Streamline workflows with automated processes and integrations.",
    benefits: ["Workflow automation", "CRM integration", "Email sequences", "Reporting"],
    icon: serviceImage("business-automation"),
    image: serviceImage("business-automation"),
    href: "/quote",
  },
  {
    slug: "crm-saas-solutions",
    name: "CRM and SaaS Solutions",
    description: "Custom CRM platforms and SaaS products tailored to your business.",
    benefits: ["Custom dashboards", "User management", "API development", "Cloud hosting"],
    icon: serviceImage("crm-saas-solutions"),
    image: serviceImage("crm-saas-solutions"),
    href: "https://mhmdigital.io",
  },
  {
    slug: "printing-services",
    name: "Printing Services",
    description: "Professional print production from business cards to large-format commercial orders.",
    benefits: ["Small & bulk orders", "Design support", "Proof approval", "Fast turnaround"],
    icon: serviceImage("printing-services"),
    image: serviceImage("printing-services"),
    href: "/print-services",
  },
  {
    slug: "business-support",
    name: "Business Support Services",
    description: "Operational support including notary services and business documentation.",
    benefits: ["Notary public", "Document prep", "Business consulting", "Compliance support"],
    icon: serviceImage("business-support"),
    image: serviceImage("business-support"),
    href: "https://Notary.mhmdigital.us/",
  },
];

export const PRINT_SERVICES: PrintServiceItem[] = [
  { name: "Business Cards", slug: "business-cards", description: "Premium card stock, finishes, and custom quantities.", image: printImage("business-cards") },
  { name: "Flyers", slug: "flyers", description: "Promotional handouts for events, sales, and campaigns.", image: printImage("flyers") },
  { name: "Brochures", slug: "brochures", description: "Tri-fold and multi-page layouts for your business.", image: printImage("brochures") },
  { name: "Posters", slug: "posters", description: "High-impact posters for retail, events, and promotions.", image: printImage("posters") },
  { name: "Banners", slug: "banners", description: "Indoor and outdoor banners with durable materials.", image: printImage("banners") },
  { name: "Signs", slug: "signs", description: "Wayfinding, storefront, and promotional signage.", image: printImage("signs") },
  { name: "Stickers", slug: "stickers", description: "Custom die-cut stickers for products and branding.", image: printImage("stickers") },
  { name: "Labels", slug: "labels", description: "Product, shipping, and packaging labels.", image: printImage("labels") },
  { name: "Apparel & DTF Transfers", slug: "apparel-dtf", description: "Custom apparel printing and DTF transfer orders.", image: printImage("apparel-dtf") },
  { name: "Marketing Materials", slug: "marketing-materials", description: "Campaign collateral for launches and promotions.", image: printImage("marketing-materials") },
  { name: "Custom Packaging", slug: "custom-packaging", description: "Branded boxes, sleeves, and product packaging.", image: printImage("custom-packaging") },
  { name: "Large-Format Printing", slug: "large-format", description: "Posters, displays, and oversized print projects.", image: printImage("large-format") },
  { name: "Corporate & Bulk Orders", slug: "bulk-orders", description: "High-volume commercial printing with dedicated support.", image: printImage("bulk-orders") },
];

export const PROCESS_STEPS = [
  { step: 1, title: "Tell us what you need", description: "Share your goals, requirements, and timeline through our quote form or consultation." },
  { step: 2, title: "Receive a quote or select a package", description: "We provide transparent pricing tailored to your project scope and budget." },
  { step: 3, title: "Upload your files and requirements", description: "Securely upload brand assets, designs, and project specifications to your dashboard." },
  { step: 4, title: "Track progress from your dashboard", description: "Monitor milestones, messages, and status updates in real time." },
  { step: 5, title: "Review and approve the work", description: "Review proofs and deliverables, request revisions, and approve final output." },
  { step: 6, title: "Receive the final product or service", description: "Get your completed project delivered, shipped, or ready for pickup." },
];

export const OTHER_LINKS = [
  { name: "SaaS Platform", href: "https://mhmdigital.io" },
  { name: "PrimePrint Online", href: "https://primeprint.net" },
  { name: "PrimePrint App", href: "https://primeprint.app/" },
];
