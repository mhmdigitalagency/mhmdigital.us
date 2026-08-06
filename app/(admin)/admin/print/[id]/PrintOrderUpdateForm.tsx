"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updatePrintOrder, type PrintOrderActionState } from "@/actions/admin-print-orders";

const STATUSES = [
  "DRAFT", "QUOTE_REQUESTED", "AWAITING_APPROVAL", "IN_PRODUCTION",
  "QUALITY_CHECK", "READY_FOR_PICKUP", "SHIPPED", "DELIVERED", "COMPLETED", "CANCELED",
];

export function PrintOrderUpdateForm({
  orderId,
  status,
  total,
  trackingNumber,
  notes,
}: {
  orderId: string;
  status: string;
  total: number;
  trackingNumber: string | null;
  notes: string | null;
}) {
  const [state, formAction, pending] = useActionState<PrintOrderActionState, FormData>(updatePrintOrder, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="rounded-2xl border bg-white p-6 space-y-4">
      <h2 className="font-bold text-lg">Update order</h2>
      <input type="hidden" name="id" value={orderId} />
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select name="status" defaultValue={status} className="w-full rounded-xl border px-3 py-2">
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Total (USD)</label>
        <input name="totalDollars" type="number" step="0.01" min="0" defaultValue={total > 0 ? (total / 100).toFixed(2) : ""} className="w-full rounded-xl border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tracking number</label>
        <input name="trackingNumber" defaultValue={trackingNumber ?? ""} className="w-full rounded-xl border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Internal notes</label>
        <textarea name="notes" rows={3} defaultValue={notes ?? ""} className="w-full rounded-xl border px-3 py-2" />
      </div>
      <button type="submit" disabled={pending} className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
        {pending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
