import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileUp,
  MessageSquare,
  PackageCheck,
  Receipt,
  Search,
} from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants/services-data";
import { OFFICE_ADDRESS_LINES } from "@/lib/constants/site";

const stepIcons = [MessageSquare, Receipt, FileUp, ClipboardList, CheckCircle2, PackageCheck];

const deliverables = [
  "Dedicated project manager from kickoff to delivery",
  "Transparent pricing with no hidden fees",
  "Secure file uploads and client dashboard access",
  "Proof approval before print or launch",
  "Post-delivery support and optimization options",
];

export default function ProcessPageContent() {
  return (
    <main>
      <section className="relative overflow-hidden bg-linear-to-b from-red-50/60 to-white px-4 pb-20 pt-32 xl:px-14 xxl:px-40">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-red-500">Our Process</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            From first conversation to final delivery
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Whether you need a website, marketing campaign, software platform, or commercial printing,
            we follow a clear six-step process designed to keep your project organized and on track.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-full bg-red-500 px-8 py-4 font-semibold text-white hover:bg-red-600 transition-colors"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 font-semibold text-gray-900 hover:border-red-200 transition-colors"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 xl:px-14 xxl:px-40">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = stepIcons[index] ?? Search;
              return (
                <article
                  key={step.step}
                  className="relative rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500 text-lg font-bold text-white">
                      {step.step}
                    </span>
                    <Icon className="h-6 w-6 text-red-400" aria-hidden />
                  </div>
                  <h2 className="text-xl font-bold mb-3">{step.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 xl:px-14 xxl:px-40 bg-gray-50">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500 mb-3">What to expect</p>
            <h2 className="text-3xl font-bold mb-6">A partnership built on clarity</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Every project starts with understanding your goals. We align on scope, timeline, and budget
              before work begins — then keep you informed at every milestone through your client dashboard.
            </p>
            <ul className="space-y-4">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-slate-950 text-white p-8 md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400 mb-3">Visit our office</p>
            <h3 className="text-2xl font-bold mb-4">{OFFICE_ADDRESS_LINES[0]}</h3>
            <p className="text-white/75 leading-relaxed mb-8">{OFFICE_ADDRESS_LINES[1]}</p>
            <div className="space-y-3 text-sm text-white/70">
              <p>Prefer to start remotely? Book a consultation or submit a quote request online.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/appointment" className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-gray-100">
                Book Consultation
              </Link>
              <Link href="/portfolio" className="rounded-full border border-white/20 px-6 py-3 font-semibold hover:bg-white/10">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
