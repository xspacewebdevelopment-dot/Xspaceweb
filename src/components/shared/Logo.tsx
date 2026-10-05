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
  const logoSrc = isDark ? "/images/FinalLogo.png" : "/images/FinalLogo-light.png";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center group focus:outline-none transition-opacity hover:opacity-90 select-none",
        className
      )}
      aria-label="XSPACEWEB Home"
    >
      <div className="flex items-center">
        {showText ? (
          <Image
            src={logoSrc}
            alt="XSPACEWEB"
            width={240}
            height={38}
            priority={priority}
            className="h-7 sm:h-8 md:h-[34px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <Image
            src="/logos/logo-icon.png"
            alt="XSPACEWEB Icon"
            width={40}
            height={40}
            priority={priority}
            className="h-7 sm:h-8 md:h-[32px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
    </Link>
  );
};

