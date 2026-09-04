"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { useModal } from "../providers/ModalProvider";
import { ScrollReveal } from "../ui/ScrollReveal";
import { StickyOverlay } from "../ui/StickyOverlay";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

const SERVICES = [
  {
    id: "01",
    tag: "FEATURED SERVICE 01",
    title: "Balloon & Floral Arrangements",
    desc: "Organic balloon garlands blended seamlessly with premium silk or fresh botanical blooms. We create high-impact entrance arches, photo booth accents, and table centerpiece wraps.",
    features: [
      "100% Biodegradable & Organic Latex Balloons",
      "Hand-selected Botanical Greens & Peony Accents",
      "Custom Color Match to Match Event Theme",
    ],
    image: "/assets/service_balloon_floral.jpg",
    alt: "Organic Balloon & Floral Garlands Setup",
    theme: "metallic",
  },
  {
    id: "02",
    tag: "FEATURED SERVICE 02",
    title: "Ring-Shaped & U-Shaped Stands",
    desc: "Our signature metal ring frames and U-shaped arches form a majestic focal point for photos, cake displays, and stage backdrops. Designed to anchor your venue visually.",
    features: [
      "Heavy-duty Gold & Rose Gold Metallic Arch Frames",
      "Asymmetric & Full Circle Balloon Clusters",
      "Compatible with Welcome Signage & Pampas Grass",
    ],
    image: "/assets/service_ring_stand.jpg",
    alt: "Signature Gold Ring Stand and U-Shaped Frame Decor",
    theme: "metallic",
  },
  {
    id: "03",
    tag: "FEATURED SERVICE 03",
    title: "Custom Backgrounds & Flex Prints",
    desc: "Make a statement with custom high-resolution flex print wall backdrops, personalized name typography, LED neon light signs, and arch backdrop panels.",
    features: [
      "High-Resolution Anti-Glare Vinyl Flex Printing",
      "Warm White & Rose Pink LED Neon Sign Add-ons",
      "Multi-depth Arch Boards & Shimmer Panels",
    ],
    image: "/assets/service_custom_bg.jpg",
    alt: "Custom Flex Print Backdrop with Neon Sign and Balloon Framing",
    theme: "white",
  },
];

export function ServicesSection() {
  const { openQuoteModal } = useModal();

  return (
    <section id="services" className="py-20 lg:py-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0F2854] to-[#010618] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="rose">OUR SPECIALTIES</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
            Bespoke Decor Offerings
          </h2>
          <p className="text-base text-white/80">
            Thoughtfully curated decor setups built to match your venue space and personal budget.
          </p>
        </ScrollReveal>

        {/* Sticky Stacking Card List */}
        <div className="space-y-12 lg:space-y-16">
          {SERVICES.map((service, index) => {
            const isReverse = index % 2 !== 0;
            const zIndex = 10 + index * 10;
            const isMetallic = service.theme === "metallic";

            return (
              <StickyOverlay
                key={service.id}
                zIndex={zIndex}
                topOffset="top-24 lg:top-28"
                className="mb-8"
              >
                <div
                  className={`p-6 sm:p-10 lg:p-12 rounded-3xl transition-all duration-300 ${
                    isMetallic
                      ? "bg-[linear-gradient(90deg,#A46755_0%,#FCCDC7_50%,#CB9183_100%)] text-[#0E1B38]"
                      : "bg-[#FAF8F5] text-[#0E1B38]"
                  }`}
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                      isReverse ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Service Image */}
                    <div
                      className={`lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-brand-md border border-black/10 ${
                        isReverse ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>

                    {/* Service Text */}
                    <div
                      className={`lg:col-span-6 space-y-5 ${
                        isReverse ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <span className="inline-block text-xs font-mono tracking-widest uppercase font-bold text-[#0E1B38]/70">
                        {service.tag}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0E1B38]">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#0E1B38]/80 leading-relaxed">
                        {service.desc}
                      </p>

                      <ul className="space-y-2.5 pt-2">
                        {service.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2.5 text-xs sm:text-sm text-[#0E1B38] font-semibold"
                          >
                            <div className="w-5 h-5 rounded-full bg-[#0E1B38]/10 text-[#0E1B38] flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4">
                        <Button
                          variant={isMetallic ? "dark" : "metallic"}
                          onClick={openQuoteModal}
                        >
                          Request Setup Quote
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </StickyOverlay>
            );
          })}
        </div>
      </div>
    </section>
  );
}
