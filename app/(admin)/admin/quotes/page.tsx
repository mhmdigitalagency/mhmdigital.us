import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { StatusBadge } from "@/components/admin/StatusBadge";

const formatCents = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export default async function AdminQuotesPage() {
  await requireStaff();

  const quotes = await prisma.quote.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Quotes</h1>
          <p className="text-gray-500 mt-1">Manage quotes sent to customers and track their status.</p>
        </div>
        <Link
          href="/admin/quotes/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Quote
        </Link>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        {quotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No quotes yet. Create one or wait for customer quote requests.</p>
            <Link
              href="/admin/quotes/new"
              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create your first quote
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 font-medium">Quote #</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium text-gray-900">{quote.quoteNumber}</td>
                    <td className="py-3 pr-4">
                      <p>{quote.user.name}</p>
                      <p className="text-xs text-gray-500">{quote.user.email}</p>
                    </td>
                    <td className="py-3 pr-4 font-medium">{formatCents(quote.total)}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={quote.status} />
                    </td>
                    <td className="py-3 text-gray-500">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
