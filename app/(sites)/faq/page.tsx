import { getActiveFaqItems } from "@/actions/admin-cms";
import FaqList from "@/components/Pages_components/FAQ/FaqList";
import FAQ from "@/components/Pages_components/FAQ/FAQS";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { faqPageJsonLd } from "@/lib/seo/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about MHM Digital services, Seattle printing, web design, digital marketing, quotes, payments, and project timelines.",
  path: "/faq",
  keywords: ["MHM Digital FAQ", "Seattle printing FAQ", "web design questions"],
});

export default async function FaqPage() {
  const items = await getActiveFaqItems();

  return (
    <div>
      {items.length > 0 && (
        <JsonLd
          data={faqPageJsonLd(
            items.map((item) => ({
              question: item.question,
              answer: item.answer,
            }))
          )}
        />
      )}
      {items.length > 0 ? <FaqList items={items} /> : <FAQ />}
    </div>
  );
}
