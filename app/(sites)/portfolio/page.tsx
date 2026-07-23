import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PortfolioGrid } from "@/components/Portfolio/portfolio-grid";

export const metadata: Metadata = {
  title: "Portfolio | MHM Digital",
  description:
    "Explore websites, e-commerce platforms, digital products, branding, and creative projects developed by MHM Digital.",
  openGraph: {
    title: "MHM Digital Portfolio",
    description:
      "Explore selected digital experiences, websites, platforms, and brands created by MHM Digital.",
    type: "website",
  },
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40 px-4 xl:px-14 py-8 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="absolute -right-40 -top-40 h-h-130 w-h-130 rounded-full bg-red-500/20 blur-3xl" />

        <div className="absolute -bottom-72 left-1/4 h-h-130 w-h-130 rounded-full bg-red-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-red-400">
            Our Portfolio
          </p>

          <h1 className="max-w-5xl text-3xl md:text-[50px] font-bold leading-tight tracking-[-0.055em]">
            Digital experiences designed for real
            businesses.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-500">
            From branding and websites to advanced
            platforms and e-commerce solutions, explore
            selected work created for businesses,
            organizations, and entrepreneurs.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-3 rounded-full bg-[#ff2f3d] px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-red-600"
            >
              Explore Projects
              <ArrowRight size={19} />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      <PortfolioGrid />

      <section className="pb-20 md:pb-28 px-4 xl:px-14 py-8 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 overflow-hidden rounded-[34px] bg-[#ff2f3d] px-7 py-12 text-white md:flex-row md:items-center md:px-12 md:py-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/75">
              Have a project in mind?
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
              Let&apos;s create your next digital
              success story.
            </h2>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 font-semibold text-[#ff2f3d] transition hover:-translate-y-0.5"
          >
            Get in Touch
            <ArrowRight size={19} />
          </Link>
        </div>
      </section>
    </main>
  );
}