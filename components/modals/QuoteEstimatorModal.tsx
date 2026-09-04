"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, ArrowLeft, Sparkles, Calendar, Phone, User } from "lucide-react";
import { useModal } from "../providers/ModalProvider";
import { Button } from "../ui/Button";

interface EventTypeOption {
  id: string;
  title: string;
  desc: string;
}

interface SetupOption {
  id: string;
  title: string;
  price: number;
  desc: string;
}

interface AddonOption {
  id: string;
  title: string;
  price: number;
}

const EVENT_TYPES: EventTypeOption[] = [
  { id: "birthday", title: "Birthday Celebration", desc: "1st Birthday, Milestone 30th/50th" },
  { id: "baby_shower", title: "Baby & Bridal Shower", desc: "Gender Reveals & Welcome Baby" },
  { id: "wedding", title: "Wedding & Engagement", desc: "Photo Booth Arches & Stage Decor" },
  { id: "corporate", title: "Corporate & Gala", desc: "Brand Activations & Ceremonies" },
];

const SETUP_OPTIONS: SetupOption[] = [
  { id: "u_ring", title: "Signature U-Shaped Ring Setup", price: 15000, desc: "Includes balloon & floral clusters" },
  { id: "circle_ring", title: "Gold Circle Ring Stand Setup", price: 12500, desc: "Asymmetric floral garland" },
  { id: "flex_backdrop", title: "Custom Flex Print Backdrop Wall", price: 18000, desc: "Anti-glare vinyl & arch panels" },
  { id: "floral_arch", title: "Deluxe Floral & Balloon Arch", price: 22000, desc: "Botanical greens & peony accents" },
];

const ADDON_OPTIONS: AddonOption[] = [
  { id: "neon", title: "+ LED Neon Sign ('Better Together')", price: 2500 },
  { id: "vinyl", title: "+ Custom Floor Vinyl Decal", price: 3500 },
  { id: "pampas", title: "+ Pampas Grass & Urn Accents", price: 2000 },
];

const INSTAGRAM_URL = "https://www.instagram.com/eden.and.blooms?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==";

