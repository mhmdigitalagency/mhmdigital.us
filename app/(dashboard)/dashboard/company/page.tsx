import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireCompanyUser } from "@/lib/auth-redirect";
import { Building2, Globe, Mail, MapPin, Phone, Users } from "lucide-react";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function CompanyPage() {
  const session = await requireCompanyUser();
  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      role: true,
      jobTitle: true,
      department: true,
      companyId: true,
      ownedCompany: {
        include: {
          members: {
            select: { id: true, name: true, email: true, role: true, jobTitle: true },
            orderBy: { name: "asc" },
          },
          _count: { select: { projects: true, quotes: true, invoices: true, printOrders: true } },
        },
      },
      companyProfile: {
        include: {
          owner: { select: { name: true, email: true } },
          members: {
            select: { id: true, name: true, email: true, role: true, jobTitle: true },
            orderBy: { name: "asc" },
          },
          _count: { select: { projects: true, quotes: true, invoices: true, printOrders: true } },
        },
      },
    },
  });

  const company = user?.ownedCompany ?? user?.companyProfile;

  if (!company) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-500 mt-1">Manage your organization settings and team.</p>
        </div>

        <div className="rounded-2xl border bg-white p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <Building2 className="h-8 w-8 text-red-400" />
          </div>
          <h2 className="mt-5 text-xl font-bold text-gray-900">No company profile found</h2>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Your account is set up as a company user but no company profile is linked yet.
            Contact support to set up your organization.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user?.ownedCompany?.id === company.id;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Company Profile</h1>
        <p className="text-gray-500 mt-1">
          {isOwner ? "Manage your organization and team members." : "View your organization details."}
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <div className="rounded-2xl border bg-white overflow-hidden">
            <div className="bg-linear-to-r from-red-500 to-red-400 px-6 py-6 text-white">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20">
                  <Building2 className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{company.name}</h2>
                  <p className="text-sm text-red-50 mt-0.5">
                    {company.industry || "Company account"} · Member since {formatDate(company.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 p-6">
              {company.email && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <p className="font-semibold text-gray-900 break-all">{company.email}</p>
                </div>
              )}
              {company.phone && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm font-medium">Phone</span>
                  </div>
                  <p className="font-semibold text-gray-900">{company.phone}</p>
                </div>
              )}
              {company.website && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm font-medium">Website</span>
                  </div>
                  <a
                    href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-red-500 hover:underline break-all"
                  >
                    {company.website}
                  </a>
                </div>
              )}
              {company.taxId && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">Tax ID</p>
                  <p className="font-semibold text-gray-900">{company.taxId}</p>
                </div>
              )}
              {company.billingAddress && (
                <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">Billing Address</span>
                  </div>
                  <p className="font-semibold text-gray-900">{company.billingAddress}</p>
                </div>
              )}
              {company.shippingAddress && (
                <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">Shipping Address</span>
                  </div>
                  <p className="font-semibold text-gray-900">{company.shippingAddress}</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-red-400" />
              <h2 className="font-bold text-lg">Team Members</h2>
              <span className="text-sm text-gray-400">({company.members.length})</span>
            </div>

            {company.members.length === 0 ? (
              <p className="text-sm text-gray-500">No team members yet.</p>
            ) : (
              <ul className="divide-y">
                {company.members.map((member) => (
                  <li key={member.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-sm text-gray-900">
                        {member.name}
                        {member.id === userId && (
                          <span className="ml-2 text-xs text-red-500 font-semibold">(You)</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">{member.email}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex rounded-full bg-gray-50 border px-2 py-0.5 text-xs font-medium text-gray-600">
                        {member.role.replace(/_/g, " ")}
                      </span>
                      {member.jobTitle && (
                        <p className="text-xs text-gray-400 mt-1">{member.jobTitle}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="font-bold mb-4">Activity Summary</h2>
            <div className="space-y-3">
              {[
                { label: "Projects", value: company._count.projects, href: "/dashboard/projects" },
                { label: "Quotes", value: company._count.quotes, href: "/dashboard/quotes" },
                { label: "Invoices", value: company._count.invoices, href: "/dashboard/invoices" },
                { label: "Print Orders", value: company._count.printOrders, href: "/dashboard/print-orders" },
              ].map(({ label, value, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 hover:bg-red-50 transition-colors"
                >
                  <span className="text-sm text-gray-600">{label}</span>
                  <span className="text-base font-bold text-gray-900">{value}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="font-bold mb-2">Your Role</h2>
            <p className="text-sm text-gray-500">{user?.jobTitle || user?.role.replace(/_/g, " ")}</p>
            {user?.department && (
              <p className="text-xs text-gray-400 mt-1">{user.department}</p>
            )}
            <Link
              href="/profile"
              className="mt-4 inline-flex text-sm text-red-500 font-medium hover:underline"
            >
              Edit your profile →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
