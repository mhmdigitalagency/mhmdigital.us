"use client";

import Link from "next/link";
import { ArrowRight, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { opacite } from "@/lib/variants";
import { getFeaturedProjects } from "@/data/portfolio";

const featuredProjects = getFeaturedProjects(2);

export default function Case() {
  return (
    <motion.section
      variants={opacite("up", 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className="px-4 xl:px-14 py-[100px] xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]"
      aria-labelledby="case-studies-heading"
    >
      <div className="flex-col flex items-start xl:flex-row xl:items-center justify-between mb-8 xl:mb-5">
        <div>
          <div className="flex items-center gap-2">
            <Minus className="text-red-500" aria-hidden />
            <p className="text-red-500 text-xl font-semibold">Case Studies</p>
          </div>
          <h2 id="case-studies-heading" className="text-3xl md:text-[44px] max-w-xl font-bold leading-tight mb-4">
            See how we drive business success.
          </h2>
        </div>
        <p className="text-base md:text-xl text-gray-500 max-w-xl">
          Explore selected projects where strategy, design, and execution came together to deliver measurable results.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10">
        {featuredProjects.map((project) => (
          <div className="w-full" key={project.slug}>
            <Card className="overflow-hidden rounded-[50px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-full">
              <Link href={`/portfolio/${project.slug}`}>
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                  <img
                    src={project.coverImage}
                    alt={`${project.title} project preview`}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.01, transition: { duration: 0.3 } }} className="p-10">
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-red-500 text-lg font-semibold">{project.categories[0]}</p>
                  </div>
                  <h3 className="text-2xl max-w-xl font-bold leading-tight mb-3">{project.title}</h3>
                  <p className="text-base md:text-lg text-gray-500 max-w-xl line-clamp-3">{project.shortDescription}</p>
                </motion.div>
              </Link>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/contact">
            <motion.div
              whileHover={{ y: -10, transition: { type: "spring" } }}
              className="flex items-center gap-2 bg-red-500 text-white rounded-full px-12 py-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] group"
            >
              <span className="font-semibold text-base md:text-[20px]">Get in Touch</span>
              <ArrowRight className="text-white group-hover:translate-x-2 transition-all duration-500" />
            </motion.div>
          </Link>
          <Link href="/portfolio">
            <motion.div
              whileHover={{ y: -10, transition: { type: "spring" } }}
              className="bg-white text-red-500 rounded-full px-12 py-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
            >
              <span className="font-semibold text-base md:text-[20px]">View Full Portfolio</span>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
