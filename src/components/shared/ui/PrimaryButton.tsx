import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  icon?: boolean | React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  href,
  children,
  icon = true,
  size = "md",
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-5 py-2 text-xs font-semibold gap-1.5",
    md: "px-6 py-2.5 text-sm font-semibold gap-2",
    lg: "px-8 py-3.5 text-base font-semibold gap-2.5",
  };

  const content = (
    <>
      <span>{children}</span>
      {icon === true ? (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : (
        icon
      )}
    </>
  );

  const baseClasses = cn(
    "group inline-flex items-center justify-center rounded-full font-sans transition-all duration-200 cursor-pointer select-none",
    "bg-[#1668E8] text-white hover:bg-[#1255C0] active:scale-[0.98]",
    "shadow-[0_10px_25px_-4px_rgba(22,104,232,0.35)] hover:shadow-[0_12px_28px_-4px_rgba(22,104,232,0.45)]",
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {content}
    </button>
  );
};
