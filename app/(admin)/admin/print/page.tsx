import Link from "next/link";
import { Printer } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { StatusBadge } from "@/components/admin/StatusBadge";

const formatCents = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export default async function AdminPrintPage() {
  await requireStaff();

  const printOrders = await prisma.printOrder.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Print Operations</h1>
        <p className="text-gray-500 mt-1">Track print orders from quote through production and delivery.</p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        {printOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No print orders yet. Orders appear when customers submit print requests.</p>
            <Link
              href="/print-services"
              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
            >
              <Printer className="h-4 w-4" />
              View print services
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 font-medium">Order</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Qty</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {printOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium text-gray-900">{order.orderNumber}</td>
                    <td className="py-3 pr-4">
                      <p>{order.user.name}</p>
                      <p className="text-xs text-gray-500">{order.user.email}</p>
                    </td>
                    <td className="py-3 pr-4">{order.productName}</td>
                    <td className="py-3 pr-4">{order.quantity}</td>
                    <td className="py-3 pr-4 font-medium">{formatCents(order.total)}</td>
                    <td className="py-3">
                      <StatusBadge status={order.status} />
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
