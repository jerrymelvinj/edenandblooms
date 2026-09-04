"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useModal } from "../providers/ModalProvider";

export function LightboxModal() {
  const {
    lightboxImages,
    activeImageIndex,
    closeLightbox,
    nextLightboxImage,
    prevLightboxImage,
  } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "ArrowRight") nextLightboxImage();
      if (e.key === "ArrowLeft") prevLightboxImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, nextLightboxImage, prevLightboxImage, closeLightbox]);

  if (activeImageIndex === null || !lightboxImages[activeImageIndex]) return null;

  const currentImage = lightboxImages[activeImageIndex];
  const totalCount = lightboxImages.length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
          className="fixed inset-0 bg-[#010618]/90 backdrop-blur-md"
        />

        {/* Previous Button (Left Side) */}
        {totalCount > 1 && (
          <button
            onClick={prevLightboxImage}
            aria-label="Previous Image"
            className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3.5 bg-[#010618]/80 hover:bg-[#0F2854] text-white rounded-full border border-white/20 shadow-2xl transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-[#FCCDC7]" />
          </button>
        )}

        {/* Next Button (Right Side) */}
        {totalCount > 1 && (
          <button
            onClick={nextLightboxImage}
            aria-label="Next Image"
            className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3.5 bg-[#010618]/80 hover:bg-[#0F2854] text-white rounded-full border border-white/20 shadow-2xl transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-[#FCCDC7]" />
          </button>
        )}

        {/* Modal Card */}
        <motion.div
          key={activeImageIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-4xl w-full bg-[#010618] rounded-brand-lg overflow-hidden shadow-2xl border border-[#FCCDC7]/30 z-40 my-auto"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="relative aspect-[4/3] w-full bg-black/60">
            <Image
              src={currentImage.src}
              alt={currentImage.title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          {/* Caption Bar */}
          <div className="p-5 sm:p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0F2854] to-[#010618] text-white flex items-center justify-between border-t border-white/10">
            <div>
              <h4 className="text-lg sm:text-xl font-serif font-bold text-white mb-1">
                {currentImage.title}
              </h4>
              <p className="text-xs text-[#FCCDC7] uppercase tracking-widest font-semibold">
                {currentImage.subtitle}
              </p>
            </div>

            <div className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/10 text-white/80 border border-white/10">
              {activeImageIndex + 1} / {totalCount}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
