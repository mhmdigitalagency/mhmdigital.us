"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, Phone, Receipt } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-brand/5 to-white px-4 py-20 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-[36px] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="bg-linear-to-b from-brand to-brand/90 px-8 py-10 text-center text-white">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Order submitted successfully
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Thank you for your order
          </h1>

          {orderNumber ? (
            <p className="mx-auto mt-4 max-w-2xl text-base font-semibold text-white">
              Order number: {orderNumber}
            </p>
          ) : null}

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/90 md:text-base">
            We received your order with Seattle sales tax included. Our team will contact you shortly to confirm details and arrange payment.
          </p>
        </div>

        <div className="px-8 py-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-gray-50 p-5">
              <Receipt className="mb-3 h-6 w-6 text-brand" />
              <h2 className="text-lg font-semibold text-gray-900">Order received</h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Your order has been submitted successfully. Track its status from your dashboard at any time.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <Phone className="mb-3 h-6 w-6 text-brand" />
              <h2 className="text-lg font-semibold text-gray-900">Payment by contact</h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                No online payment is required now. We will reach out to arrange payment with you directly.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/orders"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-center font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg sm:w-auto"
            >
              View my orders
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-4 text-center font-semibold text-gray-700 transition-all duration-300 hover:border-brand/20 hover:bg-brand/5 hover:text-brand sm:w-auto"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
