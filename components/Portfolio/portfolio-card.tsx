import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { PortfolioProject } from "@/data/portfolio";

type PortfolioCardProps = {
  project: PortfolioProject;
  variant?: "grid" | "featured";
};

export function PortfolioCard({
  project,
  variant = "grid",
}: PortfolioCardProps) {
  const isFeatured = variant === "featured";

  return (
    <article className="group">
      <Link
        href={`/portfolio/${project.slug}`}
        className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-red-100"
        aria-label={`View ${project.title} case study`}
      >
        <div
          className={`relative overflow-hidden bg-slate-100 ${
            isFeatured
              ? "aspect-16/11 rounded-[32px]"
              : "aspect-4/5 rounded-[24px] md:aspect-3/4"
          }`}
        >
          <img
            src={project.coverImage}
            alt={`${project.title} project preview`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-linear-to-t from-slate-950/55 via-slate-950/10 to-transparent opacity-80 transition duration-300 group-hover:opacity-100" />

          {project.projectUrl && (
            <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-950 shadow-sm">
              Live site
            </span>
          )}

          <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg transition duration-300 group-hover:scale-105">
            <ArrowUpRight size={20} />
          </span>
        </div>

        <div className={`${isFeatured ? "mt-6" : "mt-5"} space-y-3`}>
          <div className="flex flex-wrap gap-2">
            {project.categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400"
              >
                #{category.replace(/\s+/g, "")}
              </span>
            ))}
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3
                className={`truncate font-bold tracking-tight text-slate-950 ${
                  isFeatured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                }`}
              >
                {project.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500 md:text-base">
                {project.shortDescription}
              </p>
            </div>

            <span className="shrink-0 pt-1 text-sm font-semibold text-slate-400">
              {project.completionYear}
            </span>
          </div>

          <p className="text-sm font-medium text-slate-400">{project.industry}</p>
        </div>
      </Link>
    </article>
  );
}
