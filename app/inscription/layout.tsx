import { buildPrivatePageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPrivatePageMetadata("Create Account");

export default function InscriptionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
