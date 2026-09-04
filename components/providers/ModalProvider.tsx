"use client";

import React, { createContext, useContext, useState } from "react";

export interface LightboxImage {
  src: string;
  title: string;
  subtitle: string;
}

interface ModalContextType {
  isQuoteModalOpen: boolean;
  openQuoteModal: () => void;
  closeQuoteModal: () => void;
  lightboxImages: LightboxImage[];
  activeImageIndex: number | null;
  openLightbox: (images: LightboxImage[], initialIndex: number) => void;
  closeLightbox: () => void;
  nextLightboxImage: () => void;
  prevLightboxImage: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openQuoteModal = () => setIsQuoteModalOpen(true);
  const closeQuoteModal = () => setIsQuoteModalOpen(false);

  const openLightbox = (images: LightboxImage[], initialIndex: number) => {
    setLightboxImages(images);
    setActiveImageIndex(initialIndex);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const nextLightboxImage = () => {
    if (activeImageIndex === null || lightboxImages.length === 0) return;
    setActiveImageIndex((prev) => (prev! + 1) % lightboxImages.length);
  };

  const prevLightboxImage = () => {
    if (activeImageIndex === null || lightboxImages.length === 0) return;
    setActiveImageIndex((prev) =>
      prev! === 0 ? lightboxImages.length - 1 : prev! - 1
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <ModalContext.Provider
      value={{
        isQuoteModalOpen,
        openQuoteModal,
        closeQuoteModal,
        lightboxImages,
        activeImageIndex,
        openLightbox,
        closeLightbox,
        nextLightboxImage,
        prevLightboxImage,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
