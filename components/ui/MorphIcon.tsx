"use client";

import React from "react";
import { motion } from "framer-motion";

interface MorphIconProps {
  type?: "sparkle" | "flower" | "check" | "chevron" | "close" | "quote";
  className?: string;
  size?: number;
}

export function MorphIcon({ type = "sparkle", className = "", size = 24 }: MorphIconProps) {
  const getPath = () => {
    switch (type) {
      case "sparkle":
        return "M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z";
      case "flower":
        return "M12 2C13.5 6 18 6 18 12C18 18 13.5 18 12 22C10.5 18 6 18 6 12C6 6 10.5 6 12 2Z";
      case "check":
        return "M20 6L9 17L4 12";
      case "chevron":
        return "M9 18L15 12L9 6";
      case "close":
        return "M18 6L6 18M6 6l12 12";
      case "quote":
        return "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-4 6-4 6zm13 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-4 6-4 6z";
      default:
        return "M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z";
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.15, rotate: type === "sparkle" ? 15 : 0 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className={`inline-block ${className}`}
    >
      <motion.path
        d={getPath()}
        initial={{ pathLength: 0.8, opacity: 0.8 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.svg>
  );
}
