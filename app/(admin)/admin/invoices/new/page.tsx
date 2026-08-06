"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createAdminInvoice, type AdminInvoiceActionState } from "@/actions/admin-invoices";

const INVOICE_STATUSES = ["DRAFT", "SENT", "PARTIALLY_PAID", "PAID", "OVERDUE", "CANCELED", "REFUNDED"] as const;

export default function NewInvoicePage() {
  const [state, formAction, pending] = useActionState<AdminInvoiceActionState, FormData>(createAdminInvoice, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  return (
    <div className="max-w-xl">
      <Link href="/admin/invoices" className="inline-flex items-center gap-2 text-sm text-brand-blue font-medium mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to invoices
      </Link>
      <h1 className="text-2xl font-bold mb-6">Create invoice</h1>
      <form action={formAction} className="rounded-2xl border bg-white p-6 space-y-4">
        <input name="customerEmail" type="email" required placeholder="Customer email *" className="w-full rounded-xl border px-3 py-2" />
        <input name="description" required placeholder="Line item description *" className="w-full rounded-xl border px-3 py-2" />
        <div className="grid sm:grid-cols-2 gap-4">
          <input name="unitPriceDollars" type="number" step="0.01" min="0" required placeholder="Unit price ($) *" className="rounded-xl border px-3 py-2" />
          <input name="quantity" type="number" min="1" defaultValue={1} placeholder="Quantity" className="rounded-xl border px-3 py-2" />
        </div>
        <select name="status" defaultValue="DRAFT" className="w-full rounded-xl border px-3 py-2">
          {INVOICE_STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
        <input name="dueDate" type="date" className="w-full rounded-xl border px-3 py-2" />
        <textarea name="notes" rows={3} placeholder="Notes" className="w-full rounded-xl border px-3 py-2" />
        <button type="submit" disabled={pending} className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white">{pending ? "Creating..." : "Create invoice"}</button>
      </form>
    </div>
  );
}
