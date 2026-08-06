import { buildPrivatePageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPrivatePageMetadata("Checkout");

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
