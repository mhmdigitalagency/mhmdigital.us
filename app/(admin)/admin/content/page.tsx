import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import {
  BarChart3,
  MessageSquareQuote,
  Briefcase,
  HelpCircle,
  Newspaper,
  ArrowRight,
} from "lucide-react";

const CMS_SECTIONS = [
  {
    href: "/admin/content/stats",
    label: "Site Statistics",
    description: "Manage homepage stats and trust indicators.",
    icon: BarChart3,
    countKey: "stats" as const,
  },
  {
    href: "/admin/content/testimonials",
    label: "Testimonials",
    description: "Add and edit customer testimonials.",
    icon: MessageSquareQuote,
    countKey: "testimonials" as const,
  },
  {
    href: "/admin/content/portfolio",
    label: "Portfolio",
    description: "Showcase completed projects and case studies.",
    icon: Briefcase,
    countKey: "portfolio" as const,
  },
  {
    href: "/admin/content/faq",
    label: "FAQ",
    description: "Manage frequently asked questions.",
    icon: HelpCircle,
    countKey: "faq" as const,
  },
  {
    href: "/admin/content/blog",
    label: "Blog",
    description: "Publish and edit blog posts.",
    icon: Newspaper,
    countKey: "blog" as const,
  },
];

export default async function AdminContentPage() {
  await requireStaff();

  const [statsCount, testimonialsCount, portfolioCount, faqCount, blogCount] = await Promise.all([
    prisma.siteStatistic.count(),
    prisma.testimonial.count(),
    prisma.portfolioItem.count(),
    prisma.faqItem.count(),
    prisma.blogPost.count(),
  ]);

  const counts = {
    stats: statsCount,
    testimonials: testimonialsCount,
    portfolio: portfolioCount,
    faq: faqCount,
    blog: blogCount,
  };

  const totalItems = Object.values(counts).reduce((sum, n) => sum + n, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Content CMS</h1>
        <p className="text-gray-500 mt-1">Manage public-facing content across the website.</p>
      </div>

      {totalItems === 0 ? (
        <div className="rounded-2xl border bg-white p-6 text-center py-12">
          <p className="text-gray-500 mb-6">No CMS content yet. Start by adding site statistics or testimonials.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/admin/content/stats"
              className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
            >
              Add site statistics
            </Link>
            <Link
              href="/admin/content/testimonials"
              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
            >
              Add testimonials
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CMS_SECTIONS.map(({ href, label, description, icon: Icon, countKey }) => (
            <Link
              key={href}
              href={href}
              className="rounded-2xl border bg-white p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-red-50 text-red-500">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{counts[countKey]}</span>
              </div>
              <h2 className="font-bold text-gray-900 mb-1">{label}</h2>
              <p className="text-sm text-gray-500 mb-3">{description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-red-500 group-hover:gap-2 transition-all">
                Manage <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
