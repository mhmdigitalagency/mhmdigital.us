import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"],
weight: ['200', '300', '400', '500', '600', '700', '800'] ,
variable: '--font-jetBrainsMomo'
 });

export const metadata: Metadata = {
  title: "MHM Digital",
  description: "Mhm Digital solves your printing needs with top-notch quality, unbeatable prices, and lightning-fast turnaround times. Experience the difference with Mhm Digital today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.className} min-h-screen w-full overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {children}
          <Toaster position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}
