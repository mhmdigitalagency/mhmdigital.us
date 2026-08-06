import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { StatusBadge } from "@/components/admin/StatusBadge";

const formatCents = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export default async function AdminInvoicesPage() {
  await requireStaff();

  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-500 mt-1">Track billing, payments, and outstanding balances.</p>
        </div>
        <Link
          href="/admin/invoices/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Invoice
        </Link>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        {invoices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No invoices yet. Create one when you&apos;re ready to bill a customer.</p>
            <Link
              href="/admin/invoices/new"
              className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-5 py-2.5 text-sm font-semibold text-brand hover:bg-brand/10 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create your first invoice
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 font-medium">Invoice #</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Paid</th>
                  <th className="pb-3 font-medium">Balance</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Due</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => {
                  const balance = invoice.total - invoice.amountPaid;
                  return (
                    <tr key={invoice.id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium text-gray-900">{invoice.invoiceNumber}</td>
                      <td className="py-3 pr-4">
                        <p>{invoice.user.name}</p>
                        <p className="text-xs text-gray-500">{invoice.user.email}</p>
                      </td>
                      <td className="py-3 pr-4 font-medium">{formatCents(invoice.total)}</td>
                      <td className="py-3 pr-4">{formatCents(invoice.amountPaid)}</td>
                      <td className="py-3 pr-4 font-medium text-gray-900">{formatCents(balance)}</td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={invoice.status} />
                      </td>
                      <td className="py-3 text-gray-500">
                        {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
