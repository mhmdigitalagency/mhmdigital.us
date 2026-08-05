"use client";

import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import {
  createDeal,
  deleteDeal,
  updateDeal,
  type DealActionState,
} from "@/actions/admin-deals";
import { MAIN_SERVICES, PRINT_SERVICES } from "@/lib/constants/services-data";
import { Trash2 } from "lucide-react";

type DealRecord = {
  id: string;
  title: string;
  description: string | null;
  badgeText: string | null;
  discountLabel: string | null;
  imageUrl: string | null;
  buttonText: string;
  buttonUrl: string;
  category: string | null;
  startDate: Date | null;
  endDate: Date | null;
  isActive: boolean;
  showOnHome: boolean;
  sortOrder: number;
};

function formatDateInput(date: Date | null) {
  if (!date) return "";
  return date.toISOString().slice(0, 16);
}

function DealForm({ deal }: { deal?: DealRecord }) {
  const action = deal ? updateDeal : createDeal;
  const [state, formAction, pending] = useActionState<DealActionState, FormData>(action, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  const categories = [
    { value: "", label: "General" },
    ...MAIN_SERVICES.map((s) => ({ value: s.slug, label: s.name })),
    ...PRINT_SERVICES.map((p) => ({ value: `print:${p.slug}`, label: `Print: ${p.name}` })),
  ];

  return (
    <form action={formAction} className="space-y-4">
      {deal && <input type="hidden" name="id" value={deal.id} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input name="title" required defaultValue={deal?.title ?? ""} className="w-full rounded-xl border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select name="category" defaultValue={deal?.category ?? ""} className="w-full rounded-xl border px-3 py-2">
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea name="description" rows={3} defaultValue={deal?.description ?? ""} className="w-full rounded-xl border px-3 py-2" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Badge text</label>
          <input name="badgeText" placeholder="e.g. LIMITED TIME" defaultValue={deal?.badgeText ?? ""} className="w-full rounded-xl border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Discount label</label>
          <input name="discountLabel" placeholder="e.g. 20% off first order" defaultValue={deal?.discountLabel ?? ""} className="w-full rounded-xl border px-3 py-2" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input name="imageUrl" type="url" placeholder="https://..." defaultValue={deal?.imageUrl ?? ""} className="w-full rounded-xl border px-3 py-2" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Button text</label>
          <input name="buttonText" defaultValue={deal?.buttonText ?? "Claim Deal"} className="w-full rounded-xl border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Button URL</label>
          <input name="buttonUrl" defaultValue={deal?.buttonUrl ?? "/quote"} className="w-full rounded-xl border px-3 py-2" />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Start date</label>
          <input name="startDate" type="datetime-local" defaultValue={formatDateInput(deal?.startDate ?? null)} className="w-full rounded-xl border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End date</label>
          <input name="endDate" type="datetime-local" defaultValue={formatDateInput(deal?.endDate ?? null)} className="w-full rounded-xl border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sort order</label>
          <input name="sortOrder" type="number" min={0} defaultValue={deal?.sortOrder ?? 0} className="w-full rounded-xl border px-3 py-2" />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isActive" defaultChecked={deal?.isActive ?? true} />
          Active
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="showOnHome" defaultChecked={deal?.showOnHome ?? true} />
          Show on homepage
        </label>
      </div>

      <button type="submit" disabled={pending} className="rounded-full bg-red-500 px-6 py-2.5 text-white font-semibold disabled:opacity-70">
        {pending ? "Saving..." : deal ? "Update deal" : "Create deal"}
      </button>
    </form>
  );
}

function DeleteDealButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const result = await deleteDeal(id);
          if (result?.success) toast.success(result.message);
          else toast.error(result?.message ?? "Failed to delete deal.");
        })
      }
      className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" /> Delete
    </button>
  );
}

export function DealsManager({ deals }: { deals: DealRecord[] }) {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-bold mb-4">Create new deal</h2>
        <DealForm />
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-bold mb-4">Existing deals ({deals.length})</h2>
        {deals.length === 0 ? (
          <p className="text-gray-500 text-sm">No deals yet. Create one above to show offers on the homepage.</p>
        ) : (
          <div className="space-y-6">
            {deals.map((deal) => (
              <div key={deal.id} className="rounded-xl border p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">{deal.title}</h3>
                    <p className="text-sm text-gray-500">
                      {deal.badgeText && <span className="text-red-500 font-semibold mr-2">{deal.badgeText}</span>}
                      {deal.discountLabel}
                    </p>
                  </div>
                  <DeleteDealButton id={deal.id} />
                </div>
                <DealForm deal={deal} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
