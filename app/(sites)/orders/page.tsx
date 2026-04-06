import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  PackageCheck,
  ReceiptText,
  ShoppingBag,
  Wallet,
  XCircle,
  RefreshCcw,
} from "lucide-react";

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

function getStatusStyles(status: string) {
  switch (status) {
    case "PENDING":
      return {
        className:
          "bg-amber-50 text-amber-600 border border-amber-200",
        icon: Clock3,
      };
    case "PAID":
      return {
        className:
          "bg-emerald-50 text-emerald-600 border border-emerald-200",
        icon: Wallet,
      };
    case "PROCESSING":
      return {
        className:
          "bg-blue-50 text-blue-600 border border-blue-200",
        icon: RefreshCcw,
      };
    case "COMPLETED":
      return {
        className:
          "bg-green-50 text-green-600 border border-green-200",
        icon: BadgeCheck,
      };
    case "CANCELED":
      return {
        className:
          "bg-rose-50 text-rose-600 border border-rose-200",
        icon: XCircle,
      };
    case "REFUNDED":
      return {
        className:
          "bg-violet-50 text-violet-600 border border-violet-200",
        icon: ReceiptText,
      };
    default:
      return {
        className:
          "bg-gray-50 text-gray-600 border border-gray-200",
        icon: ShoppingBag,
      };
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

  const totalOrders = orders.length;
  const completedOrders = orders.filter(
    (order) => order.status === "COMPLETED"
  ).length;
  const paidOrders = orders.filter((order) => order.status === "PAID").length;
  const totalSpent = orders
    .filter((order) => ["PAID", "PROCESSING", "COMPLETED"].includes(order.status))
    .reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="bg-linear-to-b from-white via-red-50/20 to-white px-4 py-16 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
            Customer dashboard
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            My orders
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-500">
            Track your recent orders, review their status, and access the details
            of each purchase.
          </p>
        </div>

        {/* <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        >
          Home
        </Link> */}
      </div>

      {orders.length === 0 ? (
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[36px] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div className="bg-linear-to-r from-red-50 via-white to-red-50 px-8 py-12 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <ShoppingBag className="h-10 w-10 text-red-500" />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              No orders yet
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-500">
              You have not placed any orders yet. Once you complete a purchase,
              your orders will appear here.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-red-500 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
            >
              Start shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 border-t border-gray-100 px-8 py-8 md:grid-cols-3">
            <div className="rounded-2xl bg-gray-50 p-5 text-center">
              <ShoppingBag className="mx-auto mb-3 h-6 w-6 text-red-500" />
              <h3 className="font-semibold text-gray-900">Browse packages</h3>
              <p className="mt-2 text-sm text-gray-500">
                Explore our services and choose the right package.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 text-center">
              <ReceiptText className="mx-auto mb-3 h-6 w-6 text-red-500" />
              <h3 className="font-semibold text-gray-900">Place your order</h3>
              <p className="mt-2 text-sm text-gray-500">
                Complete checkout securely and confirm your purchase.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 text-center">
              <PackageCheck className="mx-auto mb-3 h-6 w-6 text-red-500" />
              <h3 className="font-semibold text-gray-900">Track progress</h3>
              <p className="mt-2 text-sm text-gray-500">
                Follow the status of your order from payment to completion.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            {orders.map((order) => {
              const { className, icon: StatusIcon } = getStatusStyles(order.status);

              return (
                <div
                  key={order.id}
                  className="overflow-hidden rounded-[30px] border border-gray-200 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)]"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
                          {order.orderNumber}
                        </h2>

                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${className}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {getStatusLabel(order.status)}
                        </span>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-gray-50 px-4 py-3">
                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Date
                          </p>
                          <p className="mt-1 text-sm font-bold text-gray-900">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-gray-50 px-4 py-3">
                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Items
                          </p>
                          <p className="mt-1 text-sm font-bold text-gray-900">
                            {order.items.length}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-red-50 px-4 py-3">
                          <p className="text-xs font-medium uppercase tracking-wide text-red-400">
                            Total
                          </p>
                          <p className="mt-1 text-sm font-bold text-red-500">
                            {formatCents(order.total)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 lg:justify-end">
                      <Link
                        href={`/orders/${order.id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
                      >
                        View order
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="xl:sticky xl:top-24 xl:self-start">
            <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-[0_15px_45px_rgba(0,0,0,0.08)]">
              <div className="bg-linear-to-r from-red-500 to-red-400 px-6 py-6 text-white">
                <h2 className="text-2xl font-bold">Orders summary</h2>
                <p className="mt-2 text-sm text-red-50">
                  Quick overview of your account activity.
                </p>
              </div>

              <div className="space-y-4 px-6 py-6">
                <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                  <span className="text-sm text-gray-500">Total orders</span>
                  <span className="text-base font-bold text-gray-900">
                    {totalOrders}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                  <span className="text-sm text-gray-500">Paid orders</span>
                  <span className="text-base font-bold text-gray-900">
                    {paidOrders}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                  <span className="text-sm text-gray-500">Completed</span>
                  <span className="text-base font-bold text-gray-900">
                    {completedOrders}
                  </span>
                </div>

                <div className="rounded-2xl bg-red-50 px-4 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-red-400">
                    Total spent
                  </p>
                  <p className="mt-1 text-2xl font-bold text-red-500">
                    {formatCents(totalSpent)}
                  </p>
                </div>

                <Link
                  href="/"
                  className="inline-flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-4 text-center font-semibold text-gray-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                >
                  Browse more packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}