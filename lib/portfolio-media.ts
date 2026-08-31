import type { PortfolioProject } from "@/data/portfolio";

const SCREENSHOT_DIR = "/images/portfolio/screenshots";

export function getScreenshotPath(slug: string, name: string) {
  return `${SCREENSHOT_DIR}/${slug}-${name}.jpg`;
}

export function getProjectCoverScreenshot(project: PortfolioProject): string {
  return getScreenshotPath(project.slug, "cover");
}

export function getProjectGalleryScreenshots(project: PortfolioProject): string[] {
  return ["cover", "01", "02", "03"].map((name) =>
    getScreenshotPath(project.slug, name)
  );
}

export function getProjectPreviewImages(project: PortfolioProject): string[] {
  return getProjectGalleryScreenshots(project);
}

export function projectHasLiveUrl(project: PortfolioProject): boolean {
  return Boolean(project.projectUrl);
}
