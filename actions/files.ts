"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/auth-redirect";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_EXTENSIONS = new Set(["pdf", "png", "jpg", "jpeg", "ai", "eps", "svg", "zip"]);

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/postscript",
  "application/illustrator",
  "image/x-eps",
  "image/svg+xml",
  "application/zip",
  "application/x-zip-compressed",
]);

function getExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
}

export async function storeCustomerFile(
  userId: string,
  file: File,
  options: {
    category?: string;
    printOrderId?: string | null;
    projectId?: string | null;
    uploadedBy?: string;
  } = {}
): Promise<{ success: true; fileId: string } | { success: false; error: string }> {
  if (file.size === 0) {
    return { success: false, error: "Please select a file to upload." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: "File must be 10 MB or smaller." };
  }

  const extension = getExtension(file.name);
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return {
      success: false,
      error: "Allowed file types: PDF, PNG, JPG, AI, EPS, SVG, ZIP.",
    };
  }

  if (file.type && !ALLOWED_MIME_TYPES.has(file.type)) {
    return {
      success: false,
      error: "File type is not allowed. Use PDF, PNG, JPG, AI, EPS, SVG, or ZIP.",
    };
  }

  const VALID_CATEGORIES = [
    "REQUIREMENT",
    "BRAND_ASSET",
    "DESIGN",
    "PRINT_READY",
    "PROOF",
    "CONTRACT",
    "INVOICE",
    "DELIVERABLE",
    "OTHER",
  ] as const;

  const rawCategory = options.category || "PRINT_READY";
  const category = VALID_CATEGORIES.includes(rawCategory as (typeof VALID_CATEGORIES)[number])
    ? (rawCategory as (typeof VALID_CATEGORIES)[number])
    : "PRINT_READY";

  try {
    const record = await prisma.customerFile.create({
      data: {
        userId,
        name: file.name,
        originalName: file.name,
        mimeType: file.type || "application/octet-stream",
        size: file.size,
        url: "/api/files/pending",
        category,
        projectId: options.projectId ?? null,
        printOrderId: options.printOrderId ?? null,
        uploadedBy: options.uploadedBy ?? userId,
      },
    });

    await prisma.customerFile.update({
      where: { id: record.id },
      data: { url: `/api/files/${record.id}` },
    });

    return { success: true, fileId: record.id };
  } catch (error) {
    console.error("File upload error:", error);
    return { success: false, error: "Failed to upload file. Please try again." };
  }
}

export async function uploadFileAction(formData: FormData) {
  const session = await requireCustomer();
  const userId = session.user.id;

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: "Please select a file to upload." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: "File must be 10 MB or smaller." };
  }

  const extension = getExtension(file.name);
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return {
      success: false,
      error: "Allowed file types: PDF, PNG, JPG, AI, EPS, SVG, ZIP.",
    };
  }

  if (file.type && !ALLOWED_MIME_TYPES.has(file.type)) {
    return {
      success: false,
      error: "File type is not allowed. Use PDF, PNG, JPG, AI, EPS, SVG, or ZIP.",
    };
  }

  const VALID_CATEGORIES = [
    "REQUIREMENT",
    "BRAND_ASSET",
    "DESIGN",
    "PRINT_READY",
    "PROOF",
    "CONTRACT",
    "INVOICE",
    "DELIVERABLE",
    "OTHER",
  ] as const;

  const rawCategory = String(formData.get("category") || "OTHER");
  const category = VALID_CATEGORIES.includes(rawCategory as (typeof VALID_CATEGORIES)[number])
    ? (rawCategory as (typeof VALID_CATEGORIES)[number])
    : "OTHER";

  const projectId = String(formData.get("projectId") || "").trim() || null;
  const printOrderId = String(formData.get("printOrderId") || "").trim() || null;

  const result = await storeCustomerFile(userId, file, {
    category,
    projectId,
    printOrderId,
    uploadedBy: userId,
  });

  if (!result.success) {
    return result;
  }

  revalidatePath("/dashboard/files");

  return {
    success: true,
    message: "File uploaded successfully.",
    fileId: result.fileId,
  };
}
