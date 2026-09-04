"use client";

import React from "react";
import { Sparkles, Layers, Clock } from "lucide-react";
import { ScrollReveal, ScrollItem } from "../ui/ScrollReveal";

const VALUE_PROPS = [
  {
    icon: Sparkles,
    title: "Custom Designs",
    desc: "Bespoke color palettes and theme conceptualizations tailored to your unique celebration.",
  },
  {
    icon: Layers,
    title: "Premium Materials",
    desc: "High-density organic latex balloons, realistic silk florals, and vibrant flex print backdrops.",
  },
  {
    icon: Clock,
    title: "Setup & Breakdown",
    desc: "Punctual delivery, full white-glove installation, and seamless end-of-event breakdown included.",
  },
];

export function ValuePropsSection() {
  return (
    <section id="value-props" className="py-16 bg-white border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-brand-border/60">
          {VALUE_PROPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollItem key={idx} className={`${idx !== 0 ? "pt-8 md:pt-0 md:pl-8" : ""}`}>
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-brand-md bg-brand-rose-gold-light text-brand-rose-gold flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-brand-royal-blue">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollItem>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
