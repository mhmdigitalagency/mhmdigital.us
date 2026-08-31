import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

import {
  getProjectBySlug,
  portfolioProjects,
} from "@/data/portfolio";
import { PortfolioProjectPreview } from "@/components/Portfolio/portfolio-live-preview";
import {
  getProjectCoverScreenshot,
  getProjectGalleryScreenshots,
} from "@/lib/portfolio-media";
import { buildPageMetadata } from "@/lib/seo/metadata";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildPageMetadata({
      title: "Project Not Found",
      description: "Portfolio project not found.",
      path: "/portfolio",
    });
  }

  return buildPageMetadata({
    title: `${project.title} Case Study`,
    description: project.shortDescription,
    path: `/portfolio/${slug}`,
    ogImage: getProjectCoverScreenshot(project),
    ogType: "article",
    keywords: [project.title, project.client, project.industry, "MHM Digital portfolio"],
  });
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = portfolioProjects.findIndex(
    (item) => item.slug === project.slug,
  );

  const previousProject =
    portfolioProjects[
      (currentIndex - 1 + portfolioProjects.length) %
        portfolioProjects.length
    ];

  const nextProject =
    portfolioProjects[
      (currentIndex + 1) % portfolioProjects.length
    ];

  const galleryImages = getProjectGalleryScreenshots(project);

  return (
    <main className="min-h-screen bg-white">
      <section className="px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/portfolio"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-red-400"
          >
            <ArrowLeft size={17} />
            Back to Portfolio
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-black/10 bg-slate-100 px-4 py-2 text-xs font-semibold"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-[50px] font-bold tracking-[-0.055em]">
                {project.title}
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-500">
                {project.fullDescription}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-7 gap-y-7 rounded-[28px] border border-black/10 bg-slate-100 p-7 backdrop-blur">
              <div>
                <dt className="text-sm text-slate-400">
                  Client
                </dt>
                <dd className="mt-2 font-semibold">
                  {project.client}
                </dd>
              </div>

              <div>
                <dt className="text-sm text-slate-400">
                  Industry
                </dt>
                <dd className="mt-2 font-semibold">
                  {project.industry}
                </dd>
              </div>

              <div>
                <dt className="text-sm text-slate-400">
                  Year
                </dt>
                <dd className="mt-2 font-semibold">
                  {project.completionYear}
                </dd>
              </div>

              <div>
                <dt className="text-sm text-slate-400">
                  Services
                </dt>
                <dd className="mt-2 font-semibold">
                  {project.services.length} delivered
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff2f3d]">
                Live Preview
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                {project.projectUrl
                  ? "View the website directly"
                  : "Project screenshots"}
              </h2>
            </div>

            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#ff2f3d]"
              >
                Open in new tab
                <ExternalLink size={16} />
              </a>
            )}
          </div>

          <PortfolioProjectPreview project={project} />
        </div>
      </section>

      <section className="px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-slate-100">
          <img
            src={getProjectCoverScreenshot(project)}
            alt={`${project.title} main project presentation`}
            className="aspect-16/8 w-full object-cover object-top"
          />
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff2f3d]">
              The Challenge
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Understanding the business need.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {project.challenge}
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff2f3d]">
              Our Solution
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Building the right experience.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff2f3d]">
              Services Delivered
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.services.map((service: string) => (
                <span
                  key={service}
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff2f3d]">
              Technologies
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.technologies.map(
                (technology) => (
                  <span
                    key={technology}
                    className="rounded-full bg-slate-950 px-5 py-3 font-semibold text-white"
                  >
                    {technology}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {galleryImages.length > 0 && (
        <section className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff2f3d]">
                Project Gallery
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Website screenshots
              </h2>
            </div>

            <div className="grid gap-7 md:grid-cols-2">
              {galleryImages.map((image, index) => (
                <div
                  key={image}
                  className={`overflow-hidden rounded-[28px] bg-slate-100 ${
                    index === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="aspect-16/10 h-full w-full object-cover object-top transition duration-700 hover:scale-[1.02]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[34px] bg-slate-950 px-7 py-12 text-white md:px-12 md:py-16 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
              Results
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              What the project delivered.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {project.results.map(
              (result, index) => (
                <div
                  key={result}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <span className="text-sm font-bold text-red-400">
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <p className="mt-4 font-semibold leading-7 text-white">
                    {result}
                  </p>
                </div>
              ),
            )}
          </div>

          {project.projectUrl && (
            <div className="lg:col-span-2">
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[#ff2f3d] px-7 py-4 font-semibold text-white transition hover:bg-red-600"
              >
                Visit Live Project
                <ExternalLink size={18} />
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <Link
            href={`/portfolio/${previousProject.slug}`}
            className="rounded-[28px] border border-slate-200 p-7 transition hover:border-red-200 hover:shadow-lg"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-500">
              <ArrowLeft size={17} />
              Previous project
            </span>

            <h3 className="mt-5 text-2xl font-bold text-slate-950">
              {previousProject.title}
            </h3>
          </Link>

          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="rounded-[28px] border border-slate-200 p-7 text-right transition hover:border-red-200 hover:shadow-lg"
          >
            <span className="flex items-center justify-end gap-2 text-sm font-semibold text-slate-500">
              Next project
              <ArrowRight size={17} />
            </span>

            <h3 className="mt-5 text-2xl font-bold text-slate-950">
              {nextProject.title}
            </h3>
          </Link>
        </div>
      </section>
    </main>
  );
}