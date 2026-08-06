import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { PrintProductsManager } from "./PrintProductsManager";

export default async function AdminPrintProductsPage() {
  await requireStaff();

  const products = await prisma.printProduct.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Print Products & Pricing</h1>
          <p className="text-gray-500 mt-1">Manage print catalog and base prices shown on the public site.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/print" className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-gray-50">
            Print Orders
          </Link>
          <Link href="/print-services" className="rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
            View public page
          </Link>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border bg-amber-50 border-amber-200 p-4 mb-6 text-sm text-amber-900">
          No products in database yet. Run seed or add products below. Public pages fall back to static catalog until products exist.
        </div>
      ) : null}

      <PrintProductsManager products={products} />
    </div>
  );
}
