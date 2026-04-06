"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getUnitPrice } from "@/lib/cartUtils";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  BadgeCheck,
} from "lucide-react";
import { BillingCycle } from "@/types/carts";

function formatPrice(value: number) {
  return `$${value.toFixed(2)} USD`;
}

function getBillingCycleLabel(cycle: BillingCycle) {
  switch (cycle) {
    case "MONTHLY":
      return "Monthly";
    case "YEARLY":
      return "Yearly";
    case "ONE_TIME":
    default:
      return "One-time";
  }
}

const CartPage = () => {
  const {
    cart,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    isLoaded,
  } = useCart();

  const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isLoaded) {
    return (
      <div className="px-4 py-24">
        <div className="mx-auto max-w-3xl animate-pulse rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
          <div className="h-8 w-48 rounded-full bg-gray-200" />
          <div className="mt-8 space-y-4">
            <div className="h-28 rounded-3xl bg-gray-100" />
            <div className="h-28 rounded-3xl bg-gray-100" />
            <div className="h-28 rounded-3xl bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="px-4 py-24 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[36px] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div className="bg-linear-to-r from-red-50 via-white to-red-50 px-8 py-12 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <ShoppingBag className="h-10 w-10 text-red-500" />
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-500">
              You have not added any package yet. Browse our services and choose the
              package that fits your needs.
            </p>

            {/* <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-red-500 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
            >
              Home
              <ArrowRight className="h-4 w-4" />
            </Link> */}
          </div>

          <div className="grid gap-4 border-t border-gray-100 px-8 py-8 md:grid-cols-3">
            <div className="rounded-2xl bg-gray-50 p-5 text-center">
              <BadgeCheck className="mx-auto mb-3 h-6 w-6 text-red-500" />
              <h3 className="font-semibold text-gray-900">Professional Packages</h3>
              <p className="mt-2 text-sm text-gray-500">
                Select the right plan for your business needs.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 text-center">
              <CreditCard className="mx-auto mb-3 h-6 w-6 text-red-500" />
              <h3 className="font-semibold text-gray-900">Simple Checkout</h3>
              <p className="mt-2 text-sm text-gray-500">
                Review your order and proceed easily to payment.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 text-center">
              <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-red-500" />
              <h3 className="font-semibold text-gray-900">Secure Process</h3>
              <p className="mt-2 text-sm text-gray-500">
                Your order information is handled safely and securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-r from-white via-red-50/30 to-white px-4 py-16 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
            Shopping cart
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Review your order
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-500">
            Check your selected packages, update quantities, and proceed to checkout
            when you&apos;re ready.
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          {cart.items.map((item) => {
            const unitPrice = getUnitPrice(item);
            const lineTotal = unitPrice * item.quantity;

            return (
              <div
                key={`${item.packageId}-${item.packageDuration}`}
                className="group overflow-hidden rounded-[30px] border border-gray-200 bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)] md:p-6"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex flex-1 gap-4 md:gap-5">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 md:h-24 md:w-24">
                      {item.package.image ? (
                        <Image
                          src={item.package.image}
                          alt={item.package.name}
                          width={100}
                          height={100}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
                          {item.package.name}
                        </h2>
                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500">
                          {getBillingCycleLabel(item.packageDuration)}
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-medium text-gray-500">
                        {item.package.service?.name ?? "Service"}
                        {item.package.subService?.name
                          ? ` • ${item.package.subService.name}`
                          : ""}
                      </p>

                      <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 md:text-[15px]">
                        {item.package.description}
                      </p>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-gray-50 px-4 py-3">
                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Unit price
                          </p>
                          <p className="mt-1 text-sm font-bold text-gray-900">
                            {formatPrice(unitPrice)}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-gray-50 px-4 py-3">
                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Quantity
                          </p>
                          <p className="mt-1 text-sm font-bold text-gray-900">
                            {item.quantity}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-red-50 px-4 py-3">
                          <p className="text-xs font-medium uppercase tracking-wide text-red-400">
                            Line total
                          </p>
                          <p className="mt-1 text-sm font-bold text-red-500">
                            {formatPrice(lineTotal)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-between gap-4 lg:min-w-40 lg:flex-col lg:items-end">
                    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-2 py-2 shadow-sm">
                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item.packageId, item.packageDuration)
                        }
                        className="rounded-full p-2 text-gray-600 transition hover:bg-white hover:text-red-500"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="min-w-8 text-center text-sm font-bold text-gray-900">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(item.packageId, item.packageDuration)
                        }
                        className="rounded-full p-2 text-gray-600 transition hover:bg-white hover:text-red-500"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.packageId, item.packageDuration)
                      }
                      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-[0_15px_45px_rgba(0,0,0,0.08)]">
            <div className="bg-linear-to-r from-red-500 to-red-400 px-6 py-6 text-white">
              <h2 className="text-2xl font-bold">Order summary</h2>
              <p className="mt-2 text-sm text-red-50">
                Review your order details before checkout.
              </p>
            </div>

            <div className="px-6 py-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Packages</span>
                  <span className="font-semibold text-gray-900">
                    {cart.items.length}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Total quantity</span>
                  <span className="font-semibold text-gray-900">
                    {totalQuantity}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Billing</span>
                  <span className="font-semibold text-gray-900">
                    Mixed packages
                  </span>
                </div>
              </div>

              <div className="my-6 border-t border-dashed border-gray-200" />

              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Taxes and any additional charges will be calculated during checkout.
                </p>
              </div>

              <Link
                href="/checkout"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-500 px-6 py-4 text-center font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
              >
                Proceed to checkout
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* <Link
                href="/"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-4 text-center font-semibold text-gray-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              >
                Continue shopping
              </Link> */}

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-gray-50 p-3 text-center">
                  <ShieldCheck className="mx-auto h-5 w-5 text-red-500" />
                  <p className="mt-2 text-[11px] font-medium text-gray-500">
                    Secure
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-3 text-center">
                  <CreditCard className="mx-auto h-5 w-5 text-red-500" />
                  <p className="mt-2 text-[11px] font-medium text-gray-500">
                    Easy checkout
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-3 text-center">
                  <BadgeCheck className="mx-auto h-5 w-5 text-red-500" />
                  <p className="mt-2 text-[11px] font-medium text-gray-500">
                    Trusted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;