import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import Link from "next/link";
import {
  BarChart3,
  DollarSign,
  FileText,
  MessageSquare,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";

function formatCents(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default async function AdminAnalyticsPage() {
  await requireStaff();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [
    totalOrders,
    pendingOrders,
    paidOrders,
    totalLeads,
    newLeads30d,
    totalContacts,
    contacts30d,
    totalQuotes,
    openTickets,
    totalCustomers,
    revenueAgg,
    ordersByStatus,
    recentOrders,
    recentLeads,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: { in: ["PAID", "PROCESSING", "COMPLETED"] } } }),
    prisma.lead.count(),
    prisma.lead.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.contact.count(),
    prisma.contact.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.quote.count(),
    prisma.supportTicket.count({ where: { status: { in: ["OPEN", "IN_PROGRESS"] } } }),
    prisma.user.count({ where: { role: { in: ["USER", "COMPANY_ADMIN", "COMPANY_MEMBER"] } } }),
    prisma.order.aggregate({
      where: { status: { in: ["PAID", "PROCESSING", "COMPLETED"] } },
      _sum: { total: true },
    }),
    prisma.order.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
  ]);

  const totalRevenue = revenueAgg._sum.total ?? 0;

  const statCards = [
    { label: "Total Revenue", value: formatCents(totalRevenue), icon: DollarSign, color: "text-emerald-600 bg-emerald-50" },
    { label: "Total Orders", value: totalOrders, icon: ShoppingBag, color: "text-blue-600 bg-blue-50" },
    { label: "Pending Orders", value: pendingOrders, icon: BarChart3, color: "text-amber-600 bg-amber-50" },
    { label: "Paid / Active Orders", value: paidOrders, icon: TrendingUp, color: "text-violet-600 bg-violet-50" },
    { label: "Total Leads", value: totalLeads, icon: Users, color: "text-red-600 bg-red-50" },
    { label: "Leads (30 days)", value: newLeads30d, icon: TrendingUp, color: "text-orange-600 bg-orange-50" },
    { label: "Contact Messages", value: totalContacts, icon: MessageSquare, color: "text-cyan-600 bg-cyan-50" },
    { label: "Customers", value: totalCustomers, icon: Users, color: "text-indigo-600 bg-indigo-50" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">Business metrics from your database — orders, leads, contacts, and revenue.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold mt-1">{value}</p>
              </div>
              <div className={`p-2.5 rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="rounded-2xl border bg-white p-6 lg:col-span-1">
          <h2 className="font-bold text-lg mb-4">Orders by Status</h2>
          {ordersByStatus.length === 0 ? (
            <p className="text-sm text-gray-500">No orders yet.</p>
          ) : (
            <ul className="space-y-3">
              {ordersByStatus.map((row) => (
                <li key={row.status} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{row.status}</span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold">{row._count._all}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border bg-white p-6 lg:col-span-2">
          <h2 className="font-bold text-lg mb-4">Activity Summary</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Quotes</p>
              <p className="text-2xl font-bold mt-1">{totalQuotes}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Open Support Tickets</p>
              <p className="text-2xl font-bold mt-1">{openTickets}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Contact Messages (30d)</p>
              <p className="text-2xl font-bold mt-1">{contacts30d}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">New Leads (30d)</p>
              <p className="text-2xl font-bold mt-1">{newLeads30d}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Recent Orders</h2>
            <Link href="/admin" className="text-sm text-red-500 font-medium">Overview</Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-gray-500">No orders yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentOrders.map((order) => (
                <li key={order.id} className="flex items-center justify-between py-2 border-b last:border-0 text-sm">
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-xs text-gray-500">{order.user?.name ?? order.user?.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCents(order.total)}</p>
                    <p className="text-xs text-gray-500">{order.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Recent Leads</h2>
            <Link href="/admin/leads" className="text-sm text-red-500 font-medium">View all</Link>
          </div>
          {recentLeads.length === 0 ? (
            <p className="text-sm text-gray-500">No leads yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentLeads.map((lead) => (
                <li key={lead.id} className="flex items-center justify-between py-2 border-b last:border-0 text-sm">
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.email}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100">{lead.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
