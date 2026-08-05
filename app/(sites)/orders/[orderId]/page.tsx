import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import OrderActions from "./orderActions";
import {
  ArrowLeft,
  BadgeCheck,
  Clock3,
  PackageCheck,
  ReceiptText,
  RefreshCcw,
  ShoppingBag,
  Wallet,
  XCircle,
} from "lucide-react";

function formatCents(value: number) {
  return `$${(value / 100).toFixed(2)} USD`;
}

function getStatusLabel(status: string) {
  switch (status) {
    case "PENDING":
      return "Order received";
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

function getBillingCycleLabel(cycle: string) {
  switch (cycle) {
    case "MONTHLY":
      return "Monthly";
    case "YEARLY":
      return "Yearly";
    case "ONE_TIME":
      return "One-time";
    default:
      return cycle;
  }
}

function getStatusStyles(status: string) {
  switch (status) {
    case "PENDING":
      return {
        className: "bg-amber-50 text-amber-600 border border-amber-200",
        icon: Clock3,
      };
    case "PAID":
      return {
        className: "bg-emerald-50 text-emerald-600 border border-emerald-200",
        icon: Wallet,
      };
    case "PROCESSING":
      return {
        className: "bg-blue-50 text-blue-600 border border-blue-200",
        icon: RefreshCcw,
      };
    case "COMPLETED":
      return {
        className: "bg-green-50 text-green-600 border border-green-200",
        icon: BadgeCheck,
      };
    case "CANCELED":
      return {
        className: "bg-rose-50 text-rose-600 border border-rose-200",
        icon: XCircle,
      };
    case "REFUNDED":
      return {
        className: "bg-violet-50 text-violet-600 border border-violet-200",
        icon: ReceiptText,
      };
    default:
      return {
        className: "bg-gray-50 text-gray-600 border border-gray-200",
        icon: ShoppingBag,
      };
  }
}

export default async function OrderDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ submitted?: string }>;
}) {
  const { orderId } = await params;
  const { submitted } = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/connexion");
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

  const { className, icon: StatusIcon } = getStatusStyles(order.status);
  const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-linear-to-b from-white via-red-50/20 to-white px-4 py-16 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <div className="mb-8">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to orders
        </Link>
      </div>

      {submitted === "1" && (
        <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-emerald-800">
          <p className="font-semibold">Order submitted successfully</p>
          <p className="mt-1 text-sm">Our team will contact you to confirm your order and arrange payment.</p>
        </div>
      )}

      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
            Order details
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            {order.orderNumber}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-500">
            Review your order details, track its progress, and check the full
            status history.
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${className}`}
        >
          <StatusIcon className="h-4 w-4" />
          {getStatusLabel(order.status)}
        </span>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <div className="overflow-hidden rounded-[30px] border border-gray-200 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.06)] md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Order overview
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-gray-50 px-4 py-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Created
                    </p>
                    <p className="mt-1 text-sm font-bold text-gray-900">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 px-4 py-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Items
                    </p>
                    <p className="mt-1 text-sm font-bold text-gray-900">
                      {order.items.length}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-red-50 px-4 py-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-red-400">
                      Total
                    </p>
                    <p className="mt-1 text-sm font-bold text-red-500">
                      {formatCents(order.total)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:min-w-55">
                <OrderActions orderId={order.id} status={order.status} />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-gray-200 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.06)] md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-red-50 p-3">
                <PackageCheck className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Items</h2>
                <p className="text-sm text-gray-500">
                  Packages included in this order
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[24px] border border-gray-200 bg-gray-50/70 p-5 transition-all duration-300 hover:bg-white hover:shadow-sm"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.packageName}
                        </h3>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-red-500 ring-1 ring-red-100">
                          {getBillingCycleLabel(item.billingCycle)}
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-medium text-gray-500">
                        {item.serviceName}
                        {item.subServiceName ? ` • ${item.subServiceName}` : ""}
                      </p>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-white px-4 py-3">
                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Quantity
                          </p>
                          <p className="mt-1 text-sm font-bold text-gray-900">
                            {item.quantity}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-white px-4 py-3">
                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Unit price
                          </p>
                          <p className="mt-1 text-sm font-bold text-gray-900">
                            {formatCents(item.unitPrice)}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-red-50 px-4 py-3">
                          <p className="text-xs font-medium uppercase tracking-wide text-red-400">
                            Line total
                          </p>
                          <p className="mt-1 text-sm font-bold text-red-500">
                            {formatCents(item.totalPrice)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-gray-200 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.06)] md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-red-50 p-3">
                <ReceiptText className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Status history
                </h2>
                <p className="text-sm text-gray-500">
                  Timeline of updates for this order
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {order.statusHistory.map((entry) => {
                const historyStatus = getStatusStyles(entry.newStatus);
                const HistoryIcon = historyStatus.icon;

                return (
                  <div
                    key={entry.id}
                    className="flex gap-4 rounded-[24px] border border-gray-200 bg-gray-50/70 p-5"
                  >
                    <div
                      className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${historyStatus.className}`}
                    >
                      <HistoryIcon className="h-4 w-4" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-gray-900">
                          {entry.oldStatus
                            ? `${getStatusLabel(entry.oldStatus)} → `
                            : ""}
                          {getStatusLabel(entry.newStatus)}
                        </p>
                      </div>

                      {entry.note ? (
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                          {entry.note}
                        </p>
                      ) : null}

                      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                        {new Date(entry.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-[0_15px_45px_rgba(0,0,0,0.08)]">
            <div className="bg-linear-to-r from-red-500 to-red-400 px-6 py-6 text-white">
              <h2 className="text-2xl font-bold">Summary</h2>
              <p className="mt-2 text-sm text-red-50">
                Quick overview of this order
              </p>
            </div>

            <div className="space-y-4 px-6 py-6">
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <span className="text-sm text-gray-500">Order number</span>
                <span className="text-sm font-bold text-gray-900">
                  {order.orderNumber}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <span className="text-sm text-gray-500">Packages</span>
                <span className="text-sm font-bold text-gray-900">
                  {order.items.length}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <span className="text-sm text-gray-500">Total quantity</span>
                <span className="text-sm font-bold text-gray-900">
                  {totalQuantity}
                </span>
              </div>

              <div className="rounded-2xl bg-red-50 px-4 py-4">
                <p className="text-xs font-medium uppercase tracking-wide text-red-400">
                  Order total
                </p>
                <p className="mt-1 text-2xl font-bold text-red-500">
                  {formatCents(order.total)}
                </p>
              </div>

              <Link
                href="/orders"
                className="inline-flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-4 text-center font-semibold text-gray-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              >
                View all orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}