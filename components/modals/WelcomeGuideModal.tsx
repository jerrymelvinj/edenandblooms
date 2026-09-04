"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ArrowRight, Layers } from "lucide-react";
import { useModal } from "../providers/ModalProvider";
import { Button } from "../ui/Button";

export function WelcomeGuideModal() {
  const { openQuoteModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the welcome popup in this session
    const hasSeenWelcome = sessionStorage.getItem("eden_blooms_welcome_seen");
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // Trigger 1.5s after landing
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("eden_blooms_welcome_seen", "true");
    setIsOpen(false);
  };

  const handleStartGuide = () => {
    handleClose();
    openQuoteModal();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#010618]/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0F2854] via-[#08152E] to-[#010618] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#FCCDC7]/30 z-10 overflow-hidden text-center"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close welcome guide"
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Sparkle Icon Badge */}
          <div className="w-14 h-14 rounded-full bg-[linear-gradient(90deg,#A46755_0%,#FCCDC7_50%,#CB9183_100%)] text-[#010618] flex items-center justify-center mx-auto mb-5 shadow-lg border border-white/20">
            <Sparkles className="w-7 h-7" />
          </div>

          <span className="inline-block text-xs font-bold tracking-widest text-[#FCCDC7] uppercase mb-2">
            WELCOME TO EDEN & BLOOMS
          </span>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3 leading-tight">
            Quick Decor Setup Guide 🌸
          </h3>

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6 max-w-sm mx-auto">
            Take a 10-second interactive tour to explore custom setup options, view price estimations in Rupees (₹), and design your dream event backdrop!
          </p>

          {/* Feature Highlights Pill List */}
          <div className="grid grid-cols-2 gap-2 text-left text-xs text-white/90 mb-6 bg-white/5 p-3 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FCCDC7]" />
              <span>Instant Price Estimates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FCCDC7]" />
              <span>Custom Themes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FCCDC7]" />
              <span>WhatsApp Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FCCDC7]" />
              <span>Add-on Rentals</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="metallic"
              onClick={handleStartGuide}
              className="w-full sm:w-auto gap-2"
            >
              Start Quick Setup Guide <ArrowRight className="w-4 h-4" />
            </Button>
            <button
              onClick={handleClose}
              className="px-5 py-2.5 text-xs text-white/70 hover:text-white font-medium rounded-full transition-colors"
            >
              Skip & Explore Directly
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
