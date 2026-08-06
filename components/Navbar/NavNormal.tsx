"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
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
  { name: "Print", path: "/print-services", wideName: "Print Services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Packages", path: "/packages" },
  { name: "Contact", path: "/contact" },
];

function NavLink({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-10 items-center border-b-2 border-transparent px-1 font-medium whitespace-nowrap transition-colors",
        "text-[13px] xl:text-sm xxl:text-[15px]",
        isActive ? "border-brand text-brand" : "text-gray-700 hover:text-brand"
      )}
    >
      {children}
    </Link>
  );
}

export default function NavNormal() {
  const pathName = usePathname();

  return (
    <nav
      className="hidden min-[1200px]:flex flex-1 items-center justify-center gap-3 xl:gap-4 xxl:gap-5 min-w-0 px-2"
      aria-label="Main navigation"
    >
      {NAV_LINKS.map((link) => {
        const isActive = link.path === pathName;
        return (
          <NavLink key={link.path} href={link.path} isActive={isActive}>
            {"wideName" in link && link.wideName ? (
              <>
                <span className="xl:hidden">{link.name}</span>
                <span className="hidden xl:inline">{link.wideName}</span>
              </>
            ) : (
              link.name
            )}
          </NavLink>
        );
      })}

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "inline-flex h-10 items-center gap-1 border-b-2 border-transparent px-1 font-medium whitespace-nowrap outline-none transition-colors",
            "text-[13px] xl:text-sm xxl:text-[15px] text-gray-700 hover:text-brand"
          )}
        >
          More
          <ChevronDown className="h-4 w-4 shrink-0" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="min-w-[220px]">
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
