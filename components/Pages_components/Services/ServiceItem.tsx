"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
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
}

const ServiceItem = ({ service }: Props) => {
  const Icon = getServiceIcon(service.slug ?? "", service.name);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1, delay: 0.3 } }}
    >
      <Link
        href={`/service/${service.id}`}
        className="flex flex-col gap-4 border rounded-[32px] bg-white px-8 py-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] group h-full hover:border-red-100 transition-colors"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <Icon className="h-7 w-7" aria-hidden />
        </span>
        <h4 className="text-2xl md:text-3xl font-bold group-hover:text-red-500 transition-colors">
          {service.name || "Service"}
        </h4>
        <p className="text-base font-medium text-gray-500 leading-7 line-clamp-4">
          {service.description || "Professional service tailored to your business needs."}
        </p>
        <h5 className="flex items-center gap-2 text-lg font-bold text-red-500 mt-auto">
          Learn More
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
        </h5>
      </Link>
    </motion.div>
  );
};

export default ServiceItem;
