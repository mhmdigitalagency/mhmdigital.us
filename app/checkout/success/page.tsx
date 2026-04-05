"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-2xl rounded-2xl border p-10 text-center shadow-sm">
        <h1 className="text-3xl font-bold">Payment successful</h1>
        <p className="mt-3 text-gray-500">
          Thank you. Your payment has been received successfully.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-red-500 px-6 py-3 text-white"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}