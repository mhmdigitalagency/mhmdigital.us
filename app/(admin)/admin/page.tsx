import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import Link from "next/link";
import {
  Users,
  FolderKanban,
  Printer,
  FileText,
  Receipt,
  Calendar,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

export default async function AdminOverviewPage() {
  await requireStaff();

  const [
    leadCount,
    customerCount,
    activeProjects,
    printOrders,
    pendingQuotes,
    unpaidInvoices,
    openTickets,
    upcomingAppointments,
    recentLeads,
  ] = await Promise.all([
    prisma.lead.count({ where: { status: { in: ["NEW", "CONTACTED", "QUALIFIED"] } } }),
    prisma.user.count({ where: { role: { in: ["USER", "COMPANY_ADMIN", "COMPANY_MEMBER"] } } }),
    prisma.project.count({ where: { status: "ACTIVE" } }),
    prisma.printOrder.count({ where: { status: { in: ["IN_PRODUCTION", "QUALITY_CHECK", "AWAITING_APPROVAL"] } } }),
    prisma.quote.count({ where: { status: { in: ["SENT", "VIEWED"] } } }),
    prisma.invoice.count({ where: { status: { in: ["SENT", "PARTIALLY_PAID", "OVERDUE"] } } }),
    prisma.supportTicket.count({ where: { status: { in: ["OPEN", "IN_PROGRESS"] } } }),
    prisma.appointment.count({
      where: {
        date: { gte: new Date().toISOString().split("T")[0] },
        status: "PENDING",
      },
    }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const stats = [
    { label: "Active Leads", value: leadCount, icon: Users, href: "/admin/leads", color: "text-blue-600 bg-blue-50" },
    { label: "Customers", value: customerCount, icon: Users, href: "/admin/customers", color: "text-emerald-600 bg-emerald-50" },
    { label: "Active Projects", value: activeProjects, icon: FolderKanban, href: "/admin/projects", color: "text-violet-600 bg-violet-50" },
    { label: "Print Jobs", value: printOrders, icon: Printer, href: "/admin/print", color: "text-orange-600 bg-orange-50" },
    { label: "Pending Quotes", value: pendingQuotes, icon: FileText, href: "/admin/quotes", color: "text-amber-600 bg-amber-50" },
    { label: "Unpaid Invoices", value: unpaidInvoices, icon: Receipt, href: "/admin/invoices", color: "text-red-600 bg-red-50" },
    { label: "Open Tickets", value: openTickets, icon: MessageSquare, href: "/admin/support", color: "text-pink-600 bg-pink-50" },
    { label: "Upcoming Appointments", value: upcomingAppointments, icon: Calendar, href: "/admin/leads", color: "text-cyan-600 bg-cyan-50" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Overview</h1>
        <p className="text-gray-500 mt-1">Real-time snapshot of your business operations.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl border bg-white p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-3xl font-bold mt-1">{value}</p>
              </div>
              <div className={`p-2.5 rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Recent Leads</h2>
            <Link href="/admin/leads" className="text-sm text-brand font-medium">View all</Link>
          </div>
          {recentLeads.length === 0 ? (
            <p className="text-gray-500 text-sm">No leads yet. They will appear here from contact and quote forms.</p>
          ) : (
            <ul className="space-y-3">
              {recentLeads.map((lead) => (
                <li key={lead.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.email}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    {lead.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-brand" />
            <h2 className="font-bold text-lg">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Create Quote", "/admin/quotes/new"],
              ["New Project", "/admin/projects/new"],
              ["Manage Content", "/admin/content"],
              ["Print Orders", "/admin/print"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border px-4 py-3 text-sm font-semibold text-center hover:bg-brand/5 hover:border-brand/20 hover:text-brand transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
