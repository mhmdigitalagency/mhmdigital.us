import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { requireCustomer } from "@/lib/auth-redirect";
import { isCompanyRole } from "@/lib/rbac";
import { UserRole } from "@/app/generated/prisma/enums";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Receipt,
  Printer,
  Upload,
  MessageSquare,
  Calendar,
  Settings,
  ShoppingBag,
  Building2,
} from "lucide-react";

const CUSTOMER_NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/quotes", label: "Quotes", icon: FileText },
  { href: "/dashboard/invoices", label: "Invoices", icon: Receipt },
  { href: "/dashboard/print-orders", label: "Print Orders", icon: Printer },
  { href: "/orders", label: "Package Orders", icon: ShoppingBag },
  { href: "/dashboard/files", label: "Files", icon: Upload },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/appointment", label: "Appointments", icon: Calendar },
  { href: "/profile", label: "Profile & Settings", icon: Settings },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireCustomer();
  const role = session.user.role as UserRole;
  const isCompany = isCompanyRole(role);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex w-64 flex-col border-r bg-white shrink-0">
        <div className="p-5 border-b">
          <Logo size="sm" />
          <p className="text-xs text-gray-500 mt-2 font-medium">
            {isCompany ? "Company Dashboard" : "Customer Dashboard"}
          </p>
        </div>
        <nav className="flex-1 p-4 space-y-1" aria-label="Dashboard navigation">
          {CUSTOMER_NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          ))}
          {isCompany && (
            <Link
              href="/dashboard/company"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Building2 className="h-4 w-4 shrink-0" />
              Company & Team
            </Link>
          )}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between p-4 border-b bg-white">
          <Logo size="sm" />
          <Link href="/" className="text-sm text-red-500 font-medium">Home</Link>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
