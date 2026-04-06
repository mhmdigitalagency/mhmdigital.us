"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Receipt } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-red-50/30 to-white px-4 py-20 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-[36px] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="bg-linear-to-b from-red-500 to-red-400 px-8 py-10 text-center text-white">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-red-100">
            Payment successful
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Thank you for your order
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-red-50 md:text-base">
            Your payment has been completed successfully. We have received your
            order and it is now being processed.
          </p>
        </div>

        <div className="px-8 py-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-gray-50 p-5">
              <Receipt className="mb-3 h-6 w-6 text-red-500" />
              <h2 className="text-lg font-semibold text-gray-900">
                Order received
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Your order has been submitted successfully. We will begin the next
                steps shortly.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <ShieldCheck className="mb-3 h-6 w-6 text-red-500" />
              <h2 className="text-lg font-semibold text-gray-900">
                Secure payment
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Your payment was processed securely through Stripe.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-5">
            <h3 className="text-base font-semibold text-gray-900">
              What happens next?
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Our team will review your order and contact you if additional
              information or files are needed.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-500 px-6 py-4 text-center font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg sm:w-auto"
            >
              Back to home
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* <Link
              href="/services"
              className="inline-flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-4 text-center font-semibold text-gray-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-500 sm:w-auto"
            >
              Continue shopping
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}