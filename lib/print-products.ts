import { prisma } from "@/lib/prisma";
import { PRINT_SERVICES } from "@/lib/constants/services-data";

export type PrintProductView = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  basePrice: number | null;
  isBulk: boolean;
};

const printImage = (slug: string) => `/images/print/${slug}.jpg`;

function fallbackFromConstants(): PrintProductView[] {
  return PRINT_SERVICES.map((item, index) => ({
    name: item.name,
    slug: item.slug,
    description: item.description,
    category: item.slug === "bulk-orders" ? "Bulk" : "Standard",
    image: item.image || printImage(item.slug),
    basePrice: item.slug === "bulk-orders" ? null : null,
    isBulk: item.slug === "bulk-orders",
  }));
}

export async function getActivePrintProducts(): Promise<PrintProductView[]> {
  const products = await prisma.printProduct.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  if (products.length === 0) {
    return fallbackFromConstants();
  }

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    category: p.category,
    image: p.image || printImage(p.slug),
    basePrice: p.basePrice,
    isBulk: p.isBulk,
  }));
}

export async function getPrintProductBySlug(slug: string): Promise<PrintProductView | null> {
  const product = await prisma.printProduct.findFirst({
    where: { slug, isActive: true },
  });

  if (product) {
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      category: product.category,
      image: product.image || printImage(product.slug),
      basePrice: product.basePrice,
      isBulk: product.isBulk,
    };
  }

  const fallback = PRINT_SERVICES.find((s) => s.slug === slug);
  if (!fallback) return null;

  return {
    name: fallback.name,
    slug: fallback.slug,
    description: fallback.description,
    category: fallback.slug === "bulk-orders" ? "Bulk" : "Standard",
    image: fallback.image || printImage(fallback.slug),
    basePrice: null,
    isBulk: fallback.slug === "bulk-orders",
  };
}

export function formatPrintPrice(cents: number | null | undefined): string | null {
  if (cents == null || cents <= 0) return null;
  return `$${(cents / 100).toFixed(2)}`;
}
