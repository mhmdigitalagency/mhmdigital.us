import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPrintProductBySlug, getPrintProductSlugs, formatPrintPrice } from "@/lib/print-products";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPrintProductSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPrintProductBySlug(slug);
  if (!product) {
    return buildPageMetadata({
      title: "Print Product",
      description: "Professional printing services in Seattle from MHM Digital.",
      path: "/print-services",
    });
  }

  const priceLabel = formatPrintPrice(product.basePrice);

  return buildPageMetadata({
    title: `${product.name} Printing in Seattle`,
    description: `${product.description}${priceLabel ? ` Starting at ${priceLabel}.` : ""} Order online with proof approval and fast Seattle turnaround.`,
    path: `/print-services/${slug}`,
    ogImage: product.image,
    keywords: [
      `${product.name} Seattle`,
      `${product.name} printing`,
      "commercial printing Seattle",
      "MHM Digital print",
    ],
  });
}

export default async function PrintProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getPrintProductBySlug(slug);
  if (!product) notFound();

  const priceLabel = formatPrintPrice(product.basePrice);

  return (
    <div className="pb-20">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Print Services", path: "/print-services" },
            { name: product.name, path: `/print-services/${slug}` },
          ]),
          serviceJsonLd({
            name: `${product.name} Printing`,
            description: product.description,
            path: `/print-services/${slug}`,
            image: product.image,
          }),
        ]}
      />
      <section className="px-4 py-16 xl:px-14 xxl:px-40">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <Link href="/print-services" className="hover:text-brand">Print Services</Link>
            <span className="mx-2">/</span>
            <span>{product.name}</span>
          </nav>

          <div className="relative overflow-hidden rounded-3xl aspect-21/9 mb-8 bg-brand/5">
            <Image
              src={product.image}
              alt={`${product.name} printing example`}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-brand-navy">{product.name}</h1>
          {priceLabel && (
            <p className="text-xl font-bold text-brand mb-4">Starting at {priceLabel}</p>
          )}
          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          <div className="rounded-2xl border p-6 mb-8 bg-gray-50">
            <h2 className="font-bold mb-3">Available Options</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Custom quantities — small runs to bulk orders</li>
              <li>• Multiple sizes, materials, and finishing options</li>
              <li>• Digital proof approval before production</li>
              <li>• Shipping, delivery, or local pickup in Seattle</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/dashboard/print-orders/new?product=${slug}`}
              className="bg-brand text-white rounded-full px-8 py-3.5 font-semibold hover:opacity-90"
            >
              Order {product.name}
            </Link>
            <Link href="/quote?type=print-bulk" className="border border-gray-200 rounded-full px-8 py-3.5 font-semibold hover:bg-gray-50">
              Request Bulk Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
