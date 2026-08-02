"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { opacite } from "@/lib/variants";
import { Logo } from "@/components/brand/Logo";
import { subscribeToNewsletter } from "@/actions/newsletter";
import { OTHER_LINKS } from "@/lib/constants/services-data";
import { toast } from "sonner";
import { useState, useTransition } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await subscribeToNewsletter(formData);
      if (result.success) {
        toast.success(result.message);
        setEmail("");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <footer>
      <motion.div
        variants={opacite("up", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <hr />
        <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-16 flex flex-col lg:flex-row items-start justify-between gap-10">
          <div className="w-full lg:w-[45%]">
            <Logo size="lg" />
            <p className="text-base text-gray-500 pt-5 max-w-md leading-relaxed">
              A Seattle-based digital growth agency helping startups and businesses thrive with branding,
              websites, marketing, software, and professional printing services.
            </p>
          </div>

          <div className="w-full lg:w-[50%]">
            <h3 className="text-lg font-semibold pb-4">Subscribe to our newsletter</h3>
            <form action={handleSubmit} className="w-full">
              <div className="flex items-center justify-between px-4 py-3 border rounded-full gap-3">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  aria-label="Email address"
                  className="border-none focus:border-b focus:border-red-500 transition-all focus:outline-none focus:ring-0 rounded-none w-[65%] text-base bg-transparent"
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-2 bg-red-500 text-white rounded-full px-5 py-2.5 font-semibold text-sm disabled:opacity-70"
                >
                  {isPending ? "..." : "Subscribe"}
                  <ArrowRight className="h-4 w-4 hidden sm:block" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>

      <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <hr />
        <div className="pt-14 pb-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">Menu</h4>
            <ul className="space-y-2 text-gray-500">
              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Services", "/services"],
                ["Print Services", "/print-services"],
                ["Portfolio", "/portfolio"],
                ["Packages", "/packages"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-red-500 hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-500">
              {[
                ["Terms", "/terms-and-conditions"],
                ["Privacy", "/privacy"],
                ["Refund Policy", "/refund-policy"],
                ["Cookie Policy", "/cookie-policy"],
                ["Accessibility", "/accessibility"],
                ["Our Process", "/process"],
                ["FAQ", "/faq"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-red-500 hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link href="/quote" className="hover:text-red-500 hover:underline">Request a Quote</Link></li>
              <li><Link href="/appointment" className="hover:text-red-500 hover:underline">Book a Consultation</Link></li>
              <li><Link href="/contact" className="hover:text-red-500 hover:underline">Contact</Link></li>
              <li><Link href="/sitemap" className="hover:text-red-500 hover:underline">Sitemap</Link></li>
              <li><Link href="/blog" className="hover:text-red-500 hover:underline">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Other Links</h4>
            <ul className="space-y-2 text-gray-500">
              {OTHER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-red-500 hover:underline"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://Notary.mhmdigital.us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-red-500 hover:underline"
                >
                  Notary Public
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr />
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} MHM Digital Agency. All rights reserved.</p>
          <p>Seattle, Washington · Digital Agency & Printing Services</p>
        </div>
      </div>
    </footer>
  );
}
