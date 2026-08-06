import type { Metadata } from "next";
import { BUSINESS, DEFAULT_KEYWORDS, DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "./site";

type PageMetadataInput = {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
  ogType?: "website" | "article";
};

export function buildPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  keywords,
  noIndex = false,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    keywords: keywords ?? [...DEFAULT_KEYWORDS],
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function buildPrivatePageMetadata(title: string): Metadata {
  return buildPageMetadata({
    title,
    path: "/",
    noIndex: true,
    description: "Private account area for MHM Digital customers.",
  });
}

export { SITE_DESCRIPTION, SITE_NAME, DEFAULT_KEYWORDS, BUSINESS };
