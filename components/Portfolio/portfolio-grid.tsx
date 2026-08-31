"use client";

import { useMemo, useState } from "react";

import {
  getCategoryCounts,
  portfolioCategories,
  portfolioProjects,
  type PortfolioCategory,
} from "@/data/portfolio";

import { PortfolioCard } from "./portfolio-card";

type ActiveCategory = "All" | PortfolioCategory;

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("All");
  const categoryCounts = getCategoryCounts();

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return portfolioProjects;

    return portfolioProjects.filter((project) =>
      project.categories.includes(activeCategory)
    );
  }, [activeCategory]);

  return (
    <section
      id="projects"
      className="px-4 pb-24 pt-4 md:pb-32 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-8 border-b border-slate-200 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff2f3d]">
              Recent Work
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Selected projects
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 md:text-lg">
              Browse websites, platforms, brands, and campaigns — each case study
              opens on this site with a live preview when available.
            </p>
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            {filteredProjects.length} project
            {filteredProjects.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="mb-12 flex flex-wrap gap-2">
          {portfolioCategories.map((category) => {
            const isActive = category === activeCategory;
            const count = categoryCounts[category];

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-slate-950 text-white shadow-lg shadow-slate-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-950"
                }`}
              >
                {category}
                <sup className="text-[10px] font-bold opacity-70">{count}</sup>
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <PortfolioCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
