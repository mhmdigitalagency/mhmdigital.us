"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";

export type PopupActionState = {
  success: boolean;
  message: string;
} | null;

function parseCheckbox(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

function parseOptionalString(value: FormDataEntryValue | null) {
  const str = value?.toString().trim();
  return str || null;
}

function parseOptionalDate(value: FormDataEntryValue | null) {
  const str = value?.toString().trim();
  if (!str) return null;
  const date = new Date(str);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function updatePopupSettings(
  _prevState: PopupActionState,
  formData: FormData
): Promise<PopupActionState> {
  await requireStaff();

  const data = {
    enabled: parseCheckbox(formData.get("enabled")),
    title: parseOptionalString(formData.get("title")),
    description: parseOptionalString(formData.get("description")),
    imageUrl: parseOptionalString(formData.get("imageUrl")),
    buttonText: parseOptionalString(formData.get("buttonText")),
    buttonUrl: parseOptionalString(formData.get("buttonUrl")),
    secondaryText: parseOptionalString(formData.get("secondaryText")),
    secondaryUrl: parseOptionalString(formData.get("secondaryUrl")),
    backgroundStyle: formData.get("backgroundStyle")?.toString() || "light",
    startDate: parseOptionalDate(formData.get("startDate")),
    endDate: parseOptionalDate(formData.get("endDate")),
    targetAccount: formData.get("targetAccount")?.toString() || "all",
    newVisitorsOnly: parseCheckbox(formData.get("newVisitorsOnly")),
    loggedInOnly: parseCheckbox(formData.get("loggedInOnly")),
    displayDelay: Number(formData.get("displayDelay")) || 3,
    showOnceSession: parseCheckbox(formData.get("showOnceSession")),
    showOnceUser: parseCheckbox(formData.get("showOnceUser")),
    showMobile: parseCheckbox(formData.get("showMobile")),
    showDesktop: parseCheckbox(formData.get("showDesktop")),
  };

  try {
    const existing = await prisma.popupSettings.findFirst();

    if (existing) {
      await prisma.popupSettings.update({
        where: { id: existing.id },
        data,
      });
    } else {
      await prisma.popupSettings.create({ data });
    }

    revalidatePath("/admin/popup");
    revalidatePath("/");

    return { success: true, message: "Popup settings saved successfully." };
  } catch (error) {
    console.error("Failed to update popup settings:", error);
    return { success: false, message: "Failed to save popup settings. Please try again." };
  }
}
