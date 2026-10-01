"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSoundscape } from "@/lib/audio";
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenEnquire?: () => void;
}

export default function Navbar({ onOpenEnquire }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAudio = () => {
    const soundscape = getSoundscape();
    if (soundscape) {
      const active = soundscape.toggle();
      setIsAudioActive(active);
    }
  };

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "3D Showcase", href: "#showcase" },
    { name: "Residences", href: "#residences" },
    { name: "Story", href: "#story" },
    { name: "Location", href: "#location" },
    { name: "Lifestyle", href: "#lifestyle" },
    { name: "Materials", href: "#materials" },
    { name: "Journal", href: "#journal" },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-[#07080a]/80 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo & Monogram */}
          <a
            href="#"
            className="group flex items-center gap-3.5 focus:outline-none"
            aria-label="Valmont Horizons Home"
          >
            <div className="relative w-8 h-8 flex items-center justify-center border border-[#d4af37]/60 rounded-xs bg-[#0d0f14]/80 group-hover:border-[#d4af37] transition-colors duration-300">
              <span className="font-editorial text-xs text-[#d4af37] font-bold tracking-widest">
                VH
              </span>
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-ping opacity-60" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg tracking-[0.25em] text-white font-semibold group-hover:text-[#f5e8c7] transition-colors">
                VALMONT
              </span>
              <span className="text-[8.5px] tracking-[0.38em] text-[#d4af37]/80 uppercase -mt-0.5 font-light">
                HORIZONS
              </span>
            </div>
          </a>

          {/* Center Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[12px] font-medium tracking-[0.16em] uppercase text-zinc-400 hover:text-white transition-colors duration-200 relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Ambient Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] uppercase tracking-widest transition-all duration-300 ${
                isAudioActive
                  ? "border-[#d4af37] bg-[#d4af37]/15 text-[#f5e8c7]"
                  : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white bg-black/20"
              }`}
              title={isAudioActive ? "Mute Ambient Soundscape" : "Play Ambient Soundscape"}
            >
              {isAudioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
                  <span className="text-[10px]">Atmosphere</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-[10px]">Sound</span>
                </>
              )}
            </button>

            {/* Enquire CTA */}
            <button
              onClick={() => {
                if (onOpenEnquire) onOpenEnquire();
                else {
                  const contactEl = document.querySelector("#contact");
                  if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="relative group overflow-hidden px-5 sm:px-6 py-2 rounded-xs border border-[#d4af37]/70 bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/20 to-[#d4af37]/10 text-white text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:border-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]"
            >
              <span className="relative z-10 flex items-center gap-1.5 text-[#f5e8c7] group-hover:text-white transition-colors">
                Enquire
                <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0 opacity-20" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#d4af37]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#07080a]/98 backdrop-blur-2xl flex flex-col justify-between pt-28 pb-12 px-8 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#d4af37] font-semibold">
                Directory
              </span>
              <div className="flex flex-col gap-4">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    href={link.href}
                    className="font-display text-2xl text-zinc-300 hover:text-[#d4af37] transition-colors tracking-wider"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Ambient Sound</span>
                <button
                  onClick={toggleAudio}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 text-xs text-zinc-200"
                >
                  {isAudioActive ? <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" /> : <VolumeX className="w-3.5 h-3.5" />}
                  {isAudioActive ? "Atmosphere Active" : "Atmosphere Muted"}
                </button>
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenEnquire) onOpenEnquire();
                  else {
                    const el = document.querySelector("#contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full py-3.5 bg-[#d4af37] text-[#07080a] font-bold text-xs uppercase tracking-[0.25em] text-center"
              >
                Request Private Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
