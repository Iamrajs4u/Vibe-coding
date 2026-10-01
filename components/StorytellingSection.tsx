"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface Scene {
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  narrative: string;
  image: string;
}

const scenes: Scene[] = [
  {
    number: "01",
    tag: "EXTERIOR ARCHITECTURE",
    title: "BUILT WITH INTENTION",
    subtitle: "A silent monolith carved from stone, titanium, and daylight.",
    narrative:
      "Architecture begins before the first stone is laid. It begins with the movement of the sun, the prevailing breeze across the valley, and the desire to build something that outlasts the fleeting trends of generations.",
    image: "/images/hero.jpg",
  },
  {
    number: "02",
    tag: "GRAND LOBBY",
    title: "DESIGNED FOR ARRIVAL",
    subtitle: "A cathedral-like threshold that transitions the city into sanctuary.",
    narrative:
      "The threshold between the frenetic city and the home is sacred. 28-foot fluted Roman travertine colonnades and reflecting water pools whisper an immediate sense of stillness the moment you arrive.",
    image: "/images/project-orchard.jpg",
  },
  {
    number: "03",
    tag: "LIVING SPACES",
    title: "CRAFTED FOR LIFE",
    subtitle: "Seamless spatial continuity with frameless floor-to-ceiling glass.",
    narrative:
      "Intelligent proportions meet tactile authenticity. Hand-finished smoked European oak underfoot, recessed acoustic dampening, and light that travels uninterrupted through triple-aspect living salons.",
    image: "/images/project-aurelia.jpg",
  },
  {
    number: "04",
    tag: "SKYLINE & ROOFTOP",
    title: "ELEVATED BY DESIGN",
    subtitle: "Suspended 700 feet above the metropolis, crowned by stars.",
    narrative:
      "Perched atop the architectural silhouette, the cantilevered glass infinity pool creates the illusion of floating over the illuminated urban expanse. Here, silence is absolute.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80",
  },
  {
    number: "05",
    tag: "NIGHT RESIDENCE",
    title: "YOUR FUTURE ADDRESS",
    subtitle: "Where tomorrow's memories are framed in timeless elegance.",
    narrative:
      "As dusk descends into night, warm architectural illumination transforms the building into a luminous beacon. Not merely a structure, but an enduring personal statement.",
    image: "/images/project-aurelia.jpg",
  },
];

export default function StorytellingSection() {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeScene = scenes[activeSceneIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;

    timerRef.current = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % scenes.length);
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, activeSceneIndex]);

  const handleNext = () => {
    setActiveSceneIndex((prev) => (prev + 1) % scenes.length);
  };

  const handlePrev = () => {
    setActiveSceneIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  return (
    <section id="story" className="relative w-full min-h-screen py-24 bg-[#07080a] text-white flex flex-col justify-center overflow-hidden">
      {/* Background Active Scene Image with smooth crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene.number}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeScene.image}
              alt={activeScene.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic dark gradients */}
        <div className="absolute inset-0 bg-[#07080a]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/90 via-[#07080a]/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full py-12">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#d4af37] font-semibold">
            Architectural Narrative · Act {activeScene.number} of 05
          </span>
        </div>

        {/* Main Editorial Scene Block */}
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene.number}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-zinc-400">
                SCENE {activeScene.number} — {activeScene.tag}
              </span>

              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.05]">
                {activeScene.title}
              </h2>

              <p className="font-serif italic text-lg sm:text-xl text-[#f5e8c7] font-light leading-relaxed">
                “{activeScene.subtitle}”
              </p>

              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-xl">
                {activeScene.narrative}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Timeline Scrubber & Navigation Controls */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Scene Selectors */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
            {scenes.map((scene, idx) => (
              <button
                key={scene.number}
                onClick={() => setActiveSceneIndex(idx)}
                className={`group flex items-center gap-3 py-2 px-3 rounded-xs transition-all ${
                  activeSceneIndex === idx
                    ? "bg-[#d4af37]/20 border-b-2 border-[#d4af37] text-white"
                    : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                <span className="text-xs font-mono font-bold tracking-widest">
                  {scene.number}
                </span>
                <span className="hidden md:inline text-[11px] uppercase tracking-wider font-light">
                  {scene.tag.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Prev/Next & Play/Pause */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2.5 rounded-full border border-white/20 text-zinc-300 hover:text-white hover:border-[#d4af37] transition-colors"
              title={isAutoPlaying ? "Pause Auto-progression" : "Play Auto-progression"}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-white/20 text-zinc-300 hover:text-white hover:border-[#d4af37] transition-colors"
              aria-label="Previous scene"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-white/20 text-zinc-300 hover:text-white hover:border-[#d4af37] transition-colors"
              aria-label="Next scene"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
