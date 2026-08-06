"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { PrintOrderStatus } from "@/app/generated/prisma/client";

export type PrintOrderActionState = {
  success: boolean;
  message: string;
} | null;

const updateSchema = z.object({
  status: z.nativeEnum(PrintOrderStatus),
  totalDollars: z.string().optional(),
  trackingNumber: z.string().max(200).optional(),
  notes: z.string().max(5000).optional(),
});

function parsePriceToCents(value: FormDataEntryValue | null): number | undefined {
  const str = value?.toString().trim();
  if (!str) return undefined;
  const dollars = parseFloat(str);
  if (Number.isNaN(dollars) || dollars < 0) return undefined;
  return Math.round(dollars * 100);
}

export async function updatePrintOrder(
  _prev: PrintOrderActionState,
  formData: FormData
): Promise<PrintOrderActionState> {
  await requireStaff();

  const id = formData.get("id")?.toString();
  if (!id) return { success: false, message: "Order ID required." };

  const parsed = updateSchema.safeParse({
    status: formData.get("status"),
    totalDollars: formData.get("totalDollars")?.toString(),
    trackingNumber: formData.get("trackingNumber")?.toString(),
    notes: formData.get("notes")?.toString(),
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid order data." };
  }

  const totalCents = parsePriceToCents(formData.get("totalDollars"));

  try {
    await prisma.printOrder.update({
      where: { id },
      data: {
        status: parsed.data.status,
        trackingNumber: parsed.data.trackingNumber || null,
        notes: parsed.data.notes || null,
        ...(totalCents !== undefined ? { total: totalCents, subtotal: totalCents } : {}),
      },
    });
    revalidatePath("/admin/print");
    revalidatePath(`/admin/print/${id}`);
    return { success: true, message: "Print order updated." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update print order." };
  }
}
