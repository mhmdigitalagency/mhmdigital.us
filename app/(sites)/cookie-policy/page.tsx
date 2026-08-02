import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | MHM Digital",
  description: "How MHM Digital uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <div className="px-4 py-16 xl:px-14 xxl:px-40 max-w-3xl mx-auto">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-red-500">Home</Link>
        <span className="mx-2">/</span>
        <span>Cookie Policy</span>
      </nav>
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>Last updated: August 2026</p>
        <h2 className="text-xl font-bold pt-4">What Are Cookies</h2>
        <p>Cookies are small text files stored on your device when you visit our website.</p>
        <h2 className="text-xl font-bold pt-4">How We Use Cookies</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Essential cookies</strong> — Required for authentication, cart, and security.</li>
          <li><strong>Analytics cookies</strong> — Help us understand how visitors use our site.</li>
          <li><strong>Preference cookies</strong> — Remember your settings and choices.</li>
        </ul>
        <h2 className="text-xl font-bold pt-4">Managing Cookies</h2>
        <p>You can control cookies through your browser settings. Disabling essential cookies may affect site functionality.</p>
      </div>
    </div>
  );
}
