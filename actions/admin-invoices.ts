"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { InvoiceStatus } from "@/app/generated/prisma/client";

export type AdminInvoiceActionState = {
  success: boolean;
  message: string;
} | null;

const createInvoiceSchema = z.object({
  customerEmail: z.string().email(),
  description: z.string().min(1).max(500),
  unitPriceDollars: z.string().min(1),
  quantity: z.coerce.number().int().min(1).default(1),
  notes: z.string().max(5000).optional(),
  status: z.nativeEnum(InvoiceStatus).default(InvoiceStatus.DRAFT),
  dueDate: z.string().optional(),
});

function dollarsToCents(value: string): number {
  const dollars = parseFloat(value);
  if (Number.isNaN(dollars) || dollars < 0) return 0;
  return Math.round(dollars * 100);
}

function parseDate(value: string | undefined) {
  if (!value?.trim()) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function createAdminInvoice(
  _prev: AdminInvoiceActionState,
  formData: FormData
): Promise<AdminInvoiceActionState> {
  await requireStaff();

  const parsed = createInvoiceSchema.safeParse({
    customerEmail: formData.get("customerEmail"),
    description: formData.get("description"),
    unitPriceDollars: formData.get("unitPriceDollars")?.toString(),
    quantity: formData.get("quantity") || 1,
    notes: formData.get("notes")?.toString() || undefined,
    status: formData.get("status") || InvoiceStatus.DRAFT,
    dueDate: formData.get("dueDate")?.toString() || undefined,
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid invoice data. Check customer email and pricing." };
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.customerEmail } });
  if (!user) {
    return { success: false, message: "No customer found with that email. They must register first." };
  }

  const unitPrice = dollarsToCents(parsed.data.unitPriceDollars);
  const totalPrice = unitPrice * parsed.data.quantity;
  const invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`;

  try {
    await prisma.invoice.create({
      data: {
        invoiceNumber,
        userId: user.id,
        status: parsed.data.status,
        subtotal: totalPrice,
        total: totalPrice,
        notes: parsed.data.notes || null,
        dueDate: parseDate(parsed.data.dueDate),
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
    revalidatePath("/admin/invoices");
    return { success: true, message: `Invoice ${invoiceNumber} created for ${user.name}.` };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create invoice." };
  }
}
