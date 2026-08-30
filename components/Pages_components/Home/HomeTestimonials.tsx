import { withDatabase } from "@/lib/db-safe";
import { prisma } from "@/lib/prisma";
import { Minus, Star } from "lucide-react";
import Image from "next/image";

const DEFAULT_TESTIMONIALS = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    content: "MHM Digital transformed our online presence. Our website traffic increased 300% within three months.",
    rating: 5,
    image: null,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Marketing Director",
    company: "GrowthCo",
    content: "Professional, responsive, and delivered exactly what we needed. The print quality on our marketing materials was outstanding.",
    rating: 5,
    image: null,
  },
];

export default async function HomeTestimonials() {
  let testimonials = await withDatabase(
    () =>
      prisma.testimonial.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        take: 6,
      }),
    []
  );

  if (testimonials.length === 0) {
    testimonials = DEFAULT_TESTIMONIALS as typeof testimonials;
  }

  return (
    <section className="py-20 bg-[#fafafa]" aria-labelledby="testimonials-heading">
      <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="mb-12 text-center">
          <div className="flex items-center gap-2 mb-3 justify-center">
            <Minus className="text-red-500" aria-hidden />
            <p className="text-red-500 font-bold uppercase tracking-wider text-sm">Testimonials</p>
          </div>
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold">
            What our clients say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
              <footer className="flex items-center gap-3">
                {t.image ? (
                  <Image src={t.image} alt="" width={40} height={40} className="rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <cite className="not-italic font-semibold text-gray-900">{t.name}</cite>
                  <p className="text-sm text-gray-500">
                    {t.role}{t.company ? `, ${t.company}` : ""}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
