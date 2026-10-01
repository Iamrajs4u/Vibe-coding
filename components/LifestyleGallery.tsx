"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface LifestyleCard {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
}

const lifestyleItems: LifestyleCard[] = [
  {
    id: "architecture",
    category: "01 / ARCHITECTURE",
    title: "Sculpted Monoliths",
    tagline: "Brutalist restraint balanced with delicate glass cantilevers.",
    description: "Every angle is an intentional framing of horizon, sky, and light. No decorative superfluity—only monumental honesty.",
    image: "/images/hero.jpg",
  },
  {
    id: "interiors",
    category: "02 / INTERIORS",
    title: "Tactile Warmth",
    tagline: "Natural stone, smoked timbers, and acoustic serenity.",
    description: "Interiors designed not for display, but for deep restorative living. Triple-glazed silence wraps you in peaceful seclusion.",
    image: "/images/project-aurelia.jpg",
  },
  {
    id: "wellness",
    category: "03 / WELLNESS",
    title: "Restorative Sanctuaries",
    tagline: "Himalayan salt saunas, cryotherapy, and thermal springs.",
    description: "Private wellness floors curated by longevity scientists to synchronize circadian rhythms and restore vital equilibrium.",
    image: "/images/project-orchard.jpg",
  },
  {
    id: "dining",
    category: "04 / DINING",
    title: "The Sommelier & Resident Salon",
    tagline: "Private Michelin-standard dining room and cellar.",
    description: "Host private dinners prepared by visiting global master chefs, with temperature-controlled cellars housing your private vintage collection.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "nature",
    category: "05 / NATURE",
    title: "Biophilic Courtyards",
    tagline: "40 acres of preserved canopy and rainwater lagoons.",
    description: "Architecture woven respectfully into centuries-old forests, where passive breeze corridors cool your home naturally.",
    image: "/images/project-orchard.jpg",
  },
  {
    id: "community",
    category: "06 / COMMUNITY",
    title: "Private Members Atelier",
    tagline: "An intimate circle of visionaries, patrons, and founders.",
    description: "Private screening rooms, curated art gallerias, and intimate salon lounges designed for thoughtful discourse.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function LifestyleGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("ALL");

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -460 : 460;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const filteredItems =
    activeCategory === "ALL"
      ? lifestyleItems
      : lifestyleItems.filter((item) =>
          item.category.toUpperCase().includes(activeCategory)
        );

  return (
    <section id="lifestyle" className="relative py-28 sm:py-36 bg-[#0a0c10] text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] ambient-glow opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#d4af37] font-semibold">
                Atmosphere & Living
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-white tracking-tight">
              A LIFE DESIGNED <br />
              <span className="gold-text-gradient font-bold">WITHOUT COMPROMISE</span>
            </h2>
          </div>

          {/* Navigation Scroll Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full border border-white/20 text-zinc-300 hover:text-white hover:border-[#d4af37] transition-all bg-black/40"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full border border-white/20 text-zinc-300 hover:text-white hover:border-[#d4af37] transition-all bg-black/40"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6">
          {["ALL", "ARCHITECTURE", "INTERIORS", "WELLNESS", "DINING", "NATURE", "COMMUNITY"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#d4af37] text-[#07080a] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                  : "bg-white/[0.04] text-zinc-400 border border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scrolling Gallery */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 sm:gap-8 overflow-x-auto no-scrollbar px-6 sm:px-8 md:pl-[max(2rem,calc((100vw-80rem)/2))] pb-6 cursor-grab active:cursor-grabbing"
      >
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="shrink-0 w-[320px] sm:w-[420px] rounded-xs border border-white/10 bg-[#0f121a] overflow-hidden group hover:border-[#d4af37]/50 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
          >
            {/* Image */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 320px, 420px"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f121a] via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[9px] font-mono tracking-widest text-[#d4af37] uppercase backdrop-blur-md">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
              <h3 className="font-display text-2xl text-white tracking-wide group-hover:text-[#f5e8c7] transition-colors">
                {item.title}
              </h3>
              <p className="font-serif italic text-xs text-[#d4af37] font-light">
                “{item.tagline}”
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
