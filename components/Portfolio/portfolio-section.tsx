import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { portfolioProjects } from "@/data/portfolio";
import { PortfolioCard } from "./portfolio-card";

export function PortfolioSection() {
  const featuredProjects = portfolioProjects.filter((project) => project.featured).slice(0, 6);
  const [leadProject, ...supportingProjects] = featuredProjects;

  return (
    <section className="bg-[#fafafa] px-4 py-20 md:px-8 md:py-28 xl:px-14 xxl:px-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-7 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#ff2f3d]">
              Featured Work
            </p>

            <h2 className="text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
              Projects built to make brands grow.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Explore live websites and platforms directly on our site — no external
              galleries required.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-slate-950 px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            All work
            <sup className="text-xs opacity-70">{portfolioProjects.length}</sup>
            <ArrowRight size={19} />
          </Link>
        </div>

        {leadProject && (
          <div className="mb-8">
            <PortfolioCard project={leadProject} variant="featured" />
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {supportingProjects.map((project) => (
            <PortfolioCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
