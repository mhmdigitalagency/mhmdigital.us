"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { QuoteStatus } from "@/app/generated/prisma/client";

export type AdminQuoteActionState = {
  success: boolean;
  message: string;
} | null;

const createQuoteSchema = z.object({
  customerEmail: z.string().email(),
  description: z.string().min(1).max(500),
  unitPriceDollars: z.string().min(1),
  quantity: z.coerce.number().int().min(1).default(1),
  notes: z.string().max(5000).optional(),
  status: z.nativeEnum(QuoteStatus).default(QuoteStatus.DRAFT),
});

function dollarsToCents(value: string): number {
  const dollars = parseFloat(value);
  if (Number.isNaN(dollars) || dollars < 0) return 0;
  return Math.round(dollars * 100);
}

export async function createAdminQuote(
  _prev: AdminQuoteActionState,
  formData: FormData
): Promise<AdminQuoteActionState> {
  await requireStaff();

  const parsed = createQuoteSchema.safeParse({
    customerEmail: formData.get("customerEmail"),
    description: formData.get("description"),
    unitPriceDollars: formData.get("unitPriceDollars")?.toString(),
    quantity: formData.get("quantity") || 1,
    notes: formData.get("notes")?.toString() || undefined,
    status: formData.get("status") || QuoteStatus.DRAFT,
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid quote data. Check customer email and pricing." };
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.customerEmail } });
  if (!user) {
    return { success: false, message: "No customer found with that email. They must register first." };
  }

  const unitPrice = dollarsToCents(parsed.data.unitPriceDollars);
  const totalPrice = unitPrice * parsed.data.quantity;
  const quoteNumber = `QT-${Date.now().toString(36).toUpperCase()}`;

  try {
    await prisma.quote.create({
      data: {
        quoteNumber,
        userId: user.id,
        status: parsed.data.status,
        subtotal: totalPrice,
        total: totalPrice,
        notes: parsed.data.notes || null,
        sentAt: parsed.data.status === QuoteStatus.SENT ? new Date() : null,
        lineItems: {
          create: {
            description: parsed.data.description,
            quantity: parsed.data.quantity,
            unitPrice,
            totalPrice,
          },
        },
      },
    });
    revalidatePath("/admin/quotes");
    return { success: true, message: `Quote ${quoteNumber} created for ${user.name}.` };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create quote." };
  }
}
