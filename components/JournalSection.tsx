"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUpRight, Clock, X } from "lucide-react";

interface Article {
  id: string;
  category: string;
  title: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  fullContent: string[];
}

const articles: Article[] = [
  {
    id: "future-urban",
    category: "URBAN PHILOSOPHY",
    title: "The Future of Urban Living: Why Density Demands Calm",
    readTime: "6 MIN READ",
    date: "SEPTEMBER 2026",
    author: "Elena Rostova · Head of Spatial Design",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "As metropolitan centers grow denser, the highest luxury is no longer square footage—it is acoustic silence, vertical greenery, and unhurried transition spaces.",
    fullContent: [
      "In the modern metropolis, noise and speed are the default condition. When designing high-density residential architecture, the greatest challenge is not vertical engineering, but psychological shelter.",
      "At Valmont, our acoustic philosophy relies on multi-layer decoupling. Floor slabs are isolated with resilient elastomeric membranes, while quadruple-pane glazing turns urban traffic into a silent, distant silent movie.",
      "The true future of luxury is psychological calmness—the ability to close a solid bronze-handled door and instantly feel that the world outside has receded into complete stillness.",
    ],
  },
  {
    id: "wellbeing",
    category: "NEUROAESTHETICS",
    title: "Why Architecture Shapes Wellbeing",
    readTime: "8 MIN READ",
    date: "AUGUST 2026",
    author: "Dr. Arthur Pendelton · Cognitive Architect",
    image: "/images/hero.jpg",
    excerpt:
      "Neuroscience proves that natural proportions, tactile materials, and organic sightlines measurably decrease cortisol and heighten emotional equilibrium.",
    fullContent: [
      "The human brain evolved in landscapes of fractal complexity and natural materials. Synthetic plastics, repetitive right angles, and artificial lighting confuse our circadian biology.",
      "When we surround ourselves with honest stone like Roman travertine, hand-finished oak, and water reflections, heart rate variability increases and stress markers decline.",
      "Our residences are tuned to the golden ratio and organic biophilic principles, making the home a physical tool for restorative longevity.",
    ],
  },
  {
    id: "natural-light",
    category: "LIGHT & SHADOW",
    title: "Designing Homes Around Natural Light",
    readTime: "5 MIN READ",
    date: "JULY 2026",
    author: "Shintaro Mori · Environmental Lighting Atelier",
    image: "/images/project-orchard.jpg",
    excerpt:
      "Light is not an accessory; it is the primary building material. How solar path simulation dictates cantilever depths and morning living zones.",
    fullContent: [
      "Before drawing floor plans, we run three-dimensional heliodon simulations for 365 days of solar progression across the site.",
      "Breakfast spaces are positioned to receive the gentle low-lux morning sun, stimulating cortisol awakening naturally, while entertaining gallerias catch the dramatic golden hour twilight.",
      "Deep structural cantilevers protect the living interiors from harsh midday glare, ensuring soft, diffuse ambient illumination without overheating.",
    ],
  },
  {
    id: "new-luxury",
    category: "MANIFESTO",
    title: "The New Language of Luxury: Beyond Ornamentation",
    readTime: "7 MIN READ",
    date: "JUNE 2026",
    author: "Julian Valmont · Founder & Creative Director",
    image: "/images/project-aurelia.jpg",
    excerpt:
      "A farewell to baroque excess. The contemporary connoisseur seeks monolithic honesty, invisible intelligence, and timeless permanence.",
    fullContent: [
      "For decades, real estate luxury was measured by gilding and decorative embellishment. Today, that aesthetic feels noisy and outdated.",
      "True luxury today is invisible: hospital-grade HEPA 14 filtered air circulating without a hum, geothermal energy quietly cooling floors, and ceilings high enough that you can look upward and breathe.",
      "We build for the centuries ahead, crafting spaces that define tomorrow with restrained dignity.",
    ],
  },
];

export default function JournalSection() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="journal" className="relative py-28 sm:py-36 bg-[#07080a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#d4af37] font-semibold">
                Valmont Journal & Essays
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-white tracking-tight">
              EDITORIAL <span className="gold-text-gradient font-bold">DISPATCHES</span>
            </h2>
          </div>

          <div className="text-xs text-zinc-400 font-light max-w-sm">
            Dispatches on architecture, neuroaesthetics, structural sustainability, and the philosophy of modern dwelling.
          </div>
        </div>

        {/* 4 Article Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((art, idx) => (
            <motion.article
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setSelectedArticle(art)}
              data-cursor-text="READ"
              className="cursor-pointer group flex flex-col justify-between rounded-xs border border-white/10 bg-[#0c0e14] overflow-hidden hover:border-[#d4af37]/50 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Article Image */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-[9px] font-mono tracking-widest text-[#d4af37] uppercase backdrop-blur-md">
                      {art.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mb-2">
                    <Clock className="w-3 h-3 text-[#d4af37]" />
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="font-display text-xl text-white group-hover:text-[#f5e8c7] transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="mt-3 text-xs text-zinc-400 font-light line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom footer link */}
              <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#d4af37] font-mono group-hover:text-white transition-colors">
                <span className="text-[10px] tracking-wider uppercase">Read Essay</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#07080a]/95 backdrop-blur-2xl overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#0c0e14] border border-[#d4af37]/40 rounded-xs p-6 sm:p-10 my-auto shadow-[0_25px_80px_rgba(0,0,0,0.9)]"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-zinc-300 hover:text-white"
                aria-label="Close article reader"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative h-64 sm:h-80 w-full rounded-xs overflow-hidden mb-8">
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-mono text-[#d4af37] tracking-widest uppercase">
                    {selectedArticle.category} · {selectedArticle.date}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-display text-2xl sm:text-4xl text-white tracking-wide leading-tight">
                  {selectedArticle.title}
                </h2>
                <div className="text-xs font-mono text-[#d4af37] pb-4 border-b border-white/10">
                  By {selectedArticle.author} · {selectedArticle.readTime}
                </div>

                <div className="space-y-4 text-sm sm:text-base text-zinc-300 font-light leading-relaxed pt-2">
                  {selectedArticle.fullContent.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
