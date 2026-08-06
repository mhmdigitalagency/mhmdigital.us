import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { PrintOrderUpdateForm } from "./PrintOrderUpdateForm";
import { ArrowLeft } from "lucide-react";

export default async function AdminPrintOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireStaff();
  const { id } = await params;

  const order = await prisma.printOrder.findUnique({
    where: { id },
    include: { user: { select: { name: true, email: true } }, product: true },
  });
  if (!order) notFound();

  return (
    <div>
      <Link href="/admin/print" className="inline-flex items-center gap-2 text-sm text-brand-blue font-medium mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to print orders
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{order.orderNumber}</h1>
          <p className="text-gray-500 mt-1">{order.productName}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white p-6 space-y-4">
          <h2 className="font-bold text-lg">Order details</h2>
          <dl className="grid sm:grid-cols-2 gap-4 text-sm">
            <div><dt className="text-gray-500">Customer</dt><dd className="font-medium">{order.user.name}<br /><span className="text-gray-500">{order.user.email}</span></dd></div>
            <div><dt className="text-gray-500">Quantity</dt><dd className="font-medium">{order.quantity}</dd></div>
            <div><dt className="text-gray-500">Size</dt><dd className="font-medium">{order.size || "—"}</dd></div>
            <div><dt className="text-gray-500">Material</dt><dd className="font-medium">{order.material || "—"}</dd></div>
            <div><dt className="text-gray-500">Finishing</dt><dd className="font-medium">{order.finishing || "—"}</dd></div>
            <div><dt className="text-gray-500">Total</dt><dd className="font-medium">{order.total > 0 ? `$${(order.total / 100).toFixed(2)}` : "Pending quote"}</dd></div>
          </dl>
          {order.notes && (
            <p className="text-sm text-gray-700 rounded-xl bg-gray-50 p-4 whitespace-pre-wrap">{order.notes}</p>
          )}
        </div>

        <PrintOrderUpdateForm
          orderId={order.id}
          status={order.status}
          total={order.total}
          trackingNumber={order.trackingNumber}
          notes={order.notes}
        />
      </div>
    </div>
  );
}
