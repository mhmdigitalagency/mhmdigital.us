"use client";

import { useTransition } from "react";
import { cancelPendingOrder, payPendingOrder } from "../actions";

export default function OrderActions({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();

  if (status !== "PENDING") return null;

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await payPendingOrder(orderId);
          })
        }
        className="rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
      >
        {isPending ? "Please wait..." : "Pay now"}
      </button>

      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await cancelPendingOrder(orderId);
            window.location.reload();
          })
        }
        className="rounded-full border px-5 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
      >
        Cancel order
      </button>
    </div>
  );
}