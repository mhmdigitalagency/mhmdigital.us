import Link from "next/link";
import { requireStaff } from "@/lib/auth-redirect";
import { BRAND } from "@/lib/constants/brand";

export default async function AdminSettingsPage() {
  await requireStaff();

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-500 mb-8">Site configuration and brand reference.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="font-bold text-lg mb-4">Brand colors</h2>
          <ul className="space-y-3">
            {[
              { name: "Primary red", hex: BRAND.red },
              { name: "Accent blue", hex: BRAND.blue },
              { name: "Navy", hex: BRAND.navy },
            ].map(({ name, hex }) => (
              <li key={hex} className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-lg border" style={{ backgroundColor: hex }} />
                <div>
                  <p className="font-medium text-sm">{name}</p>
                  <p className="text-xs text-gray-500 font-mono">{hex}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="font-bold text-lg mb-4">Quick links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/admin/deals" className="text-brand-blue font-medium hover:underline">Manage deals</Link></li>
            <li><Link href="/admin/print/products" className="text-brand-blue font-medium hover:underline">Print products & pricing</Link></li>
            <li><Link href="/admin/popup" className="text-brand-blue font-medium hover:underline">Popup settings</Link></li>
            <li><Link href="/admin/content" className="text-brand-blue font-medium hover:underline">Content CMS</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
