import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, published: true },
  });

  if (!post) {
    return buildPageMetadata({
      title: "Blog Post",
      description: "Digital marketing and business growth resources from MHM Digital in Seattle.",
      path: "/blog",
    });
  }

  return buildPageMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${slug}`,
    ogImage: post.coverImage || undefined,
    ogType: "article",
    keywords: ["digital marketing blog", "Seattle web design tips", post.title],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, published: true },
  });

  if (!post) notFound();

  return (
    <article className="px-4 py-16 xl:px-14 xxl:px-40">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
          articleJsonLd({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${slug}`,
            publishedAt: post.publishedAt,
            author: post.author,
            image: post.coverImage,
          }),
        ]}
      />
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/blog" className="hover:text-brand">Blog</Link>
          <span className="mx-2">/</span>
          <span>{post.title}</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">{post.title}</h1>
        {post.publishedAt && (
          <time className="text-sm text-gray-400 block mb-8" dateTime={post.publishedAt.toISOString()}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        )}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>
        <div className="prose prose-gray max-w-none whitespace-pre-wrap leading-relaxed">{post.content}</div>
      </div>
    </article>
  );
}
