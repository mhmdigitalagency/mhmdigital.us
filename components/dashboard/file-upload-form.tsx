"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { uploadFileAction } from "@/actions/files";

export function FileUploadForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await uploadFileAction(formData);
      if (result.success) {
        toast.success(result.message);
        (document.getElementById("file-upload-form") as HTMLFormElement)?.reset();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <form id="file-upload-form" action={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="file" className="block text-sm font-medium mb-1.5">
          File *
        </label>
        <input
          id="file"
          name="file"
          type="file"
          required
          accept=".pdf,.png,.jpg,.jpeg,.ai,.eps,.svg,.zip"
          className="w-full rounded-xl border px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-red-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-red-600"
        />
        <p className="mt-1.5 text-xs text-gray-500">
          Max 10 MB. Allowed: PDF, PNG, JPG, AI, EPS, SVG, ZIP.
        </p>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1.5">
          Category
        </label>
        <select
          id="category"
          name="category"
          defaultValue="OTHER"
          className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
        >
          <option value="REQUIREMENT">Requirement</option>
          <option value="BRAND_ASSET">Brand Asset</option>
          <option value="DESIGN">Design</option>
          <option value="PRINT_READY">Print Ready</option>
          <option value="PROOF">Proof</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-70 transition-colors"
      >
        {isPending ? "Uploading..." : "Upload File"}
      </button>
    </form>
  );
}
