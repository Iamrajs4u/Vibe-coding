"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check } from "lucide-react";

interface MaterialItem {
  id: string;
  name: string;
  origin: string;
  type: string;
  description: string;
  finish: string;
  acoustic: string;
  sustainability: string;
  image: string;
}

const materials: MaterialItem[] = [
  {
    id: "marble",
    name: "Calacatta Oro Marble",
    origin: "Carrara, Tuscany, Italy",
    type: "Metamorphic Stone",
    description:
      "Hand-selected slabs quarried from the Apuan Alps. Characterized by warm ivory undertones and dramatic feathered amber and gold veining that catch the afternoon sun.",
    finish: "Bookmatched Silk Honed Finish",
    acoustic: "High Density Vibration Dampening",
    sustainability: "Certified Ethical Quarrying",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "travertine",
    name: "Fluted Roman Travertine",
    origin: "Tivoli, Italy",
    type: "Sedimentary Limestone",
    description:
      "The ancient stone of monumental Roman architecture. Diamond-fluted into rhythmic vertical flutes that diffuse acoustic flutter and cast gentle cascading shadow lines.",
    finish: "Micro-Porous Fluted Honed",
    acoustic: "Sound Absorption STC 48",
    sustainability: "Zero VOC Natural Mineral",
    image: "/images/hero.jpg",
  },
  {
    id: "oak",
    name: "Smoked European White Oak",
    origin: "Spessart Forest, Germany",
    type: "Old-Growth Hardwood",
    description:
      "Deep fumed and air-cured for eighteen months to develop rich dark cognac tones throughout the wood core, rather than surface staining. Tactile and velvet to the bare foot.",
    finish: "Natural Matte Hardwax Oil",
    acoustic: "Resonant Warmth & Footstep Damping",
    sustainability: "FSC 100% Certified Reforestation",
    image: "/images/project-orchard.jpg",
  },
  {
    id: "titanium",
    name: "Brushed Champagne Titanium & Brass",
    origin: "Zurich, Switzerland",
    type: "Aerospace Alloy",
    description:
      "Satin-brushed architectural metal hardware and window mullions. Anodized in bespoke champagne bronze, resistant to marine salt oxidation and fingerprints.",
    finish: "Electrolytically Anodized Satin",
    acoustic: "Structural Rigidity Reinforcement",
    sustainability: "100% Recyclable Lifecycle",
    image: "/images/project-aurelia.jpg",
  },
  {
    id: "glass",
    name: "Acoustic Triple-Glazed Low-E Glass",
    origin: "Saint-Gobain, France",
    type: "Structural Glazing",
    description:
      "Quadruple-pane acoustic laminated curtain wall with invisible magnetron solar control coating. Deflects 92% of solar heat gain while preserving crystal-clear color fidelity.",
    finish: "Ultra-Clear Low-Iron Crystal",
    acoustic: "48dB Noise Reduction (Airport-Grade)",
    sustainability: "Passive House Level Insulation",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "clay",
    name: "Handmade Mino Clay Tile",
    origin: "Tajimi, Gifu, Japan",
    type: "Architectural Ceramic",
    description:
      "Kiln-fired using 400-year-old Mino pottery traditions. Each tile possesses microscopic tactile surface variations that shimmer subtly under raking architectural light.",
    finish: "Reduction Fired Matt Glaze",
    acoustic: "Textured Acoustic Diffusion",
    sustainability: "Natural Earth Clays",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function MaterialsSection() {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem>(materials[0]);

  return (
    <section id="materials" className="relative py-28 sm:py-36 bg-[#07080a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#d4af37] font-semibold">
                Authenticity & Craftsmanship
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-white tracking-tight">
              MATERIALS WITH A <br />
              <span className="gold-text-gradient font-bold">SOUL & PROVENANCE</span>
            </h2>
          </div>

          <div className="text-xs text-zinc-400 font-light max-w-sm">
            We reject synthetic imitations. Our buildings are crafted solely from authentic stone, aged timber, noble metals, and crystalline acoustic envelopes.
          </div>
        </div>

        {/* 6 Material Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {materials.map((mat) => (
            <button
              key={mat.id}
              onClick={() => setSelectedMaterial(mat)}
              className={`p-4 rounded-xs text-left transition-all duration-300 border flex flex-col justify-between h-36 ${
                selectedMaterial.id === mat.id
                  ? "bg-[#141822] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  : "bg-[#0c0e14] border-white/10 hover:border-white/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-[#d4af37] uppercase">
                  {mat.type.split(" ")[0]}
                </span>
                {selectedMaterial.id === mat.id && (
                  <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                )}
              </div>
              <div>
                <h4 className="font-display text-sm text-white font-medium line-clamp-2">
                  {mat.name}
                </h4>
                <span className="text-[9px] font-mono text-zinc-500 block mt-1">
                  {mat.origin.split(",")[0]}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Material Interactive Showcase Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMaterial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-xs bg-[#0c0e14] border border-[#d4af37]/30 items-center"
          >
            {/* Visual Texture Render (6 cols) */}
            <div className="lg:col-span-6 relative h-72 sm:h-96 w-full rounded-xs overflow-hidden border border-white/10">
              <Image
                src={selectedMaterial.image}
                alt={selectedMaterial.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[10px] font-mono text-[#d4af37] uppercase backdrop-blur-md">
                  {selectedMaterial.origin}
                </span>
              </div>
            </div>

            {/* Spec Details (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d4af37]">
                  {selectedMaterial.type}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide mt-1">
                  {selectedMaterial.name}
                </h3>
                <p className="mt-4 text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                  {selectedMaterial.description}
                </p>
              </div>

              {/* Spec Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xs bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block">Surface Finish</span>
                  <span className="text-xs text-zinc-200 font-medium mt-1 block">
                    {selectedMaterial.finish}
                  </span>
                </div>
                <div className="p-3.5 rounded-xs bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block">Acoustics</span>
                  <span className="text-xs text-zinc-200 font-medium mt-1 block">
                    {selectedMaterial.acoustic}
                  </span>
                </div>
                <div className="p-3.5 rounded-xs bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block">Sustainability</span>
                  <span className="text-xs text-[#d4af37] font-medium mt-1 block">
                    {selectedMaterial.sustainability}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
