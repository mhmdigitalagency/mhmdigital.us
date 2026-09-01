import { prisma } from "@/lib/prisma";
import "@/lib/env";
import { ServiceType, PackagePricingType } from "@/app/generated/prisma/client";

const PRICE_DISCOUNT = 241;
const DIGITAL_MARKETING_PRICE_CUT = 430;
const ANIMATION_STARTER_PRICE_CUT = 400;
const ANIMATION_ULTIMATE_PRICE_CUT = 1000;

function discounted(price: number | null): number | null {
  if (price === null) return null;
  return Math.max(0, price - PRICE_DISCOUNT);
}

function applyCategoryPriceCuts(pkg: {
  serviceName: string;
  name: string;
  price: number | null;
  priceByMonth: number | null;
  priceByYear: number | null;
}) {
  let { price, priceByMonth, priceByYear } = pkg;

  if (pkg.serviceName === "Digital Marketing") {
    price = price != null ? Math.max(0, price - DIGITAL_MARKETING_PRICE_CUT) : null;
    priceByMonth =
      priceByMonth != null ? Math.max(0, priceByMonth - DIGITAL_MARKETING_PRICE_CUT) : null;
    priceByYear =
      priceByYear != null ? Math.max(0, priceByYear - DIGITAL_MARKETING_PRICE_CUT) : null;
  }

  if (pkg.serviceName === "Animation (2D & 3D)") {
    if (pkg.name === "Starter" && price != null) {
      price = Math.max(0, price - ANIMATION_STARTER_PRICE_CUT);
    }
    if (pkg.name === "Ultimate" && price != null) {
      price = Math.max(0, price - ANIMATION_ULTIMATE_PRICE_CUT);
    }
  }

  return { price, priceByMonth, priceByYear };
}

import { PRINT_SERVICES } from "@/lib/constants/services-data";

const printImage = (slug: string) => `/images/print/${slug}.jpg`;

