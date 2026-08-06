import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/data/portfolio";
import { getActivePrintProducts } from "@/lib/print-products";
import { absoluteUrl } from "@/lib/seo/site";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/print-services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/packages", priority: 0.85, changeFrequency: "weekly" },
    { path: "/quote", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/portfolio", priority: 0.85, changeFrequency: "weekly" },
    { path: "/process", priority: 0.75, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
    { path: "/appointment", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.75, changeFrequency: "weekly" },
    { path: "/case-studies", priority: 0.75, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
    { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/accessibility", priority: 0.3, changeFrequency: "yearly" },
    { path: "/sitemap", priority: 0.2, changeFrequency: "monthly" },
  ];

  const [printProducts, blogPosts] = await Promise.all([
    getActivePrintProducts(),
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, publishedAt: true },
    }),
  ]);

  const portfolioPages = portfolioProjects.map((project) => ({
    url: absoluteUrl(`/portfolio/${project.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const printPages = printProducts.map((product) => ({
    url: absoluteUrl(`/print-services/${product.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt ?? post.publishedAt ?? new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const corePages = staticPages.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  return [...corePages, ...printPages, ...portfolioPages, ...blogPages];
}
