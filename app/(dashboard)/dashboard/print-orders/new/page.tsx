import Link from "next/link";
import { requireCustomer } from "@/lib/auth-redirect";
import { PrintOrderForm } from "@/components/dashboard/print-order-form";

type Props = {
  searchParams: Promise<{ product?: string; bulk?: string }>;
};

export default async function NewPrintOrderPage({ searchParams }: Props) {
  await requireCustomer();
  const params = await searchParams;
  const isBulk = params.bulk === "true";

  return (
    <div>
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/dashboard/print-orders" className="hover:text-red-500">
          Print Orders
        </Link>
        <span className="mx-2">/</span>
        <span>New Order</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {isBulk ? "Request Bulk Print Quote" : "New Print Order"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isBulk
            ? "Tell us about your bulk printing needs and our team will prepare a custom quote."
            : "Configure your print order. Upload artwork from the Files section after submitting."}
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 max-w-2xl">
        <PrintOrderForm defaultProduct={params.product} isBulk={isBulk} />
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Not sure what you need?{" "}
        <Link href="/print-services" className="text-red-500 font-medium hover:underline">
          Browse our print catalog
        </Link>{" "}
        or{" "}
        <Link href="/quote?type=print-bulk" className="text-red-500 font-medium hover:underline">
          request a custom quote
        </Link>
        .
      </p>
    </div>
  );
}
