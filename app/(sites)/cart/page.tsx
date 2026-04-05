"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getUnitPrice } from "@/lib/cartUtils";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
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

  if (!isLoaded) {
    return (
      <div className="px-4 py-20 text-center">
        <p>Loading cart...</p>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="px-4 py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border p-10 text-center shadow-sm">
          <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-3 text-gray-500">
            You have not added any package yet.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-red-500 px-6 py-3 text-white"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-20 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Your cart</h1>

        <button
          type="button"
          onClick={clearCart}
          className="rounded-full border px-5 py-2 text-sm font-medium hover:bg-gray-100"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.items.map((item) => {
            const unitPrice = getUnitPrice(item);
            const lineTotal = unitPrice * item.quantity;

            return (
              <div
                key={`${item.packageId}-${item.packageDuration}`}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border bg-gray-50">
                      {item.package.image ? (
                        <Image
                          src={item.package.image}
                          alt={item.package.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h2 className="text-xl font-bold">{item.package.name}</h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.package.service?.name ?? "Service"}
                        {item.package.subService?.name
                          ? ` • ${item.package.subService.name}`
                          : ""}
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Billing cycle: {getBillingCycleLabel(item.packageDuration)}
                      </p>

                      <p className="mt-3 text-sm">
                        {item.package.description}
                      </p>

                      <div className="mt-4 grid gap-1 text-sm text-gray-500">
                        <p>
                          Unit price:{" "}
                          <span className="font-semibold">
                            {formatPrice(unitPrice)}
                          </span>
                        </p>
                        <p>
                          Quantity:{" "}
                          <span className="font-semibold">{item.quantity}</span>
                        </p>
                        <p>
                          Line total:{" "}
                          <span className="font-semibold">
                            {formatPrice(lineTotal)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 md:items-end">
                    <div className="flex items-center gap-3 rounded-full border px-3 py-2">
                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item.packageId, item.packageDuration)
                        }
                        className="rounded-full p-1 hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="min-w-6 text-center font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(item.packageId, item.packageDuration)
                        }
                        className="rounded-full p-1 hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.packageId, item.packageDuration)
                      }
                      className="inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-600"
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

          <Link href="/checkout" className="block">
            <button
              type="button"
              className="mt-6 w-full cursor-pointer rounded-full bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
            >
              Proceed to checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;