"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createLead, type LeadActionState } from "@/actions/admin-leads";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewLeadPage() {
  const [state, formAction, pending] = useActionState<LeadActionState, FormData>(createLead, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  return (
    <div className="max-w-xl">
      <Link href="/admin/leads" className="inline-flex items-center gap-2 text-sm text-brand-blue font-medium mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to leads
      </Link>
      <h1 className="text-2xl font-bold mb-6">Add lead</h1>
      <form action={formAction} className="rounded-2xl border bg-white p-6 space-y-4">
        <input name="name" required placeholder="Name *" className="w-full rounded-xl border px-3 py-2" />
        <input name="email" type="email" required placeholder="Email *" className="w-full rounded-xl border px-3 py-2" />
        <input name="phone" placeholder="Phone" className="w-full rounded-xl border px-3 py-2" />
        <input name="company" placeholder="Company" className="w-full rounded-xl border px-3 py-2" />
        <input name="source" placeholder="Source" defaultValue="Manual" className="w-full rounded-xl border px-3 py-2" />
        <input name="service" placeholder="Service interest" className="w-full rounded-xl border px-3 py-2" />
        <textarea name="message" rows={3} placeholder="Notes" className="w-full rounded-xl border px-3 py-2" />
        <button type="submit" disabled={pending} className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white">{pending ? "Saving..." : "Create lead"}</button>
      </form>
    </div>
  );
}
