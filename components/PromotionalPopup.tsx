import { prisma } from "@/lib/prisma";
import { PromotionalPopupClient } from "@/components/PromotionalPopupClient";

export async function PromotionalPopup() {
  const settings = await prisma.popupSettings.findFirst();

  if (!settings?.enabled) return null;

  return <PromotionalPopupClient settings={settings} />;
}
