"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiCloseFill, RiMenu3Fill } from "react-icons/ri";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
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
    <div className="min-[1200px]:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex size-10 items-center justify-center rounded-full bg-brand text-white shadow-md"
        onClick={() => setOpen(!open)}
      >
        {open ? <RiCloseFill className="text-lg" /> : <RiMenu3Fill className="text-lg" />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 min-h-[calc(100vh-4rem)] border-t bg-white shadow-lg">
          <nav className="mx-auto flex max-w-lg flex-col px-6 py-6" aria-label="Mobile navigation">
            {LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex h-12 w-full items-center border-b border-gray-100 text-base font-medium transition-colors last:border-b-0",
                  link.path === pathName ? "text-brand" : "text-gray-800 hover:text-brand"
                )}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Other Links
              </p>
              <a
                href="https://Notary.mhmdigital.us/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full items-center gap-2 text-gray-700 hover:text-brand"
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
                  className="flex h-11 w-full items-center gap-2 text-gray-700 hover:text-brand"
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
