"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createPrintOrderRequest } from "@/actions/quote";
import {
  PRINT_FINISHING_OPTIONS,
  PRINT_MATERIAL_OPTIONS,
  PRINT_QUANTITY_OPTIONS,
  PRINT_SIZE_OPTIONS,
  PRINT_TURNAROUND_OPTIONS,
} from "@/lib/print-order-options";

function formatPrintPrice(cents: number | null | undefined): string | null {
  if (cents == null || cents <= 0) return null;
  return `$${(cents / 100).toFixed(2)}`;
}

type LockedProduct = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number | null;
};

type PrintOrderFormProps = {
  product: LockedProduct;
  isBulk?: boolean;
};

export function PrintOrderForm({ product, isBulk = false }: PrintOrderFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const priceLabel = formatPrintPrice(product.basePrice);

  const handleSubmit = (formData: FormData) => {
    formData.set("productSlug", product.slug);
    if (isBulk) formData.set("isBulk", "true");

    startTransition(async () => {
      const result = await createPrintOrderRequest(formData);
      if (result.success) {
        toast.success(result.message);
        const params = new URLSearchParams({ submitted: "1" });
        if (result.orderNumber) params.set("orderNumber", result.orderNumber);
        router.push(`/dashboard/print-orders?${params.toString()}`);
      } else {
        toast.error(result.error ?? "Failed to submit print order.");
      }
    });
  };

  return (
    <form action={handleSubmit} encType="multipart/form-data" className="space-y-6">
      <div className="rounded-xl border bg-gray-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Print product</p>
        <p className="font-bold text-gray-900">{product.name}</p>
        {priceLabel && <p className="text-sm text-brand font-semibold mt-1">From {priceLabel}</p>}
        <p className="text-sm text-gray-500 mt-2">{product.description}</p>
        <p className="text-xs text-gray-400 mt-2">Product details are set by MHM Digital and cannot be edited.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium mb-1.5">Quantity *</label>
          <select
            id="quantity"
            name="quantity"
            required
            defaultValue="100"
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          >
            {PRINT_QUANTITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="size" className="block text-sm font-medium mb-1.5">Size *</label>
          <select
            id="size"
            name="size"
            required
            defaultValue="standard"
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          >
            {PRINT_SIZE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="material" className="block text-sm font-medium mb-1.5">Material *</label>
          <select
            id="material"
            name="material"
            required
            defaultValue="16pt-matte"
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          >
            {PRINT_MATERIAL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="finishing" className="block text-sm font-medium mb-1.5">Finishing *</label>
          <select
            id="finishing"
            name="finishing"
            required
            defaultValue="none"
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          >
            {PRINT_FINISHING_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="turnaround" className="block text-sm font-medium mb-1.5">Turnaround *</label>
          <select
            id="turnaround"
            name="turnaround"
            required
            defaultValue="standard"
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          >
            {PRINT_TURNAROUND_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="artwork" className="block text-sm font-medium mb-1.5">
          Artwork file {isBulk ? "(optional)" : "*"}
        </label>
        <input
          id="artwork"
          name="artwork"
          type="file"
          required={!isBulk}
          accept=".pdf,.png,.jpg,.jpeg,.ai,.eps,.svg,.zip"
          className="w-full rounded-xl border px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-brand/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand"
        />
        <p className="mt-1.5 text-xs text-gray-500">
          Max 10 MB. PDF, PNG, JPG, AI, EPS, SVG, or ZIP.
        </p>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-brand px-8 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Submitting..." : isBulk ? "Submit Bulk Quote Request" : "Submit Print Order"}
      </button>
    </form>
  );
}
