import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility Statement | MHM Digital",
  description: "MHM Digital accessibility commitment and contact information.",
};

export default function AccessibilityPage() {
  return (
    <div className="px-4 py-16 xl:px-14 xxl:px-40 max-w-3xl mx-auto">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-red-500">Home</Link>
        <span className="mx-2">/</span>
        <span>Accessibility</span>
      </nav>
      <h1 className="text-3xl font-bold mb-8">Accessibility Statement</h1>
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>MHM Digital is committed to ensuring digital accessibility for people with disabilities.</p>
        <h2 className="text-xl font-bold pt-4">Our Commitment</h2>
        <p>
          We aim to conform to WCAG 2.2 Level AA standards. Our website includes keyboard navigation,
          visible focus states, semantic HTML, alt text for images, and accessible form labels.
        </p>
        <h2 className="text-xl font-bold pt-4">Feedback</h2>
        <p>
          If you encounter accessibility barriers, please contact us at{" "}
          <a href="mailto:accessibility@mhmdigital.us" className="text-red-500 hover:underline">
            accessibility@mhmdigital.us
          </a>.
        </p>
      </div>
    </div>
  );
}
