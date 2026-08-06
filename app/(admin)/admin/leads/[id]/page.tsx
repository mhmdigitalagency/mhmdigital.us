import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { LeadUpdateForm } from "./LeadUpdateForm";
import { ArrowLeft } from "lucide-react";

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireStaff();
  const { id } = await params;

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();

  return (
    <div>
      <Link href="/admin/leads" className="inline-flex items-center gap-2 text-sm text-brand-blue font-medium mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to leads
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{lead.name}</h1>
          <p className="text-gray-500 mt-1">{lead.email}</p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white p-6 space-y-4">
          <h2 className="font-bold text-lg">Lead details</h2>
          <dl className="grid sm:grid-cols-2 gap-4 text-sm">
            <div><dt className="text-gray-500">Phone</dt><dd className="font-medium">{lead.phone || "—"}</dd></div>
            <div><dt className="text-gray-500">Company</dt><dd className="font-medium">{lead.company || "—"}</dd></div>
            <div><dt className="text-gray-500">Source</dt><dd className="font-medium">{lead.source || "—"}</dd></div>
            <div><dt className="text-gray-500">Service</dt><dd className="font-medium">{lead.service || "—"}</dd></div>
            <div className="sm:col-span-2"><dt className="text-gray-500">Created</dt><dd className="font-medium">{new Date(lead.createdAt).toLocaleString()}</dd></div>
          </dl>
          {lead.message && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Message</p>
              <p className="text-sm text-gray-800 whitespace-pre-wrap rounded-xl bg-gray-50 p-4">{lead.message}</p>
            </div>
          )}
        </div>

        <LeadUpdateForm leadId={lead.id} status={lead.status} notes={lead.notes} />
      </div>
    </div>
  );
}
