import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import BackToTop from "@/components/BackToTop";
import "../globals.css";

export const metadata: Metadata = {
  description:
    "Mhm Digital solves your printing needs with top-notch quality, unbeatable prices, and lightning-fast turnaround times. Experience the difference with Mhm Digital today!",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <BackToTop />
      <Footer />
    </>
  );
}