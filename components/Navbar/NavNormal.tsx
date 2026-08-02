"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ExternalLink } from "lucide-react";
import { OTHER_LINKS } from "@/lib/constants/services-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Print Services", path: "/print-services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Packages", path: "/packages" },
  { name: "Contact", path: "/contact" },
];

export default function NavNormal() {
  const pathName = usePathname();

  return (
    <nav className="hidden xl:flex items-center gap-6 text-[15px]" aria-label="Main navigation">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={`font-medium capitalize transition-colors hover:text-red-500 ${
            link.path === pathName ? "text-red-500 border-b-2 border-red-500 pb-0.5" : "text-gray-700"
          }`}
        >
          {link.name}
        </Link>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 font-medium text-gray-700 hover:text-red-500 transition-colors outline-none">
          Other Links
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[220px]">
          <DropdownMenuItem render={<a href="https://Notary.mhmdigital.us/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full cursor-pointer" />}>
            Notary Public
            <ExternalLink className="h-3.5 w-3.5 ml-2 opacity-50" />
          </DropdownMenuItem>
          {OTHER_LINKS.map((link) => (
            <DropdownMenuItem
              key={link.href}
              render={
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full cursor-pointer"
                />
              }
            >
              {link.name}
              <ExternalLink className="h-3.5 w-3.5 ml-2 opacity-50" />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
