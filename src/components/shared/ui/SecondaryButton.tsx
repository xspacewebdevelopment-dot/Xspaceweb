import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  icon?: boolean | React.ReactNode;
  variant?: "navy" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  href,
  children,
  icon = true,
  variant = "navy",
  size = "md",
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs font-semibold gap-1.5",
    md: "px-5 py-2.5 text-sm font-semibold gap-2",
    lg: "px-7 py-3 text-base font-semibold gap-2.5",
  };

  const variantClasses = {
    navy: "bg-[#07152B] text-white hover:bg-[#0D2344] shadow-sm hover:shadow active:scale-[0.98]",
    outline:
      "border border-[#1668E8] text-[#1668E8] hover:bg-[#EBF3FE] active:scale-[0.98]",
    ghost:
      "bg-transparent text-[#0A1128] hover:bg-slate-100/80 active:scale-[0.98]",
    white:
      "bg-white text-[#07152B] hover:bg-slate-50 border border-slate-200/80 shadow-sm active:scale-[0.98]",
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
    variantClasses[variant],
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
