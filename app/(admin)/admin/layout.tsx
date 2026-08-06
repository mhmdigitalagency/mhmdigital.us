import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { requireStaff } from "@/lib/auth-redirect";

export const dynamic = "force-dynamic";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Printer,
  FileText,
  Receipt,
  MessageSquare,
  Settings,
  BarChart3,
  Megaphone,
  HelpCircle,
  Tag,
  DollarSign,
} from "lucide-react";

const ADMIN_NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads & CRM", icon: Users },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/print", label: "Print Orders", icon: Printer },
  { href: "/admin/print/products", label: "Print Pricing", icon: DollarSign },
  { href: "/admin/quotes", label: "Quotes", icon: FileText },
  { href: "/admin/invoices", label: "Invoices", icon: Receipt },
  { href: "/admin/deals", label: "Deals", icon: Tag },
  { href: "/admin/content", label: "Content CMS", icon: Megaphone },
  { href: "/admin/popup", label: "Popup", icon: Settings },
  { href: "/admin/support", label: "Support", icon: MessageSquare },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: HelpCircle },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireStaff();

  if (!session?.user) redirect("/connexion");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex w-64 flex-col border-r bg-brand-navy shrink-0 text-white">
        <div className="p-5 border-b border-white/10">
          <Logo size="sm" variant="mark" />
          <p className="text-xs text-white/60 mt-2 font-medium">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Admin navigation">
          {ADMIN_NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 text-xs text-white/60">
          Signed in as {session.user.name}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between p-4 border-b bg-white">
          <Logo size="sm" />
          <Link href="/" className="text-sm text-brand font-medium">View Site</Link>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
