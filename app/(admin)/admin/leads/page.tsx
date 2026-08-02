import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default async function AdminLeadsPage() {
  await requireStaff();

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Leads & CRM</h1>
          <p className="text-gray-500 mt-1">Track inbound leads from contact forms, quotes, and referrals.</p>
        </div>
        <Link
          href="/admin/leads/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Lead
        </Link>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        {leads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No leads yet. They will appear here from contact and quote forms.</p>
            <Link
              href="/admin/leads/new"
              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create your first lead
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Contact</th>
                  <th className="pb-3 font-medium">Source</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b last:border-0">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      {lead.company && <p className="text-xs text-gray-500">{lead.company}</p>}
                    </td>
                    <td className="py-3 pr-4">
                      <p>{lead.email}</p>
                      {lead.phone && <p className="text-xs text-gray-500">{lead.phone}</p>}
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{lead.source ?? lead.service ?? "—"}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="py-3 text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
