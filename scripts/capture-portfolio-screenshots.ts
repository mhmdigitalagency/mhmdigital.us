import { mkdirSync, existsSync } from "fs";
import { join } from "path";
import { chromium } from "playwright";
import { portfolioProjects } from "../data/portfolio";

const OUTPUT_DIR = join(process.cwd(), "public/images/portfolio/screenshots");
const VIEWPORT = { width: 1440, height: 900 };

async function captureWebsite(
  page: Awaited<ReturnType<Awaited<ReturnType<typeof chromium.launch>>["newPage"]>>,
  slug: string,
  url: string
) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: join(OUTPUT_DIR, `${slug}-cover.jpg`),
    type: "jpeg",
    quality: 88,
  });

  const scrollSteps = [900, 1800];
  scrollSteps.forEach((offset, index) => {
    void offset;
    void index;
  });

  for (let i = 0; i < scrollSteps.length; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollSteps[i]);
    await page.waitForTimeout(800);
    await page.screenshot({
      path: join(OUTPUT_DIR, `${slug}-${String(i + 1).padStart(2, "0")}.jpg`),
      type: "jpeg",
      quality: 88,
    });
  }

  await page.evaluate(() => window.scrollTo(0, 0));
}

async function captureStaticAsset(
  page: Awaited<ReturnType<Awaited<ReturnType<typeof chromium.launch>>["newPage"]>>,
  slug: string,
  imagePath: string,
  filename: string
) {
  const absolute = join(process.cwd(), "public", imagePath.replace(/^\//, ""));
  if (!existsSync(absolute)) {
    console.warn(`Missing asset for ${slug}: ${imagePath}`);
    return;
  }

  const fileUrl = `file://${absolute}`;
  await page.setViewportSize(VIEWPORT);
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 32px;
          }
          img {
            width: min(100%, 1280px);
            height: auto;
            border-radius: 24px;
            box-shadow: 0 30px 80px rgba(15, 23, 42, 0.18);
          }
        </style>
      </head>
      <body>
        <img src="${fileUrl}" alt="" />
      </body>
    </html>
  `);
  await page.waitForTimeout(500);
  await page.screenshot({
    path: join(OUTPUT_DIR, filename),
    type: "jpeg",
    quality: 88,
  });
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: VIEWPORT });

  for (const project of portfolioProjects) {
    console.log(`Capturing ${project.slug}…`);

    try {
      if (project.projectUrl) {
        await captureWebsite(page, project.slug, project.projectUrl);
      } else {
        await captureStaticAsset(
          page,
          project.slug,
          project.coverImage,
          `${project.slug}-cover.jpg`
        );
      }

      const gallerySources =
        project.gallery.length > 0 ? project.gallery : [project.coverImage];

      for (let i = 0; i < Math.min(gallerySources.length, 3); i++) {
        if (project.projectUrl && i < 2) continue;
        await captureStaticAsset(
          page,
          project.slug,
          gallerySources[i],
          `${project.slug}-${String(i + 1).padStart(2, "0")}.jpg`
        );
      }
    } catch (error) {
      console.error(`Failed to capture ${project.slug}:`, error);
    }
  }

  await browser.close();
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
