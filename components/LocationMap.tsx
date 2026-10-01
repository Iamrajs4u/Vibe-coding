"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Compass, Clock, Car, Plane, Building, GraduationCap, HeartPulse, ShoppingBag, Train, Sparkles } from "lucide-react";

interface Landmark {
  id: string;
  name: string;
  category: string;
  time: string;
  distance: string;
  icon: typeof MapPin;
  coords: { x: number; y: number }; // percentage on map
  description: string;
}

const landmarks: Landmark[] = [
  {
    id: "airport",
    name: "Rajiv Gandhi Intl Airport",
    category: "Aviation",
    time: "28 MIN",
    distance: "29 KM",
    icon: Plane,
    coords: { x: 82, y: 78 },
    description: "Direct elevated expressway transit with private VIP helicopter charter option.",
  },
  {
    id: "financial",
    name: "Financial District & IT Hub",
    category: "Business",
    time: "12 MIN",
    distance: "7.5 KM",
    icon: Building,
    coords: { x: 38, y: 44 },
    description: "Hub of Fortune 100 headquarters, multinational banking centers, and private equity towers.",
  },
  {
    id: "schools",
    name: "Oakridge & Chirec Intl Schools",
    category: "Education",
    time: "8 MIN",
    distance: "4.2 KM",
    icon: GraduationCap,
    coords: { x: 26, y: 32 },
    description: "IB World Schools with Olympic sports academies and global faculty.",
  },
  {
    id: "hospitals",
    name: "Apollo & Continental Medical Centers",
    category: "Healthcare",
    time: "10 MIN",
    distance: "5.8 KM",
    icon: HeartPulse,
    coords: { x: 62, y: 30 },
    description: "JCI-accredited tertiary care, emergency helipad, and private executive wellness suites.",
  },
  {
    id: "shopping",
    name: "The Galleria Luxury Pavilion",
    category: "Retail",
    time: "6 MIN",
    distance: "3.1 KM",
    icon: ShoppingBag,
    coords: { x: 48, y: 22 },
    description: "Flagship boutiques for Hermès, Gucci, Rolex, and private sommelier dining salons.",
  },
  {
    id: "metro",
    name: "Rapid Transit Concourse",
    category: "Transit",
    time: "4 MIN",
    distance: "1.8 KM",
    icon: Train,
    coords: { x: 54, y: 58 },
    description: "High-speed air-conditioned metro line connecting directly to airport and central business district.",
  },
  {
    id: "golf",
    name: "Boulder Hills Golf & Country Club",
    category: "Leisure",
    time: "15 MIN",
    distance: "9.2 KM",
    icon: Compass,
    coords: { x: 74, y: 40 },
    description: "18-hole championship golf course designed by Peter Harradine with private clubhouse.",
  },
];

