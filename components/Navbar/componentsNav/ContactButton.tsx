"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ContactButton = () => {
  return (
    <Link href="/contact" className="group hidden min-[1200px]:inline-flex">
      <span className="inline-flex h-10 items-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90">
        Get in Touch
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
};

export default ContactButton;
