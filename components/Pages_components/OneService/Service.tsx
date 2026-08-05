"use client";

import Image from "next/image";
import { ArrowRight, Minus } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getServiceHeroImage } from "@/lib/constants/service-images";
import { getServiceIcon } from "@/lib/constants/service-icons";

interface Props {
  service: Services;
}

interface Services {
  id: string;
  slug?: string;
  description: string;
  name: string;
  icon: string;
  image?: string | null;
}

const Service = ({ service }: Props) => {
  const heroImage = getServiceHeroImage(service.slug ?? "", service.image);
  const Icon = getServiceIcon(service.slug ?? "", service.name);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-red-500/5 via-white to-red-50/30 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1, delay: 0.3 } }}
        className="relative flex flex-col items-start justify-between gap-10 px-4 py-16 xl:px-14 xxl:px-40"
      >
        <div className="flex flex-col items-start gap-8 w-full max-w-4xl">
          <div className="flex items-center gap-2">
            <Minus className="text-red-500" aria-hidden />
            <p className="text-red-500 text-xl font-bold">Service</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <Icon className="h-8 w-8" aria-hidden />
            </span>
            <h1 className="text-3xl md:text-[50px] font-bold leading-tight">{service.name || "Service"}</h1>
          </div>
          <p className="text-lg text-gray-600 font-medium leading-9 max-w-3xl">
            {service.description || "Professional service tailored to your business."}
          </p>
          <div className="relative w-full max-w-3xl aspect-video overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
            <Image
              src={heroImage}
              alt={`${service.name} example`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link href="/quote">
              <motion.button
                whileHover={{ y: -6, transition: { type: "spring" } }}
                className="flex items-center gap-2 bg-red-500 text-white rounded-full px-10 py-5 shadow-lg group cursor-pointer"
              >
                <span className="font-semibold text-[17px]">Request a Quote</span>
                <ArrowRight className="text-white group-hover:translate-x-2 transition-all duration-500" />
              </motion.button>
            </Link>
            <Link href="/services">
              <motion.button
                whileHover={{ y: -6, transition: { type: "spring" } }}
                className="border bg-white text-red-500 rounded-full px-10 py-5 shadow-lg cursor-pointer"
              >
                <span className="font-semibold text-[17px]">Browse Services</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Service;
