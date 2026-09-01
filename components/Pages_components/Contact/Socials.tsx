"use client";

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import React from "react";

const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/company/mhm-digital/", icon: FaLinkedin, label: "LinkedIn", color: "bg-[#0A66C2]" },
  { href: "https://www.facebook.com/mhmdigital.agency", icon: FaFacebook, label: "Facebook", color: "bg-[#1877F2]" },
  { href: "https://x.com/mhm_digital", icon: FaXTwitter, label: "X", color: "bg-gray-900" },
  { href: "http://wa.me/12063123762", icon: FaWhatsapp, label: "WhatsApp", color: "bg-[#25D366]" },
  { href: "https://www.instagram.com/mhmdigital/", icon: FaInstagram, label: "Instagram", color: "bg-linear-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]" },
];

const Socials = () => {
  return (
    <div className="pb-25 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <div className="flex flex-col items-center justify-center">
        <h5 className="text-red-500 text-xl font-semibold">Follow Us</h5>
        <h2 className="text-3xl md:text-[45px] font-semibold leading-tight mb-4 text-center max-w-2xl">
          Follow us for great content on growth marketing
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label, color }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color} text-white hover:opacity-90 transition-opacity`}
            >
              <Icon size={28} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Socials;
