"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  number: string;
  label: string;
  detail: string;
  subtext: string;
}

const stats: StatItem[] = [
  {
    number: "25+",
    label: "Years of Excellence",
    detail: "EST. 2001",
    subtext: "Pioneering architectural landmarks across prime metropolitan skylines.",
  },
  {
    number: "40+",
    label: "Landmark Developments",
    detail: "PORTFOLIO",
    subtext: "Iconic towers, cantilevered sky-villas, and carbon-negative corporate citadels.",
  },
  {
    number: "8M+",
    label: "Sq. Ft. Delivered",
    detail: "BUILT SPACE",
    subtext: "Uncompromising structural precision using monolithic stone and triple-glazed curtain walls.",
  },
  {
    number: "12K+",
    label: "Families & Businesses",
    detail: "COMMUNITY",
    subtext: "Discerning residents and Fortune 500 enterprises who call Valmont spaces home.",
  },
];

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-[#0a0c10] border-y border-white/[0.06] overflow-hidden"
    >
      {/* Background Subtle Blueprint Grid Lines */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] ambient-glow blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header Tag */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/[0.08]">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#d4af37] font-semibold">
              The Measure of Distinction
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide mt-2">
              MONUMENTAL SCALE. CRAFTED WITH HONESTY.
            </h2>
          </div>
          <div className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
            {"LAT 17°26'N · LON 78°23'E · VALMONT ATELIER"}
          </div>
        </div>

        {/* 4 Editorial Stat Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col relative group"
            >
              {/* Top Accent Line */}
              <div className="w-12 h-[1px] bg-[#d4af37]/50 mb-6 group-hover:w-full transition-all duration-700" />

              <div className="flex items-baseline justify-between">
                <span className="text-[9px] font-mono tracking-[0.28em] text-[#d4af37] uppercase">
                  {item.detail}
                </span>
                <span className="text-[10px] text-zinc-600 font-mono">
                  0{idx + 1}
                </span>
              </div>

              {/* Stat Big Figure */}
              <div className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-tighter my-3 gold-text-gradient">
                {item.number}
              </div>

              {/* Label */}
              <div className="font-display text-base sm:text-lg text-zinc-200 tracking-wide font-medium">
                {item.label}
              </div>

              {/* Detail paragraph */}
              <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                {item.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
