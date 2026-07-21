import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { PortfolioProject } from "@/data/portfolio";

type PortfolioCardProps = {
  project: PortfolioProject;
};

export function PortfolioCard({
  project,
}: PortfolioCardProps) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/portfolio/${project.slug}`}
        className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
        aria-label={`View ${project.title} case study`}
      >
        <div className="relative aspect-16/11 overflow-hidden bg-slate-100">
          <img
            src={project.coverImage}
            alt={`${project.title} project preview`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

          <span className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-slate-950 opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={20} />
          </span>
        </div>

        <div className="p-6 md:p-7">
          <div className="mb-4 flex flex-wrap gap-2">
            {project.categories
              .slice(0, 3)
              .map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-[#ff2f3d]"
                >
                  {category}
                </span>
              ))}
          </div>

          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="mb-2 text-sm font-medium text-slate-500">
                {project.industry}
              </p>

              <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                {project.title}
              </h3>
            </div>

            <span className="mt-1 text-sm font-semibold text-slate-400">
              {project.completionYear}
            </span>
          </div>

          <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
            {project.shortDescription}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
            <span className="text-sm font-semibold text-slate-950">
              View Case Study
            </span>

            <ArrowUpRight
              size={18}
              className="text-[#ff2f3d] transition group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}