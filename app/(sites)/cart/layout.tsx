import { buildPrivatePageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPrivatePageMetadata("Shopping Cart");

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
