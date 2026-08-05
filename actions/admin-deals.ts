"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";

export type DealActionState = {
  success: boolean;
  message: string;
} | null;

const dealSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  badgeText: z.string().max(50).optional(),
  discountLabel: z.string().max(100).optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  buttonText: z.string().min(1).max(100).default("Claim Deal"),
  buttonUrl: z.string().min(1).max(500).default("/quote"),
  category: z.string().max(100).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isActive: z.boolean().default(true),
  showOnHome: z.boolean().default(true),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

function parseCheckbox(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

function parseDate(value: FormDataEntryValue | null) {
  const str = value?.toString().trim();
  if (!str) return null;
  const date = new Date(str);
  return Number.isNaN(date.getTime()) ? null : date;
}

function revalidateDealPaths() {
  revalidatePath("/admin/deals");
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/print-services");
}

export async function createDeal(
  _prevState: DealActionState,
  formData: FormData
): Promise<DealActionState> {
  await requireStaff();

  const parsed = dealSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    badgeText: formData.get("badgeText") || undefined,
    discountLabel: formData.get("discountLabel") || undefined,
    imageUrl: formData.get("imageUrl") || undefined,
    buttonText: formData.get("buttonText") || "Claim Deal",
    buttonUrl: formData.get("buttonUrl") || "/quote",
    category: formData.get("category") || undefined,
    startDate: formData.get("startDate") || undefined,
    endDate: formData.get("endDate") || undefined,
    isActive: parseCheckbox(formData.get("isActive")),
    showOnHome: parseCheckbox(formData.get("showOnHome")),
    sortOrder: formData.get("sortOrder") || 0,
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid deal data. Check required fields." };
  }

  const { startDate, endDate, ...rest } = parsed.data;

  try {
    await prisma.deal.create({
      data: {
        ...rest,
        imageUrl: rest.imageUrl || null,
        description: rest.description || null,
        badgeText: rest.badgeText || null,
        discountLabel: rest.discountLabel || null,
        category: rest.category || null,
        startDate: parseDate(startDate ?? null),
        endDate: parseDate(endDate ?? null),
      },
    });
    revalidateDealPaths();
    return { success: true, message: "Deal created successfully." };
  } catch (error) {
    console.error("Failed to create deal:", error);
    return { success: false, message: "Failed to create deal." };
  }
}

export async function updateDeal(
  _prevState: DealActionState,
  formData: FormData
): Promise<DealActionState> {
  await requireStaff();

  const id = formData.get("id")?.toString();
  if (!id) return { success: false, message: "Deal ID is required." };

  const parsed = dealSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    badgeText: formData.get("badgeText") || undefined,
    discountLabel: formData.get("discountLabel") || undefined,
    imageUrl: formData.get("imageUrl") || undefined,
    buttonText: formData.get("buttonText") || "Claim Deal",
    buttonUrl: formData.get("buttonUrl") || "/quote",
    category: formData.get("category") || undefined,
    startDate: formData.get("startDate") || undefined,
    endDate: formData.get("endDate") || undefined,
    isActive: parseCheckbox(formData.get("isActive")),
    showOnHome: parseCheckbox(formData.get("showOnHome")),
    sortOrder: formData.get("sortOrder") || 0,
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid deal data. Check required fields." };
  }

  const { startDate, endDate, ...rest } = parsed.data;

  try {
    await prisma.deal.update({
      where: { id },
      data: {
        ...rest,
        imageUrl: rest.imageUrl || null,
        description: rest.description || null,
        badgeText: rest.badgeText || null,
        discountLabel: rest.discountLabel || null,
        category: rest.category || null,
        startDate: parseDate(startDate ?? null),
        endDate: parseDate(endDate ?? null),
      },
    });
    revalidateDealPaths();
    return { success: true, message: "Deal updated successfully." };
  } catch (error) {
    console.error("Failed to update deal:", error);
    return { success: false, message: "Failed to update deal." };
  }
}

export async function deleteDeal(id: string): Promise<DealActionState> {
  await requireStaff();

  try {
    await prisma.deal.delete({ where: { id } });
    revalidateDealPaths();
    return { success: true, message: "Deal deleted successfully." };
  } catch (error) {
    console.error("Failed to delete deal:", error);
    return { success: false, message: "Failed to delete deal." };
  }
}

export async function getActiveHomeDeals() {
  const now = new Date();
  return prisma.deal.findMany({
    where: {
      isActive: true,
      showOnHome: true,
      AND: [
        { OR: [{ startDate: null }, { startDate: { lte: now } }] },
        { OR: [{ endDate: null }, { endDate: { gte: now } }] },
      ],
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}
