"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { ProjectStatus } from "@/app/generated/prisma/client";

export type AdminProjectActionState = {
  success: boolean;
  message: string;
} | null;

const createProjectSchema = z.object({
  customerEmail: z.string().email(),
  title: z.string().min(2).max(200),
  description: z.string().max(5000).optional(),
  status: z.nativeEnum(ProjectStatus).default(ProjectStatus.DRAFT),
  dueDate: z.string().optional(),
});

function parseDate(value: string | undefined) {
  if (!value?.trim()) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function createAdminProject(
  _prev: AdminProjectActionState,
  formData: FormData
): Promise<AdminProjectActionState> {
  await requireStaff();

  const parsed = createProjectSchema.safeParse({
    customerEmail: formData.get("customerEmail"),
    title: formData.get("title"),
    description: formData.get("description")?.toString() || undefined,
    status: formData.get("status") || ProjectStatus.DRAFT,
    dueDate: formData.get("dueDate")?.toString() || undefined,
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid project data. Check required fields." };
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.customerEmail } });
  if (!user) {
    return { success: false, message: "No customer found with that email. They must register first." };
  }

  try {
    await prisma.project.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description || null,
        status: parsed.data.status,
        userId: user.id,
        dueDate: parseDate(parsed.data.dueDate),
      },
    });
    revalidatePath("/admin/projects");
    return { success: true, message: `Project "${parsed.data.title}" created for ${user.name}.` };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create project." };
  }
}
