"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  property: string;
}

const testimonials: Testimonial[] = [
  {
    id: "01",
    quote:
      "Every detail feels intentional—from the architecture to the way sunlight moves through the space. Living here feels like living inside a private gallery high above the world.",
    author: "Resident & Private Investor",
    role: "The Aurelia Penthouse",
    property: "Aurelia · Hyderabad",
  },
  {
    id: "02",
    quote:
      "Valmont didn’t just build a home; they framed our entire lifestyle against the sky. The silence inside our sky-villa is cathedral-like, even with the city rushing beneath us.",
    author: "Dr. Vikram & Ananya Rao",
    role: "Founders, BioVance Global",
    property: "The Orchard · Bengaluru",
  },
  {
    id: "03",
    quote:
      "In 30 years of global real estate development, I have rarely witnessed architectural execution at this level of monolithic honesty. The travertine fluting alone is an engineering triumph.",
    author: "Marcus Vance",
    role: "Architectural Critic & Fellow, RIBA",
    property: "Vertex One · Mumbai",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeTestimonial = testimonials[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-28 sm:py-36 bg-[#0a0c10] border-t border-white/[0.06] text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 mb-8">
          <Quote className="w-4 h-4 text-[#d4af37]" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#d4af37] font-semibold">
            Patron Perspectives
          </span>
        </div>

        {/* Big Editorial Quote with Crossfade */}
        <div className="min-h-[260px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <blockquote className="font-serif italic text-2xl sm:text-4xl lg:text-5xl text-[#f5e8c7] font-light leading-[1.25] tracking-wide">
                “{activeTestimonial.quote}”
              </blockquote>

              <div className="flex flex-col items-center">
                <span className="font-display text-base sm:text-lg text-white font-medium tracking-wide">
                  {activeTestimonial.author}
                </span>
                <span className="text-xs text-[#d4af37] font-mono tracking-widest uppercase mt-0.5">
                  {activeTestimonial.role}
                </span>
                <span className="text-[11px] text-zinc-500 font-mono tracking-wider uppercase mt-1">
                  {activeTestimonial.property}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-white/20 text-zinc-400 hover:text-white hover:border-[#d4af37] transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === i ? "w-8 bg-[#d4af37]" : "w-2 bg-white/20"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-white/20 text-zinc-400 hover:text-white hover:border-[#d4af37] transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