export default function LocationMap() {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark>(landmarks[1]); // Default to Financial District
  const [hoveredLandmark, setHoveredLandmark] = useState<Landmark | null>(null);

  const activeLandmark = hoveredLandmark || selectedLandmark;

  return (
    <section id="location" className="relative py-28 sm:py-36 bg-[#07080a] text-white overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] ambient-glow opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#d4af37] font-semibold">
                Strategic Geography
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-white tracking-tight">
              CONNECTED TO EVERYTHING <br />
              <span className="gold-text-gradient font-bold">THAT MATTERS</span>
            </h2>
          </div>

          <div className="text-xs text-zinc-400 font-light max-w-sm">
            Situated at the serene epicenter of commerce, culture, and nature. Seamless connectivity via elevated arterial freeways.
          </div>
        </div>

        {/* 3D Stylized Radar Map Canvas & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Map Visualizer (8 cols) */}
          <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xs border border-white/10 bg-[#0d0f15] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6">
            {/* Map Grid and Radar Rings */}
            <div className="absolute inset-0 architectural-grid opacity-40 pointer-events-none" />

            {/* Concentric distance range rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border border-white/[0.05] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-white/[0.05] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-white/[0.04] pointer-events-none" />

            {/* Center Valmont Monolith Anchor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
              <div className="relative w-6 h-6 flex items-center justify-center bg-[#d4af37] rounded-full shadow-[0_0_25px_rgba(212,175,55,0.8)]">
                <div className="w-2.5 h-2.5 bg-[#07080a] rounded-full" />
                <div className="absolute -inset-3 rounded-full border border-[#d4af37]/60 animate-ping opacity-75" />
              </div>
              <div className="mt-2 px-3 py-1 rounded-full bg-[#07080a]/90 border border-[#d4af37] text-[10px] font-mono tracking-widest text-[#f5e8c7] uppercase">
                VALMONT RESIDENCES
              </div>
            </div>

            {/* Render connecting line from center to active landmark */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <line
                x1="50%"
                y1="50%"
                x2={`${activeLandmark.coords.x}%`}
                y2={`${activeLandmark.coords.y}%`}
                stroke="#d4af37"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-75"
              />
            </svg>

            {/* Render Interactive Landmark Pins */}
            {landmarks.map((landmark) => {
              const isSelected = activeLandmark.id === landmark.id;
              const Icon = landmark.icon;

              return (
                <div
                  key={landmark.id}
                  style={{
                    left: `${landmark.coords.x}%`,
                    top: `${landmark.coords.y}%`,
                  }}
                  onMouseEnter={() => setHoveredLandmark(landmark)}
                  onMouseLeave={() => setHoveredLandmark(null)}
                  onClick={() => setSelectedLandmark(landmark)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                >
                  {/* Pin Node */}
                  <div
                    className={`relative p-2.5 rounded-full border backdrop-blur-md transition-all duration-300 ${
                      isSelected
                        ? "bg-[#d4af37] border-[#f5e8c7] text-[#07080a] scale-125 shadow-[0_0_20px_rgba(212,175,55,0.7)]"
                        : "bg-[#141822]/90 border-white/20 text-zinc-300 hover:border-[#d4af37] hover:scale-110"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  {/* Pin Hover/Selected Badge */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-xs bg-[#07080a]/95 border text-[9px] font-mono uppercase whitespace-nowrap tracking-wider pointer-events-none transition-all duration-200 ${
                      isSelected
                        ? "border-[#d4af37] text-white opacity-100 translate-y-0"
                        : "border-white/10 text-zinc-400 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                    }`}
                  >
                    <span className="font-bold text-[#d4af37]">{landmark.time}</span> · {landmark.name.split(" ")[0]}
                  </div>
                </div>
              );
            })}

            {/* Compass Rose */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-[9px] font-mono text-zinc-500 uppercase">
              <Navigation className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{"N 17°26'42\" / E 78°23'11\""}</span>
            </div>
          </div>

          {/* Location Detail Card (4 cols) */}
          <div className="lg:col-span-4 bg-[#0d0f15] rounded-xs border border-[#d4af37]/30 p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLandmark.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4af37]">
                    Destination Profile
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {activeLandmark.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide">
                    {activeLandmark.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    {activeLandmark.description}
                  </p>
                </div>

                {/* Big Metric Box */}
                <div className="grid grid-cols-2 gap-3 p-4 rounded-xs bg-[#12151d] border border-white/[0.06]">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#d4af37]" /> Travel Time
                    </span>
                    <div className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 gold-text-gradient">
                      {activeLandmark.time}
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase flex items-center gap-1">
                      <Car className="w-3 h-3 text-[#d4af37]" /> Transit Distance
                    </span>
                    <div className="font-display text-2xl sm:text-3xl font-light text-white mt-1">
                      {activeLandmark.distance}
                    </div>
                  </div>
                </div>

                {/* List of Other Key Distances */}
                <div className="space-y-2 pt-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                    Key Corridors
                  </span>
                  {landmarks.slice(0, 4).map((l) => (
                    <div
                      key={l.id}
                      onClick={() => setSelectedLandmark(l)}
                      className={`flex items-center justify-between p-2 rounded-xs cursor-pointer text-xs font-mono transition-colors ${
                        activeLandmark.id === l.id
                          ? "bg-[#d4af37]/15 text-[#f5e8c7]"
                          : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className="truncate pr-2">{l.name}</span>
                      <span className="font-bold text-[#d4af37] shrink-0">{l.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
