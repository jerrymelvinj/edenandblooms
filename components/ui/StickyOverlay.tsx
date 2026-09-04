"use client";

import React from "react";
import { motion } from "framer-motion";

interface StickyOverlayProps {
  children: React.ReactNode;
  zIndex: number;
  topOffset?: string;
  className?: string;
}

export function StickyOverlay({
  children,
  zIndex,
  topOffset = "top-16 lg:top-24",
  className = "",
}: StickyOverlayProps) {
  return (
    <div
      className={`sticky ${topOffset} transition-all duration-300 ${className}`}
      style={{ zIndex }}
    >
      <motion.div
        initial={{ opacity: 0.95, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="shadow-2xl border border-[#FCCDC7]/40 rounded-3xl overflow-hidden bg-white/95 backdrop-blur-md"
      >
        {children}
      </motion.div>
    </div>
  );
}
