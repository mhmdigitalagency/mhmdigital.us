import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** full = horizontal logo; mark = icon + wordmark; icon = app icon only; fullDark = white text logo for dark backgrounds */
  variant?: "full" | "mark" | "icon" | "fullDark";
  size?: "sm" | "md" | "lg";
};

const markSizes = {
  sm: { icon: 32, text: "text-sm" },
  md: { icon: 40, text: "text-base md:text-lg" },
  lg: { icon: 48, text: "text-lg md:text-xl" },
};

const fullSizes = {
  sm: "h-8 w-auto",
  md: "h-10 md:h-11 w-auto",
  lg: "h-12 md:h-14 w-auto",
};

const iconSizes = {
  sm: 32,
  md: 40,
  lg: 56,
};

export function Logo({ className, variant = "mark", size = "md" }: LogoProps) {
  const s = markSizes[size];

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center shrink-0", className)}
      aria-label="MHM Digital home"
    >
      {(variant === "full" || variant === "fullDark") && (
        <Image
          src="/images/logo.png"
          alt="MHM Digital"
          width={1024}
          height={1024}
          priority
          className={cn(fullSizes[size], "object-contain object-left")}
        />
      )}

      {variant === "icon" && (
        <Image
          src="/images/icon.png"
          alt="MHM Digital"
          width={iconSizes[size]}
          height={iconSizes[size]}
          priority
          className="object-contain rounded-2xl"
        />
      )}

      {variant === "mark" && (
        <>
          <Image
            src="/images/icon.png"
            alt=""
            width={s.icon}
            height={s.icon}
            priority
            aria-hidden
            className="object-contain rounded-xl shrink-0"
          />
          <span
            className={cn(
              "ml-2.5 font-bold tracking-wide uppercase leading-none",
              s.text
            )}
          >
            <span className="text-red-500">MHM</span>{" "}
            <span className="font-semibold text-gray-900">Digital</span>
          </span>
        </>
      )}
    </Link>
  );
}
