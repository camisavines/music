"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50 " +
      "disabled:opacity-40 disabled:cursor-not-allowed rounded-md";

    const variants = {
      // Gold primary — warm, refined fill
      primary:
        "bg-gold-400 text-dark-950 font-semibold " +
        "hover:bg-gold-300 active:scale-[0.97] " +
        "shadow-[0_0_18px_rgba(201,168,76,0.3)] " +
        "hover:shadow-[0_0_28px_rgba(201,168,76,0.5)]",
      // Deep violet secondary
      secondary:
        "bg-violet-500 text-white font-semibold " +
        "hover:bg-violet-400 active:scale-[0.97] " +
        "shadow-[0_0_18px_rgba(124,58,237,0.3)] " +
        "hover:shadow-[0_0_28px_rgba(124,58,237,0.5)]",
      // Ghost — minimal
      ghost:
        "bg-transparent text-gold-400 hover:bg-gold-400/8 active:scale-[0.97]",
      // Outline — elegant hairline border, no glow at rest
      outline:
        "bg-transparent border border-gold-400/35 text-gold-400 " +
        "hover:bg-gold-400/8 hover:border-gold-400/60 active:scale-[0.97] " +
        "transition-[background,border-color,box-shadow] duration-300",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-sm px-7 py-3 gap-2 tracking-[0.06em]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-3.5 w-3.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
