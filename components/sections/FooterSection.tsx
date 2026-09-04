"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Instagram, Facebook, Mail, Send } from "lucide-react";
import { useModal } from "../providers/ModalProvider";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Button } from "../ui/Button";

export function FooterSection() {
  const { openQuoteModal, showToast } = useModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Thank you ${name || "there"}! Your message has been sent to edenandblooms@gmail.com. We will respond shortly.`);
    setName("");
    setEmail("");
    setEventDetails("");
    setMessage("");
  };

  return (
    <footer id="contact" className="bg-[#010618] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Banner inside Dark Footer */}
        <ScrollReveal className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0F2854] to-[#010618] rounded-3xl p-8 sm:p-12 mb-16 text-center space-y-4 border border-white/20 shadow-2xl">
          <span className="text-xs font-bold tracking-widest text-[#FCCDC7] uppercase">
            LET&apos;S CELEBRATE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white max-w-3xl mx-auto leading-tight">
            Ready to Make Your Next Event Extraordinary?
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
            Book your event date early to reserve our signature U-shaped ring setup and custom backdrop panels.
          </p>
          <div className="pt-2">
            <Button onClick={openQuoteModal} size="lg" variant="metallic">
              Get a Free Instant Quote
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative h-12 w-52 mb-2">
              <Image
                src="/assets/logo.png"
                alt="Eden & Blooms Script Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              Affordable & Thoughtful Event Decor Studio. Crafting unforgettable balloon garlands, floral arches, and custom backdrops with passion.
            </p>

            {/* Social & Mail Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/eden.and.blooms?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[linear-gradient(90deg,#A46755_0%,#FCCDC7_50%,#CB9183_100%)] hover:text-[#010618] text-white flex items-center justify-center transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61590282037328"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[linear-gradient(90deg,#A46755_0%,#FCCDC7_50%,#CB9183_100%)] hover:text-[#010618] text-white flex items-center justify-center transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="mailto:edenandblooms@gmail.com"
                aria-label="Email Us"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[linear-gradient(90deg,#A46755_0%,#FCCDC7_50%,#CB9183_100%)] hover:text-[#010618] text-white flex items-center justify-center transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Minimalist Direct Lead Form */}
          <div className="lg:col-span-5 bg-[#0F2854]/40 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4 shadow-brand-md">
            <h4 className="font-serif font-bold text-lg text-white">Send Us a Message</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FCCDC7]"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FCCDC7]"
                />
              </div>

              <input
                type="text"
                required
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
                placeholder="Event Type & Estimated Date"
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FCCDC7]"
              />

              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your theme or vision..."
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FCCDC7] resize-none"
              />

              <Button type="submit" variant="metallic" className="w-full gap-2">
                <Send className="w-4 h-4" /> Send Inquiry
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-lg text-white">Decor Services</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-white/70">
              <li>
                <a href="#services" className="hover:text-[#FCCDC7] transition-colors">
                  U-Shaped Ring Setups
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FCCDC7] transition-colors">
                  Organic Balloon Garlands
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FCCDC7] transition-colors">
                  Custom Flex Print Backdrops
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FCCDC7] transition-colors">
                  Botanical Floral Arches
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FCCDC7] transition-colors">
                  LED Neon Light Rentals
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-3 text-center sm:text-left">
          <div>&copy; 2026 Eden & Blooms. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="mailto:edenandblooms@gmail.com" className="hover:text-[#FCCDC7] transition-colors">
              edenandblooms@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
