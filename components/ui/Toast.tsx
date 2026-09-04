"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useModal } from "../providers/ModalProvider";

export function Toast() {
  const { toastMessage } = useModal();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 bg-brand-royal-blue text-white rounded-full shadow-brand-lg border border-brand-rose-gold-border/40 text-sm font-medium"
        >
          <CheckCircle2 className="w-5 h-5 text-brand-rose-gold shrink-0" />
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
