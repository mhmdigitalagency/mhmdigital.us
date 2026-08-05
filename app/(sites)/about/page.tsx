import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Printer,
  Rocket,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { OFFICE_ADDRESS_LINES, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants/site";
import { PROCESS_STEPS } from "@/lib/constants/services-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | MHM Digital",
  description:
    "MHM Digital is a Seattle-based digital growth agency offering branding, web design, marketing, software, and professional printing for startups and businesses.",
};

const stats = [
  { value: "150+", label: "Projects delivered" },
  { value: "7+", label: "Years of experience" },
  { value: "12", label: "Service categories" },
  { value: "Seattle", label: "HQ & print studio" },
];

const values = [
  {
    icon: Sparkles,
    title: "Quality First",
    description: "Every deliverable — from a logo to a full platform — is crafted with attention to detail and brand consistency.",
  },
  {
    icon: Shield,
    title: "Accountability",
    description: "We take ownership of timelines, communication, and outcomes so you always know where your project stands.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work as an extension of your team, aligning strategy with your business goals and growth stage.",
  },
  {
    icon: Rocket,
    title: "Growth Focused",
    description: "Design, marketing, and technology decisions are made to help startups and businesses scale with confidence.",
  },
];

const milestones = [
  { year: "2020", title: "Founded", description: "MHM Digital began as a freelance design and marketing practice with a focus on helping small businesses grow online." },
  { year: "2021–2022", title: "Expanded services", description: "Added web development, e-commerce, and print production while building a collaborative creative team." },
  { year: "2023", title: "Seattle headquarters", description: "Established a U.S. presence in Seattle with Share Space MADDA WALABU, serving local and national clients." },
  { year: "2024–2026", title: "Platform ecosystem", description: "Launched PrimePrint, client dashboards, SaaS tools, and an integrated digital + print service model." },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-red-50/60 to-white px-4 pb-20 pt-32 xl:px-14 xxl:px-40">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#FF3B3B]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#FF3B3B]">About MHM Digital</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Digital growth agency & print studio in Seattle
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              MHM Digital helps startups and businesses grow through branding, websites, digital marketing,
              software development, and professional printing — all managed from one trusted partner.
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
            <Image
              src="/images/about-hero.png"
              alt="MHM Digital team collaborating in a modern workspace"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
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

      {/* Mission */}
      <section className="px-4 py-20 xl:px-14 xxl:px-40">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF3B3B] mb-3">Our Mission</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Empowering businesses to grow with clarity</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We believe growing a business should not require juggling five different vendors. MHM Digital
              combines creative, technical, and operational services so you can launch faster, look professional,
              and scale with systems that actually work.
            </p>
            <ul className="space-y-3">
              {[
                "Branding, websites, and marketing under one roof",
                "Client dashboard for files, quotes, and project tracking",
                "Professional printing from business cards to bulk orders",
                "Notary and business support services in Seattle",
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
            <h3 className="text-2xl font-bold mb-4">Digital + Print, unified</h3>
            <p className="text-gray-600 leading-relaxed">
              From your website and ad campaigns to business cards, banners, and packaging — we design,
              produce, and deliver with the same brand standards across every touchpoint.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-20 xl:px-14 xxl:px-40 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF3B3B] mb-3">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-bold">What drives every project</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-3xl bg-white border border-gray-200 p-7 shadow-sm hover:shadow-md transition-shadow">
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

      {/* Story / Timeline */}
      <section className="px-4 py-20 xl:px-14 xxl:px-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF3B3B] mb-3">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for founders and growing teams</h2>
            <p className="text-gray-600 leading-relaxed">
              From freelance roots to a full-service agency with a Seattle studio and digital product ecosystem.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {milestones.map((item) => (
              <article key={item.year} className="rounded-3xl border border-gray-200 p-8 hover:border-red-100 transition-colors">
                <p className="text-[#FF3B3B] font-bold text-lg mb-2">{item.year}</p>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process preview */}
      <section className="px-4 py-20 xl:px-14 xxl:px-40 bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400 mb-3">How We Work</p>
              <h2 className="text-3xl md:text-4xl font-bold">A clear path from idea to delivery</h2>
            </div>
            <Link href="/process" className="inline-flex items-center gap-2 text-red-400 font-semibold hover:text-red-300">
              See full process <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
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

      {/* Office & CTA */}
      <section className="px-4 py-20 xl:px-14 xxl:px-40">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10">
          <div className="rounded-3xl border border-gray-200 p-8 md:p-10">
            <div className="flex items-start gap-4 mb-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#FF3B3B]">
                <MapPin className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h3 className="text-2xl font-bold mb-1">Visit our Seattle office</h3>
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
              Tell us about your project and we&apos;ll recommend the right mix of design, digital, and print services.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-full bg-white px-7 py-3.5 font-semibold text-[#FF3B3B] hover:bg-gray-100">
                Contact Us
              </Link>
              <Link href="/quote" className="rounded-full border border-white/30 px-7 py-3.5 font-semibold hover:bg-white/10">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
