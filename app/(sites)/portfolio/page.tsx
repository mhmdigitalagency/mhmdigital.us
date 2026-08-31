import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortfolioGrid } from "@/components/Portfolio/portfolio-grid";
import { portfolioProjects } from "@/data/portfolio";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Portfolio & Case Studies",
  description:
    "Explore websites, e-commerce platforms, web apps, branding, and creative projects delivered by MHM Digital in Seattle.",
  path: "/portfolio",
  keywords: ["MHM Digital portfolio", "Seattle web design portfolio", "web development case studies"],
});

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden px-4 pb-16 pt-32 md:pb-20 md:pt-40 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-red-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#ff2f3d]">
            Portfolio
          </p>

          <h1 className="max-w-5xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-slate-950 md:text-6xl">
            Work that ships — viewed right here.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-500">
            {portfolioProjects.length} projects across branding, websites, apps, and
            print. Every case study includes live preview or captured screenshots
            you can browse directly on this site.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-3 rounded-full bg-slate-950 px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Browse projects
              <ArrowRight size={19} />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-950 transition hover:border-red-200 hover:text-[#ff2f3d]"
            >
              Start your project
            </Link>
          </div>
        </div>
      </section>

      <PortfolioGrid />

      <section className="px-4 pb-20 md:pb-28 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 overflow-hidden rounded-[34px] bg-slate-950 px-7 py-12 text-white md:flex-row md:items-center md:px-12 md:py-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-400">
              Next project
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
              Let&apos;s create your next digital success story.
            </h2>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#ff2f3d] px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-red-600"
          >
            Get in touch
            <ArrowRight size={19} />
          </Link>
        </div>
      </section>
    </main>
  );
}
