"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createPrintOrderRequest } from "@/actions/quote";

type ProductOption = {
  id?: string;
  name: string;
  slug: string;
  basePrice: number | null;
};

type PrintOrderFormProps = {
  products: ProductOption[];
  defaultProduct?: string;
  isBulk?: boolean;
};

export function PrintOrderForm({ products, defaultProduct = "", isBulk = false }: PrintOrderFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const selected = products.find((p) => p.slug === defaultProduct) ?? products[0];

  const handleSubmit = (formData: FormData) => {
    if (isBulk) formData.set("isBulk", "true");
    startTransition(async () => {
      const result = await createPrintOrderRequest(formData);
      if (result.success) {
        toast.success(result.message);
        router.push("/dashboard/print-orders");
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-5">
      {products.length > 0 ? (
        <div>
          <label htmlFor="productSlug" className="block text-sm font-medium mb-1.5">
            Product *
          </label>
          <select
            id="productSlug"
            name="productSlug"
            defaultValue={selected?.slug ?? ""}
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          >
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
                {p.basePrice ? ` — from $${(p.basePrice / 100).toFixed(2)}` : ""}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div>
          <label htmlFor="productName" className="block text-sm font-medium mb-1.5">Product *</label>
          <input id="productName" name="productName" required className="w-full rounded-xl border px-4 py-3" />
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium mb-1.5">Quantity</label>
          <input id="quantity" name="quantity" type="number" min={1} defaultValue={100} className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
        </div>
        <div>
          <label htmlFor="size" className="block text-sm font-medium mb-1.5">Size</label>
          <input id="size" name="size" placeholder="e.g. 3.5 x 2 in" className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
        </div>
        <div>
          <label htmlFor="material" className="block text-sm font-medium mb-1.5">Material</label>
          <input id="material" name="material" placeholder="e.g. 16pt matte" className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
        </div>
        <div>
          <label htmlFor="finishing" className="block text-sm font-medium mb-1.5">Finishing</label>
          <input id="finishing" name="finishing" placeholder="e.g. UV coating" className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-1.5">Notes</label>
        <textarea id="notes" name="notes" rows={3} className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
      </div>

      <button type="submit" disabled={isPending} className="rounded-full bg-brand px-8 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50">
        {isPending ? "Submitting..." : isBulk ? "Request Quote" : "Submit Print Order"}
      </button>
    </form>
  );
}
