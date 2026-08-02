"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { submitQuoteRequest } from "@/actions/quote";
import { MAIN_SERVICES } from "@/lib/constants/services-data";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function QuoteForm() {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const defaultType = searchParams.get("type") || "";
  const defaultService = defaultType === "print-bulk" ? "Printing Services — Bulk Quote" : "";

  const handleSubmit = (formData: FormData) => {
    if (defaultType) formData.set("type", defaultType);
    startTransition(async () => {
      const result = await submitQuoteRequest(formData);
      if (result.success) toast.success(result.message);
      else toast.error(result.error);
    });
  };

  return (
    <form action={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">Full Name *</label>
          <input id="name" name="name" required className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email *</label>
          <input id="email" name="email" type="email" required className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1.5">Phone</label>
          <input id="phone" name="phone" type="tel" className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500" />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1.5">Company</label>
          <input id="company" name="company" className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500" />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium mb-1.5">Service Needed *</label>
        <select id="service" name="service" required defaultValue={defaultService} className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500">
          <option value="">Select a service</option>
          {MAIN_SERVICES.map((s) => (
            <option key={s.slug} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5">Project Details *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project, timeline, budget, and requirements..."
          className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto bg-red-500 text-white rounded-full px-10 py-4 font-semibold hover:bg-red-600 disabled:opacity-70 transition-colors"
      >
        {isPending ? "Submitting..." : "Submit Quote Request"}
      </button>
    </form>
  );
}

export default function QuotePage() {
  return (
    <div className="px-4 py-16 xl:px-14 xxl:px-40 max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-3">Request a Quote</h1>
      <p className="text-gray-600 mb-8">
        Tell us about your project and we&apos;ll provide a detailed quote within 1 business day.
      </p>
      <Suspense>
        <QuoteForm />
      </Suspense>
    </div>
  );
}
