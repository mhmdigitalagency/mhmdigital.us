"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const CartIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    cart,
    cartCount,
    cartTotal,
    isLoaded,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;

    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative"
        aria-label="Open cart"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-lg transition-all duration-300 hover:bg-gray-200 sm:h-10 sm:w-10 cursor-pointer">
          <FaCartShopping className="size-4 text-red-500 sm:size-5 md:size-6" />

          {isLoaded && cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
              {cartCount}
            </span>
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/45"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
            >
              <div className="flex items-center justify-between border-b px-5 py-4">
                <div>
                  <h2 className="text-lg font-bold text-black">Your Cart</h2>
                  <p className="text-sm text-gray-500">
                    {isLoaded ? `${cartCount} item${cartCount > 1 ? "s" : ""}` : "Loading..."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 transition hover:bg-gray-100"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                {!isLoaded ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-gray-500">Loading cart...</p>
                  </div>
                ) : cart.items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 rounded-full bg-red-50 p-4">
                      <ShoppingBag className="h-8 w-8 text-red-500" />
                    </div>

                    <h3 className="text-lg font-semibold text-black">
                      Your cart is empty
                    </h3>

                    <p className="mt-2 max-w-xs text-sm text-gray-500">
                      Add a package to your cart and it will appear here.
                    </p>

                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="mt-5 rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 cursor-pointer"
                    >
                      Continue shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.items.map((item, index) => {
                      const packageName = item.package?.name || "Package";
                      const packageImage = item.package?.image;
                      const serviceName = item.package?.service?.name || "";
                      const subServiceName = item.package?.subService?.name || "";

                      const price =
                        item.packageDuration === "MONTHLY"
                          ? item.package?.priceByMonth ?? 0
                          : item.packageDuration === "YEARLY"
                          ? item.package?.priceByYear ?? 0
                          : item.package?.price ?? 0;

                      const durationLabel =
                        item.packageDuration === "MONTHLY"
                          ? "Monthly"
                          : item.packageDuration === "YEARLY"
                          ? "Yearly"
                          : "One time";

                      return (
                        <div
                          key={`${item.packageId}-${item.packageDuration}-${index}`}
                          className="rounded-2xl border border-gray-200 p-3"
                        >
                          <div className="flex gap-3">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                              {packageImage ? (
                                <img
                                  src={packageImage}
                                  alt={packageName}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <span className="text-xs text-gray-400">No image</span>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <h4 className="truncate text-sm font-semibold text-black">
                                    {packageName}
                                  </h4>

                                  {(serviceName || subServiceName) && (
                                    <p className="mt-1 text-xs text-gray-500">
                                      {serviceName}
                                      {subServiceName ? ` • ${subServiceName}` : ""}
                                    </p>
                                  )}

                                  <p className="mt-1 text-xs text-gray-500">
                                    {durationLabel}
                                  </p>

                                  <p className="mt-2 text-sm font-semibold text-red-500">
                                    ${price.toFixed(2)}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    removeFromCart(item.packageId, item.packageDuration)
                                  }
                                  className="rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                                  aria-label={`Remove ${packageName}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>

                              <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center rounded-full border">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      decreaseQuantity(item.packageId, item.packageDuration)
                                    }
                                    className="rounded-l-full p-2 transition hover:bg-gray-100"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>

                                  <span className="min-w-10 px-3 text-center text-sm font-medium">
                                    {item.quantity}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      increaseQuantity(item.packageId, item.packageDuration)
                                    }
                                    className="rounded-r-full p-2 transition hover:bg-gray-100"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>

                                <p className="text-sm font-semibold text-black">
                                  ${(price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="border-t bg-white px-5 py-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-lg font-bold text-black">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <p className="mb-4 text-xs text-gray-500">
                  Taxes and final charges will be calculated at checkout.
                </p>

                <div className="flex flex-col gap-3">
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-center rounded-full border border-red-500 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    View Cart
                  </Link>

                  <Link
                    href={cart.items.length > 0 ? "/checkout" : "#"}
                    onClick={(e) => {
                      if (cart.items.length === 0) {
                        e.preventDefault();
                        return;
                      }
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-white transition ${
                      cart.items.length > 0
                        ? "bg-red-500 hover:bg-red-600"
                        : "cursor-not-allowed bg-gray-300"
                    }`}
                    aria-disabled={cart.items.length === 0}
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartIcon;