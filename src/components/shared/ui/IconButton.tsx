import React from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "primary" | "dark" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  "aria-label": string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant = "default",
  size = "md",
  className,
  "aria-label": ariaLabel,
  ...props
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const variantClasses = {
    default:
      "bg-white text-slate-700 hover:text-[#1668E8] border border-slate-200/80 shadow-sm hover:shadow hover:border-slate-300 active:scale-95",
    primary:
      "bg-[#1668E8] text-white hover:bg-[#1255C0] shadow-[0_4px_14px_rgba(22,104,232,0.35)] hover:shadow-[0_6px_18px_rgba(22,104,232,0.45)] active:scale-95",
    dark:
      "bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-sm active:scale-95",
    ghost:
      "bg-transparent text-slate-600 hover:text-[#0A1128] hover:bg-slate-100/80 active:scale-95",
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer select-none",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
