"use client";

import { MapPin, Minus, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { opacite, fadeIn } from "../../../lib/variants";
import { OFFICE_ADDRESS_LINES, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants/site";

const Office = () => {
  return (
    <div className="bg-[#e1dfe23c] py-25 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <motion.div
        variants={opacite("up", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-10"
      >
        <div className="w-full xl:w-[52%]">
          <div className="flex items-end gap-2">
            <Minus className="text-red-500" aria-hidden />
            <h5 className="text-red-500 text-xl font-semibold">Our Office</h5>
          </div>
          <h2 className="text-3xl md:text-[45px] max-w-xl font-bold leading-tight mb-4">
            Visit us in Seattle
          </h2>
        </div>
        <div className="w-full xl:w-[48%]">
          <p className="text-lg text-gray-500">
            MHM Digital is headquartered at Share Space MADDA WALABU in Seattle. Stop by for consultations,
            print pickups, and business support services.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.5 }}
        className="max-w-xl"
      >
        <div className="bg-white p-8 rounded-3xl shadow-[rgba(50,50,105,0.15)_0px_2px_5px_0px,rgba(0,0,0,0.05)_0px_1px_1px_0px]">
          <div className="flex items-start gap-4 mb-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500 text-white">
              <MapPin className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h5 className="text-xl font-bold mb-1">{OFFICE_ADDRESS_LINES[0]}</h5>
              <p className="text-lg text-gray-500">{OFFICE_ADDRESS_LINES[1]}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <Phone className="h-5 w-5 text-red-500" aria-hidden />
            <Link href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="text-lg text-red-500 font-semibold">
              {CONTACT_PHONE}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-red-500" aria-hidden />
            <Link href={`mailto:${CONTACT_EMAIL}`} className="text-base text-red-500">
              {CONTACT_EMAIL}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Office;
