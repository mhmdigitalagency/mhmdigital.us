import Link from "next/link";
import { UserPlus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default async function AdminCustomersPage() {
  await requireStaff();

  const customers = await prisma.user.findMany({
    where: { role: { in: ["USER", "COMPANY_ADMIN", "COMPANY_MEMBER"] } },
    orderBy: { createdAt: "desc" },
    include: { companyProfile: { select: { name: true } } },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-500 mt-1">Manage individual and company customer accounts.</p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        {customers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No customer accounts yet. Customers appear when they sign up on the site.</p>
            <Link
              href="/connexion"
              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              View sign-up page
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Company</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium text-gray-900">{customer.name}</td>
                    <td className="py-3 pr-4">{customer.email}</td>
                    <td className="py-3 pr-4 text-gray-600">
                      {customer.companyProfile?.name ?? customer.company ?? "—"}
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={customer.role} />
                    </td>
                    <td className="py-3 text-gray-500">
                      {new Date(customer.createdAt).toLocaleDateString()}
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
