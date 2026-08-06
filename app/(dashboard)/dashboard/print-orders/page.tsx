import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/auth-redirect";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Printer, Plus } from "lucide-react";

function formatCents(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function statusLabel(status: string) {
  return status.replace(/_/g, " ");
}

function statusColor(status: string) {
  switch (status) {
    case "IN_PRODUCTION":
    case "QUALITY_CHECK":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "AWAITING_APPROVAL":
    case "PROOF_READY":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "COMPLETED":
    case "DELIVERED":
    case "SHIPPED":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "CANCELLED":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "QUOTE_REQUESTED":
      return "bg-violet-50 text-violet-700 border-violet-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

export default async function PrintOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string; orderNumber?: string }>;
}) {
  const session = await requireCustomer();
  const { submitted, orderNumber } = await searchParams;

  const orders = await prisma.printOrder.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Print Orders</h1>
          <p className="text-gray-500 mt-1">Track your print jobs from artwork upload to delivery.</p>
        </div>
        <Link
          href="/dashboard/print-orders/new"
          className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Print Order
        </Link>
      </div>

      {submitted === "1" && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-800">
          <p className="font-semibold">Print order submitted successfully</p>
          <p className="mt-1 text-sm">
            {orderNumber
              ? `Order ${orderNumber} was received with Seattle sales tax included. `
              : "Your order was received with Seattle sales tax included. "}
            Our print team will review your settings and artwork.
          </p>
        </div>
      )}

      {orders.length === 0 ? (
        <EmptyState
          icon={Printer}
          title="No print orders yet"
          description="Order business cards, flyers, banners, and more. Browse our print catalog or create a custom order."
          actionHref="/print-services"
          actionLabel="Browse Print Services"
        />
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border bg-white p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold text-gray-900">{order.productName}</h2>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColor(order.status)}`}
                    >
                      {statusLabel(order.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {order.orderNumber} · Qty {order.quantity}
                    {order.size && ` · ${order.size}`}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-4 text-xs text-gray-400">
                    <span>Created {formatDate(order.createdAt)}</span>
                    {order.total > 0 && (
                      <span className="font-medium text-gray-600">
                        {formatCents(order.total)}
                        {order.total > order.subtotal && (
                          <span className="text-gray-400"> (incl. tax)</span>
                        )}
                      </span>
                    )}
                    {order.trackingNumber && (
                      <span>Tracking: {order.trackingNumber}</span>
                    )}
                  </div>
                </div>
                {order.status === "ARTWORK_REVIEW" && (
                  <span className="text-sm text-brand-blue font-medium shrink-0">
                    Artwork under review
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {orders.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href="/print-services" className="text-red-500 font-medium hover:underline">
            Browse print catalog
          </Link>
          <Link href="/dashboard/print-orders/new" className="text-red-500 font-medium hover:underline">
            Create another order
          </Link>
        </div>
      )}
    </div>
  );
}
