"use client";

import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import {
  createSiteStatistic,
  deleteSiteStatistic,
  updateSiteStatistic,
  type CmsActionState,
} from "@/actions/admin-cms";
import { Trash2 } from "lucide-react";

type Stat = {
  id: string;
  key: string;
  label: string;
  value: string;
  suffix: string | null;
  sortOrder: number;
  isActive: boolean;
};

function StatForm({ stat }: { stat?: Stat }) {
  const action = stat ? updateSiteStatistic : createSiteStatistic;
  const [state, formAction, pending] = useActionState<CmsActionState, FormData>(action, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="space-y-3 rounded-xl border bg-gray-50 p-4">
      {stat && <input type="hidden" name="id" value={stat.id} />}
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="key" required placeholder="key" defaultValue={stat?.key ?? ""} className="rounded-lg border px-3 py-2 bg-white text-sm" />
        <input name="label" required placeholder="Label" defaultValue={stat?.label ?? ""} className="rounded-lg border px-3 py-2 bg-white text-sm" />
        <input name="value" required placeholder="Value" defaultValue={stat?.value ?? ""} className="rounded-lg border px-3 py-2 bg-white text-sm" />
        <input name="suffix" placeholder="Suffix (+, %)" defaultValue={stat?.suffix ?? ""} className="rounded-lg border px-3 py-2 bg-white text-sm" />
        <input name="sortOrder" type="number" defaultValue={stat?.sortOrder ?? 0} className="rounded-lg border px-3 py-2 bg-white text-sm" />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isActive" defaultChecked={stat?.isActive ?? true} /> Active</label>
      </div>
      <button type="submit" disabled={pending} className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">{stat ? "Update" : "Add statistic"}</button>
    </form>
  );
}

export function StatsManager({ stats }: { stats: Stat[] }) {
  const [, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <StatForm />
      {stats.map((stat) => (
        <div key={stat.id} className="rounded-2xl border bg-white p-4">
          <StatForm stat={stat} />
          <button type="button" onClick={() => startTransition(async () => { const r = await deleteSiteStatistic(stat.id); if (r) toast[r.success ? "success" : "error"](r.message); })} className="mt-2 inline-flex items-center gap-1 text-sm text-red-600"><Trash2 className="h-4 w-4" /> Delete</button>
        </div>
      ))}
    </div>
  );
}
