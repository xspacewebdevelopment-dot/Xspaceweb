import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "soft" | "navy" | "glass" | "outline";
  radius?: "sm" | "base" | "lg" | "xl";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  interactive?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  radius = "base",
  padding = "md",
  interactive = false,
  className,
  ...props
}) => {
  const variantClasses = {
    default:
      "bg-white border border-slate-200/70 shadow-[0_4px_25px_-2px_rgba(7,21,43,0.06),0_2px_8px_-2px_rgba(7,21,43,0.04)]",
    soft: "bg-[#F8FAFC] border border-slate-200/60 shadow-sm",
    navy: "bg-[#07152B] text-white border border-white/10 shadow-[0_20px_40px_-15px_rgba(7,21,43,0.25)]",
    glass:
      "bg-white/85 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_0_rgba(7,21,43,0.05)]",
    outline: "bg-transparent border border-slate-200/90",
  };

  const radiusClasses = {
    sm: "rounded-[12px]",
    base: "rounded-[16px]",
    lg: "rounded-[24px]",
    xl: "rounded-[32px]",
  };

  const paddingClasses = {
    none: "p-0",
    sm: "p-4 sm:p-5",
    md: "p-6 sm:p-7",
    lg: "p-8 sm:p-10",
    xl: "p-10 sm:p-12",
  };

  const interactiveClasses = interactive
    ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-4px_rgba(7,21,43,0.1),0_4px_12px_-2px_rgba(7,21,43,0.05)] cursor-pointer"
    : "";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        variantClasses[variant],
        radiusClasses[radius],
        paddingClasses[padding],
        interactiveClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
