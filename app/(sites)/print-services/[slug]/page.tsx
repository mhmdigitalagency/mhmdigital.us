import Link from "next/link";
import { notFound } from "next/navigation";
import { PRINT_SERVICES } from "@/lib/constants/services-data";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PRINT_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRINT_SERVICES.find((s) => s.slug === slug);
  if (!product) return { title: "Print Product | MHM Digital" };
  return {
    title: `${product.name} | MHM Digital Print Services`,
    description: `Order ${product.name} from MHM Digital. Professional printing in Seattle with custom quantities and fast turnaround.`,
  };
}

export default async function PrintProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRINT_SERVICES.find((s) => s.slug === slug);
  if (!product) notFound();

  return (
    <div className="px-4 py-16 xl:px-14 xxl:px-40 max-w-3xl mx-auto">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/print-services" className="hover:text-red-500">Print Services</Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 leading-relaxed mb-8">
        Order professional {product.name.toLowerCase()} from MHM Digital. Choose your size, quantity,
        paper or material, finishing options, and turnaround time. Upload your artwork or request design support.
      </p>

      <div className="rounded-2xl border p-6 mb-8 bg-gray-50">
        <h2 className="font-bold mb-3">Available Options</h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Custom quantities — small runs to bulk orders</li>
          <li>• Multiple sizes, materials, and finishing options</li>
          <li>• Digital proof approval before production</li>
          <li>• Shipping, delivery, or local pickup</li>
          <li>• Design support available</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href={`/dashboard/print-orders/new?product=${slug}`}
          className="bg-red-500 text-white rounded-full px-8 py-3.5 font-semibold hover:bg-red-600"
        >
          Order {product.name}
        </Link>
        <Link
          href="/quote?type=print-bulk"
          className="border border-gray-200 rounded-full px-8 py-3.5 font-semibold hover:bg-gray-50"
        >
          Request Bulk Quote
        </Link>
      </div>
    </div>
  );
}
