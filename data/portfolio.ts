export type PortfolioCategory =
  | "Websites"
  | "E-commerce"
  | "Branding"
  | "Web Apps"
  | "Nonprofit"
  | "Print & Design";

export type PortfolioProject = {
  title: string;
  slug: string;
  client: string;
  industry: string;
  categories: PortfolioCategory[];
  shortDescription: string;
  fullDescription: string;
  services: string[];
  technologies: string[];
  coverImage: string;
  gallery: string[];
  projectUrl?: string;
  featured: boolean;
  completionYear: number;
  challenge: string;
  solution: string;
  results: string[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "PrimePrint",
    slug: "primeprint",
    client: "PrimePrint",
    industry: "Printing Technology",
    categories: ["Web Apps", "E-commerce"],
    shortDescription:
      "A modern print-ordering platform for file upload, print configuration, checkout, order tracking, and store pickup.",
    fullDescription:
      "PrimePrint is a smart printing ecosystem designed to simplify online ordering, file management, production, and store pickup.",
    services: [
      "Product strategy",
      "UI/UX design",
      "Web application development",
      "E-commerce architecture",
      "Brand system",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
    ],
    coverImage: "/images/portfolio/primeprint-cover.jpg",
    gallery: [
      "/images/portfolio/primeprint-1.jpg",
      "/images/portfolio/primeprint-2.jpg",
      "/images/portfolio/primeprint-3.jpg",
    ],
    projectUrl: "https://primeprint.net",
    featured: true,
    completionYear: 2026,
    challenge:
      "Create a simple customer experience for ordering complex print products while keeping the workflow easy to manage for partner stores.",
    solution:
      "We designed a guided ordering journey with file upload, print configuration, checkout, order tracking, and pickup workflows.",
    results: [
      "Unified online print-ordering experience",
      "Reusable product and pricing architecture",
      "Customer and administration workflows",
      "Foundation for mobile and partner-store expansion",
    ],
  },
  {
    title: "MyBosa",
    slug: "mybosa",
    client: "MyBosa SARL",
    industry: "International Education",
    categories: ["Websites", "Web Apps"],
    shortDescription:
      "An education platform for programs, universities, scholarships, visa support, housing, and academic counseling.",
    fullDescription:
      "MyBosa brings orientation, applications, scholarships, visa assistance, housing, and personalized student support into one digital platform.",
    services: [
      "Digital strategy",
      "UI/UX design",
      "Website development",
      "Content architecture",
      "Platform planning",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    coverImage: "/images/portfolio/mybosa-cover.jpg",
    gallery: [
      "/images/portfolio/mybosa-1.jpg",
      "/images/portfolio/mybosa-2.jpg",
      "/images/portfolio/mybosa-3.jpg",
    ],
    projectUrl: "https://mybosa.com",
    featured: true,
    completionYear: 2026,
    challenge:
      "Present many education services clearly while building trust with students, parents, institutions, and partners.",
    solution:
      "We created a structured platform with clear service pathways, program discovery, advisor access, and conversion-focused calls to action.",
    results: [
      "Clear student journey",
      "Improved presentation of services",
      "Scalable programs and institutions structure",
      "Consistent education brand experience",
    ],
  },
  {
    title: "Madda Walabu Seattle",
    slug: "madda-walabu-seattle",
    client: "Madda Walabu Seattle",
    industry: "Nonprofit & Community Services",
    categories: ["Nonprofit", "Websites", "Print & Design"],
    shortDescription:
      "A nonprofit digital presence supporting sports, education, youth programs, and community services in Seattle.",
    fullDescription:
      "Madda Walabu Seattle needed a unified platform for community programs, events, support services, and organizational information.",
    services: [
      "Nonprofit website design",
      "Content strategy",
      "Event graphics",
      "Print collateral",
      "Program branding",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    coverImage: "/images/portfolio/madda-walabu-cover.jpg",
    gallery: [
      "/images/portfolio/madda-walabu-1.jpg",
      "/images/portfolio/madda-walabu-2.jpg",
      "/images/portfolio/madda-walabu-3.jpg",
    ],
    projectUrl: "https://maddawalabu.org",
    featured: true,
    completionYear: 2026,
    challenge:
      "Communicate multiple community programs while keeping the organization approachable and easy to navigate.",
    solution:
      "We developed a clean nonprofit experience and a visual system for youth sports, community programs, and outreach.",
    results: [
      "Centralized nonprofit information",
      "Clear presentation of programs",
      "Reusable event design system",
      "Improved community visibility",
    ],
  },
  {
    title: "WAGUESS",
    slug: "waguess",
    client: "WAGUESS",
    industry: "Fashion & Streetwear",
    categories: ["Branding", "E-commerce", "Print & Design"],
    shortDescription:
      "A bold streetwear identity supported by a Shopify experience, campaign graphics, and apparel artwork.",
    fullDescription:
      "WAGUESS is a fashion and streetwear brand with a strong royal-blue identity developed across e-commerce, apparel, and campaigns.",
    services: [
      "Brand identity",
      "Shopify design",
      "Apparel graphics",
      "Campaign design",
      "Social media assets",
    ],
    technologies: ["Shopify", "Liquid", "Adobe Creative Cloud"],
    coverImage: "/images/portfolio/waguess-cover.jpg",
    gallery: [
      "/images/portfolio/waguess-1.jpg",
      "/images/portfolio/waguess-2.jpg",
      "/images/portfolio/waguess-3.jpg",
    ],
    featured: true,
    completionYear: 2026,
    challenge:
      "Build a recognizable fashion identity that remains consistent across clothing, e-commerce, and social media.",
    solution:
      "We created a flexible visual language centered on royal blue, modern typography, expressive graphics, and premium streetwear presentation.",
    results: [
      "Consistent visual identity",
      "Reusable apparel graphic direction",
      "Modern Shopify presentation",
      "Campaign-ready brand assets",
    ],
  },
  {
    title: "TRUUF Food",
    slug: "truuf-food",
    client: "TRUUF Food",
    industry: "Restaurant & Food",
    categories: ["Branding", "Websites", "Print & Design"],
    shortDescription:
      "A food brand combining identity, menus, restaurant graphics, web presence, and digital infrastructure.",
    fullDescription:
      "TRUUF Food required a distinctive identity and practical digital and print assets for restaurant operations.",
    services: [
      "Logo development",
      "Menu design",
      "Website assets",
      "Print materials",
      "Digital setup",
    ],
    technologies: ["Next.js", "TypeScript", "Adobe Creative Cloud"],
    coverImage: "/images/portfolio/truuf-cover.jpg",
    gallery: [
      "/images/portfolio/truuf-1.jpg",
      "/images/portfolio/truuf-2.jpg",
      "/images/portfolio/truuf-3.jpg",
    ],
    featured: true,
    completionYear: 2026,
    challenge:
      "Create an appetizing brand while organizing restaurant information across print and digital channels.",
    solution:
      "We created a visual identity and applied it to menus, promotional graphics, website assets, and customer-facing materials.",
    results: [
      "Unified restaurant branding",
      "Professional menu presentation",
      "Reusable marketing templates",
      "Improved digital consistency",
    ],
  },
  {
    title: "PrimePrint Supply",
    slug: "primeprint-supply",
    client: "PrimePrint Supply",
    industry: "Office & Printing Supplies",
    categories: ["E-commerce", "Websites"],
    shortDescription:
      "An e-commerce storefront for printing supplies, office products, furniture, technology, packaging, and business essentials.",
    fullDescription:
      "PrimePrint Supply is an online store for printing and office supplies with a scalable product-category system.",
    services: [
      "E-commerce strategy",
      "Shopify design",
      "Category architecture",
      "Content design",
      "Conversion optimization",
    ],
    technologies: ["Shopify", "Liquid", "CSS"],
    coverImage: "/images/portfolio/primeprint-supply-cover.jpg",
    gallery: [
      "/images/portfolio/primeprint-supply-1.jpg",
      "/images/portfolio/primeprint-supply-2.jpg",
      "/images/portfolio/primeprint-supply-3.jpg",
    ],
    featured: true,
    completionYear: 2026,
    challenge:
      "Organize a large product catalog while maintaining a clean and business-friendly shopping experience.",
    solution:
      "We designed a structured storefront with clear categories, promotional sections, and scalable collection pages.",
    results: [
      "Clear product-category hierarchy",
      "Professional B2B presentation",
      "Scalable Shopify storefront",
      "Consistent promotional system",
    ],
  },
  {
    title: "PrimePrint Store",
    slug: "primeprint-store",
    client: "PrimePrint Store",
    industry: "Retail Print Services",
    categories: ["E-commerce", "Web Apps"],
    shortDescription:
      "A retail print and business-services experience designed for online ordering and in-store fulfillment.",
    fullDescription:
      "PrimePrint Store extends the PrimePrint ecosystem with printing, passport photos, notary, scanning, and business services.",
    services: [
      "Product design",
      "E-commerce",
      "Service architecture",
      "UI/UX design",
    ],
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    coverImage: "/images/portfolio/primeprint-store-cover.jpg",
    gallery: [],
    featured: false,
    completionYear: 2026,
    challenge:
      "Present many in-store services while enabling supplier and fulfillment integrations.",
    solution:
      "We created a modular storefront architecture for services, packages, checkout, and order management.",
    results: [
      "Scalable service catalog",
      "Foundation for supplier integrations",
      "Reusable product and package system",
    ],
  },
  {
    title: "Avaria Market",
    slug: "avaria-market",
    client: "Avaria Market",
    industry: "Marketplace",
    categories: ["E-commerce", "Web Apps"],
    shortDescription:
      "A multivendor marketplace concept connecting customers with products across multiple categories.",
    fullDescription:
      "Avaria Market was planned as a scalable marketplace with customer, vendor, product, order, and category experiences.",
    services: ["Marketplace strategy", "UI/UX design", "Product architecture"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    coverImage: "/images/portfolio/avaria-market-cover.jpg",
    gallery: [],
    featured: false,
    completionYear: 2026,
    challenge:
      "Create a marketplace that can support many categories and sellers without overwhelming users.",
    solution:
      "We developed a modular marketplace concept with clear discovery, navigation, vendor support, and administration workflows.",
    results: [
      "Marketplace information architecture",
      "Scalable seller and product model",
      "Customer-focused shopping journey",
    ],
  },
  {
    title: "Northwest Seafood Market",
    slug: "northwest-seafood-market",
    client: "Northwest Seafood Market",
    industry: "Seafood Marketplace",
    categories: ["E-commerce", "Web Apps"],
    shortDescription:
      "A B2B and B2C marketplace concept for seafood suppliers, restaurants, retailers, and consumers.",
    fullDescription:
      "The concept focuses on seafood sourcing, supplier onboarding, local delivery, and express shipping.",
    services: [
      "Product strategy",
      "Marketplace planning",
      "UX architecture",
    ],
    technologies: ["Next.js", "TypeScript", "API integrations"],
    coverImage: "/images/portfolio/northwest-seafood-cover.jpg",
    gallery: [],
    featured: false,
    completionYear: 2026,
    challenge:
      "Serve wholesale and retail seafood customers with different ordering and fulfillment needs.",
    solution:
      "We structured separate customer journeys, supplier workflows, delivery rules, and trust features.",
    results: [
      "Defined B2B and B2C experiences",
      "Supplier onboarding framework",
      "Delivery and fulfillment concept",
    ],
  },
  {
    title: "A-Z Mofila",
    slug: "a-z-mofila",
    client: "A-Z Mofila",
    industry: "Delivery Technology",
    categories: ["Web Apps"],
    shortDescription:
      "A delivery application concept with customer, driver, and administration experiences.",
    fullDescription:
      "A-Z Mofila is designed to manage deliveries, stock options, driver assignments, and order status.",
    services: [
      "Mobile product design",
      "Workflow design",
      "Admin architecture",
    ],
    technologies: ["React Native", "Expo", "TypeScript"],
    coverImage: "/images/portfolio/a-z-mofila-cover.jpg",
    gallery: [],
    featured: false,
    completionYear: 2026,
    challenge:
      "Coordinate customers, drivers, orders, and status updates in a simple mobile experience.",
    solution:
      "We designed role-based workflows and a delivery lifecycle supported by a central dashboard.",
    results: [
      "Customer and driver journeys",
      "Order-status architecture",
      "Administration workflow planning",
    ],
  },
  {
    title: "Glow by K",
    slug: "glow-by-k",
    client: "Glow by K",
    industry: "Beauty",
    categories: ["Branding", "Print & Design"],
    shortDescription:
      "A refined beauty identity supported by logo design and branded business materials.",
    fullDescription:
      "Glow by K needed a polished visual identity for social media, printed materials, and future digital channels.",
    services: ["Logo design", "Business card design", "Brand direction"],
    technologies: ["Adobe Illustrator", "Adobe Photoshop"],
    coverImage: "/images/portfolio/glow-by-k-cover.jpg",
    gallery: [],
    featured: false,
    completionYear: 2026,
    challenge:
      "Create an elegant and recognizable identity suitable for a growing beauty brand.",
    solution:
      "We developed a clean logo system and coordinated business materials with a premium visual direction.",
    results: [
      "Professional logo system",
      "Print-ready brand materials",
    ],
  },
  {
    title: "RO’MOTORS",
    slug: "ro-motors",
    client: "RO’MOTORS",
    industry: "Automotive",
    categories: ["Print & Design"],
    shortDescription:
      "Large-format banners and promotional materials designed for an automotive business.",
    fullDescription:
      "RO’MOTORS required bold, legible, and print-ready graphics suitable for exterior and promotional use.",
    services: [
      "Banner design",
      "Large-format production design",
      "Advertising",
    ],
    technologies: ["Adobe Photoshop", "Adobe Illustrator"],
    coverImage: "/images/portfolio/ro-motors-cover.jpg",
    gallery: [],
    featured: false,
    completionYear: 2026,
    challenge:
      "Create high-impact graphics that remain readable and attractive at large scale.",
    solution:
      "We used strong hierarchy, automotive imagery, and production-ready layouts.",
    results: [
      "Print-ready banner system",
      "Improved roadside visibility",
    ],
  },
  {
    title: "Guy Akakpo Portfolio",
    slug: "guy-akakpo-portfolio",
    client: "Guy Akakpo",
    industry: "Professional Services",
    categories: ["Websites"],
    shortDescription:
      "A modern professional portfolio highlighting experience, skills, projects, and contact information.",
    fullDescription:
      "The portfolio presents a finance and operations profile in a clear, modern, and accessible format.",
    services: ["UI design", "Frontend development", "Deployment"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
    coverImage: "/images/portfolio/guy-akakpo-cover.jpg",
    gallery: [],
    projectUrl: "https://guy-akakpo-portfolio.vercel.app/",
    featured: false,
    completionYear: 2026,
    challenge:
      "Present professional experience and skills in a polished format that is simple to maintain.",
    solution:
      "We built a responsive portfolio with clear navigation, contact actions, and CV access.",
    results: [
      "Responsive portfolio website",
      "Production deployment on Vercel",
    ],
  },
  {
  title: "El Sabor Katracho",
  slug: "el-sabor-katracho",
  client: "El Sabor Katracho Honduras Restaurant",
  industry: "Restaurant & Food",
  categories: [
    "Websites",
    "Branding",
    "Print & Design",
  ],
  shortDescription:
    "A professional restaurant website presenting authentic Honduran cuisine, the complete menu, business information, and online ordering options.",
  fullDescription:
    "El Sabor Katracho is an authentic Honduran restaurant website designed to showcase traditional dishes, communicate the restaurant’s identity, and connect customers with menus, location information, social media, and delivery platforms.",
  services: [
    "Website design",
    "Website development",
    "Restaurant branding",
    "Menu integration",
    "Online ordering integration",
    "Responsive design",
    "SEO configuration",
    "Promotional graphics",
  ],
  technologies: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Responsive Web Design",
    "SEO",
  ],
  coverImage:
    "/images/portfolio/el-sabor-katracho-cover.jpg",
  gallery: [
    "/images/portfolio/el-sabor-katracho-1.jpg",
    "/images/portfolio/el-sabor-katracho-2.jpg",
    "/images/portfolio/el-sabor-katracho-3.jpg",
  ],
  projectUrl: "https://elsaborkatracho.com/",
  featured: true,
  completionYear: 2026,
  challenge:
    "Create an attractive and professional online presence that communicates the restaurant’s authentic Honduran identity while making its menu, location, hours, and ordering options easy to access.",
  solution:
    "We developed a responsive restaurant website with strong food presentation, clear navigation, an organized menu, restaurant information, social media connections, and direct links to online ordering and delivery services.",
  results: [
    "Professional restaurant website",
    "Complete digital menu presentation",
    "Improved visibility of Honduran dishes",
    "Connected online ordering platforms",
    "Responsive mobile experience",
    "Consistent restaurant branding",
  ],
},
{
  title: "Taamine",
  slug: "taamine",
  client: "Taamine.com",
  industry: "Insurance Technology",
  categories: [
    "Websites",
    "Web Apps",
  ],
  shortDescription:
    "A digital insurance comparison platform helping users explore and compare auto, health, home, motorcycle, and other insurance products.",
  fullDescription:
    "Taamine.com is an insurance technology platform designed to simplify insurance discovery and comparison. It allows users to explore different insurance categories and identify offers adapted to their individual needs.",
  services: [
    "Product strategy",
    "UI/UX design",
    "Website development",
    "Insurance category architecture",
    "Comparison workflow design",
    "Responsive design",
    "Content organization",
  ],
  technologies: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Form Management",
    "Responsive Web Design",
  ],
  coverImage:
    "/images/portfolio/taamine-cover.jpg",
  gallery: [
    "/images/portfolio/taamine-1.jpg",
    "/images/portfolio/taamine-2.jpg",
    "/images/portfolio/taamine-3.jpg",
  ],
  projectUrl: "https://taamine.com/",
  featured: true,
  completionYear: 2026,
  challenge:
    "Make insurance products easier to understand and compare while organizing multiple categories, providers, guides, and customer information within one digital platform.",
  solution:
    "We structured a user-friendly insurance comparison experience with clear categories, calls to action, provider presentation, informational content, and workflows designed to guide users toward suitable insurance offers.",
  results: [
    "Centralized insurance comparison experience",
    "Clear insurance-category navigation",
    "Simplified customer discovery journey",
    "Responsive platform structure",
    "Scalable foundation for additional insurers",
    "Improved presentation of insurance offers",
  ],
},
{
  title: "BMF Technology",
  slug: "bmf-technology",
  client: "BMF Technology",
  industry: "Technology & Digital Transformation",
  categories: [
    "Websites",
    "Branding",
    "Web Apps",
  ],
  shortDescription:
    "A premium corporate technology website presenting software development, digital transformation, cloud, consulting, UX/UI, and professional training services.",
  fullDescription:
    "BMF Technology is a technology company helping organizations accelerate digital transformation through custom software development, technology consulting, process automation, cloud infrastructure, product design, and innovation.",
  services: [
    "Digital strategy",
    "Corporate website design",
    "UI/UX design",
    "Website development",
    "Brand presentation",
    "Service architecture",
    "Content organization",
    "Responsive design",
    "SEO configuration",
  ],
  technologies: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Responsive Web Design",
    "SEO",
    "Performance Optimization",
  ],
  coverImage:
    "/images/portfolio/bmf-technology-cover.jpg",
  gallery: [
    "/images/portfolio/bmf-technology-1.jpg",
    "/images/portfolio/bmf-technology-2.jpg",
    "/images/portfolio/bmf-technology-3.jpg",
  ],
  projectUrl: "https://bmf-technology.com/",
  featured: true,
  completionYear: 2026,
  challenge:
    "Present a broad range of technology services and industry expertise through a modern corporate website capable of building trust with businesses and prospective partners.",
  solution:
    "We created a structured technology website with a premium hero section, detailed service presentation, industry solutions, project showcases, methodology, company values, career information, and conversion-focused calls to action.",
  results: [
    "Premium corporate technology presence",
    "Clear presentation of technology services",
    "Structured industry-specific solutions",
    "Professional project showcase",
    "Improved lead-generation pathways",
    "Scalable content and service architecture",
  ],
},
];

export const portfolioCategories: Array<
  "All" | PortfolioCategory
> = [
  "All",
  "Websites",
  "E-commerce",
  "Branding",
  "Web Apps",
  "Nonprofit",
  "Print & Design",
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find(
    (project) => project.slug === slug,
  );
}