import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/auth-redirect";
import {
  FolderKanban,
  FileText,
  Receipt,
  Printer,
  MessageSquare,
  Calendar,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export default async function DashboardOverviewPage() {
  const session = await requireCustomer();
  const userId = session.user.id;

  const [projects, quotes, invoices, printOrders, orders, appointments, tickets] =
    await Promise.all([
      prisma.project.findMany({
        where: { userId, status: { in: ["ACTIVE", "AWAITING_APPROVAL"] } },
        take: 5,
        orderBy: { updatedAt: "desc" },
      }),
      prisma.quote.findMany({
        where: { userId, status: { in: ["SENT", "VIEWED"] } },
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.invoice.findMany({
        where: { userId, status: { in: ["SENT", "PARTIALLY_PAID", "OVERDUE"] } },
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.printOrder.findMany({
        where: { userId },
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.order.findMany({
        where: { userId },
        take: 3,
        orderBy: { createdAt: "desc" },
        include: { items: true },
      }),
      prisma.appointment.findMany({
        where: { email: session.user.email, status: "PENDING" },
        take: 3,
        orderBy: { date: "asc" },
      }),
      prisma.supportTicket.findMany({
        where: { userId, status: { in: ["OPEN", "IN_PROGRESS"] } },
        take: 3,
      }),
    ]);

  const pendingApprovals = projects.filter((p) => p.status === "AWAITING_APPROVAL").length;
  const outstandingInvoices = invoices.reduce(
    (sum, inv) => sum + (inv.total - inv.amountPaid),
    0
  );

  const formatCents = (c: number) => `$${(c / 100).toFixed(2)}`;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome back, {session.user.name?.split(" ")[0]}
        </h1>
        <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your projects and orders.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Projects", value: projects.length, icon: FolderKanban, href: "/dashboard/projects" },
          { label: "Pending Approvals", value: pendingApprovals, icon: AlertCircle, href: "/dashboard/projects" },
          { label: "Outstanding Balance", value: formatCents(outstandingInvoices), icon: Receipt, href: "/dashboard/invoices" },
          { label: "Open Support", value: tickets.length, icon: MessageSquare, href: "/dashboard/messages" },
        ].map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="rounded-2xl border bg-white p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold mt-1">{value}</p>
              </div>
              <Icon className="h-8 w-8 text-red-400" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="Active Projects" href="/dashboard/projects" empty="No active projects. Start one today.">
          {projects.map((p) => (
            <Item key={p.id} title={p.title} subtitle={p.status} />
          ))}
        </Section>

        <Section title="Pending Quotes" href="/dashboard/quotes" empty="No pending quotes.">
          {quotes.map((q) => (
            <Item key={q.id} title={q.quoteNumber} subtitle={`${formatCents(q.total)} · ${q.status}`} />
          ))}
        </Section>

        <Section title="Recent Print Orders" href="/dashboard/print-orders" empty="No print orders yet.">
          {printOrders.map((o) => (
            <Item key={o.id} title={o.productName} subtitle={`${o.orderNumber} · ${o.status}`} />
          ))}
        </Section>

        <Section title="Upcoming Appointments" href="/appointment" empty="No upcoming appointments.">
          {appointments.map((a) => (
            <Item key={a.id} title={`${a.date} at ${a.time}`} subtitle={a.name} />
          ))}
        </Section>
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="font-bold text-lg mb-4">Recommended Next Actions</h2>
        <div className="flex flex-wrap gap-3">
          <ActionLink href="/quote">Request a Quote</ActionLink>
          <ActionLink href="/print-services">Order Printing</ActionLink>
          <ActionLink href="/dashboard/files">Upload Files</ActionLink>
          <ActionLink href="/appointment">Book Consultation</ActionLink>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  href,
  empty,
  children,
}: {
  title: string;
  href: string;
  empty: string;
  children: React.ReactNode;
}) {
  const items = Array.isArray(children) ? children : [children];
  const hasItems = items.some((c) => c);

  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold">{title}</h2>
        <Link href={href} className="text-sm text-red-500 font-medium inline-flex items-center gap-1">
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      {!hasItems ? (
        <p className="text-sm text-gray-500">{empty}</p>
      ) : (
        <ul className="space-y-2">{children}</ul>
      )}
    </div>
  );
}

function Item({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <li className="flex items-center justify-between py-2 border-b last:border-0">
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </li>
  );
}

function ActionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
    >
      {children}
    </Link>
  );
}
