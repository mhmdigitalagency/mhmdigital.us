"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createPrintOrderRequest } from "@/actions/quote";
import { PRINT_SERVICES } from "@/lib/constants/services-data";

type PrintOrderFormProps = {
  defaultProduct?: string;
  isBulk?: boolean;
};

export function PrintOrderForm({ defaultProduct = "", isBulk = false }: PrintOrderFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const defaultProductName =
    PRINT_SERVICES.find((p) => p.slug === defaultProduct)?.name || defaultProduct;

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
      <div>
        <label htmlFor="productName" className="block text-sm font-medium mb-1.5">
          Product *
        </label>
        <input
          id="productName"
          name="productName"
          required
          defaultValue={defaultProductName}
          placeholder="e.g. Business Cards"
          className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium mb-1.5">
            Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min={1}
            defaultValue={100}
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
          />
        </div>
        <div>
          <label htmlFor="size" className="block text-sm font-medium mb-1.5">
            Size
          </label>
          <input
            id="size"
            name="size"
            placeholder="e.g. 3.5 x 2 in"
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
          />
        </div>
        <div>
          <label htmlFor="material" className="block text-sm font-medium mb-1.5">
            Material
          </label>
          <input
            id="material"
            name="material"
            placeholder="e.g. 16pt cardstock"
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
          />
        </div>
        <div>
          <label htmlFor="finishing" className="block text-sm font-medium mb-1.5">
            Finishing
          </label>
          <input
            id="finishing"
            name="finishing"
            placeholder="e.g. Matte, UV coating"
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-1.5">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Special instructions, delivery preferences, etc."
          className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-red-500 px-8 py-3.5 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-70 transition-colors"
      >
        {isPending
          ? "Submitting..."
          : isBulk
            ? "Request Bulk Quote"
            : "Create Print Order"}
      </button>
    </form>
  );
}
