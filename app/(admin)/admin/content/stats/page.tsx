import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { StatsManager } from "./StatsManager";
import { ArrowLeft } from "lucide-react";

export default async function AdminStatsPage() {
  await requireStaff();
  const stats = await prisma.siteStatistic.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <Link href="/admin/content" className="inline-flex items-center gap-2 text-sm text-brand-blue font-medium mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Content CMS
      </Link>
      <h1 className="text-2xl font-bold mb-2">Site Statistics</h1>
      <p className="text-gray-500 mb-8">Homepage trust section numbers.</p>
      <StatsManager stats={stats} />
    </div>
  );
}
