"use client";

import { Minus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export default function FaqList({ items }: { items: FaqItem[] }) {
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  return (
    <div className="py-[100px] px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-10">
        <div className="w-full xl:w-[52%]">
          <div className="flex items-end gap-2">
            <Minus className="text-brand" aria-hidden />
            <h5 className="text-brand text-xl font-semibold">FAQs</h5>
          </div>
          <h2 className="text-[45px] font-bold leading-tight mb-4 text-brand-navy">Frequently Asked Questions</h2>
        </div>
      </div>
      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6"
      >
        {[left, right].map((column, colIndex) => (
          <div key={colIndex}>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-3xl p-5"
            >
              {column.map((item, index) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-lg md:text-xl font-bold text-left">
                    {colIndex * half + index + 1}. {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-500 text-base md:text-lg whitespace-pre-wrap">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
