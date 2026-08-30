import { withDatabase } from "@/lib/db-safe";
import { prisma } from "@/lib/prisma";
import { PromotionalPopupClient } from "@/components/PromotionalPopupClient";

export async function PromotionalPopup() {
  const settings = await withDatabase(
    () => prisma.popupSettings.findFirst(),
    null
  );

  if (!settings?.enabled) return null;

  return <PromotionalPopupClient settings={settings} />;
}
