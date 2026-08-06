"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SignInButton = () => {
  const pathName = usePathname();

  return (
    <Link
      href="/connexion"
      className={cn(
        "inline-flex h-10 items-center gap-1.5 text-sm font-medium transition-colors",
        pathName === "/connexion" ? "text-brand" : "text-gray-700 hover:text-brand"
      )}
    >
      <User className="size-5 shrink-0" />
      <span className="hidden sm:inline">Sign in</span>
    </Link>
  );
};

export default SignInButton;
