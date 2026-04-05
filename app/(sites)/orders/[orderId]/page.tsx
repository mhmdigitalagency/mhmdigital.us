import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import OrderActions from "./orderActions";

function formatCents(value: number) {
  return `$${(value / 100).toFixed(2)} USD`;
}

function getStatusLabel(status: string) {
  switch (status) {
    case "PENDING":
      return "Pending payment";
    case "PAID":
      return "Paid";
    case "PROCESSING":
      return "In progress";
    case "COMPLETED":
      return "Completed";
    case "CANCELED":
      return "Canceled";
    case "REFUNDED":
      return "Refunded";
    default:
      return status;
  }
}

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: session.user.id,
    },
    include: {
      items: true,
      statusHistory: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="px-4 py-10 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">{order.orderNumber}</h1>
        <p className="mt-2 text-gray-500">
          Status: {getStatusLabel(order.status)}
        </p>
        <p className="mt-1 text-gray-500">
          Created: {new Date(order.createdAt).toLocaleString()}
        </p>
        <p className="mt-1 text-gray-500">
          Total: {formatCents(order.total)}
        </p>

        <OrderActions orderId={order.id} status={order.status} />

        <div className="mt-8">
          <h2 className="text-xl font-bold">Items</h2>

          <div className="mt-4 space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border p-4"
              >
                <h3 className="text-lg font-bold">{item.packageName}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {item.serviceName}
                  {item.subServiceName ? ` • ${item.subServiceName}` : ""}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Billing: {item.billingCycle}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Unit price: {formatCents(item.unitPrice)}
                </p>
                <p className="mt-1 font-semibold">
                  Line total: {formatCents(item.totalPrice)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold">Status history</h2>

          <div className="mt-4 space-y-3">
            {order.statusHistory.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border p-4"
              >
                <p className="font-medium">
                  {entry.oldStatus ? `${entry.oldStatus} → ` : ""}
                  {entry.newStatus}
                </p>
                {entry.note ? (
                  <p className="mt-1 text-sm text-gray-500">{entry.note}</p>
                ) : null}
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(entry.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}