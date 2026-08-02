import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { PopupSettingsForm } from "./PopupSettingsForm";

const DEFAULT_SETTINGS = {
  id: "new",
  enabled: false,
  title: null,
  description: null,
  imageUrl: null,
  buttonText: null,
  buttonUrl: null,
  secondaryText: null,
  secondaryUrl: null,
  backgroundStyle: "light",
  startDate: null,
  endDate: null,
  targetAccount: "all",
  newVisitorsOnly: false,
  loggedInOnly: false,
  displayDelay: 3,
  showOnceSession: true,
  showOnceUser: true,
  showMobile: true,
  showDesktop: true,
};

export default async function AdminPopupPage() {
  await requireStaff();

  const settings = await prisma.popupSettings.findFirst();
  const formSettings = settings ?? DEFAULT_SETTINGS;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Promotional Popup</h1>
        <p className="text-gray-500 mt-1">
          Configure the site-wide promotional popup shown to visitors.
          {!settings && " Save settings to create your first popup configuration."}
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <PopupSettingsForm settings={formSettings} />
      </div>
    </div>
  );
}
