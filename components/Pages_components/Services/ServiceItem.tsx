"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  service: Services;
}

interface Services {
  id: string;
  description: string;
  name: string;
  icon: string;
}

const ServiceItem = ({ service }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1, delay: 0.3 } }}
    >
      <motion.div whileHover={{ scale: 1.02, transition: { type: "spring", duration: 0.7 } }}>
        <Link
          href={`/service/${service.id}`}
          className="flex flex-col gap-4 border rounded-[32px] bg-white px-8 py-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] group h-full hover:border-red-100"
        >
          <h4 className="text-2xl md:text-3xl font-bold group-hover:text-red-500 transition-colors">
            {service.name || "Service"}
          </h4>
          <p className="text-base font-medium text-gray-500 leading-7 line-clamp-4">
            {service.description || "Professional service tailored to your business needs."}
          </p>
          <h5 className="flex items-center gap-2 text-lg font-bold text-red-500 mt-auto">
            Learn More
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-all duration-300" />
          </h5>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ServiceItem;
