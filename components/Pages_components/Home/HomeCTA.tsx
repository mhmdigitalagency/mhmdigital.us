import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeCTA() {
  return (
    <section className="py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]" aria-labelledby="cta-heading">
      <div className="rounded-[32px] bg-linear-to-r from-red-500 to-red-600 px-8 py-16 md:py-20 text-center text-white">
        <h2 id="cta-heading" className="text-3xl md:text-5xl font-bold mb-4">
          Ready to grow your business?
        </h2>
        <p className="text-red-100 max-w-xl mx-auto mb-10 text-lg">
          Whether you need a new website, a marketing campaign, or professional printing —
          MHM Digital is here to help you succeed.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-white text-red-600 rounded-full px-8 py-4 font-semibold hover:bg-red-50 transition-colors"
          >
            Start a Project <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 border-2 border-white/80 rounded-full px-8 py-4 font-semibold hover:bg-white/10 transition-colors"
          >
            Request a Quote
          </Link>
          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 border-2 border-white/80 rounded-full px-8 py-4 font-semibold hover:bg-white/10 transition-colors"
          >
            Schedule a Consultation
          </Link>
          <Link
            href="/print-services"
            className="inline-flex items-center gap-2 border-2 border-white/80 rounded-full px-8 py-4 font-semibold hover:bg-white/10 transition-colors"
          >
            Order Print Services
          </Link>
        </div>
      </div>
    </section>
  );
}
