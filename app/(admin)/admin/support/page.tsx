import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default async function AdminSupportPage() {
  await requireStaff();

  const tickets = await prisma.supportTicket.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { messages: true } },
    },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Support Tickets</h1>
        <p className="text-gray-500 mt-1">Review and respond to customer support requests.</p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              No support tickets yet. Tickets appear when customers submit requests from their dashboard.
            </p>
            <Link
              href="/dashboard/messages"
              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              View customer messages area
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 font-medium">Subject</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Priority</th>
                  <th className="pb-3 font-medium">Messages</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Updated</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium text-gray-900">{ticket.subject}</td>
                    <td className="py-3 pr-4">
                      <p>{ticket.user.name}</p>
                      <p className="text-xs text-gray-500">{ticket.user.email}</p>
                    </td>
                    <td className="py-3 pr-4 capitalize text-gray-600">{ticket.priority}</td>
                    <td className="py-3 pr-4">{ticket._count.messages}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={ticket.status} />
                    </td>
                    <td className="py-3 text-gray-500">
                      {new Date(ticket.updatedAt).toLocaleDateString()}
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