export function QuoteEstimatorModal() {
  const { isQuoteModalOpen, closeQuoteModal, showToast } = useModal();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedEventType, setSelectedEventType] = useState("birthday");
  const [selectedSetup, setSelectedSetup] = useState("u_ring");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");

  if (!isQuoteModalOpen) return null;

  const currentSetupObj = SETUP_OPTIONS.find((s) => s.id === selectedSetup) || SETUP_OPTIONS[0];
  const selectedEventObj = EVENT_TYPES.find((e) => e.id === selectedEventType) || EVENT_TYPES[0];
  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const addonObj = ADDON_OPTIONS.find((a) => a.id === addonId);
    return acc + (addonObj ? addonObj.price : 0);
  }, 0);
  const totalPrice = currentSetupObj.price + addonsTotal;

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeQuoteModal();

    const selectedAddonNames = selectedAddons
      .map((id) => ADDON_OPTIONS.find((a) => a.id === id)?.title)
      .filter(Boolean)
      .join(", ");

    // Formatted inquiry text for Instagram DM
    const inquiryText = `Hi @eden.and.blooms! 🌸 Here is my custom event decor inquiry:\n\n` +
      `👤 Name: ${fullName || "N/A"}\n` +
      `📞 Phone: ${phone || "N/A"}\n` +
      `📅 Event Date: ${eventDate || "N/A"}\n` +
      `🎉 Event Type: ${selectedEventObj.title}\n` +
      `✨ Selected Setup: ${currentSetupObj.title} (₹${currentSetupObj.price.toLocaleString("en-IN")})\n` +
      `➕ Add-ons: ${selectedAddonNames || "None"}\n` +
      `💰 Estimated Total: ₹${totalPrice.toLocaleString("en-IN")}\n\n` +
      `Please confirm date availability and setup details!`;

    // Copy details to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(inquiryText).catch(() => {});
    }

    showToast(`Quote request copied! Opening Instagram (@eden.and.blooms)...`);

    // Redirect to Instagram
    window.open(INSTAGRAM_URL, "_blank");

    // Reset form
    setStep(1);
    setFullName("");
    setPhone("");
    setEventDate("");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuoteModal}
          className="fixed inset-0 bg-[#010618]/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 z-10 my-8 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={closeQuoteModal}
            className="absolute top-4 right-4 p-2 text-brand-text-muted hover:text-brand-royal-blue rounded-full hover:bg-brand-base transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#A46755] uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Instant Decor Estimator
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#010618]">
              Build Your Custom Event Package
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-muted mt-1">
              Get an immediate price estimation in Indian Rupees (₹) and submit directly to Instagram DM (@eden.and.blooms).
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === i
                    ? "w-10 bg-[linear-gradient(90deg,#A46755_0%,#FCCDC7_50%,#CB9183_100%)]"
                    : step > i
                    ? "w-4 bg-[#010618]"
                    : "w-4 bg-brand-border"
                }`}
              />
            ))}
          </div>

          {/* Form Wizard Steps */}
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h4 className="text-xs font-bold text-[#010618] uppercase tracking-widest">
                  1. What type of celebration are you planning?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EVENT_TYPES.map((option) => (
                    <button
                      type="button"
                      key={option.id}
                      onClick={() => setSelectedEventType(option.id)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        selectedEventType === option.id
                          ? "border-[#CB9183] bg-[#FCCDC7]/20 ring-2 ring-[#CB9183]/30"
                          : "border-brand-border hover:border-[#CB9183]/50 bg-brand-base/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-[#010618] text-sm">
                          {option.title}
                        </span>
                        {selectedEventType === option.id && (
                          <Check className="w-4 h-4 text-[#A46755] shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-brand-text-muted mt-1">{option.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="button" variant="metallic" onClick={() => setStep(2)}>
                    Next: Select Decor Setup <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h4 className="text-xs font-bold text-[#010618] uppercase tracking-widest">
                  2. Select Main Focal Setup:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SETUP_OPTIONS.map((setup) => (
                    <button
                      type="button"
                      key={setup.id}
                      onClick={() => setSelectedSetup(setup.id)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        selectedSetup === setup.id
                          ? "border-[#CB9183] bg-[#FCCDC7]/20 ring-2 ring-[#CB9183]/30"
                          : "border-brand-border hover:border-[#CB9183]/50 bg-brand-base/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-[#010618] text-sm">
                          {setup.title}
                        </span>
                        <span className="text-xs font-bold text-[#A46755]">
                          ₹{setup.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className="text-xs text-brand-text-muted mt-1">{setup.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="dark" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button type="button" variant="metallic" onClick={() => setStep(3)}>
                    Next: Add-ons & Contact <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h4 className="text-xs font-bold text-[#010618] uppercase tracking-widest">
                  3. Add-on Enhancements:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {ADDON_OPTIONS.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <button
                        type="button"
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl text-left border text-xs font-medium transition-all ${
                          isSelected
                            ? "border-[#CB9183] bg-[#FCCDC7]/30 text-[#A46755] font-bold"
                            : "border-brand-border bg-brand-base/30 text-brand-text-main hover:border-[#CB9183]/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{addon.title}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                        </div>
                        <span className="block text-[11px] opacity-75 mt-0.5">
                          +₹{addon.price.toLocaleString("en-IN")}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Total Summary Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FCCDC7]/30 to-[#CB9183]/20 border border-[#CB9183]/40 flex items-center justify-between my-4">
                  <div>
                    <span className="text-xs text-brand-text-muted block font-medium">
                      Estimated Total (Includes Setup & Teardown):
                    </span>
                    <span className="text-2xl font-serif font-bold text-[#010618]">
                      ₹{totalPrice.toLocaleString("en-IN")}.00
                    </span>
                  </div>
                  <Sparkles className="w-6 h-6 text-[#A46755]" />
                </div>

                {/* Contact Inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#010618] mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3 text-brand-text-muted" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Sarah Jenkins"
                        className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-brand-border focus:border-[#CB9183] focus:ring-1 focus:ring-[#CB9183] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#010618] mb-1">
                        Phone / Instagram Handle *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-3 text-brand-text-muted" />
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="@yourhandle or +91 8248604075"
                          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-brand-border focus:border-[#CB9183] focus:ring-1 focus:ring-[#CB9183] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#010618] mb-1">
                        Event Date *
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-3 text-brand-text-muted" />
                        <input
                          type="date"
                          required
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-brand-border focus:border-[#CB9183] focus:ring-1 focus:ring-[#CB9183] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="dark" onClick={() => setStep(2)}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button type="submit" variant="metallic">
                    Send Inquiry on Instagram
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
