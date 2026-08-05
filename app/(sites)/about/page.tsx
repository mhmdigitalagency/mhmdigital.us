import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Printer, Rocket, Shield, Sparkles, Users } from "lucide-react";
import { OFFICE_ADDRESS_LINES, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants/site";
import { PROCESS_STEPS } from "@/lib/constants/services-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | MHM Digital",
  description:
    "MHM Digital is a Seattle-based digital growth agency offering branding, web design, marketing, software, and professional printing.",
};

const stats = [
  { value: "150+", label: "Projects delivered" },
  { value: "7+", label: "Years of experience" },
  { value: "12", label: "Service categories" },
  { value: "Seattle", label: "Seattle Office" },
];

const values = [
  { icon: Sparkles, title: "Quality First", description: "Every deliverable is crafted with attention to detail." },
  { icon: Shield, title: "Accountability", description: "Clear timelines and honest communication on every project." },
  { icon: Users, title: "Partnership", description: "We work as an extension of your team." },
  { icon: Rocket, title: "Growth Focused", description: "Built to help startups and businesses scale." },
];

const milestones = [
  { year: "2020", title: "Founded", description: "Started as a design and marketing practice for small businesses." },
  { year: "2021–2022", title: "Expanded services", description: "Added web development, e-commerce, and print production." },
  { year: "2023", title: "Seattle Office", description: "Opened our Seattle office at Share Space MADDA WALABU." },
  { year: "2024–2026", title: "Platform growth", description: "Launched client dashboards, PrimePrint, and integrated digital + print services." },
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-linear-to-b from-red-50/60 to-white px-4 pb-20 pt-32 xl:px-14 xxl:px-40">
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#FF3B3B]">About MHM Digital</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Digital agency & print studio in Seattle
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Branding, websites, marketing, and print — one partner for startups and growing businesses.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-[#FF3B3B] px-8 py-4 font-semibold text-white hover:bg-red-600 transition-colors">
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/portfolio" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 font-semibold text-gray-900 hover:border-red-200 transition-colors">
                View Our Work
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px] shadow-xl aspect-4/3 bg-slate-100">
            <Image src="/images/about-hero.png" alt="MHM Digital workspace" fill priority className="object-cover" />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 xl:px-14 xxl:px-40 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-3xl md:text-4xl font-bold text-[#FF3B3B]">{stat.value}</p>
              <p className="mt-2 text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 xl:px-14 xxl:px-40">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF3B3B] mb-3">Our Mission</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">One partner for digital and print</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We combine creative, technical, and print services so you can launch faster and look professional everywhere.
            </p>
            <ul className="space-y-3">
              {[
                "Branding, websites, and marketing under one roof",
                "Client dashboard for files, quotes, and tracking",
                "Print solutions for B2C and B2B",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-[#FF3B3B] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-red-100 bg-red-50/50 p-8 md:p-10">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF3B3B] text-white mb-6">
              <Printer className="h-7 w-7" aria-hidden />
            </div>
            <h3 className="text-2xl font-bold mb-4">Print for B2C & B2B</h3>
            <p className="text-gray-600 leading-relaxed">
              Business cards, banners, packaging, and bulk orders — for individual customers and business clients alike.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 xl:px-14 xxl:px-40 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">What drives every project</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-3xl bg-white border border-gray-200 p-7 shadow-sm">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#FF3B3B] mb-5">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 xl:px-14 xxl:px-40">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-6">
          {milestones.map((item) => (
            <article key={item.year} className="rounded-3xl border border-gray-200 p-8">
              <p className="text-[#FF3B3B] font-bold text-lg mb-2">{item.year}</p>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 xl:px-14 xxl:px-40 bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How we work</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none">
            {PROCESS_STEPS.map((step) => (
              <li key={step.step} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FF3B3B] text-sm font-bold mb-4">
                  {step.step}
                </span>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-20 xl:px-14 xxl:px-40">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10">
          <div className="rounded-3xl border border-gray-200 p-8 md:p-10">
            <div className="flex items-start gap-4 mb-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#FF3B3B]">
                <MapPin className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h3 className="text-2xl font-bold mb-1">Seattle Office</h3>
                <p className="font-semibold text-gray-900">{OFFICE_ADDRESS_LINES[0]}</p>
                <p className="text-gray-600">{OFFICE_ADDRESS_LINES[1]}</p>
              </div>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>{CONTACT_EMAIL}</p>
              <p>{CONTACT_PHONE}</p>
            </div>
          </div>
          <div className="rounded-3xl bg-[#FF3B3B] p-8 md:p-10 text-white flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to work together?</h3>
            <p className="text-white/85 leading-relaxed mb-8">
              Tell us about your project and we&apos;ll recommend the right services.
            </p>
            <Link href="/quote" className="inline-flex w-fit rounded-full bg-white px-7 py-3.5 font-semibold text-[#FF3B3B] hover:bg-gray-100">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
