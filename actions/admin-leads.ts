"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { LeadStatus } from "@/app/generated/prisma/client";

export type LeadActionState = {
  success: boolean;
  message: string;
} | null;

const updateLeadSchema = z.object({
  status: z.nativeEnum(LeadStatus),
  notes: z.string().max(5000).optional(),
});

export async function updateLead(
  _prev: LeadActionState,
  formData: FormData
): Promise<LeadActionState> {
  await requireStaff();

  const id = formData.get("id")?.toString();
  if (!id) return { success: false, message: "Lead ID required." };

  const parsed = updateLeadSchema.safeParse({
    status: formData.get("status"),
    notes: formData.get("notes")?.toString() || undefined,
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid lead data." };
  }

  try {
    await prisma.lead.update({
      where: { id },
      data: parsed.data,
    });
    revalidatePath("/admin/leads");
    revalidatePath(`/admin/leads/${id}`);
    return { success: true, message: "Lead updated." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update lead." };
  }
}

export async function createLead(
  _prev: LeadActionState,
  formData: FormData
): Promise<LeadActionState> {
  await requireStaff();

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  if (!name || !email) {
    return { success: false, message: "Name and email are required." };
  }

  try {
    await prisma.lead.create({
      data: {
        name,
        email,
        phone: formData.get("phone")?.toString().trim() || null,
        company: formData.get("company")?.toString().trim() || null,
        source: formData.get("source")?.toString().trim() || "Manual",
        service: formData.get("service")?.toString().trim() || null,
        message: formData.get("message")?.toString().trim() || null,
        status: LeadStatus.NEW,
      },
    });
    revalidatePath("/admin/leads");
    return { success: true, message: "Lead created." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create lead." };
  }
}
