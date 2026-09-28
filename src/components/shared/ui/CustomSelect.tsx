"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CustomSelectProps {
  options: (SelectOption | string)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  name?: string;
  id?: string;
  leadingIcon?: React.ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  defaultValue = "",
  onChange,
  placeholder = "Select an option...",
  required = false,
  disabled = false,
  className,
  triggerClassName,
  menuClassName,
  name,
  id,
  leadingIcon,
}) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Normalize options into { value, label, disabled } objects
  const normalizedOptions: SelectOption[] = options.map((opt) => {
    if (typeof opt === "string") {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const [internalValue, setInternalValue] = useState<string>(
    value !== undefined ? value : defaultValue
  );
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  // Synchronize internal value if controlled
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const currentValue = value !== undefined ? value : internalValue;
  const selectedOption = normalizedOptions.find((opt) => opt.value === currentValue);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  const handleSelect = (val: string, optDisabled?: boolean) => {
    if (optDisabled || disabled) return;
    if (value === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
    setIsOpen(false);

    // Trigger validity check if required
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = val;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex((prev) => (prev < normalizedOptions.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(normalizedOptions.length - 1);
      } else {
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : normalizedOptions.length - 1));
      }
    } else if (e.key === "Enter" || e.key === " ") {
      if (isOpen && highlightedIndex >= 0 && highlightedIndex < normalizedOptions.length) {
        e.preventDefault();
        const opt = normalizedOptions[highlightedIndex];
        if (!opt.disabled) {
          handleSelect(opt.value, opt.disabled);
        }
      } else if (!isOpen && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        setIsOpen(true);
      }
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full select-none", className)}>
      {/* Hidden input for native HTML form submission / validation */}
      <input
        ref={hiddenInputRef}
        type="text"
        id={selectId}
        name={name}
        value={currentValue}
        required={required}
        tabIndex={-1}
        aria-hidden="true"
        onChange={() => {}}
        className="sr-only absolute pointer-events-none opacity-0 h-0 w-0 bottom-0 left-0"
      />

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-normal text-left transition-all duration-200 outline-none cursor-pointer",
          "bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/70 focus:bg-white",
          isOpen && "border-[#1668E8] ring-2 ring-[#1668E8]/20 bg-white shadow-sm",
          disabled && "opacity-60 cursor-not-allowed bg-slate-100",
          triggerClassName
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {leadingIcon && (
            <span className="flex-shrink-0 text-slate-400">{leadingIcon}</span>
          )}
          <span
            className={cn(
              "truncate",
              selectedOption
                ? triggerClassName?.includes("text-white")
                  ? "text-white font-medium"
                  : "text-slate-900 font-medium"
                : "text-slate-400 font-normal"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={cn(
            "w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200",
            isOpen && "rotate-180 text-[#1668E8]"
          )}
        />
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="listbox"
            tabIndex={-1}
            className={cn(
              "absolute z-50 left-0 right-0 mt-1.5 max-h-60 overflow-y-auto rounded-2xl bg-white border border-slate-200/90 p-1.5 shadow-xl shadow-slate-900/10 backdrop-blur-md focus:outline-none",
              menuClassName
            )}
          >
            {normalizedOptions.map((opt, idx) => {
              const isSelected = opt.value === currentValue;
              const isHighlighted = idx === highlightedIndex;

              return (
                <div
                  key={`${opt.value}-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  onClick={() => handleSelect(opt.value, opt.disabled)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={cn(
                    "flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer select-none",
                    opt.disabled && "opacity-40 cursor-not-allowed hover:bg-transparent",
                    !opt.disabled && !isSelected && "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900",
                    !opt.disabled && isHighlighted && !isSelected && "bg-slate-100/90 text-slate-900",
                    isSelected && "bg-[#EBF3FE] text-[#1668E8] font-semibold"
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#1668E8] flex-shrink-0 stroke-[2.5]" />
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
