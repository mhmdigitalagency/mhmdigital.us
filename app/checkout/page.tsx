"use client";

import { useTransition } from "react";
import { useCart } from "@/context/CartContext";
import { getUnitPrice } from "@/lib/cartUtils";
import { createCheckoutSession } from "@/actions/checkout"; 

function formatPrice(value: number) {
  return `$${value.toFixed(2)} USD`;
}

export default function CheckoutPage() {
  const { cart, cartTotal, isLoaded, clearCart } = useCart();
  const [isPending, startTransition] = useTransition();

  if (!isLoaded) {
    return (
      <div className="px-4 py-20 text-center">
        <p>Loading checkout...</p>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
      </div>
    );
  }

  const handleCheckout = () => {
    startTransition(async () => {
      const result = await createCheckoutSession(
        cart.items.map((item) => ({
          packageId: item.packageId,
          quantity: item.quantity,
          packageDuration: item.packageDuration,
        }))
      );

      clearCart();
      window.location.href = result.checkoutUrl;
    });
  };

  return (
    <div className="px-4 py-10 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Checkout</h1>

          {cart.items.map((item) => {
            const unitPrice = getUnitPrice(item);
            const subtotal = unitPrice * item.quantity;

            return (
              <div
                key={`${item.packageId}-${item.packageDuration}`}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                <h2 className="text-xl font-bold">{item.package.name}</h2>

                <p className="mt-1 text-sm text-gray-500">
                  {item.package.service?.name ?? "Service"}
                  {item.package.subService?.name
                    ? ` • ${item.package.subService.name}`
                    : ""}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Billing cycle: {item.packageDuration}
                </p>

                <div className="mt-4 space-y-1 text-sm text-gray-500">
                  <p>Unit price: {formatPrice(unitPrice)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Line total: {formatPrice(subtotal)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-fit rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Order summary</h2>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <span>Items</span>
            <span>{cart.items.length}</span>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
            <span>Total quantity</span>
            <span>
              {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <div className="mt-6 border-t pt-6">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={isPending}
            className="mt-6 w-full rounded-full bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Redirecting..." : "Pay with Stripe"}
          </button>
        </div>
      </div>
    </div>
  );
}