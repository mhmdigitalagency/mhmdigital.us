"use client";

import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  Building2,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  User,
  Briefcase,
} from "lucide-react";
import { submitQuoteRequest } from "@/actions/quote";
import { MAIN_SERVICES } from "@/lib/constants/services-data";
import { OFFICE_ADDRESS_LINES, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants/site";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const budgets = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

const timelines = [
  "ASAP",
  "Within 2 weeks",
  "1–2 months",
  "3–6 months",
  "Flexible",
];

function QuoteForm() {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const defaultType = searchParams.get("type") || "";
  const defaultService = defaultType === "print-bulk" ? "Printing Services" : "";

  const handleSubmit = (formData: FormData) => {
    if (defaultType) formData.set("type", defaultType);
    startTransition(async () => {
      const result = await submitQuoteRequest(formData);
      if (result.success) toast.success(result.message);
      else toast.error(result.error);
    });
  };

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:border-red-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all";

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold mb-2">
            <User className="h-4 w-4 text-red-500" /> Full Name *
          </label>
          <input id="name" name="name" required placeholder="Jane Smith" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold mb-2">
            <Mail className="h-4 w-4 text-red-500" /> Email *
          </label>
          <input id="email" name="email" type="email" required placeholder="you@company.com" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold mb-2">
            <Phone className="h-4 w-4 text-red-500" /> Phone
          </label>
          <input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className="flex items-center gap-2 text-sm font-semibold mb-2">
            <Building2 className="h-4 w-4 text-red-500" /> Company
          </label>
          <input id="company" name="company" placeholder="Your business name" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="flex items-center gap-2 text-sm font-semibold mb-2">
          <Briefcase className="h-4 w-4 text-red-500" /> Service Needed *
        </label>
        <select id="service" name="service" required defaultValue={defaultService} className={inputClass}>
          <option value="">Select a service</option>
          {MAIN_SERVICES.map((s) => (
            <option key={s.slug} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="budget" className="flex items-center gap-2 text-sm font-semibold mb-2">
            <DollarSign className="h-4 w-4 text-red-500" /> Estimated Budget
          </label>
          <select id="budget" name="budget" className={inputClass}>
            <option value="">Select a range</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="flex items-center gap-2 text-sm font-semibold mb-2">
            <Calendar className="h-4 w-4 text-red-500" /> Desired Timeline
          </label>
          <select id="timeline" name="timeline" className={inputClass}>
            <option value="">Select timeline</option>
            {timelines.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-2">Project Details *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Describe your goals, deliverables, quantities (for print), references, and anything else we should know..."
          className={`${inputClass} resize-y min-h-36`}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-red-500 px-10 py-4 font-semibold text-white hover:bg-red-600 disabled:opacity-70 transition-colors"
      >
        {isPending ? "Submitting..." : "Submit Quote Request"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-red-50/40 to-white">
      <div className="px-4 py-16 xl:px-14 xxl:px-40">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-[1fr_1.15fr] gap-12 items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500 mb-3">Get a Quote</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Tell us about your project</h1>
            <p className="text-gray-600 leading-relaxed mb-8">
              Share your requirements and we&apos;ll respond with a detailed quote within one business day.
              For print bulk orders, include quantities, sizes, and materials if known.
            </p>

            <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Email</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-gray-900 hover:text-red-500">{CONTACT_EMAIL}</a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Phone</p>
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="font-semibold text-gray-900 hover:text-red-500">{CONTACT_PHONE}</a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Office</p>
                <p className="font-semibold text-gray-900">{OFFICE_ADDRESS_LINES[0]}</p>
                <p className="text-gray-600 text-sm mt-1">{OFFICE_ADDRESS_LINES[1]}</p>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Prefer a live conversation?{" "}
              <Link href="/appointment" className="font-semibold text-red-500 hover:underline">
                Schedule a consultation
              </Link>
            </p>
          </div>

          <div className="rounded-[32px] border border-gray-200 bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <h2 className="text-xl font-bold mb-6">Quote request form</h2>
            <Suspense fallback={<div className="text-gray-500">Loading form...</div>}>
              <QuoteForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
