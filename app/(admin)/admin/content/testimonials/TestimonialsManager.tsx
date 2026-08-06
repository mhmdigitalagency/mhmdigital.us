"use client";

import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
  type CmsActionState,
} from "@/actions/admin-cms";
import { Trash2 } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  rating: number;
  sortOrder: number;
  isActive: boolean;
};

function TestimonialForm({ item }: { item?: Testimonial }) {
  const action = item ? updateTestimonial : createTestimonial;
  const [state, formAction, pending] = useActionState<CmsActionState, FormData>(action, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="space-y-3 rounded-xl border bg-gray-50 p-4">
      {item && <input type="hidden" name="id" value={item.id} />}
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="name" required placeholder="Name" defaultValue={item?.name ?? ""} className="rounded-lg border px-3 py-2 bg-white text-sm" />
        <input name="company" placeholder="Company" defaultValue={item?.company ?? ""} className="rounded-lg border px-3 py-2 bg-white text-sm" />
        <input name="role" placeholder="Role" defaultValue={item?.role ?? ""} className="rounded-lg border px-3 py-2 bg-white text-sm" />
        <input name="rating" type="number" min={1} max={5} defaultValue={item?.rating ?? 5} className="rounded-lg border px-3 py-2 bg-white text-sm" />
      </div>
      <textarea name="content" required rows={3} placeholder="Testimonial text" defaultValue={item?.content ?? ""} className="w-full rounded-lg border px-3 py-2 bg-white text-sm" />
      <div className="flex gap-4 items-center">
        <input name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} className="rounded-lg border px-3 py-2 bg-white text-sm w-24" />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isActive" defaultChecked={item?.isActive ?? true} /> Active</label>
      </div>
      <button type="submit" disabled={pending} className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">{item ? "Update" : "Add testimonial"}</button>
    </form>
  );
}

export function TestimonialsManager({ items }: { items: Testimonial[] }) {
  const [, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <TestimonialForm />
      {items.map((item) => (
        <div key={item.id} className="rounded-2xl border bg-white p-4">
          <TestimonialForm item={item} />
          <button type="button" onClick={() => startTransition(async () => { const r = await deleteTestimonial(item.id); if (r) toast[r.success ? "success" : "error"](r.message); })} className="mt-2 inline-flex items-center gap-1 text-sm text-red-600"><Trash2 className="h-4 w-4" /> Delete</button>
        </div>
      ))}
    </div>
  );
}
