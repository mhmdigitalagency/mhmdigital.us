import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { portfolioProjects } from "@/data/portfolio";
import { PortfolioCard } from "./portfolio-card";

export function PortfolioSection() {
  const featuredProjects = portfolioProjects
    .filter((project) => project.featured)
    .slice(0, 6);

  return (
    <section className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-7 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#ff2f3d]">
              Our Work
            </p>

            <h2 className="text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
              Projects built to make brands grow.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Discover websites, platforms, e-commerce
              experiences, brands, and visual systems
              created by MHM Digital.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-[#ff2f3d] px-7 py-4 font-semibold text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:bg-red-600"
          >
            View All Projects
            <ArrowRight size={19} />
          </Link>
        </div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <PortfolioCard
              key={project.slug}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}