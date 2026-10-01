import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light"; // dark = dark text (for light background), light = white text (for navy background)
  showText?: boolean;
  priority?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  variant = "dark",
  showText = true,
  priority = true,
}) => {
  const isDark = variant === "dark";



  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center group focus:outline-none transition-opacity hover:opacity-90 select-none",
        className
      )}
      aria-label="XSPACEWEB Home"
    >
      <div className="flex items-center gap-2 sm:gap-2.5">
        <Image
          src="/logos/logo-icon.png"
          alt="XSPACEWEB Icon"
          width={40}
          height={40}
          priority={priority}
          className="h-7 sm:h-8 md:h-[32px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {showText && (
          <span
            className={cn(
              "text-[18px] sm:text-[20px] md:text-[21px] font-black tracking-tight select-none leading-none",
              isDark ? "text-[#07152B]" : "text-white"
            )}
          >
            SPACEWEB
          </span>
        )}
      </div>
    </Link>
  );
};

