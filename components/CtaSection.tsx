"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, Download, CheckCircle2, ArrowRight, X } from "lucide-react";
import confetti from "canvas-confetti";

interface CtaSectionProps {
  onOpenTourModal?: () => void;
}

export default function CtaSection({ onOpenTourModal }: CtaSectionProps) {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isBrochureDownloaded, setIsBrochureDownloaded] = useState(false);
  const [tourSubmitted, setTourSubmitted] = useState(false);
  const [tourDate, setTourDate] = useState("");
  const [tourTime, setTourTime] = useState("11:00 AM");
  const [tourProject, setTourProject] = useState("Aurelia (Hyderabad)");

  const handleDownloadBrochure = () => {
    setIsBrochureDownloaded(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#d4af37", "#f5e8c7", "#ffffff"],
    });

    // Simulate luxury dossier download
    const element = document.createElement("a");
    const file = new Blob(
      [
        `VALMONT HORIZONS · ARCHITECTURAL COLLECTION 2026\n================================================\n\nSpaces That Define Tomorrow.\n\nFLAGSHIP DEVELOPMENTS:\n1. AURELIA - Hyderabad | 42 Cantilevered Sky Villas\n2. THE ORCHARD - Bengaluru | 28 Teak Biophilic Pavilions\n3. VERTEX ONE - Mumbai | 54 Commercial Monolith Levels\n4. SERENITY HEIGHTS - Hyderabad | 84 Curated Acoustic Residences\n\nDirect Partner Atelier: atelier@valmont-horizons.luxury\nClient Advisory: +91 40 4820 9900\n`,
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "Valmont_Horizons_Architectural_Dossier_2026.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTourSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#f5e8c7", "#aa8c2c"],
    });
  };

  return (
    <section className="relative w-full min-h-[90vh] py-32 flex items-center justify-center bg-[#07080a] text-white overflow-hidden">
      {/* Background Night Architecture Image with cinematic parallax */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Nighttime luxury residence"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 opacity-40"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-[#07080a]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]" />
        <div className="absolute inset-0 bg-radial from-transparent to-[#07080a]/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Brand Monogram Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#0d0f14]/80 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#f5e8c7]">
            Private Inhabitation Inquiries
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.08]"
        >
          YOUR NEXT ADDRESS <br />
          <span className="gold-text-gradient font-bold">STARTS HERE.</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-base sm:text-xl text-zinc-300 font-light max-w-xl leading-relaxed"
        >
          “Discover residences designed for the way you want to live.”
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <button
            onClick={() => {
              if (onOpenTourModal) onOpenTourModal();
              else setIsTourModalOpen(true);
            }}
            data-cursor-text="BOOK TOUR"
            className="w-full sm:w-auto px-8 py-4 bg-[#d4af37] hover:bg-[#e5c07b] text-[#07080a] font-bold text-xs uppercase tracking-[0.25em] transition-all duration-300 shadow-[0_0_35px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Calendar className="w-4 h-4" />
            <span>Book A Private Tour</span>
          </button>

          <button
            onClick={handleDownloadBrochure}
            data-cursor-text="DOWNLOAD"
            className="w-full sm:w-auto px-8 py-4 border border-white/25 hover:border-[#d4af37] bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-xs uppercase tracking-[0.25em] backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-[#d4af37]" />
            <span>{isBrochureDownloaded ? "Brochure Downloaded" : "Download Brochure"}</span>
          </button>
        </motion.div>
      </div>

      {/* Private Tour Booking Modal */}
      <AnimatePresence>
        {isTourModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsTourModalOpen(false);
              setTourSubmitted(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#07080a]/95 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-[#0c0e14] border border-[#d4af37]/40 rounded-xs p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)]"
            >
              <button
                onClick={() => {
                  setIsTourModalOpen(false);
                  setTourSubmitted(false);
                }}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-zinc-300 hover:text-white"
                aria-label="Close tour modal"
              >
                <X className="w-4 h-4" />
              </button>

              {!tourSubmitted ? (
                <form onSubmit={handleTourSubmit} className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">
                      Chauffeured Experience
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide mt-1">
                      Schedule A Private Tour
                    </h3>
                    <p className="text-xs text-zinc-400 font-light mt-1">
                      An exclusive viewing with our Private Client Director and Lead Architect.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block mb-1">
                        Select Project
                      </label>
                      <select
                        value={tourProject}
                        onChange={(e) => setTourProject(e.target.value)}
                        className="w-full bg-[#12151d] border border-white/10 rounded-xs px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                      >
                        <option value="Aurelia (Hyderabad)">Aurelia (Hyderabad - Sky Villas)</option>
                        <option value="The Orchard (Bengaluru)">The Orchard (Bengaluru - Teak Villas)</option>
                        <option value="Vertex One (Mumbai)">Vertex One (Mumbai - Commercial Atrium)</option>
                        <option value="Serenity Heights (Hyderabad)">Serenity Heights (Hyderabad - Residences)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          required
                          value={tourDate}
                          onChange={(e) => setTourDate(e.target.value)}
                          className="w-full bg-[#12151d] border border-white/10 rounded-xs px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block mb-1">
                          Preferred Window
                        </label>
                        <select
                          value={tourTime}
                          onChange={(e) => setTourTime(e.target.value)}
                          className="w-full bg-[#12151d] border border-white/10 rounded-xs px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                        >
                          <option value="10:00 AM">10:00 AM (Morning Solar)</option>
                          <option value="02:30 PM">02:30 PM (Afternoon Study)</option>
                          <option value="05:30 PM">05:30 PM (Sunset / Twilight)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lord Alistair Campbell"
                        className="w-full bg-[#12151d] border border-white/10 rounded-xs px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none placeholder:text-zinc-600"
                      >
                      </input>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block mb-1">
                        Contact Number / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98000 00000"
                        className="w-full bg-[#12151d] border border-white/10 rounded-xs px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#d4af37] hover:bg-[#e5c07b] text-[#07080a] font-bold text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Confirm Private Tour Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-3xl text-white">Tour Confirmed</h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-md mx-auto leading-relaxed">
                    Our Private Client Associate will contact you shortly to coordinate chauffeured arrival at <span className="text-[#d4af37]">{tourProject}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setIsTourModalOpen(false);
                      setTourSubmitted(false);
                    }}
                    className="px-6 py-2.5 border border-white/20 text-xs font-mono tracking-widest uppercase text-zinc-300 hover:text-white mt-4"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
