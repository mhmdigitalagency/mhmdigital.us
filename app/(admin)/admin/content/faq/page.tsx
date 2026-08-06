import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { FaqManager } from "./FaqManager";

export default async function AdminFaqPage() {
  await requireStaff();

  const items = await prisma.faqItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { question: "asc" }],
  });

  return (
    <div>
      <Link href="/admin/content" className="inline-flex items-center gap-2 text-sm text-brand-blue font-medium mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to CMS
      </Link>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">FAQ</h1>
      <p className="text-gray-500 mb-8">Manage questions shown on the public FAQ page.</p>
      <FaqManager items={items} />
    </div>
  );
}
