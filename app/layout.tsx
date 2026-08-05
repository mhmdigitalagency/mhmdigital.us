import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetBrainsMomo",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://mhmdigital.us"),
  title: {
    default: "MHM Digital | Seattle Digital Agency & Printing",
    template: "%s | MHM Digital",
  },
  description:
    "MHM Digital is a Seattle-based digital growth agency offering branding, web design, digital marketing, software development, and professional printing for startups and businesses.",
  keywords: [
    "digital agency Seattle",
    "web design Seattle",
    "printing services Seattle",
    "SEO services",
    "digital marketing",
    "commercial printing",
    "bulk print orders",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MHM Digital",
    images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: "MHM Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MHM Digital | Digital Growth Agency",
    description: "We Help startups & businesses grow.",
  },
  icons: {
    icon: "/images/icon.png",
    apple: "/images/icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ef4444",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MHM Digital",
  url: "https://mhmdigital.us",
  logo: "https://mhmdigital.us/images/icon.png",
  description: "Digital growth agency and printing services in Seattle, Washington.",
  address: {
    "@type": "PostalAddress",
    name: "Share Space MADDA WALABU",
    streetAddress: "9040 Rainier Ave S #2",
    addressLocality: "Seattle",
    addressRegion: "WA",
    postalCode: "98118",
    addressCountry: "US",
  },
  sameAs: ["https://www.linkedin.com/company/mhm-digital/"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.className} min-h-screen w-full overflow-x-hidden`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {children}
          <Toaster position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}
