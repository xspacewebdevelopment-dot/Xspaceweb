import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: "white" | "soft" | "navy" | "transparent";
  spacing?: "sm" | "default" | "lg" | "none";
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  variant = "white",
  spacing = "default",
  className,
  id,
  ...props
}) => {
  const variantClasses = {
    white: "bg-white text-[#0A1128]",
    soft: "bg-[#F8FAFC] text-[#0A1128]",
    navy: "bg-[#07152B] text-white",
    transparent: "bg-transparent",
  };

  const spacingClasses = {
    none: "py-0",
    sm: "py-10 sm:py-14",
    default: "py-16 sm:py-20 lg:py-24",
    lg: "py-20 sm:py-28 lg:py-32",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden",
        variantClasses[variant],
        spacingClasses[spacing],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
