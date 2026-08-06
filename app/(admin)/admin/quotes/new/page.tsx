"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createAdminQuote, type AdminQuoteActionState } from "@/actions/admin-quotes";

const QUOTE_STATUSES = ["DRAFT", "SENT", "VIEWED", "ACCEPTED", "DECLINED", "EXPIRED", "CONVERTED"] as const;

export default function NewQuotePage() {
  const [state, formAction, pending] = useActionState<AdminQuoteActionState, FormData>(createAdminQuote, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  return (
    <div className="max-w-xl">
      <Link href="/admin/quotes" className="inline-flex items-center gap-2 text-sm text-brand-blue font-medium mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to quotes
      </Link>
      <h1 className="text-2xl font-bold mb-6">Create quote</h1>
      <form action={formAction} className="rounded-2xl border bg-white p-6 space-y-4">
        <input name="customerEmail" type="email" required placeholder="Customer email *" className="w-full rounded-xl border px-3 py-2" />
        <input name="description" required placeholder="Line item description *" className="w-full rounded-xl border px-3 py-2" />
        <div className="grid sm:grid-cols-2 gap-4">
          <input name="unitPriceDollars" type="number" step="0.01" min="0" required placeholder="Unit price ($) *" className="rounded-xl border px-3 py-2" />
          <input name="quantity" type="number" min="1" defaultValue={1} placeholder="Quantity" className="rounded-xl border px-3 py-2" />
        </div>
        <select name="status" defaultValue="DRAFT" className="w-full rounded-xl border px-3 py-2">
          {QUOTE_STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
        <textarea name="notes" rows={3} placeholder="Internal notes" className="w-full rounded-xl border px-3 py-2" />
        <button type="submit" disabled={pending} className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white">{pending ? "Creating..." : "Create quote"}</button>
      </form>
    </div>
  );
}
