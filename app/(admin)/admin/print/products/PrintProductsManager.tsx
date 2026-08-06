"use client";

import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import {
  createPrintProduct,
  deletePrintProduct,
  updatePrintProduct,
  type PrintProductActionState,
} from "@/actions/admin-print-products";
import { Trash2 } from "lucide-react";

type ProductRecord = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  image: string | null;
  basePrice: number | null;
  isActive: boolean;
  isBulk: boolean;
  sortOrder: number;
};

function ProductForm({ product }: { product?: ProductRecord }) {
  const action = product ? updatePrintProduct : createPrintProduct;
  const [state, formAction, pending] = useActionState<PrintProductActionState, FormData>(action, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border bg-gray-50 p-5">
      {product && <input type="hidden" name="id" value={product.id} />}
      <h3 className="font-bold text-gray-900">{product ? "Edit product" : "Add print product"}</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input name="name" required defaultValue={product?.name ?? ""} className="w-full rounded-xl border px-3 py-2 bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug *</label>
          <input name="slug" required pattern="[a-z0-9-]+" defaultValue={product?.slug ?? ""} className="w-full rounded-xl border px-3 py-2 bg-white" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea name="description" required rows={2} defaultValue={product?.description ?? ""} className="w-full rounded-xl border px-3 py-2 bg-white" />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input name="category" defaultValue={product?.category ?? "Standard"} className="w-full rounded-xl border px-3 py-2 bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Base price (USD)</label>
          <input name="basePriceDollars" type="number" step="0.01" min="0" placeholder="e.g. 49.99" defaultValue={product?.basePrice != null ? (product.basePrice / 100).toFixed(2) : ""} className="w-full rounded-xl border px-3 py-2 bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sort order</label>
          <input name="sortOrder" type="number" min="0" defaultValue={product?.sortOrder ?? 0} className="w-full rounded-xl border px-3 py-2 bg-white" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image path</label>
        <input name="image" placeholder="/images/print/business-cards.jpg" defaultValue={product?.image ?? ""} className="w-full rounded-xl border px-3 py-2 bg-white" />
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isActive" defaultChecked={product?.isActive ?? true} />
          Active
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isBulk" defaultChecked={product?.isBulk ?? false} />
          Bulk / quote-only
        </label>
      </div>

      <button type="submit" disabled={pending} className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
        {pending ? "Saving..." : product ? "Update product" : "Create product"}
      </button>
    </form>
  );
}

export function PrintProductsManager({ products }: { products: ProductRecord[] }) {
  const [, startTransition] = useTransition();

  return (
    <div className="space-y-8">
      <ProductForm />

      <div className="rounded-2xl border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b last:border-0 align-top">
                <td className="p-4">
                  <p className="font-semibold text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.slug}</p>
                </td>
                <td className="p-4">
                  {product.basePrice != null ? `$${(product.basePrice / 100).toFixed(2)}` : "Quote"}
                </td>
                <td className="p-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${product.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {product.isActive ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="space-y-4">
                    <ProductForm product={product} />
                    <button
                      type="button"
                      onClick={() =>
                        startTransition(async () => {
                          const result = await deletePrintProduct(product.id);
                          if (result?.success) toast.success(result.message ?? "Deleted");
                          else toast.error(result?.message ?? "Failed to delete");
                        })
                      }
                      className="inline-flex items-center gap-1 text-sm text-red-600 hover:underline"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
