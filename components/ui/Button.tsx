"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "metallic" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "metallic",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FCCDC7]/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-5 py-2.5 text-xs sm:text-sm font-semibold",
    md: "px-7 py-3 text-sm sm:text-base font-semibold",
    lg: "px-9 py-4 text-base sm:text-lg font-bold",
  };

  const variantStyles = {
    metallic:
      "bg-[linear-gradient(90deg,#A46755_0%,#FCCDC7_50%,#CB9183_100%)] text-white hover:brightness-105 shadow-brand-md border border-white/20",
    primary:
      "bg-[linear-gradient(90deg,#A46755_0%,#FCCDC7_50%,#CB9183_100%)] text-white hover:brightness-105 shadow-brand-md",
    outline:
      "bg-transparent border border-[#FCCDC7] text-white hover:bg-white/10",
    ghost:
      "bg-transparent text-white hover:bg-white/10",
    dark:
      "bg-[#010618] text-white hover:bg-[#0F2854] shadow-brand-md border border-white/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
