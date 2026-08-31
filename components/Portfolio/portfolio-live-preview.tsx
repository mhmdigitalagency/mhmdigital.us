"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Globe } from "lucide-react";

type PortfolioLivePreviewProps = {
  url: string;
  title: string;
};

function displayHost(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function PortfolioLivePreview({ url, title }: PortfolioLivePreviewProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 shadow-2xl">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 md:px-5">
        <div className="flex gap-2" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-red-500/90" />
          <span className="h-3 w-3 rounded-full bg-amber-400/90" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
        </div>

        <div className="mx-auto flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs text-white/80 md:max-w-lg">
          <Globe size={14} className="shrink-0 text-white/60" />
          <span className="truncate">{displayHost(url)}</span>
        </div>

        <Link
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-slate-100"
        >
          Open site
          <ExternalLink size={14} />
        </Link>
      </div>

      <div className="relative bg-slate-100">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-sm font-medium text-slate-500">
            Loading live preview…
          </div>
        )}

        <iframe
          src={url}
          title={`${title} live website preview`}
          className="h-[min(72vh,780px)] w-full bg-white"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
          onLoad={() => setLoaded(true)}
        />
      </div>

      <p className="border-t border-white/10 px-5 py-3 text-xs text-white/55">
        Some sites restrict embedding. If the preview is blank, use{" "}
        <Link href={url} target="_blank" rel="noreferrer" className="font-semibold text-white underline-offset-2 hover:underline">
          open site
        </Link>
        .
      </p>
    </div>
  );
}
