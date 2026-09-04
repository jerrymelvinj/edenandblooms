"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useModal } from "../providers/ModalProvider";
import { Button } from "../ui/Button";

const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const { openQuoteModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#010618]/95 backdrop-blur-md shadow-brand-lg py-3 border-b border-white/10"
          : "bg-[#010618]/80 backdrop-blur-sm py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="#hero" className="flex items-center group">
          <div className="relative h-10 w-44 sm:h-12 sm:w-52">
            <Image
              src="/assets/logo.png"
              alt="Eden & Blooms Script Logo"
              fill
              priority
              className="object-contain object-left transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveSection(link.name)}
                className={`relative text-sm font-medium transition-colors duration-200 py-1 ${
                  isActive ? "text-white font-semibold" : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FCCDC7] rounded-full"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Button
            variant="metallic"
            size="sm"
            onClick={openQuoteModal}
            className="hidden sm:inline-flex"
          >
            Get a Free Quote
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white rounded-md hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#010618] border-b border-white/10 px-6 py-6 space-y-4 shadow-brand-lg text-white"
          >
            <nav className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.name);
                    setMobileMenuOpen(false);
                  }}
                  className="text-base font-serif font-medium text-white/90 hover:text-white transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="pt-2">
              <Button
                variant="metallic"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openQuoteModal();
                }}
                className="w-full"
              >
                Get a Free Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
