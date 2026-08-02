"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiCloseFill, RiMenu3Fill } from "react-icons/ri";
import { ExternalLink } from "lucide-react";
import { OTHER_LINKS } from "@/lib/constants/services-data";

const LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Print Services", path: "/print-services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Packages", path: "/packages" },
  { name: "Quote", path: "/quote" },
  { name: "Contact", path: "/contact" },
];

export default function NavMobile() {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="size-9 sm:size-10 rounded-full flex items-center justify-center bg-red-500 text-white shadow-md"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <RiCloseFill className="text-lg" />
        ) : (
          <RiMenu3Fill className="text-lg" />
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white shadow-lg border-t min-h-[calc(100vh-5rem)]">
          <nav className="px-4 flex flex-col gap-6 py-8" aria-label="Mobile navigation">
            {LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setOpen(false)}
                className={`capitalize font-medium text-base transition-colors w-fit ${
                  link.path === pathName ? "text-red-500" : "text-gray-700 hover:text-red-500"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Other Links
              </p>
              <a
                href="https://Notary.mhmdigital.us/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-red-500 mb-3"
                onClick={() => setOpen(false)}
              >
                Notary Public <ExternalLink className="h-3.5 w-3.5" />
              </a>
              {OTHER_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-red-500 mb-3"
                  onClick={() => setOpen(false)}
                >
                  {link.name} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
