"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Badge } from "../ui/Badge";

interface FaqItem {
  id: string;
  category: "booking" | "pricing" | "setup";
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "1",
    category: "booking",
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 2–4 weeks in advance to secure your event date, custom backdrop panels, and custom typography flex prints.",
  },
  {
    id: "2",
    category: "pricing",
    question: "Do you require a deposit?",
    answer: "Yes, a 50% deposit is required upon booking to lock in your date. The remaining balance is due 3 days prior to your event setup.",
  },
  {
    id: "3",
    category: "setup",
    question: "Where do you provide your services?",
    answer: "We serve the entire metropolitan area and surrounding locations within a 50-mile radius. Delivery fees may apply for extended travel.",
  },
  {
    id: "4",
    category: "setup",
    question: "What is included in the setup package?",
    answer: "Every package includes full delivery, white-glove assembly, theme color styling, and post-event breakdown and removal.",
  },
  {
    id: "5",
    category: "booking",
    question: "Do you offer custom color matching?",
    answer: "Yes! We work closely with you to match organic balloon garlands, silk botanical florals, and flex prints to your exact event color palette.",
  },
  {
    id: "6",
    category: "booking",
    question: "What if I need to cancel or reschedule?",
    answer: "Rescheduling is completely free up to 7 days before your event, subject to calendar availability.",
  },
  {
    id: "7",
    category: "setup",
    question: "Do you handle outdoor event setups?",
    answer: "Yes, outdoor setups are fully supported using heavy-duty weighted arch frames and anti-glare weather-resistant flex vinyl.",
  },
];

const FAQ_TABS = [
  { id: "all", label: "All" },
  { id: "booking", label: "Booking" },
  { id: "pricing", label: "Pricing" },
  { id: "setup", label: "Setup & Delivery" },
];

export function FaqSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [openFaqId, setOpenFaqId] = useState<string | null>("1");

  const filteredFaqs =
    activeTab === "all"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeTab);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-20 lg:py-32 bg-[#FAF8F5] text-brand-royal-blue">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center space-y-3 mb-12">
          <Badge variant="rose">FAQS</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#010618]">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-brand-text-muted">
            Everything you need to know about our decor setups, booking process, and pricing.
          </p>
        </ScrollReveal>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {FAQ_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-[#010618] text-white shadow-brand-md"
                    : "bg-white text-brand-text-muted hover:text-[#010618] border border-brand-border"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Accordion Cards with Ultra Smooth Ease-in-out */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <motion.div
                key={faq.id}
                layout
                transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                className="bg-[#0A1428] rounded-2xl overflow-hidden border border-white/10 shadow-brand-md text-white"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif font-semibold text-base sm:text-lg focus:outline-none cursor-pointer"
                >
                  <span className="text-white">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#FCCDC7]"
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-white/80 leading-relaxed border-t border-white/10 pt-4">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
