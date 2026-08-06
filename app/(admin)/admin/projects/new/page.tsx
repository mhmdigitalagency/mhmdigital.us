"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createAdminProject, type AdminProjectActionState } from "@/actions/admin-projects";

const PROJECT_STATUSES = ["DRAFT", "ACTIVE", "ON_HOLD", "AWAITING_APPROVAL", "REVISION_REQUESTED", "COMPLETED", "CANCELED"] as const;

export default function NewProjectPage() {
  const [state, formAction, pending] = useActionState<AdminProjectActionState, FormData>(createAdminProject, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  return (
    <div className="max-w-xl">
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-brand-blue font-medium mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>
      <h1 className="text-2xl font-bold mb-6">New project</h1>
      <form action={formAction} className="rounded-2xl border bg-white p-6 space-y-4">
        <input name="customerEmail" type="email" required placeholder="Customer email *" className="w-full rounded-xl border px-3 py-2" />
        <input name="title" required placeholder="Project title *" className="w-full rounded-xl border px-3 py-2" />
        <textarea name="description" rows={3} placeholder="Description" className="w-full rounded-xl border px-3 py-2" />
        <select name="status" defaultValue="DRAFT" className="w-full rounded-xl border px-3 py-2">
          {PROJECT_STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
        <input name="dueDate" type="date" className="w-full rounded-xl border px-3 py-2" />
        <button type="submit" disabled={pending} className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white">{pending ? "Creating..." : "Create project"}</button>
      </form>
    </div>
  );
}
