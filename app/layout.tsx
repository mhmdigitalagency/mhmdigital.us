import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";
import { DEFAULT_KEYWORDS, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/seo/site";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/site";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetBrainsMomo",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: `${SITE_NAME} | Seattle Digital Agency & Printing`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [...DEFAULT_KEYWORDS],
  authors: [{ name: SITE_NAME, url: absoluteUrl() }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Digital Agency",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: absoluteUrl(),
    title: `${SITE_NAME} | Seattle Digital Agency & Printing`,
    description: SITE_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} — Seattle digital agency and printing` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Seattle Digital Agency & Printing`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: "/images/icon.png",
    apple: "/images/icon.png",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: {
    canonical: absoluteUrl(),
  },
};

export const viewport: Viewport = {
  themeColor: "#fc331b",
  width: "device-width",
  initialScale: 1,
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
        <JsonLd data={[organizationJsonLd(), localBusinessJsonLd(), websiteJsonLd()]} />
      </head>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {children}
          <Toaster position="top-center" />
        </CartProvider>
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a7388f997ea74e60a159390"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
