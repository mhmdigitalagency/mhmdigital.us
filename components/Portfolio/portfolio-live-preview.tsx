"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink, Globe, Images, Monitor } from "lucide-react";

import type { PortfolioProject } from "@/data/portfolio";
import {
  getProjectCoverScreenshot,
  getProjectGalleryScreenshots,
  projectHasLiveUrl,
} from "@/lib/portfolio-media";

type PortfolioProjectPreviewProps = {
  project: PortfolioProject;
};

function displayHost(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function PortfolioProjectPreview({ project }: PortfolioProjectPreviewProps) {
  const hasLiveUrl = projectHasLiveUrl(project);
  const screenshots = useMemo(() => getProjectGalleryScreenshots(project), [project]);
  const [mode, setMode] = useState<"live" | "screenshots">(hasLiveUrl ? "live" : "screenshots");
  const [activeShot, setActiveShot] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const headerLabel = hasLiveUrl
    ? displayHost(project.projectUrl!)
    : `${project.title} — project preview`;

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 shadow-2xl">
      <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-3 md:flex-row md:items-center md:px-5">
        <div className="flex gap-2" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-red-500/90" />
          <span className="h-3 w-3 rounded-full bg-amber-400/90" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
        </div>

        <div className="mx-auto flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs text-white/80 md:max-w-lg">
          {hasLiveUrl ? (
            <Globe size={14} className="shrink-0 text-white/60" />
          ) : (
            <Images size={14} className="shrink-0 text-white/60" />
          )}
          <span className="truncate">{headerLabel}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {hasLiveUrl && (
            <>
              <button
                type="button"
                onClick={() => setMode("live")}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                  mode === "live"
                    ? "bg-white text-slate-950"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <Monitor size={14} />
                Live
              </button>
              <button
                type="button"
                onClick={() => setMode("screenshots")}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                  mode === "screenshots"
                    ? "bg-white text-slate-950"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <Images size={14} />
                Screenshots
              </button>
            </>
          )}

          {hasLiveUrl && (
            <Link
              href={project.projectUrl!}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff2f3d] px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
            >
              Open site
              <ExternalLink size={14} />
            </Link>
          )}
        </div>
      </div>

      <div className="relative bg-slate-100">
        {mode === "live" && hasLiveUrl ? (
          <>
            {!iframeLoaded && (
              <img
                src={getProjectCoverScreenshot(project)}
                alt={`${project.title} screenshot fallback`}
                className="absolute inset-0 h-[min(72vh,780px)] w-full object-cover object-top"
              />
            )}
            {!iframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 text-sm font-medium text-white">
                Loading live preview…
              </div>
            )}
            <iframe
              src={project.projectUrl}
              title={`${project.title} live website preview`}
              className="relative h-[min(72vh,780px)] w-full bg-white"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
              onLoad={() => setIframeLoaded(true)}
            />
          </>
        ) : (
          <img
            src={screenshots[activeShot] ?? getProjectCoverScreenshot(project)}
            alt={`${project.title} screenshot ${activeShot + 1}`}
            className="h-[min(72vh,780px)] w-full object-cover object-top"
          />
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-slate-900/80 p-4">
        {screenshots.map((shot, index) => (
          <button
            key={shot}
            type="button"
            onClick={() => {
              setActiveShot(index);
              setMode("screenshots");
            }}
            className={`relative h-16 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition ${
              mode === "screenshots" && activeShot === index
                ? "border-[#ff2f3d]"
                : "border-transparent opacity-80 hover:opacity-100"
            }`}
            aria-label={`View screenshot ${index + 1}`}
          >
            <img src={shot} alt="" className="h-full w-full object-cover object-top" />
          </button>
        ))}
      </div>
    </div>
  );
}

/** @deprecated Use PortfolioProjectPreview */
export function PortfolioLivePreview({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  return (
    <PortfolioProjectPreview
      project={{
        title,
        slug: "preview",
        client: title,
        industry: "",
        categories: [],
        shortDescription: "",
        fullDescription: "",
        services: [],
        technologies: [],
        coverImage: "",
        gallery: [],
        projectUrl: url,
        featured: false,
        completionYear: new Date().getFullYear(),
        challenge: "",
        solution: "",
        results: [],
      }}
    />
  );
}
