"use client";

import React from "react";
import { ArrowRight, Minus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1, delay: 0.3 } }}
      className="pb-16 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]"
      aria-labelledby="hero-heading"
    >
      <div className="mt-6 flex flex-col justify-center items-center bg-[url('/images/banner.jpeg')] relative bg-no-repeat bg-cover rounded-[30px] overflow-hidden">
        <div className="w-full flex flex-col items-center justify-center relative z-10 bg-black/55 py-20 md:py-28 px-6 text-center">
          <div className="flex items-center gap-2 mb-4">
            <Minus className="text-red-400" aria-hidden />
            <p className="text-red-400 text-sm md:text-lg font-bold tracking-wide uppercase">
              Digital Growth Agency
            </p>
          </div>

          <h1
            id="hero-heading"
            className="text-[36px] sm:text-[56px] md:text-[64px] text-white font-bold leading-tight mb-4 max-w-4xl"
          >
            We Help startups & businesses grow.
          </h1>

          <p className="text-base md:text-lg font-medium text-slate-200 max-w-xl leading-relaxed mb-10">
            Branding, websites, marketing, and print — built for startups and growing businesses in Seattle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote">
              <motion.span
                whileHover={{ y: -4 }}
                className="inline-flex items-center gap-2 bg-red-500 text-white rounded-full px-8 py-4 font-semibold shadow-lg hover:bg-red-600 transition-colors"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
            <Link href="/services">
              <motion.span
                whileHover={{ y: -4 }}
                className="inline-flex items-center gap-2 bg-white text-red-500 rounded-full px-8 py-4 font-semibold shadow-lg hover:bg-red-50 transition-colors"
              >
                Explore Our Services
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
