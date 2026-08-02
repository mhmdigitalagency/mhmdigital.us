import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy | MHM Digital",
  description: "MHM Digital refund policy for services and print orders.",
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund Policy">
      <p>Last updated: August 2026</p>
      <h2>Digital Services</h2>
      <p>
        Deposits for custom digital services (websites, branding, marketing) are non-refundable once work has
        commenced. If no work has started, a full refund may be issued within 48 hours of payment.
      </p>
      <h2>Print Orders</h2>
      <p>
        Print orders may be canceled before production begins for a full refund. Once approved proofs enter
        production, orders are non-refundable. Defective print products will be reprinted or refunded at our discretion.
      </p>
      <h2>Package Purchases</h2>
      <p>
        Pre-paid service packages are refundable within 14 days if no services have been delivered. Partial refunds
        may apply for partially completed packages.
      </p>
      <h2>Contact</h2>
      <p>
        For refund requests, contact{" "}
        <a href="mailto:support@mhmdigital.us" className="text-red-500 hover:underline">
          support@mhmdigital.us
        </a>{" "}
        with your order or invoice number.
      </p>
    </LegalLayout>
  );
}

function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-4 py-16 xl:px-14 xxl:px-40 max-w-3xl mx-auto prose prose-gray">
      <nav className="text-sm text-gray-500 mb-8 not-prose">
        <Link href="/" className="hover:text-red-500">Home</Link>
        <span className="mx-2">/</span>
        <span>{title}</span>
      </nav>
      <h1 className="text-3xl font-bold mb-8 not-prose">{title}</h1>
      <div className="space-y-4 text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}
