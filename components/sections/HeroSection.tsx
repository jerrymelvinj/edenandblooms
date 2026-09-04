"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight, Image as ImageIcon } from "lucide-react";
import { useModal } from "../providers/ModalProvider";
import { ScrollReveal, ScrollItem } from "../ui/ScrollReveal";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { WebGPUOceanCanvas } from "../canvas/WebGPUOceanCanvas";

export function HeroSection() {
  const { openQuoteModal } = useModal();

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex items-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0F2854] to-[#010618] text-white">
      {/* Integrated WebGPU Ocean Canvas Ambient Background */}
      <WebGPUOceanCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Content Left */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollItem>
              <Badge variant="rose">WE DESIGN | EVENT DECOR STUDIO</Badge>
            </ScrollItem>

            <ScrollItem>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight">
                Affordable & Thoughtful Decor by <span className="text-[#FCCDC7] italic font-normal">Eden & Blooms</span>.
              </h1>
            </ScrollItem>

            <ScrollItem>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
                Elevate your milestones with handcrafted organic balloon arches, botanical floral installations, and signature U-shaped ring backdrops designed to turn ordinary rooms into extraordinary memories.
              </p>
            </ScrollItem>

            <ScrollItem className="flex flex-wrap items-center gap-4 pt-2">
              <Button size="lg" variant="metallic" onClick={openQuoteModal}>
                Get a Free Quote
              </Button>
              <a href="#gallery">
                <Button size="lg" variant="outline" className="gap-2">
                  <ImageIcon className="w-5 h-5 text-[#FCCDC7]" />
                  View Gallery
                </Button>
              </a>
            </ScrollItem>
          </div>

          {/* Hero Image Wrapper Right (Asymmetric Frame Display) */}
          <div className="lg:col-span-6 relative">
            <ScrollItem>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-[4/5] max-w-md lg:max-w-none mx-auto">
                <Image
                  src="/assets/hero_u_ring.jpg"
                  alt="Signature U-Shaped Ring Balloon and Floral Backdrop Setup by Eden & Blooms"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Index Badge top right */}
                <div className="absolute top-4 right-4 bg-[#010618]/80 backdrop-blur-md text-white text-xs font-mono px-3 py-1.5 rounded-full border border-white/20">
                  <span>01</span> | <span>04</span>
                </div>

                {/* Floating Caption Card bottom */}
                <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-2xl flex items-center justify-between shadow-brand-md text-brand-royal-blue">
                  <div>
                    <h4 className="font-serif font-bold text-[#010618] text-sm sm:text-base">
                      Signature U-Shaped Ring Setup
                    </h4>
                    <p className="text-xs text-[#A46755] font-semibold">
                      Rose Gold & Ivory Organic Palette
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#FCCDC7]/40 flex items-center justify-center shrink-0">
                    <ChevronRight className="w-4 h-4 text-[#A46755]" />
                  </div>
                </div>
              </div>
            </ScrollItem>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
