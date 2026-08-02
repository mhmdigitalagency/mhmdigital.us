import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/auth-redirect";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Receipt, CreditCard } from "lucide-react";

function formatCents(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDate(date: Date | null) {
  if (!date) return "—";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function statusLabel(status: string) {
  switch (status) {
    case "PARTIALLY_PAID":
      return "Partially Paid";
    case "SENT":
      return "Awaiting Payment";
    default:
      return status.charAt(0) + status.slice(1).toLowerCase();
  }
}

function statusColor(status: string) {
  switch (status) {
    case "PAID":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "PARTIALLY_PAID":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "SENT":
    case "OVERDUE":
      return "bg-red-50 text-red-700 border-red-200";
    case "CANCELED":
    case "REFUNDED":
      return "bg-gray-50 text-gray-600 border-gray-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

export default async function InvoicesPage() {
  const session = await requireCustomer();

  const invoices = await prisma.invoice.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { lineItems: true },
  });

  const outstanding = invoices
    .filter((inv) => ["SENT", "PARTIALLY_PAID", "OVERDUE"].includes(inv.status))
    .reduce((sum, inv) => sum + (inv.total - inv.amountPaid), 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Invoices</h1>
        <p className="text-gray-500 mt-1">View and pay your invoices.</p>
      </div>

      {invoices.length > 0 && outstanding > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 mb-6">
          <p className="text-sm text-red-600 font-medium">Outstanding balance</p>
          <p className="text-2xl font-bold text-red-700 mt-1">{formatCents(outstanding)}</p>
        </div>
      )}

      {invoices.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No invoices yet"
          description="Invoices will appear here once you accept a quote or place an order. Start by requesting a quote for your project."
          actionHref="/quote"
          actionLabel="Request a Quote"
        />
      ) : (
        <div className="space-y-3">
          {invoices.map((invoice) => {
            const balance = invoice.total - invoice.amountPaid;
            const isPaid = invoice.status === "PAID";
            const needsPayment = ["SENT", "PARTIALLY_PAID", "OVERDUE"].includes(invoice.status);

            return (
              <div
                key={invoice.id}
                className="rounded-2xl border bg-white p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-gray-900">{invoice.invoiceNumber}</h2>
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusColor(invoice.status)}`}
                      >
                        {statusLabel(invoice.status)}
                      </span>
                    </div>

                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <p className="text-xs text-gray-400">Total</p>
                        <p className="text-sm font-semibold">{formatCents(invoice.total)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Paid</p>
                        <p className="text-sm font-semibold text-emerald-600">
                          {formatCents(invoice.amountPaid)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Balance</p>
                        <p className={`text-sm font-semibold ${balance > 0 ? "text-red-500" : "text-gray-900"}`}>
                          {formatCents(balance)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Due</p>
                        <p className="text-sm font-semibold">{formatDate(invoice.dueDate)}</p>
                      </div>
                    </div>

                    {invoice.lineItems.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {invoice.lineItems.map((item) => (
                          <li key={item.id} className="text-sm text-gray-600">
                            {item.description} — {formatCents(item.totalPrice)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {needsPayment && !isPaid && (
                    <button
                      type="button"
                      disabled
                      title="Payment coming soon"
                      className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white opacity-60 cursor-not-allowed shrink-0"
                    >
                      <CreditCard className="h-4 w-4" />
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {invoices.length > 0 && (
        <p className="mt-6 text-sm text-gray-500">
          Questions about an invoice?{" "}
          <Link href="/dashboard/messages" className="text-red-500 font-medium hover:underline">
            Contact support
          </Link>
        </p>
      )}
    </div>
  );
}
