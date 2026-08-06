"use client";

import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import {
  createFaqItem,
  deleteFaqItem,
  updateFaqItem,
  type CmsActionState,
} from "@/actions/admin-cms";
import { Trash2 } from "lucide-react";

type FaqRecord = {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
};

function FaqForm({ item }: { item?: FaqRecord }) {
  const action = item ? updateFaqItem : createFaqItem;
  const [state, formAction, pending] = useActionState<CmsActionState, FormData>(action, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="space-y-3 rounded-xl border bg-gray-50 p-4">
      {item && <input type="hidden" name="id" value={item.id} />}
      <input name="question" required placeholder="Question *" defaultValue={item?.question ?? ""} className="w-full rounded-lg border px-3 py-2 bg-white text-sm" />
      <textarea name="answer" required rows={4} placeholder="Answer *" defaultValue={item?.answer ?? ""} className="w-full rounded-lg border px-3 py-2 bg-white text-sm" />
      <div className="grid sm:grid-cols-3 gap-3">
        <input name="category" placeholder="Category" defaultValue={item?.category ?? "general"} className="rounded-lg border px-3 py-2 bg-white text-sm" />
        <input name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} className="rounded-lg border px-3 py-2 bg-white text-sm" />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isActive" defaultChecked={item?.isActive ?? true} /> Active</label>
      </div>
      <button type="submit" disabled={pending} className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">{item ? "Update" : "Add FAQ"}</button>
    </form>
  );
}

export function FaqManager({ items }: { items: FaqRecord[] }) {
  const [, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <FaqForm />
      {items.map((item) => (
        <div key={item.id} className="rounded-2xl border bg-white p-4">
          <FaqForm item={item} />
          <button
            type="button"
            onClick={() =>
              startTransition(async () => {
                const r = await deleteFaqItem(item.id);
                if (r) toast[r.success ? "success" : "error"](r.message);
              })
            }
            className="mt-2 inline-flex items-center gap-1 text-sm text-red-600"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </div>
      ))}
    </div>
  );
}
