import Link from "next/link";
import { ArrowRight, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getFeaturedProjects } from "@/data/portfolio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | MHM Digital",
  description: "Selected project case studies from MHM Digital — websites, platforms, branding, and print solutions.",
};

export default function CaseStudiesPage() {
  const projects = getFeaturedProjects(2);

  return (
    <main className="px-4 xl:px-14 xxl:px-40 pb-24 pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <Minus className="text-red-500" aria-hidden />
            <p className="text-red-500 font-bold uppercase tracking-wider text-sm">Case Studies</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects that deliver results</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            A focused look at two recent engagements — from strategy and design through launch and ongoing support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.slug} className="overflow-hidden rounded-3xl border shadow-sm hover:shadow-lg transition-shadow">
              <Link href={`/portfolio/${project.slug}`}>
                <div className="aspect-16/10 overflow-hidden bg-slate-100">
                  <img
                    src={project.coverImage}
                    alt={`${project.title} case study preview`}
                    className="h-full w-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-8">
                  <p className="text-red-500 font-semibold text-sm mb-2">{project.categories.join(" · ")}</p>
                  <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{project.shortDescription}</p>
                  <span className="inline-flex items-center gap-2 text-red-500 font-semibold">
                    Read case study <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-red-500 px-8 py-4 font-semibold text-white hover:bg-red-600"
          >
            Explore full portfolio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
