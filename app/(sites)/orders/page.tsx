import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

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

export default async function OrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="px-4 py-10 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <h1 className="mb-8 text-3xl font-bold">My orders</h1>

      {orders.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <p className="text-gray-500">You do not have any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold">{order.orderNumber}</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Status: {getStatusLabel(order.status)}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Total: {formatCents(order.total)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/orders/${order.id}`}
                    className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                  >
                    View order
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}