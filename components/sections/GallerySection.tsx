"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { useModal } from "../providers/ModalProvider";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Badge } from "../ui/Badge";

interface GalleryItem {
  id: string;
  category: "ring" | "floral" | "backdrop";
  title: string;
  sub: string;
  image: string;
  aspect?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    category: "ring",
    title: "Sunset Garden U-Shaped Arch",
    sub: "Outdoor Wedding Reception",
    image: "/assets/gallery_1.jpg",
    aspect: "aspect-[4/5]",
  },
  {
    id: "2",
    category: "backdrop",
    title: "30th Birthday Backdrop Wall",
    sub: "Flex Print & Rose Gold Arch",
    image: "/assets/gallery_2.jpg",
    aspect: "aspect-[4/3]",
  },
  {
    id: "3",
    category: "ring",
    title: "Pastel Baby Shower Ring",
    sub: "Circle Frame & Plush Decor",
    image: "/assets/gallery_3.jpg",
    aspect: "aspect-[4/5]",
  },
  {
    id: "4",
    category: "floral",
    title: "Romantic Rose Gold Arch",
    sub: "Wedding Photo Booth Setup",
    image: "/assets/gallery_4.jpg",
    aspect: "aspect-[4/3]",
  },
  {
    id: "5",
    category: "floral",
    title: "Blush Peony & Floral Arch",
    sub: "Custom Botanical Garland",
    image: "/assets/service_balloon_floral.jpg",
    aspect: "aspect-[4/3]",
  },
  {
    id: "6",
    category: "backdrop",
    title: "'Better Together' Neon Backdrop",
    sub: "Layered Panels & Neon Illumination",
    image: "/assets/service_custom_bg.jpg",
    aspect: "aspect-[4/5]",
  },
];

const FILTERS = [
  { id: "all", label: "All Setups" },
  { id: "ring", label: "Ring Setups" },
  { id: "floral", label: "Floral Arches" },
  { id: "backdrop", label: "Custom Backdrops" },
];

export function GallerySection() {
  const { openLightbox } = useModal();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredItems =
    activeFilter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const handleImageClick = (idx: number) => {
    const formattedImages = filteredItems.map((item) => ({
      src: item.image,
      title: item.title,
      subtitle: item.sub,
    }));
    openLightbox(formattedImages, idx);
  };

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-[#010618] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="rose">VISUAL PROOF</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
            Event Portfolio & Recent Setups
          </h2>
          <p className="text-base text-white/80">
            Explore real event transformations completed for our delighted clients.
          </p>
        </ScrollReveal>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {FILTERS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-[linear-gradient(90deg,#A46755_0%,#FCCDC7_50%,#CB9183_100%)] text-white shadow-brand-md border border-white/20"
                    : "bg-[#0F2854] text-white/80 hover:text-white border border-white/10 hover:border-white/30"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dense Responsive Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                onClick={() => handleImageClick(idx)}
                className={`relative group rounded-3xl overflow-hidden shadow-2xl cursor-pointer border border-white/10 bg-[#0F2854] ${
                  item.aspect || "aspect-[4/3]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#010618]/95 via-[#010618]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
                    <div className="w-8 h-8 rounded-full bg-[#FCCDC7] text-[#010618] flex items-center justify-center mb-2">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                    <h4 className="text-lg font-serif font-bold text-white leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#FCCDC7] font-medium">
                      {item.sub}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
