export type ServiceItem = {
  slug: string;
  name: string;
  description: string;
  benefits: string[];
  icon: string;
  startingPrice?: string;
  href: string;
};

export const MAIN_SERVICES: ServiceItem[] = [
  {
    slug: "branding-graphic-design",
    name: "Branding and Graphic Design",
    description: "Build a memorable brand identity with logos, visual systems, and marketing collateral.",
    benefits: ["Brand strategy", "Logo design", "Style guides", "Marketing assets"],
    icon: "/images/branding.png",
    startingPrice: "From $499",
    href: "/services",
  },
  {
    slug: "website-design-development",
    name: "Website Design and Development",
    description: "Custom websites that convert visitors into customers with modern design and performance.",
    benefits: ["Responsive design", "CMS integration", "SEO-ready", "Fast loading"],
    icon: "/images/Web_design_dev.png",
    startingPrice: "From $1,499",
    href: "/services",
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    description: "Online stores built for sales, inventory management, and seamless checkout experiences.",
    benefits: ["Product catalogs", "Secure checkout", "Order management", "Analytics"],
    icon: "/images/Digital_Marketing.png",
    startingPrice: "From $2,499",
    href: "/services",
  },
  {
    slug: "mobile-app-development",
    name: "Mobile Application Development",
    description: "Native and cross-platform mobile apps for iOS and Android.",
    benefits: ["iOS & Android", "User-friendly UX", "API integration", "App store launch"],
    icon: "/images/Mobile_ App_Development.png",
    startingPrice: "From $4,999",
    href: "/services",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    description: "Data-driven campaigns that grow your audience, leads, and revenue.",
    benefits: ["Campaign strategy", "Content marketing", "Analytics", "Conversion optimization"],
    icon: "/images/Digital_Marketing.png",
    startingPrice: "From $799/mo",
    href: "/services",
  },
  {
    slug: "seo",
    name: "SEO",
    description: "Improve search visibility and organic traffic with technical and content SEO.",
    benefits: ["Keyword research", "On-page SEO", "Technical audits", "Local SEO"],
    icon: "/images/setting.png",
    startingPrice: "From $599/mo",
    href: "/services",
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    description: "Consistent, on-brand social presence across all major platforms.",
    benefits: ["Content calendar", "Community management", "Paid social", "Reporting"],
    icon: "/images/V1.png",
    startingPrice: "From $499/mo",
    href: "/services",
  },
  {
    slug: "paid-advertising",
    name: "Paid Advertising",
    description: "Google, Meta, and display ads optimized for ROI and lead generation.",
    benefits: ["Ad strategy", "Creative design", "A/B testing", "Performance tracking"],
    icon: "/images/V13.png",
    startingPrice: "From $500/mo ad spend",
    href: "/services",
  },
  {
    slug: "business-automation",
    name: "Business Automation",
    description: "Streamline workflows with automated processes and integrations.",
    benefits: ["Workflow automation", "CRM integration", "Email sequences", "Reporting"],
    icon: "/images/setting.png",
    startingPrice: "Custom quote",
    href: "/quote",
  },
  {
    slug: "crm-saas-solutions",
    name: "CRM and SaaS Solutions",
    description: "Custom CRM platforms and SaaS products tailored to your business.",
    benefits: ["Custom dashboards", "User management", "API development", "Cloud hosting"],
    icon: "/images/MOSS.png",
    startingPrice: "Custom quote",
    href: "https://mhmdigital.io",
  },
  {
    slug: "printing-services",
    name: "Printing Services",
    description: "Professional print production from business cards to large-format commercial orders.",
    benefits: ["Small & bulk orders", "Design support", "Proof approval", "Fast turnaround"],
    icon: "/images/Printing.png",
    startingPrice: "From $29",
    href: "/print-services",
  },
  {
    slug: "business-support",
    name: "Business Support Services",
    description: "Operational support including notary services and business documentation.",
    benefits: ["Notary public", "Document prep", "Business consulting", "Compliance support"],
    icon: "/images/Notary_public.png",
    startingPrice: "From $75",
    href: "https://Notary.mhmdigital.us/",
  },
];

export const PRINT_SERVICES = [
  { name: "Business Cards", slug: "business-cards" },
  { name: "Flyers", slug: "flyers" },
  { name: "Brochures", slug: "brochures" },
  { name: "Posters", slug: "posters" },
  { name: "Banners", slug: "banners" },
  { name: "Signs", slug: "signs" },
  { name: "Stickers", slug: "stickers" },
  { name: "Labels", slug: "labels" },
  { name: "Apparel & DTF Transfers", slug: "apparel-dtf" },
  { name: "Marketing Materials", slug: "marketing-materials" },
  { name: "Custom Packaging", slug: "custom-packaging" },
  { name: "Large-Format Printing", slug: "large-format" },
  { name: "Corporate & Bulk Orders", slug: "bulk-orders" },
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
