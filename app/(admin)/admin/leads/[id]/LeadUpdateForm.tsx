"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateLead, type LeadActionState } from "@/actions/admin-leads";

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "NEGOTIATION", "WON", "LOST"];

export function LeadUpdateForm({
  leadId,
  status,
  notes,
}: {
  leadId: string;
  status: string;
  notes: string | null;
}) {
  const [state, formAction, pending] = useActionState<LeadActionState, FormData>(updateLead, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="rounded-2xl border bg-white p-6 space-y-4">
      <h2 className="font-bold text-lg">Update lead</h2>
      <input type="hidden" name="id" value={leadId} />
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select name="status" defaultValue={status} className="w-full rounded-xl border px-3 py-2">
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Internal notes</label>
        <textarea name="notes" rows={4} defaultValue={notes ?? ""} className="w-full rounded-xl border px-3 py-2" />
      </div>
      <button type="submit" disabled={pending} className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
        {pending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