/** Default starting prices in cents for print catalog */
const DEFAULT_PRINT_PRICES: Record<string, number | null> = {
  "business-cards": 3500,
  flyers: 4500,
  brochures: 8500,
  posters: 2500,
  banners: 12000,
  signs: 15000,
  stickers: 2000,
  labels: 3000,
  "apparel-dtf": 1800,
  "marketing-materials": 5000,
  "custom-packaging": 20000,
  "large-format": 8000,
  "bulk-orders": null,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  // Nettoyage
  await prisma.orderStatusHistory.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.serviceRequest.deleteMany();
  await prisma.package.deleteMany();
  await prisma.subService.deleteMany();
  await prisma.service.deleteMany();
  await prisma.printProduct.deleteMany();
  await prisma.newsletter.deleteMany();
  await prisma.contact.deleteMany();

  // SERVICES
  const servicesData = [
    {
      name: "Branding",
      slug: "branding",
      description:
        "Companies seeking a fully integrated branding solution with personalized support. Each package offers progressively more value, allowing clients to choose based on their specific needs and budget. This tiered approach makes it easy for clients to start with basics and upgrade as their business grows.",
      icon: "/images/branding.png",
      image: "/images/branding.png",
      serviceType: ServiceType.PACKAGE,
      position: 1,
    },
    {
      name: "Web Design and Development",
      slug: "web-design-and-development",
      description:
        "Companies needing a robust, feature-rich website with advanced customization and continuous support. Each package caters to different business sizes and stages, offering flexibility for clients to select the package that best suits their current needs while allowing for future upgrades as their business evolves.",
      icon: "/images/Web_design_dev.png",
      image: "/images/Web_design_dev.png",
      serviceType: ServiceType.PACKAGE,
      position: 2,
    },
    {
      name: "Mobile App Development",
      slug: "mobile-app-development",
      description:
        "Enterprises or businesses looking for a fully customized, high-end app with ongoing support and premium features that cater to complex needs and large-scale operations. These packages are designed to cater to various stages of business development, allowing clients to start with a basic app in the Starter Package and scale up to a fully customized, high-performance app in the Ultimate Package as their needs grow.",
      icon: "/images/Mobile_ App_Development.png",
      image: "/images/Mobile_ App_Development.png",
      serviceType: ServiceType.PACKAGE,
      position: 3,
    },
    {
      name: "Digital Marketing",
      slug: "digital-marketing",
      description:
        "Businesses aiming for the highest level of digital marketing support, complete with a full suite of services to dominate their market and achieve significant growth. Each package is designed to meet different business needs and budgets, allowing clients to start with essential services in the Starter Package and progressively scale up to the comprehensive offerings in the Ultimate Package as their business grows.",
      icon: "/images/Digital_Marketing.png",
      image: "/images/Digital_Marketing.png",
      serviceType: ServiceType.PACKAGE,
      position: 4,
    },
    {
      name: "Animation (2D & 3D)",
      slug: "animation-2d-and-3d",
      description:
        "Small businesses or individuals needing simple, cost-effective animations for presentations, social media, or marketing.",
      icon: "/images/Animation_2d_3d.png",
      image: "/images/Animation_2d_3d.png",
      serviceType: ServiceType.PACKAGE,
      position: 5,
    },
    {
      name: "Digital Signage",
      slug: "digital-signage",
      description:
        "Professional digital signage for storefronts, offices, restaurants, and retail. We design screen content, configure displays, and help you keep messaging fresh with remote updates and scheduled playlists.",
      icon: "/images/services/digital-signage.jpg",
      image: "/images/services/digital-signage.jpg",
      serviceType: ServiceType.PACKAGE,
      position: 6,
    },
    {
      name: "All-in Marketing Platform",
      slug: "all-in-marketing-platform",
      description:
        "MHM Digital's all-in-one marketing platform — CRM, pipelines, email and SMS, funnels, forms, appointment booking, and automation in one dashboard. No third-party CRM to manage; we host and support everything for you.",
      icon: "/images/services/crm-saas-solutions.svg",
      image: "/images/services/crm-saas-solutions.svg",
      serviceType: ServiceType.PACKAGE,
      position: 7,
    },
  ];

  const createdServices = new Map<string, { id: string; name: string }>();

  for (const service of servicesData) {
    const created = await prisma.service.create({ data: service });
    createdServices.set(created.name, { id: created.id, name: created.name });
  }

  // SUBSERVICES
  const subServicesData = [
    {
      name: "Social Media Marketing",
      slug: slugify("Social Media Marketing"),
      description: "Lorem ipsum",
      serviceName: "Digital Marketing",
      position: 1,
    },
    {
      name: "Search Engine Optimization",
      slug: slugify("Search Engine Optimization"),
      description: "Lorem ipsum",
      serviceName: "Digital Marketing",
      position: 2,
    },
    {
      name: "Pay-Per-Click Advertising",
      slug: slugify("Pay-Per-Click Advertising"),
      description: "Lorem ipsum",
      serviceName: "Digital Marketing",
      position: 3,
    },
    {
      name: "Content Marketing",
      slug: slugify("Content Marketing"),
      description: "Lorem ipsum",
      serviceName: "Digital Marketing",
      position: 4,
    },
    {
      name: "Email Marketing",
      slug: slugify("Email Marketing"),
      description: "Lorem ipsum",
      serviceName: "Digital Marketing",
      position: 5,
    },
  ];

  const createdSubServices = new Map<string, { id: string; name: string }>();

  for (const sub of subServicesData) {
    const service = createdServices.get(sub.serviceName);
    if (!service) throw new Error(`Service not found: ${sub.serviceName}`);

    const created = await prisma.subService.create({
      data: {
        name: sub.name,
        slug: sub.slug,
        description: sub.description,
        serviceId: service.id,
        position: sub.position,
      },
    });

    createdSubServices.set(created.name, { id: created.id, name: created.name });
  }

  // PACKAGES
  const packagesData = [
    // Branding
    {
      serviceName: "Branding",
      subServiceName: null,
      name: "Starter",
      slug: "branding-starter",
      pricingType: PackagePricingType.ONE_TIME,
      price: 580,
      priceByMonth: null,
      priceByYear: null,
      description: "Ideal for getting started with basic needs.",
      points: [
        "Logo design (2 initial concepts, 1 revision).",
        "Basic brand style guide (logo usage, primary colors).",
        "Business card design (print-ready file).",
        "Digital files : Provided in PNG, JPEG, and PDF formats.",
      ],
      image: "/images/icon-1-packages-marketing-template.png",
      position: 1,
    },
    {
      serviceName: "Branding",
      subServiceName: null,
      name: "Growth",
      slug: "branding-growth",
      pricingType: PackagePricingType.ONE_TIME,
      price: 1000,
      priceByMonth: null,
      priceByYear: null,
      description:
        "Designed for businesses looking to expand and enhance their web presence.",
      points: [
        "Logo design (3 initial concepts, 2 revisions).",
        "Comprehensive brand style guide (logo, colors, fonts).",
        "Business card and letterhead design (print-ready files).",
        "Social media profile image design.",
        "Basic stationery design (envelopes).",
        "Brand Guidelines : Basic guide (logo, colors, and fonts only).",
        "Digital Files : Provided in PNG, JPEG, SVG, and PDF formats.",
      ],
      image: "/images/icon-2-packages-marketing-template.png",
      position: 2,
    },
    {
      serviceName: "Branding",
      subServiceName: null,
      name: "Ultimate",
      slug: "branding-ultimate",
      pricingType: PackagePricingType.ONE_TIME,
      price: 1700,
      priceByMonth: null,
      priceByYear: null,
      description: "For those seeking the best, most complete package.",
      points: [
        "Premium logo design (unlimited concepts and revisions).",
        "Full brand identity package (style guide, logo variations, color palette, typography, iconography).",
        "Complete stationery set (business cards, letterheads, envelopes).",
        "Social media kit (profile and banner images for 3 platforms).",
        "Branded marketing materials (brochures, flyers).",
        "Presentation Templates: Branded PowerPoint/Google Slides templates.",
        "Email Signature: Custom HTML or image-based signature with social media links.",
        "Brand Guidelines: Comprehensive guide covering all brand aspects, including voice and messaging.",
        "Brand launch consultation and strategy session.",
        "Digital Files: Provided in AI, EPS, PNG, JPEG, and PDF formats.",
      ],
      image: "/images/icon-3-packages-marketing-template.png",
      position: 3,
    },

    // Web Design and Development
    {
      serviceName: "Web Design and Development",
      subServiceName: null,
      name: "Starter",
      slug: "web-design-and-development-starter",
      pricingType: PackagePricingType.ONE_TIME,
      price: 1880,
      priceByMonth: null,
      priceByYear: null,
      description: "Ideal for getting started with basic needs.",
      points: [
        "Up to 5-page website.",
        "Security: Basic SSL certificate for secure browsing.",
        "Built entirely from scratch — custom design tailored to your brand.",
        "1-year hosting included.",
        "Mobile-friendly layout.",
        "Basic SEO setup (meta tags, alt text).",
        "Contact form integration.",
        "One round of revisions.",
        "Email: 2 professional email addresses (e.g., name@yourdomain.com).",
      ],
      image: "/images/icon-1-packages-marketing-template.png",
      position: 1,
    },
    {
      serviceName: "Web Design and Development",
      subServiceName: null,
      name: "Growth",
      slug: "web-design-and-development-growth",
      pricingType: PackagePricingType.ONE_TIME,
      price: 2550,
      priceByMonth: null,
      priceByYear: null,
      description:
        "Designed for businesses looking to expand and enhance their web presence.",
      points: [
        "Up to 8-page website.",
        "Domain Name and Hosting.",
        "Security: Basic SSL certificate for secure browsing.",
        "Custom design built from scratch (unique layout, tailored to brand).",
        "CMS integration (WordPress or similar).",
        "Advanced SEO setup (keywords, speed optimization).",
        "1-year hosting included.",
        "Blog setup and basic training.",
        "Social media integration.",
        "Two rounds of revisions.",
        "Email: up to 5 professional email addresses (e.g., name@yourdomain.com).",
        "Support and Training: 1-hour training session on how to update the website content.",
      ],
      image: "/images/icon-2-packages-marketing-template.png",
      position: 2,
    },
    {
      serviceName: "Web Design and Development",
      subServiceName: null,
      name: "Ultimate",
      slug: "web-design-and-development-ultimate",
      pricingType: PackagePricingType.ONE_TIME,
      price: 5400,
      priceByMonth: null,
      priceByYear: null,
      description: "For those seeking the best, most complete package.",
      points: [
        "Up to 18-page fully custom website.",
        "No CMS, coded from scratch for unique needs.",
        "Advanced features (animations, custom forms, e-commerce setup).",
        "1-year hosting included.",
        "Email: Professional email setup (up to 10 accounts).",
        "Full SEO optimization.",
        "Three rounds of revisions.",
        "Ongoing support for 3 months post-launch.",
        "Support and Training: 1-hour training session on how to update the website content.",
      ],
      image: "/images/icon-3-packages-marketing-template.png",
      position: 3,
    },

    // Mobile App Development
    {
      serviceName: "Mobile App Development",
      subServiceName: null,
      name: "Starter",
      slug: "mobile-app-development-starter",
      pricingType: PackagePricingType.ONE_TIME,
      price: 5100,
      priceByMonth: null,
      priceByYear: null,
      description: "Ideal for getting started with basic needs.",
      points: [
        "Basic app for one platform (iOS or Android).",
        "Core features (e.g., user login, simple UI, basic functionalities).",
        "Standard design template.",
        "Basic analytics integration.",
        "One round of revisions.",
      ],
      image: "/images/icon-1-packages-marketing-template.png",
      position: 1,
    },
    {
      serviceName: "Mobile App Development",
      subServiceName: null,
      name: "Growth",
      slug: "mobile-app-development-growth",
      pricingType: PackagePricingType.ONE_TIME,
      price: 9600,
      priceByMonth: null,
      priceByYear: null,
      description:
        "Designed for businesses looking to expand and enhance their web presence.",
      points: [
        "Multi-platform app (iOS and Android).",
        "Standard features (push notifications, user profiles, database integration).",
        "Custom UI/UX design.",
        "API integration (e.g., social login, payment gateway).",
        "Intermediate analytics and reporting.",
        "Two rounds of revisions.",
      ],
      image: "/images/icon-2-packages-marketing-template.png",
      position: 2,
    },
    {
      serviceName: "Mobile App Development",
      subServiceName: null,
      name: "Ultimate",
      slug: "mobile-app-development-ultimate",
      pricingType: PackagePricingType.ONE_TIME,
      price: 17600,
      priceByMonth: null,
      priceByYear: null,
      description: "For those seeking the best, most complete package.",
      points: [
        "Advanced app with full custom features (geolocation, advanced user interaction).",
        "Multi-platform (iOS, Android) and web app if needed.",
        "Advanced UI/UX design with animations.",
        "Full backend development and integration.",
        "1-year support and maintenance.",
        "Advanced analytics, performance tracking, and optimization.",
        "Three rounds of revisions.",
      ],
      image: "/images/icon-3-packages-marketing-template.png",
      position: 3,
    },

    // Social Media Marketing
    {
      serviceName: "Digital Marketing",
      subServiceName: "Social Media Marketing",
      name: "Starter",
      slug: "social-media-marketing-starter",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 800,
      priceByYear: 14000,
      description: "Ideal for getting started with basic needs.",
      points: [
        "Management of 1-2 social media profiles.",
        "10 posts per month with basic graphics.",
        "Monthly performance report.",
      ],
      image: "/images/icon-1-packages-marketing-template.png",
      position: 1,
    },
    {
      serviceName: "Digital Marketing",
      subServiceName: "Social Media Marketing",
      name: "Growth",
      slug: "social-media-marketing-growth",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 2000,
      priceByYear: 28400,
      description:
        "Designed for businesses looking to expand and enhance their web presence.",
      points: [
        "Management of 3-4 social media profiles.",
        "20 posts per month with custom graphics and captions.",
        "Paid ad management (up to $500 ad spend).",
        "Bi-weekly performance report.",
      ],
      image: "/images/icon-2-packages-marketing-template.png",
      position: 2,
    },
    {
      serviceName: "Digital Marketing",
      subServiceName: "Social Media Marketing",
      name: "Ultimate",
      slug: "social-media-marketing-ultimate",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 4100,
      priceByYear: 53600,
      description: "For those seeking the best, most complete package.",
      points: [
        "Full management of up to 6 profiles.",
        "30+ posts per month with advanced graphics, videos, and engagement.",
        "Comprehensive ad management (up to $1,000 ad spend).",
        "Weekly performance analysis and strategy calls.",
      ],
      image: "/images/icon-3-packages-marketing-template.png",
      position: 3,
    },

    // SEO
    {
      serviceName: "Digital Marketing",
      subServiceName: "Search Engine Optimization",
      name: "Starter",
      slug: "search-engine-optimization-starter",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 400,
      priceByYear: 9200,
      description: "Ideal for getting started with basic needs.",
      points: [
        "Basic on-page SEO (keywords, meta tags for up to 5 pages).",
        "Technical audit and basic fixes.",
        "Monthly keyword tracking and report.",
      ],
      image: "/images/icon-1-packages-marketing-template.png",
      position: 1,
    },
    {
      serviceName: "Digital Marketing",
      subServiceName: "Search Engine Optimization",
      name: "Growth",
      slug: "search-engine-optimization-growth",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 1100,
      priceByYear: 17600,
      description:
        "Designed for businesses looking to expand and enhance their web presence.",
      points: [
        "Comprehensive on-page and off-page SEO (10 pages).",
        "Link building and local SEO optimization.",
        "Monthly performance reports and strategy updates.",
      ],
      image: "/images/icon-2-packages-marketing-template.png",
      position: 2,
    },
    {
      serviceName: "Digital Marketing",
      subServiceName: "Search Engine Optimization",
      name: "Ultimate",
      slug: "search-engine-optimization-ultimate",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 2600,
      priceByYear: 35600,
      description: "For those seeking the best, most complete package.",
      points: [
        "Advanced SEO strategy (unlimited pages).",
        "Technical SEO overhaul and content strategy.",
        "Ongoing link-building campaigns and competitor analysis.",
        "Weekly detailed performance reports.",
      ],
      image: "/images/icon-3-packages-marketing-template.png",
      position: 3,
    },

    // PPC
    {
      serviceName: "Digital Marketing",
      subServiceName: "Pay-Per-Click Advertising",
      name: "Starter",
      slug: "pay-per-click-advertising-starter",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 600,
      priceByYear: 11600,
      description: "Ideal for getting started with basic needs.",
      points: [
        "Setup and management of 1 Google Ads campaign.",
        "Monthly ad spend management up to $500.",
        "Basic ad copy and design.",
      ],
      image: "/images/icon-1-packages-marketing-template.png",
      position: 1,
    },
    {
      serviceName: "Digital Marketing",
      subServiceName: "Pay-Per-Click Advertising",
      name: "Growth",
      slug: "pay-per-click-advertising-growth",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 1600,
      priceByYear: 23600,
      description:
        "Designed for businesses looking to expand and enhance their web presence.",
      points: [
        "Setup and management of multiple campaigns (Google, Bing).",
        "Monthly ad spend management up to $1,500.",
        "Advanced ad copy, split testing, and landing page optimization.",
      ],
      image: "/images/icon-2-packages-marketing-template.png",
      position: 2,
    },
    {
      serviceName: "Digital Marketing",
      subServiceName: "Pay-Per-Click Advertising",
      name: "Ultimate",
      slug: "pay-per-click-advertising-ultimate",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 3600,
      priceByYear: 47600,
      description: "For those seeking the best, most complete package.",
      points: [
        "Comprehensive PPC strategy across multiple platforms (Google, Bing, Social Media).",
        "Monthly ad spend management up to $5,000.",
        "Custom landing pages, advanced analytics, and conversion tracking.",
      ],
      image: "/images/icon-3-packages-marketing-template.png",
      position: 3,
    },

    // Content Marketing
    {
      serviceName: "Digital Marketing",
      subServiceName: "Content Marketing",
      name: "Starter",
      slug: "content-marketing-starter",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 350,
      priceByYear: 8600,
      description: "Ideal for getting started with basic needs.",
      points: [
        "2 blog posts or articles per month (up to 500 words each).",
        "Basic SEO optimization for content.",
        "Monthly content performance report.",
      ],
      image: "/images/icon-1-packages-marketing-template.png",
      position: 1,
    },
    {
      serviceName: "Digital Marketing",
      subServiceName: "Content Marketing",
      name: "Growth",
      slug: "content-marketing-growth",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 1100,
      priceByYear: 17600,
      description:
        "Designed for businesses looking to expand and enhance their web presence.",
      points: [
        "4 blog posts or articles per month (up to 1,000 words each).",
        "SEO-optimized content and infographics.",
        "Social media content distribution.",
        "Bi-weekly performance analysis.",
      ],
      image: "/images/icon-2-packages-marketing-template.png",
      position: 2,
    },
    {
      serviceName: "Digital Marketing",
      subServiceName: "Content Marketing",
      name: "Ultimate",
      slug: "content-marketing-ultimate",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 2600,
      priceByYear: 35600,
      description: "For those seeking the best, most complete package.",
      points: [
        "High-volume content strategy and production.",
        "SEO content calendar and advanced optimization.",
        "Multi-channel distribution support.",
        "Detailed analytics and strategy reporting.",
      ],
      image: "/images/icon-3-packages-marketing-template.png",
      position: 3,
    },

    // Email Marketing
    {
      serviceName: "Digital Marketing",
      subServiceName: "Email Marketing",
      name: "Starter",
      slug: "email-marketing-starter",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 341,
      priceByYear: 5600,
      description: "Ideal for getting started with basic needs.",
      points: [
        "1 email campaign per month.",
        "Basic template design and content creation.",
        "Performance tracking (open rates, click rates).",
      ],
      image: "/images/icon-1-packages-marketing-template.png",
      position: 1,
    },
    {
      serviceName: "Digital Marketing",
      subServiceName: "Email Marketing",
      name: "Growth",
      slug: "email-marketing-growth",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 600,
      priceByYear: 11600,
      description:
        "Designed for businesses looking to expand and enhance their web presence.",
      points: [
        "3 email campaigns per month.",
        "Custom template design, list segmentation, and automation setup.",
        "Monthly performance report with recommendations.",
      ],
      image: "/images/icon-2-packages-marketing-template.png",
      position: 2,
    },
    {
      serviceName: "Digital Marketing",
      subServiceName: "Email Marketing",
      name: "Ultimate",
      slug: "email-marketing-ultimate",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 1600,
      priceByYear: 23600,
      description: "For those seeking the best, most complete package.",
      points: [
        "5+ email campaigns per month with advanced automation and personalization.",
        "A/B testing of subject lines, content, and send times.",
        "Detailed analytics and strategy sessions.",
      ],
      image: "/images/icon-3-packages-marketing-template.png",
      position: 3,
    },

    // Animation
    {
      serviceName: "Animation (2D & 3D)",
      subServiceName: null,
      name: "Starter",
      slug: "animation-2d-and-3d-starter",
      pricingType: PackagePricingType.ONE_TIME,
      price: 1100,
      priceByMonth: null,
      priceByYear: null,
      description: "Ideal for getting started with basic needs.",
      points: [
        "2D animation (up to 30 seconds).",
        "Basic animation style (simple characters or icons).",
        "Scriptwriting and voiceover included.",
        "One round of revisions.",
      ],
      image: "/images/icon-1-packages-marketing-template.png",
      position: 1,
    },
    {
      serviceName: "Animation (2D & 3D)",
      subServiceName: null,
      name: "Ultimate",
      slug: "animation-2d-and-3d-ultimate",
      pricingType: PackagePricingType.ONE_TIME,
      price: 3100,
      priceByMonth: null,
      priceByYear: null,
      description: "For those seeking the best, most complete package.",
      points: [
        "3D animation (up to 1 minute).",
        "Advanced animation (detailed characters, complex movements).",
        "Scriptwriting, professional voiceover, and sound effects.",
        "Two rounds of revisions.",
        "Storyboarding and concept art included.",
      ],
      image: "/images/icon-3-packages-marketing-template.png",
      position: 2,
    },

    // Digital Signage
    {
      serviceName: "Digital Signage",
      subServiceName: null,
      name: "Starter",
      slug: "digital-signage-starter",
      pricingType: PackagePricingType.ONE_TIME,
      price: 921,
      priceByMonth: null,
      priceByYear: null,
      description: "Ideal for a single-screen setup with essential branded content.",
      points: [
        "1 display screen configured (up to 55\").",
        "3 custom slide designs (menus, promos, or announcements).",
        "Basic playlist setup and scheduling.",
        "On-site or remote display configuration.",
        "One round of content revisions.",
      ],
      image: "/images/icon-1-packages-marketing-template.png",
      position: 1,
    },
    {
      serviceName: "Digital Signage",
      subServiceName: null,
      name: "Growth",
      slug: "digital-signage-growth",
      pricingType: PackagePricingType.ONE_TIME,
      price: 1691,
      priceByMonth: null,
      priceByYear: null,
      description: "For businesses needing multiple screens and ongoing content support.",
      points: [
        "Up to 3 display screens configured.",
        "10 custom slide or video designs.",
        "Scheduled playlists for daypart messaging.",
        "3 months of content updates (2 updates per month).",
        "Remote management setup and training.",
        "Two rounds of revisions.",
      ],
      image: "/images/icon-2-packages-marketing-template.png",
      position: 2,
    },
    {
      serviceName: "Digital Signage",
      subServiceName: null,
      name: "Ultimate",
      slug: "digital-signage-ultimate",
      pricingType: PackagePricingType.ONE_TIME,
      price: 3041,
      priceByMonth: null,
      priceByYear: null,
      description: "Full signage network with premium content and long-term management.",
      points: [
        "Up to 6 display screens across locations.",
        "Unlimited initial slide designs (first month).",
        "Motion graphics and animated promos.",
        "6 months of content management and updates.",
        "Priority remote support and display monitoring.",
        "Quarterly content strategy review.",
      ],
      image: "/images/icon-3-packages-marketing-template.png",
      position: 3,
    },

    // All-in Marketing Platform (MHM-hosted — not GoHighLevel)
    {
      serviceName: "All-in Marketing Platform",
      subServiceName: null,
      name: "Starter",
      slug: "all-in-marketing-platform-starter",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 290,
      priceByYear: 731,
      description: "Launch your marketing hub for less than a single tool subscription.",
      points: [
        "CRM with up to 500 contacts and lead tagging.",
        "Contact forms and lead capture widgets for your website.",
        "Email campaigns and basic automation sequences.",
        "Sales pipeline with deal stages and follow-up reminders.",
        "Online appointment booking and calendar sync.",
        "Unified inbox for email and form submissions.",
        "1 team member included.",
      ],
      image: "/images/icon-1-packages-marketing-template.png",
      position: 1,
    },
    {
      serviceName: "All-in Marketing Platform",
      subServiceName: null,
      name: "Growth",
      slug: "all-in-marketing-platform-growth",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 338,
      priceByYear: 1211,
      description: "Scale lead generation with SMS, funnels, and workflow automation.",
      points: [
        "Everything in Starter, plus up to 2,500 contacts.",
        "SMS marketing and two-way text conversations.",
        "Funnel and landing page builder with templates.",
        "Workflow automations (triggers, tags, and follow-ups).",
        "Review and reputation request campaigns.",
        "Social media content planner and post scheduling.",
        "Up to 3 team members included.",
      ],
      image: "/images/icon-2-packages-marketing-template.png",
      position: 2,
    },
    {
      serviceName: "All-in Marketing Platform",
      subServiceName: null,
      name: "Ultimate",
      slug: "all-in-marketing-platform-ultimate",
      pricingType: PackagePricingType.MONTHLY_YEARLY,
      price: null,
      priceByMonth: 438,
      priceByYear: 2211,
      description: "Full marketing operating system with advanced automation and priority support.",
      points: [
        "Everything in Growth, plus unlimited contacts.",
        "Advanced multi-step automations and conditional workflows.",
        "Custom domains for funnels, forms, and booking pages.",
        "Invoicing, payment links, and proposal templates.",
        "Call tracking and conversation analytics.",
        "White-label client portal option.",
        "Priority onboarding and up to 10 team members.",
      ],
      image: "/images/icon-3-packages-marketing-template.png",
      position: 3,
    },
  ];

  for (const pkg of packagesData) {
    const service = createdServices.get(pkg.serviceName);
    if (!service) throw new Error(`Service not found: ${pkg.serviceName}`);

    const subService = pkg.subServiceName
      ? createdSubServices.get(pkg.subServiceName)
      : null;

    const adjustedPrices = applyCategoryPriceCuts(pkg);

    await prisma.package.create({
      data: {
        serviceId: service.id,
        subServiceId: subService?.id ?? null,
        name: pkg.name,
        slug: pkg.slug,
        description: pkg.description,
        points: pkg.points,
        image: pkg.image,
        pricingType: pkg.pricingType,
        price: discounted(adjustedPrices.price),
        priceByMonth: discounted(adjustedPrices.priceByMonth),
        priceByYear: discounted(adjustedPrices.priceByYear),
        isActive: true,
        isFeatured: pkg.name === "Ultimate",
        position: pkg.position,
      },
    });
  }

  // CMS defaults
  const stats = [
    { key: "projects", label: "Projects Completed", value: "150", suffix: "+", sortOrder: 0 },
    { key: "businesses", label: "Businesses Supported", value: "80", suffix: "+", sortOrder: 1 },
    { key: "industries", label: "Industries Served", value: "12", suffix: "+", sortOrder: 2 },
    { key: "satisfaction", label: "Customer Satisfaction", value: "98", suffix: "%", sortOrder: 3 },
    { key: "experience", label: "Years Combined Experience", value: "15", suffix: "+", sortOrder: 4 },
  ];

  for (const stat of stats) {
    await prisma.siteStatistic.upsert({
      where: { key: stat.key },
      update: stat,
      create: stat,
    });
  }

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      {
        name: "Sarah Johnson",
        role: "CEO",
        company: "TechStart Inc.",
        content: "MHM Digital transformed our online presence. Our website traffic increased 300% within three months.",
        rating: 5,
        sortOrder: 0,
      },
      {
        name: "Michael Chen",
        role: "Marketing Director",
        company: "GrowthCo",
        content: "Professional, responsive, and delivered exactly what we needed. Outstanding print quality.",
        rating: 5,
        sortOrder: 1,
      },
    ],
  });

  await prisma.printProduct.deleteMany();
  for (const [index, item] of PRINT_SERVICES.entries()) {
    await prisma.printProduct.create({
      data: {
        name: item.name,
        slug: item.slug,
        description: item.description,
        category: item.slug === "bulk-orders" ? "Bulk" : "Standard",
        image: item.image || printImage(item.slug),
        basePrice: DEFAULT_PRINT_PRICES[item.slug] ?? null,
        isActive: true,
        isBulk: item.slug === "bulk-orders",
        sortOrder: index,
      },
    });
  }

  const dealsToEnsure = [
    {
      title: "Fall Promo — All Services",
      description:
        "Save 10% on Growth, Ultimate, and all non-Starter packages through September 30. Starter tiers excluded.",
      badgeText: "10% OFF",
      discountLabel: "All packages except Starter — ends Sep 30",
      imageUrl: "/images/branding.png",
      buttonText: "View Packages",
      buttonUrl: "/packages",
      category: "promo",
      isActive: true,
      showOnHome: true,
      sortOrder: 0,
    },
    {
      title: "New Client Website Package",
      description: "Get a professional website launch package with branding consultation included.",
      badgeText: "LIMITED TIME",
      discountLabel: "15% off Growth & Ultimate packages",
      imageUrl: "/images/deals/website-package-deal.png",
      buttonText: "Claim Offer",
      buttonUrl: "/quote",
      category: "website-design-development",
      isActive: true,
      showOnHome: true,
      sortOrder: 1,
    },
    {
      title: "Print Bulk Discount",
      description: "Save on business cards, flyers, and banners when you order in volume.",
      badgeText: "PRINT DEAL",
      discountLabel: "Volume pricing available",
      imageUrl: "/images/deals/print-bulk-deal.png",
      buttonText: "Request Bulk Quote",
      buttonUrl: "/quote?type=print-bulk",
      category: "print:bulk-orders",
      isActive: true,
      showOnHome: true,
      sortOrder: 2,
    },
    {
      title: "Digital Signage Launch",
      description: "Get your first screen set up with custom content and remote playlist management.",
      badgeText: "NEW SERVICE",
      discountLabel: "Starter package from $680",
      imageUrl: "/images/deals/digital-signage-deal.png",
      buttonText: "View Signage",
      buttonUrl: "/services",
      category: "digital-signage",
      isActive: true,
      showOnHome: true,
      sortOrder: 3,
    },
  ];

  const dealTitles = dealsToEnsure.map((deal) => deal.title);
  await prisma.deal.deleteMany({ where: { title: { notIn: dealTitles } } });

  for (const deal of dealsToEnsure) {
    const existing = await prisma.deal.findFirst({ where: { title: deal.title } });
    if (existing) {
      await prisma.deal.update({ where: { id: existing.id }, data: deal });
    } else {
      await prisma.deal.create({ data: deal });
    }
  }

  const faqToEnsure = [
    {
      question: "What services does MHM Digital offer?",
      answer:
        "We offer branding, web design and development, mobile apps, digital marketing, animation, digital signage, and professional printing — including business cards, flyers, banners, and bulk corporate orders.",
      category: "general",
      sortOrder: 0,
      isActive: true,
    },
    {
      question: "How do I get a quote for my project?",
      answer:
        "Use our online quote form or contact us directly. We respond within one business day with a tailored proposal. Registered customers can also track quotes in their dashboard.",
      category: "general",
      sortOrder: 1,
      isActive: true,
    },
    {
      question: "Do you offer printing services in Seattle?",
      answer:
        "Yes. MHM Digital provides full-service printing in Seattle — from business cards and marketing materials to large-format banners and bulk corporate orders with proof approval and tracking.",
      category: "print",
      sortOrder: 2,
      isActive: true,
    },
    {
      question: "How does payment work?",
      answer:
        "After you approve a quote, our team sends payment instructions. We accept standard business payment methods and provide invoices through your customer dashboard.",
      category: "billing",
      sortOrder: 3,
      isActive: true,
    },
  ];

  for (const faq of faqToEnsure) {
    const existing = await prisma.faqItem.findFirst({ where: { question: faq.question } });
    if (existing) {
      await prisma.faqItem.update({ where: { id: existing.id }, data: faq });
    } else {
      await prisma.faqItem.create({ data: faq });
    }
  }

  const existingPopup = await prisma.popupSettings.findFirst();
  if (!existingPopup) {
    await prisma.popupSettings.create({
      data: {
        enabled: false,
        title: "Welcome to MHM Digital",
        description: "Get a free quote on your next project. Limited time offer for new clients.",
        buttonText: "Get a Free Quote",
        buttonUrl: "/quote",
        secondaryText: "Browse Services",
        secondaryUrl: "/services",
        displayDelay: 5,
        showOnceSession: true,
        showOnceUser: true,
      },
    });
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });