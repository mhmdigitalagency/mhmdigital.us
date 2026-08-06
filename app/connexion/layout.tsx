import { buildPrivatePageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPrivatePageMetadata("Sign In");

export default function ConnexionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
