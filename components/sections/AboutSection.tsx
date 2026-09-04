"use client";

import React from "react";
import Image from "next/image";
import { ScrollReveal, ScrollItem } from "../ui/ScrollReveal";
import { Badge } from "../ui/Badge";

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal staggerChildren={0.15} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* About Image Left */}
          <div className="lg:col-span-6">
            <ScrollItem>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#CB9183]/30 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                <Image
                  src="/assets/about_detail.jpg"
                  alt="Eden & Blooms Design Studio Moodboard and Floral Styling Workstation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollItem>
          </div>

          {/* About Content Right */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollItem>
              <Badge variant="rose">ABOUT EDEN & BLOOMS</Badge>
            </ScrollItem>

            <ScrollItem>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#010618] leading-tight">
                Designing Beautiful Events with Soul.
              </h2>
            </ScrollItem>

            <ScrollItem>
              <p className="text-base text-brand-text-muted leading-relaxed">
                At Eden & Blooms, we believe that great event decor goes beyond aesthetic surface appeal. It is about creating intimate, joyful spaces that reflect your personality and elevate every photo taken on your special day.
              </p>
            </ScrollItem>

            <ScrollItem>
              <p className="text-base text-brand-text-muted leading-relaxed">
                Whether you&apos;re hosting an intimate 1st birthday, an elegant baby shower, or a grand wedding photo booth, our team handles every balloon curve, floral stem, and custom backdrop print with meticulous care.
              </p>
            </ScrollItem>

            {/* Founder Signature */}
            <ScrollItem className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
              <div>
                <span className="font-script text-2xl text-[#A46755] italic font-semibold block">
                  Eden & Blooms Decor Studio
                </span>
                <span className="text-xs font-mono tracking-widest text-[#010618]/70 uppercase font-semibold">
                  FOUNDER & LEAD DECOR STYLIST
                </span>
              </div>
            </ScrollItem>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
