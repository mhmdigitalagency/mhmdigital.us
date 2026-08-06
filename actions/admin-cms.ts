"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";

export type CmsActionState = {
  success: boolean;
  message: string;
} | null;

const siteStatisticSchema = z.object({
  key: z.string().min(1).max(100),
  label: z.string().min(1).max(200),
  value: z.string().min(1).max(100),
  suffix: z.string().max(50).optional(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

const testimonialSchema = z.object({
  name: z.string().min(1).max(100),
  role: z.string().max(100).optional(),
  company: z.string().max(100).optional(),
  content: z.string().min(10).max(2000),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  image: z.string().url().optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

function parseCheckbox(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

function revalidateCmsPaths() {
  revalidatePath("/admin/content");
  revalidatePath("/");
}

export async function createSiteStatistic(
  _prevState: CmsActionState,
  formData: FormData
): Promise<CmsActionState> {
  await requireStaff();

  const parsed = siteStatisticSchema.safeParse({
    key: formData.get("key"),
    label: formData.get("label"),
    value: formData.get("value"),
    suffix: formData.get("suffix") || undefined,
    sortOrder: formData.get("sortOrder") || 0,
    isActive: parseCheckbox(formData.get("isActive")),
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid statistic data. Check all required fields." };
  }

  try {
    await prisma.siteStatistic.create({ data: parsed.data });
    revalidateCmsPaths();
    return { success: true, message: "Statistic created successfully." };
  } catch (error) {
    console.error("Failed to create site statistic:", error);
    return { success: false, message: "Failed to create statistic. Key may already exist." };
  }
}

export async function updateSiteStatistic(
  _prevState: CmsActionState,
  formData: FormData
): Promise<CmsActionState> {
  await requireStaff();

  const id = formData.get("id")?.toString();
  if (!id) return { success: false, message: "Statistic ID is required." };

  const parsed = siteStatisticSchema.safeParse({
    key: formData.get("key"),
    label: formData.get("label"),
    value: formData.get("value"),
    suffix: formData.get("suffix") || undefined,
    sortOrder: formData.get("sortOrder") || 0,
    isActive: parseCheckbox(formData.get("isActive")),
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid statistic data. Check all required fields." };
  }

  try {
    await prisma.siteStatistic.update({
      where: { id },
      data: parsed.data,
    });
    revalidateCmsPaths();
    return { success: true, message: "Statistic updated successfully." };
  } catch (error) {
    console.error("Failed to update site statistic:", error);
    return { success: false, message: "Failed to update statistic." };
  }
}

export async function deleteSiteStatistic(id: string): Promise<CmsActionState> {
  await requireStaff();

  try {
    await prisma.siteStatistic.delete({ where: { id } });
    revalidateCmsPaths();
    return { success: true, message: "Statistic deleted successfully." };
  } catch (error) {
    console.error("Failed to delete site statistic:", error);
    return { success: false, message: "Failed to delete statistic." };
  }
}

export async function createTestimonial(
  _prevState: CmsActionState,
  formData: FormData
): Promise<CmsActionState> {
  await requireStaff();

  const parsed = testimonialSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role") || undefined,
    company: formData.get("company") || undefined,
    content: formData.get("content"),
    rating: formData.get("rating") || 5,
    image: formData.get("image") || undefined,
    sortOrder: formData.get("sortOrder") || 0,
    isActive: parseCheckbox(formData.get("isActive")),
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid testimonial data. Check all required fields." };
  }

  const { image, ...rest } = parsed.data;

  try {
    await prisma.testimonial.create({
      data: {
        ...rest,
        image: image || null,
      },
    });
    revalidateCmsPaths();
    return { success: true, message: "Testimonial created successfully." };
  } catch (error) {
    console.error("Failed to create testimonial:", error);
    return { success: false, message: "Failed to create testimonial." };
  }
}

export async function updateTestimonial(
  _prevState: CmsActionState,
  formData: FormData
): Promise<CmsActionState> {
  await requireStaff();

  const id = formData.get("id")?.toString();
  if (!id) return { success: false, message: "Testimonial ID is required." };

  const parsed = testimonialSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role") || undefined,
    company: formData.get("company") || undefined,
    content: formData.get("content"),
    rating: formData.get("rating") || 5,
    image: formData.get("image") || undefined,
    sortOrder: formData.get("sortOrder") || 0,
    isActive: parseCheckbox(formData.get("isActive")),
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid testimonial data. Check all required fields." };
  }

  const { image, ...rest } = parsed.data;

  try {
    await prisma.testimonial.update({
      where: { id },
      data: {
        ...rest,
        image: image || null,
      },
    });
    revalidateCmsPaths();
    return { success: true, message: "Testimonial updated successfully." };
  } catch (error) {
    console.error("Failed to update testimonial:", error);
    return { success: false, message: "Failed to update testimonial." };
  }
}

export async function deleteTestimonial(id: string): Promise<CmsActionState> {
  await requireStaff();

  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidateCmsPaths();
    return { success: true, message: "Testimonial deleted successfully." };
  } catch (error) {
    console.error("Failed to delete testimonial:", error);
    return { success: false, message: "Failed to delete testimonial." };
  }
}

const faqSchema = z.object({
  question: z.string().min(5).max(500),
  answer: z.string().min(10).max(5000),
  category: z.string().min(1).max(100).default("general"),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export async function createFaqItem(
  _prevState: CmsActionState,
  formData: FormData
): Promise<CmsActionState> {
  await requireStaff();

  const parsed = faqSchema.safeParse({
    question: formData.get("question"),
    answer: formData.get("answer"),
    category: formData.get("category") || "general",
    sortOrder: formData.get("sortOrder") || 0,
    isActive: parseCheckbox(formData.get("isActive")),
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid FAQ data. Check question and answer." };
  }

  try {
    await prisma.faqItem.create({ data: parsed.data });
    revalidatePath("/admin/content/faq");
    revalidatePath("/faq");
    return { success: true, message: "FAQ item created." };
  } catch (error) {
    console.error("Failed to create FAQ:", error);
    return { success: false, message: "Failed to create FAQ item." };
  }
}

export async function updateFaqItem(
  _prevState: CmsActionState,
  formData: FormData
): Promise<CmsActionState> {
  await requireStaff();

  const id = formData.get("id")?.toString();
  if (!id) return { success: false, message: "FAQ ID required." };

  const parsed = faqSchema.safeParse({
    question: formData.get("question"),
    answer: formData.get("answer"),
    category: formData.get("category") || "general",
    sortOrder: formData.get("sortOrder") || 0,
    isActive: parseCheckbox(formData.get("isActive")),
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid FAQ data." };
  }

  try {
    await prisma.faqItem.update({ where: { id }, data: parsed.data });
    revalidatePath("/admin/content/faq");
    revalidatePath("/faq");
    return { success: true, message: "FAQ item updated." };
  } catch (error) {
    console.error("Failed to update FAQ:", error);
    return { success: false, message: "Failed to update FAQ item." };
  }
}

export async function deleteFaqItem(id: string): Promise<CmsActionState> {
  await requireStaff();

  try {
    await prisma.faqItem.delete({ where: { id } });
    revalidatePath("/admin/content/faq");
    revalidatePath("/faq");
    return { success: true, message: "FAQ item deleted." };
  } catch (error) {
    console.error("Failed to delete FAQ:", error);
    return { success: false, message: "Failed to delete FAQ item." };
  }
}

export async function getActiveFaqItems() {
  return prisma.faqItem.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { question: "asc" }],
  });
}
