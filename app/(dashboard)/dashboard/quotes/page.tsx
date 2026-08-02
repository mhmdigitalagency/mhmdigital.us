import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/auth-redirect";
import { EmptyState } from "@/components/dashboard/empty-state";
import { FileText, Check, X } from "lucide-react";

function formatCents(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDate(date: Date | null) {
  if (!date) return null;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function statusColor(status: string) {
  switch (status) {
    case "SENT":
    case "VIEWED":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "ACCEPTED":
    case "CONVERTED":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "DECLINED":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "EXPIRED":
      return "bg-gray-50 text-gray-600 border-gray-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

export default async function QuotesPage() {
  const session = await requireCustomer();

  const quotes = await prisma.quote.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { lineItems: true },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Quotes</h1>
        <p className="text-gray-500 mt-1">Review and respond to project quotes from our team.</p>
      </div>

      {quotes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No quotes yet"
          description="Request a quote for your project and we'll send you a detailed proposal within 1 business day."
          actionHref="/quote"
          actionLabel="Request a Quote"
        />
      ) : (
        <div className="space-y-3">
          {quotes.map((quote) => {
            const canRespond = quote.status === "SENT" || quote.status === "VIEWED";
            const isAccepted = quote.status === "ACCEPTED" || quote.status === "CONVERTED";
            const isDeclined = quote.status === "DECLINED";

            return (
              <div
                key={quote.id}
                className="rounded-2xl border bg-white p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-gray-900">{quote.quoteNumber}</h2>
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColor(quote.status)}`}
                      >
                        {quote.status.toLowerCase()}
                      </span>
                    </div>

                    <p className="text-lg font-semibold text-red-500 mt-1">
                      {formatCents(quote.total)}
                    </p>

                    {quote.lineItems.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {quote.lineItems.map((item) => (
                          <li key={item.id} className="text-sm text-gray-600">
                            {item.description} — {formatCents(item.totalPrice)}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                      {quote.sentAt && <span>Sent {formatDate(quote.sentAt)}</span>}
                      {quote.expiresAt && <span>Expires {formatDate(quote.expiresAt)}</span>}
                      {quote.acceptedAt && (
                        <span className="text-emerald-600">Accepted {formatDate(quote.acceptedAt)}</span>
                      )}
                    </div>

                    {quote.notes && (
                      <p className="mt-2 text-sm text-gray-500">{quote.notes}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    {canRespond && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled
                          title="Accept action coming soon"
                          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 opacity-60 cursor-not-allowed"
                        >
                          <Check className="h-4 w-4" />
                          Accept
                        </button>
                        <button
                          type="button"
                          disabled
                          title="Decline action coming soon"
                          className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 opacity-60 cursor-not-allowed"
                        >
                          <X className="h-4 w-4" />
                          Decline
                        </button>
                      </div>
                    )}
                    {isAccepted && (
                      <p className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                        <Check className="h-4 w-4" /> Quote accepted
                      </p>
                    )}
                    {isDeclined && (
                      <p className="text-sm text-rose-600 font-medium flex items-center gap-1">
                        <X className="h-4 w-4" /> Quote declined
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {quotes.length > 0 && (
        <p className="mt-6 text-sm text-gray-500">
          Need a new quote?{" "}
          <Link href="/quote" className="text-red-500 font-medium hover:underline">
            Request one here
          </Link>
        </p>
      )}
    </div>
  );
}
