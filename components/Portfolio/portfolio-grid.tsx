"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import {
  portfolioCategories,
  portfolioProjects,
  type PortfolioCategory,
} from "@/data/portfolio";

import { PortfolioCard } from "./portfolio-card";

type ActiveCategory = "All" | PortfolioCategory;

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] =
    useState<ActiveCategory>("All");

  const [search, setSearch] = useState("");

  const filteredProjects = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return portfolioProjects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" ||
        project.categories.includes(activeCategory);

      const searchableContent = [
        project.title,
        project.client,
        project.industry,
        project.shortDescription,
        ...project.categories,
        ...project.services,
        ...project.technologies,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableContent.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  function resetFilters() {
    setSearch("");
    setActiveCategory("All");
  }

  return (
    <section
      id="projects"
      className="py-20 md:py-28 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff2f3d]">
              Selected Projects
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Explore what we have created.
            </h2>
          </div>

          <div className="relative w-full xl:max-w-sm">
            <Search
              size={19}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search projects..."
              className="h-14 w-full rounded-full border border-slate-200 bg-slate-50 pl-14 pr-12 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-100"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear project search"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-950"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>

        <div className="mb-12 flex flex-wrap gap-3">
          {portfolioCategories.map((category) => {
            const isActive =
              category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(category)
                }
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#ff2f3d] text-white shadow-lg shadow-red-100"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:text-[#ff2f3d]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <PortfolioCard
                key={project.slug}
                project={project}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-20 text-center">
            <h3 className="text-2xl font-bold text-slate-950">
              No projects found
            </h3>

            <p className="mt-3 text-slate-600">
              Try another search term or select a
              different category.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-full bg-[#ff2f3d] px-6 py-3 font-semibold text-white transition hover:bg-red-600"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}