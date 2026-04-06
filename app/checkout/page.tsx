"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getUnitPrice } from "@/lib/cartUtils";
import { createCheckoutSession } from "@/actions/checkout";
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Lock,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

function formatPrice(value: number) {
  return `$${value.toFixed(2)} USD`;
}

function getBillingCycleLabel(cycle: string) {
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

export default function CheckoutPage() {
  const { cart, cartTotal, isLoaded, clearCart } = useCart();
  const [isPending, startTransition] = useTransition();

  const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isLoaded) {
    return (
      <div className="px-4 py-24">
        <div className="mx-auto max-w-3xl animate-pulse rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
          <div className="h-8 w-56 rounded-full bg-gray-200" />
          <div className="mt-8 space-y-4">
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
              You need to add at least one package before proceeding to checkout.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-red-500 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
            >
              Continue shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // const handleCheckout = () => {
  //   startTransition(async () => {
  //     const result = await createCheckoutSession(
  //       cart.items.map((item) => ({
  //         packageId: item.packageId,
  //         quantity: item.quantity,
  //         packageDuration: item.packageDuration,
  //       }))
  //     );

  //     clearCart();
  //     window.location.href = result.checkoutUrl;
  //   });
  // };

  const handleCheckout = () => {
    startTransition(async () => {
      const result = await createCheckoutSession(
        cart.items.map((item) => ({
          packageId: item.packageId,
          quantity: item.quantity,
          packageDuration: item.packageDuration,
        }))
      );

      window.location.href = result.checkoutUrl;
    });
  };

  return (
    <div className="bg-linear-to-b from-white via-red-50/30 to-white px-4 py-16 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
            Secure checkout
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Complete your order
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-500">
            Review your selected packages and continue to secure payment with Stripe.
          </p>
        </div>

        <Link
          href="/cart"
          className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        >
          Back to cart
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          {cart.items.map((item) => {
            const unitPrice = getUnitPrice(item);
            const subtotal = unitPrice * item.quantity;

            return (
              <div
                key={`${item.packageId}-${item.packageDuration}`}
                className="overflow-hidden rounded-[30px] border border-gray-200 bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)] md:p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
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
                          {formatPrice(subtotal)}
                        </p>
                      </div>
                    </div>
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
                Final review before payment.
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
                  <span>Payment</span>
                  <span className="font-semibold text-gray-900">Stripe</span>
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
                  Taxes and any additional charges will be calculated by the payment provider if applicable.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={isPending}
                className="cursor-pointer mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-500 px-6 py-4 text-center font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "Redirecting..." : "Pay with Stripe"}
                {!isPending && <ArrowRight className="h-4 w-4" />}
              </button>

              <Link
                href="/cart"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-4 text-center font-semibold text-gray-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              >
                Return to cart
              </Link>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-gray-50 p-3 text-center">
                  <Lock className="mx-auto h-5 w-5 text-red-500" />
                  <p className="mt-2 text-[11px] font-medium text-gray-500">
                    Encrypted
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-3 text-center">
                  <ShieldCheck className="mx-auto h-5 w-5 text-red-500" />
                  <p className="mt-2 text-[11px] font-medium text-gray-500">
                    Secure
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-3 text-center">
                  <CreditCard className="mx-auto h-5 w-5 text-red-500" />
                  <p className="mt-2 text-[11px] font-medium text-gray-500">
                    Trusted
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-red-50 p-4">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 text-red-500" />
                  <p className="text-sm leading-6 text-gray-600">
                    You will be redirected securely to Stripe to complete your payment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}