import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { TestimonialsManager } from "./TestimonialsManager";
import { ArrowLeft } from "lucide-react";

export default async function AdminTestimonialsPage() {
  await requireStaff();
  const items = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <Link href="/admin/content" className="inline-flex items-center gap-2 text-sm text-brand-blue font-medium mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Content CMS
      </Link>
      <h1 className="text-2xl font-bold mb-2">Testimonials</h1>
      <p className="text-gray-500 mb-8">Customer reviews on the homepage.</p>
      <TestimonialsManager items={items} />
    </div>
  );
}
