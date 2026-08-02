import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Resources | MHM Digital",
  description: "Digital marketing tips, web design insights, and business growth resources from MHM Digital.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 20,
  });

  return (
    <div className="px-4 py-16 xl:px-14 xxl:px-40">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog & Resources</h1>
        <p className="text-gray-600 mb-12">
          Insights on digital marketing, web design, SEO, and growing your business.
        </p>

        {posts.length === 0 ? (
          <div className="rounded-2xl border bg-gray-50 p-12 text-center">
            <p className="text-gray-600 mb-4">New articles coming soon.</p>
            <Link href="/contact" className="text-red-500 font-semibold hover:underline">
              Subscribe to our newsletter for updates →
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article key={post.id} className="rounded-2xl border p-6 hover:shadow-md transition-shadow">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-bold hover:text-red-500 transition-colors">{post.title}</h2>
                  <p className="text-gray-600 mt-2">{post.excerpt}</p>
                  {post.publishedAt && (
                    <time className="text-sm text-gray-400 mt-3 block">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </time>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
