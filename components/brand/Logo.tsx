import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { img: "h-8 w-auto", text: "text-lg" },
  md: { img: "h-10 w-auto", text: "text-xl md:text-2xl" },
  lg: { img: "h-12 w-auto", text: "text-2xl md:text-3xl" },
};

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const s = sizes[size];

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2", className)}
      aria-label="MHM Digital home"
    >
      <Image
        src="/images/logo.png"
        alt="MHM Digital logo"
        width={120}
        height={40}
        priority
        className={s.img}
      />
      {showText && (
        <span className={cn("font-bold tracking-tight", s.text)}>
          <span className="text-red-500">MHM</span>
          <span className="text-gray-900">Digital</span>
        </span>
      )}
    </Link>
  );
}
