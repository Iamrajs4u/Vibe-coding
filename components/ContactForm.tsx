"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import confetti from "canvas-confetti";

interface ContactFormProps {
  initialProject?: string;
  initialPropertyType?: string;
}

export default function ContactForm({
  initialProject = "Aurelia (Hyderabad)",
  initialPropertyType = "3 BHK Grand Horizon",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: initialProject,
    propertyType: initialPropertyType,
    message: "",
  });

  const [prevProps, setPrevProps] = useState({
    project: initialProject,
    propertyType: initialPropertyType,
  });

  if (
    prevProps.project !== initialProject ||
    prevProps.propertyType !== initialPropertyType
  ) {
    setPrevProps({
      project: initialProject,
      propertyType: initialPropertyType,
    });
    setFormData((prev) => ({
      ...prev,
      project: initialProject,
      propertyType: initialPropertyType,
    }));
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury consultation request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Gold confetti celebration
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#d4af37", "#f5e8c7", "#ffffff", "#aa8c2c"],
      });
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-[#0a0c10] text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[500px] ambient-glow opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Brand Statement & Direct Concierge (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#d4af37] font-semibold">
                  Direct Inhabitation Advisory
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]">
                START A PRIVATE <br />
                <span className="gold-text-gradient font-bold">CONVERSATION</span>
              </h2>
              <p className="mt-4 text-sm text-zinc-300 font-light leading-relaxed">
                We believe spatial acquisitions are life decisions. Our Senior Real Estate Partners and Project Architects are available for discreet, confidential consultations globally.
              </p>
            </div>

            {/* Direct Contact Points */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-white/[0.04] border border-white/10 text-[#d4af37]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                    Private Client Desk
                  </span>
                  <a
                    href="tel:+914048209900"
                    className="text-sm font-mono text-zinc-200 hover:text-[#d4af37] transition-colors"
                  >
                    +91 40 4820 9900 / +91 99880 12000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-white/[0.04] border border-white/10 text-[#d4af37]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                    Confidential Dossier Inquiries
                  </span>
                  <a
                    href="mailto:atelier@valmont-horizons.luxury"
                    className="text-sm font-mono text-zinc-200 hover:text-[#d4af37] transition-colors"
                  >
                    atelier@valmont-horizons.luxury
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-white/[0.04] border border-white/10 text-[#d4af37]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                    Global Atelier Headquarters
                  </span>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
                    Valmont Tower, 45 Financial District Way, Nanakramguda, Hyderabad 500032
                  </p>
                </div>
              </div>
            </div>

            {/* Discretion Note */}
            <div className="p-4 rounded-xs bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-400 font-light">
              <span className="text-[#d4af37] font-semibold">Strict Privacy Protocol:</span> All consultations and inquiries are protected under institutional NDA agreements upon request.
            </div>
          </div>

          {/* Right Column: Premium Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#0c0e14] rounded-xs border border-white/10 p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikramaditya Singhania"
                        className="w-full bg-[#12151d] border border-white/10 rounded-xs px-4 py-3 text-xs text-white focus:border-[#d4af37] focus:outline-none placeholder:text-zinc-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="v.singhania@apexholding.com"
                        className="w-full bg-[#12151d] border border-white/10 rounded-xs px-4 py-3 text-xs text-white focus:border-[#d4af37] focus:outline-none placeholder:text-zinc-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98000 00000"
                        className="w-full bg-[#12151d] border border-white/10 rounded-xs px-4 py-3 text-xs text-white focus:border-[#d4af37] focus:outline-none placeholder:text-zinc-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                        Interested Project
                      </label>
                      <select
                        value={formData.project}
                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                        className="w-full bg-[#12151d] border border-white/10 rounded-xs px-4 py-3 text-xs text-white focus:border-[#d4af37] focus:outline-none transition-colors"
                      >
                        <option value="Aurelia (Hyderabad)">Aurelia (Hyderabad)</option>
                        <option value="The Orchard (Bengaluru)">The Orchard (Bengaluru)</option>
                        <option value="Vertex One (Mumbai)">Vertex One (Mumbai)</option>
                        <option value="Serenity Heights (Hyderabad)">Serenity Heights (Hyderabad)</option>
                        <option value="Bespoke Commission">Bespoke Architectural Commission</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                        Property Type
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full bg-[#12151d] border border-white/10 rounded-xs px-4 py-3 text-xs text-white focus:border-[#d4af37] focus:outline-none transition-colors"
                      >
                        <option value="2 BHK Executive Haven">2 BHK Executive Haven</option>
                        <option value="3 BHK Grand Horizon">3 BHK Grand Horizon</option>
                        <option value="4 BHK Palatial Sky Villa">4 BHK Palatial Sky Villa</option>
                        <option value="The Sky Sanctuary Penthouse">Sky Sanctuary Penthouse</option>
                        <option value="Private Estate Villa">Private Estate Villa</option>
                        <option value="Commercial Monolith Floor">Commercial Monolith Floor</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                      Specific Architectural or Spatial Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention preferred floor heights, orientation, timeline, or private vehicle collection capacity..."
                      className="w-full bg-[#12151d] border border-white/10 rounded-xs p-4 text-xs text-white focus:border-[#d4af37] focus:outline-none placeholder:text-zinc-600 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-cursor-text="CONSULT"
                    className="w-full py-4 bg-[#d4af37] hover:bg-[#e5c07b] text-[#07080a] font-bold text-xs uppercase tracking-[0.25em] transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Transmitting Secure Dossier...</span>
                    ) : (
                      <>
                        <span>Request A Private Consultation</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl text-white">
                    Consultation Request Registered
                  </h3>

                  <p className="text-sm text-zinc-300 font-light max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-[#d4af37] font-medium">{formData.name}</span>. Our Managing Real Estate Partner has received your confidential inquiry for <span className="text-white">{formData.project}</span>.
                  </p>

                  <div className="p-4 rounded-xs bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-zinc-400 max-w-sm mx-auto">
                    EXPECTED DISPATCH: WITHIN 2 HOURS VIA ENCRYPTED CLIENT PORTAL
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        project: "Aurelia (Hyderabad)",
                        propertyType: "3 BHK Grand Horizon",
                        message: "",
                      });
                    }}
                    className="px-8 py-3 rounded-xs border border-white/20 text-xs font-mono uppercase tracking-widest text-zinc-300 hover:text-white hover:border-[#d4af37] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
