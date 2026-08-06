import { getActiveFaqItems } from "@/actions/admin-cms";
import FaqList from "@/components/Pages_components/FAQ/FaqList";
import FAQ from "@/components/Pages_components/FAQ/FAQS";

export default async function FaqPage() {
  const items = await getActiveFaqItems();
  return <div>{items.length > 0 ? <FaqList items={items} /> : <FAQ />}</div>;
}
