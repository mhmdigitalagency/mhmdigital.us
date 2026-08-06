import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { requireCustomer } from "@/lib/auth-redirect";
import { PrintOrderForm } from "@/components/dashboard/print-order-form";
import { getActivePrintProducts, getPrintProductBySlug, formatPrintPrice } from "@/lib/print-products";

type Props = {
  searchParams: Promise<{ product?: string; bulk?: string }>;
};

export default async function NewPrintOrderPage({ searchParams }: Props) {
  await requireCustomer();
  const params = await searchParams;
  const isBulk = params.bulk === "true";

  if (isBulk) {
    const bulkProduct =
      (await getPrintProductBySlug("bulk-orders")) ??
      (await getActivePrintProducts()).find((p) => p.isBulk);

    if (!bulkProduct) {
      redirect("/print-services");
    }

    return (
      <div>
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/dashboard/print-orders" className="hover:text-brand">Print Orders</Link>
          <span className="mx-2">/</span>
          <span>Bulk Quote</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Request Bulk Print Quote</h1>
          <p className="text-gray-500 mt-1">
            Select your settings and optionally attach artwork. Our team will prepare a custom quote.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 max-w-2xl">
          <PrintOrderForm product={bulkProduct} isBulk />
        </div>
      </div>
    );
  }

  if (!params.product) {
    const products = (await getActivePrintProducts()).filter((p) => !p.isBulk);

    return (
      <div>
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/dashboard/print-orders" className="hover:text-brand">Print Orders</Link>
          <span className="mx-2">/</span>
          <span>Select Product</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Start a Print Order</h1>
          <p className="text-gray-500 mt-1">
            Choose a print product from our catalog. You will configure settings, upload artwork, and submit in the next step.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => {
            const priceLabel = formatPrintPrice(product.basePrice);
            return (
              <Link
                key={product.slug}
                href={`/dashboard/print-orders/new?product=${product.slug}`}
                className="group overflow-hidden rounded-2xl border bg-white hover:border-brand/30 hover:shadow-md transition-all"
              >
                <div className="relative aspect-16/10 bg-brand/5">
                  <Image src={product.image} alt="" fill className="object-cover" aria-hidden />
                </div>
                <div className="p-4">
                  <h2 className="font-bold group-hover:text-brand transition-colors">{product.name}</h2>
                  {priceLabel && <p className="text-sm text-brand font-semibold mt-1">From {priceLabel}</p>}
                  <span className="inline-flex items-center gap-1 text-sm text-brand-blue font-semibold mt-3">
                    Configure order <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Need a large volume quote?{" "}
          <Link href="/dashboard/print-orders/new?bulk=true" className="text-brand-blue font-semibold hover:underline">
            Request bulk pricing
          </Link>
        </p>
      </div>
    );
  }

  const product = await getPrintProductBySlug(params.product);
  if (!product || product.isBulk) {
    redirect("/dashboard/print-orders/new");
  }

  return (
    <div>
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/dashboard/print-orders" className="hover:text-brand">Print Orders</Link>
        <span className="mx-2">/</span>
        <Link href="/dashboard/print-orders/new" className="hover:text-brand">Select Product</Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Submit Print Order</h1>
        <p className="text-gray-500 mt-1">
          Choose your print settings, upload artwork, and submit. Product details cannot be changed.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 max-w-2xl">
        <PrintOrderForm product={product} />
      </div>
    </div>
  );
}
