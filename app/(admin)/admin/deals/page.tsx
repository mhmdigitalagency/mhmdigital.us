import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { DealsManager } from "./DealsManager";

export default async function AdminDealsPage() {
  await requireStaff();

  const deals = await prisma.deal.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Deals & Offers</h1>
        <p className="text-gray-500 mt-1">
          Manage promotional deals shown on the homepage and across the site.
        </p>
      </div>
      <DealsManager deals={deals} />
    </div>
  );
}
