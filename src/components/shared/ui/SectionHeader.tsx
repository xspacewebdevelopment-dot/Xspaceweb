import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  hasDashes?: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center" | "right";
  theme?: "light" | "dark";
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  hasDashes = false,
  title,
  description,
  align = "left",
  theme = "light",
  action,
  className,
}) => {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 mb-10 sm:mb-12 md:mb-16",
        align === "center"
          ? "items-center text-center mx-auto max-w-3xl"
          : "items-start text-left",
        action && "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn("space-y-3", align === "center" ? "mx-auto" : "max-w-3xl")}>
        {eyebrow && (
          <div
            className={cn(
              "inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase",
              isDark ? "text-blue-400" : "text-[#1668E8]"
            )}
          >
            {hasDashes && (
              <span
                className={cn(
                  "w-6 h-[1.5px]",
                  isDark ? "bg-blue-400/60" : "bg-[#1668E8]/60"
                )}
              />
            )}
            <span>{eyebrow}</span>
            {hasDashes && (
              <span
                className={cn(
                  "w-6 h-[1.5px]",
                  isDark ? "bg-blue-400/60" : "bg-[#1668E8]/60"
                )}
              />
            )}
          </div>
        )}

        <h2
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15]",
            isDark ? "text-white" : "text-[#0A1128]"
          )}
        >
          {title}
        </h2>

        {description && (
          <p
            className={cn(
              "text-base sm:text-lg leading-relaxed pt-1",
              isDark ? "text-slate-300" : "text-[#556987]"
            )}
          >
            {description}
          </p>
        )}
      </div>

      {action && <div className="mt-4 md:mt-0 flex-shrink-0">{action}</div>}
    </div>
  );
};
