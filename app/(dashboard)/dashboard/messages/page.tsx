import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/auth-redirect";
import { EmptyState } from "@/components/dashboard/empty-state";
import { MessageSquare, Mail } from "lucide-react";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function statusLabel(status: string) {
  return status.replace(/_/g, " ");
}

function statusColor(status: string) {
  switch (status) {
    case "OPEN":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "IN_PROGRESS":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "WAITING_CUSTOMER":
      return "bg-violet-50 text-violet-700 border-violet-200";
    case "RESOLVED":
    case "CLOSED":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

export default async function MessagesPage() {
  const session = await requireCustomer();

  const tickets = await prisma.supportTicket.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        include: { sender: { select: { name: true } } },
      },
    },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500 mt-1">Support tickets and conversations with our team.</p>
      </div>

      {tickets.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No messages yet"
          description="When you contact support or start a project, your conversations will appear here. Need help? Reach out to our team."
          actionHref="/contact"
          actionLabel="Contact Support"
        />
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="rounded-2xl border bg-white overflow-hidden">
              <div className="p-5 border-b bg-gray-50/50">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold text-gray-900">{ticket.subject}</h2>
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColor(ticket.status)}`}
                  >
                    {statusLabel(ticket.status)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Opened {formatDate(ticket.createdAt)} · Updated {formatDate(ticket.updatedAt)}
                </p>
              </div>

              {ticket.messages.length === 0 ? (
                <p className="p-5 text-sm text-gray-500">No messages in this ticket yet.</p>
              ) : (
                <ul className="divide-y">
                  {ticket.messages.map((message) => (
                    <li key={message.id} className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                            message.isStaff
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {message.isStaff ? "S" : message.sender.name.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {message.isStaff ? "Support Team" : message.sender.name}
                        </span>
                        <span className="text-xs text-gray-400">{formatDate(message.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap pl-9">{message.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-2xl border bg-white p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
            <Mail className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h2 className="font-bold">Need help?</h2>
            <p className="text-sm text-gray-500 mt-1">
              Contact our support team for project questions, billing inquiries, or technical help.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-flex rounded-full border border-red-200 bg-red-50 px-5 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
