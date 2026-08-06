"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";

export type PrintProductActionState = {
  success: boolean;
  message: string;
} | null;

const productSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().min(1).max(2000),
  category: z.string().min(1).max(100),
  image: z.string().max(500).optional(),
  basePriceDollars: z.string().optional(),
  isActive: z.boolean().default(true),
  isBulk: z.boolean().default(false),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

function parseCheckbox(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

function parsePriceToCents(value: FormDataEntryValue | null): number | null {
  const str = value?.toString().trim();
  if (!str) return null;
  const dollars = parseFloat(str);
  if (Number.isNaN(dollars) || dollars < 0) return null;
  return Math.round(dollars * 100);
}

function revalidatePrintPaths() {
  revalidatePath("/admin/print/products");
  revalidatePath("/admin/print");
  revalidatePath("/print-services");
}

export async function createPrintProduct(
  _prev: PrintProductActionState,
  formData: FormData
): Promise<PrintProductActionState> {
  await requireStaff();

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    category: formData.get("category"),
    image: formData.get("image") || undefined,
    basePriceDollars: formData.get("basePriceDollars")?.toString(),
    isActive: parseCheckbox(formData.get("isActive")),
    isBulk: parseCheckbox(formData.get("isBulk")),
    sortOrder: formData.get("sortOrder") || 0,
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid product data. Check slug (lowercase, hyphens only)." };
  }

  const { basePriceDollars, image, ...rest } = parsed.data;

  try {
    await prisma.printProduct.create({
      data: {
        ...rest,
        image: image || null,
        basePrice: parsePriceToCents(basePriceDollars ?? null),
      },
    });
    revalidatePrintPaths();
    return { success: true, message: "Print product created." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create product. Slug may already exist." };
  }
}

export async function updatePrintProduct(
  _prev: PrintProductActionState,
  formData: FormData
): Promise<PrintProductActionState> {
  await requireStaff();

  const id = formData.get("id")?.toString();
  if (!id) return { success: false, message: "Product ID required." };

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    category: formData.get("category"),
    image: formData.get("image") || undefined,
    basePriceDollars: formData.get("basePriceDollars")?.toString(),
    isActive: parseCheckbox(formData.get("isActive")),
    isBulk: parseCheckbox(formData.get("isBulk")),
    sortOrder: formData.get("sortOrder") || 0,
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid product data." };
  }

  const { basePriceDollars, image, ...rest } = parsed.data;

  try {
    await prisma.printProduct.update({
      where: { id },
      data: {
        ...rest,
        image: image || null,
        basePrice: parsePriceToCents(basePriceDollars ?? null),
      },
    });
    revalidatePrintPaths();
    return { success: true, message: "Print product updated." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update product." };
  }
}

export async function deletePrintProduct(id: string): Promise<PrintProductActionState> {
  await requireStaff();

  try {
    await prisma.printProduct.delete({ where: { id } });
    revalidatePrintPaths();
    return { success: true, message: "Print product deleted." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete product." };
  }
}
