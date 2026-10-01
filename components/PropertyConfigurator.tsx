"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Maximize2, ArrowRight, Eye, X } from "lucide-react";

interface RoomData {
  id: string;
  name: string;
  dimensions: string;
  description: string;
  materials: string;
  image: string;
  svgPath: string; // Coordinate polygon for floor plan highlight
  coords: { x: number; y: number; width: number; height: number };
}

interface ResidenceTier {
  id: string;
  title: string;
  sqft: string;
  bedrooms: string;
  bathrooms: string;
  ceiling: string;
  terraces: string;
  tagline: string;
  rooms: RoomData[];
}

const residenceTiers: ResidenceTier[] = [
  {
    id: "2bhk",
    title: "2 BHK Executive Haven",
    sqft: "2,450 Sq.Ft",
    bedrooms: "2 Master Suites",
    bathrooms: "2.5 Spa Baths",
    ceiling: "12.5 Ft Clear",
    terraces: "1 Wraparound Lanai",
    tagline: "Designed for effortless executive living with expansive natural light.",
    rooms: [
      {
        id: "living",
        name: "LIVING GALLERIA",
        dimensions: "26' × 20'",
        description: "Open-plan salon opening onto private garden lanai with fluted limestone wall panels.",
        materials: "Smoked White Oak, Poliform Custom Wall System",
        image: "/images/hero.jpg",
        svgPath: "M 20 20 L 260 20 L 260 180 L 20 180 Z",
        coords: { x: 20, y: 20, width: 240, height: 160 },
      },
      {
        id: "master",
        name: "MASTER SUITE",
        dimensions: "22' × 18'",
        description: "Private, expansive and designed around natural light with bespoke walk-in dressing galleria.",
        materials: "Silk wall textiles, Calacatta Oro marble ensuite",
        image: "/images/project-aurelia.jpg",
        svgPath: "M 280 20 L 460 20 L 460 180 L 280 180 Z",
        coords: { x: 280, y: 20, width: 180, height: 160 },
      },
      {
        id: "kitchen",
        name: "CHEF'S KITCHEN",
        dimensions: "16' × 14'",
        description: "Custom Poliform cabinetry, integrated Sub-Zero appliances, Calacatta marble island.",
        materials: "Calacatta stone island, matte black Dornbracht fixtures",
        image: "/images/project-orchard.jpg",
        svgPath: "M 20 200 L 200 200 L 200 340 L 20 340 Z",
        coords: { x: 20, y: 200, width: 180, height: 140 },
      },
      {
        id: "terrace",
        name: "SKY TERRACE",
        dimensions: "24' × 10'",
        description: "Outdoor entertaining terrace with integrated planters and frameless glass balustrade.",
        materials: "Flame-treated Roman Travertine",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        svgPath: "M 220 200 L 460 200 L 460 340 L 220 340 Z",
        coords: { x: 220, y: 200, width: 240, height: 140 },
      },
    ],
  },
  {
    id: "3bhk",
    title: "3 BHK Grand Horizon",
    sqft: "3,850 Sq.Ft",
    bedrooms: "3 En-Suite Bedrooms",
    bathrooms: "3.5 Spa Baths",
    ceiling: "13.5 Ft Clear",
    terraces: "2 Dual-Aspect Terraces",
    tagline: "Panoramic corner residence featuring triple-aspect glazing and private elevator entry.",
    rooms: [
      {
        id: "master",
        name: "MASTER SUITE",
        dimensions: "28' × 22'",
        description: "Private, expansive and designed around natural light with deep soaking stone tub.",
        materials: "Italian Travertine, bronze accent hardware",
        image: "/images/project-aurelia.jpg",
        svgPath: "M 280 20 L 480 20 L 480 170 L 280 170 Z",
        coords: { x: 280, y: 20, width: 200, height: 150 },
      },
      {
        id: "living",
        name: "LIVING GALLERIA",
        dimensions: "36' × 24'",
        description: "Triple-aspect double-height entertaining space with frameless floor-to-ceiling glass.",
        materials: "Bookmatched Calacatta Oro, European White Oak",
        image: "/images/hero.jpg",
        svgPath: "M 20 20 L 260 20 L 260 170 L 20 170 Z",
        coords: { x: 20, y: 20, width: 240, height: 150 },
      },
      {
        id: "kitchen",
        name: "CHEF'S KITCHEN",
        dimensions: "20' × 18'",
        description: "Custom Poliform cabinetry, integrated Sub-Zero appliances, Calacatta marble island.",
        materials: "Gaggenau induction suite, brushed brass reveal",
        image: "/images/project-orchard.jpg",
        svgPath: "M 20 190 L 220 190 L 220 340 L 20 340 Z",
        coords: { x: 20, y: 190, width: 200, height: 150 },
      },
      {
        id: "terrace",
        name: "SKY TERRACE",
        dimensions: "32' × 12'",
        description: "Private heated plunge pool with seamless horizon views.",
        materials: "Basalt decking, seamless structural glass edge",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        svgPath: "M 240 190 L 480 190 L 480 340 L 240 340 Z",
        coords: { x: 240, y: 190, width: 240, height: 150 },
      },
    ],
  },
  {
    id: "4bhk",
    title: "4 BHK Palatial Sky Villa",
    sqft: "5,600 Sq.Ft",
    bedrooms: "4 En-Suite Bedrooms",
    bathrooms: "5.5 Luxury Baths",
    ceiling: "14.5 Ft Clear (22 Ft Void)",
    terraces: "3 Private Cantilever Terraces",
    tagline: "Double-height duplex estate suspended above the clouds with private glass plunge pool.",
    rooms: [
      {
        id: "master",
        name: "MASTER SUITE",
        dimensions: "32' × 24'",
        description: "Private, expansive and designed around natural light with private sunrise terrace.",
        materials: "Nero Marquina accents, bespoke leather headboard",
        image: "/images/project-aurelia.jpg",
        svgPath: "M 280 20 L 480 20 L 480 170 L 280 170 Z",
        coords: { x: 280, y: 20, width: 200, height: 150 },
      },
      {
        id: "living",
        name: "LIVING GALLERIA",
        dimensions: "42' × 26'",
        description: "Triple-aspect double-height entertaining space with frameless floor-to-ceiling glass.",
        materials: "Double-height fluted Travertine fireplace, smoked oak",
        image: "/images/hero.jpg",
        svgPath: "M 20 20 L 260 20 L 260 170 L 20 170 Z",
        coords: { x: 20, y: 20, width: 240, height: 150 },
      },
      {
        id: "wellness",
        name: "PRIVATE WELLNESS SUITE",
        dimensions: "18' × 15'",
        description: "Finnish sauna, cold plunge, and private yoga sanctuary overlooking skyline.",
        materials: "Cedar wood paneling, volcanic stone plunge basin",
        image: "/images/project-orchard.jpg",
        svgPath: "M 20 190 L 220 190 L 220 340 L 20 340 Z",
        coords: { x: 20, y: 190, width: 200, height: 150 },
      },
      {
        id: "terrace",
        name: "SKY TERRACE",
        dimensions: "36' × 14'",
        description: "Private heated plunge pool with seamless horizon views.",
        materials: "Infinity edge glass pool, heated travertine coping",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        svgPath: "M 240 190 L 480 190 L 480 340 L 240 340 Z",
        coords: { x: 240, y: 190, width: 240, height: 150 },
      },
    ],
  },
  {
    id: "penthouse",
    title: "The Sky Sanctuary Penthouse",
    sqft: "10,200 Sq.Ft",
    bedrooms: "5 Palatial Wings",
    bathrooms: "7 Spa Baths",
    ceiling: "18.0 Ft Vaulted",
    terraces: "Full 360° Wraparound Sky Deck",
    tagline: "The pinnacle of architectural sovereignty. Two entire levels commanding the horizon.",
    rooms: [
      {
        id: "master",
        name: "MASTER SUITE",
        dimensions: "38' × 28'",
        description: "Private, expansive and designed around natural light with twin bespoke dressing rooms.",
        materials: "Hand-honed Calacatta Oro, French oak herringbone",
        image: "/images/project-aurelia.jpg",
        svgPath: "M 280 20 L 480 20 L 480 170 L 280 170 Z",
        coords: { x: 280, y: 20, width: 200, height: 150 },
      },
      {
        id: "living",
        name: "LIVING GALLERIA",
        dimensions: "52' × 32'",
        description: "Triple-aspect double-height entertaining space with frameless floor-to-ceiling glass.",
        materials: "Monolithic bronze fireplace, bespoke glass stair core",
        image: "/images/hero.jpg",
        svgPath: "M 20 20 L 260 20 L 260 170 L 20 170 Z",
        coords: { x: 20, y: 20, width: 240, height: 150 },
      },
      {
        id: "kitchen",
        name: "CHEF'S KITCHEN",
        dimensions: "24' × 20'",
        description: "Custom Poliform cabinetry, integrated Sub-Zero appliances, Calacatta marble island.",
        materials: "Commercial-grade La Cornue range, walk-in humidor",
        image: "/images/project-orchard.jpg",
        svgPath: "M 20 190 L 220 190 L 220 340 L 20 340 Z",
        coords: { x: 20, y: 190, width: 200, height: 150 },
      },
      {
        id: "terrace",
        name: "SKY TERRACE",
        dimensions: "60' × 22'",
        description: "Private heated plunge pool with seamless horizon views and outdoor starlight bar.",
        materials: "50-foot cantilever pool with submerged acoustic speakers",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        svgPath: "M 240 190 L 480 190 L 480 340 L 240 340 Z",
        coords: { x: 240, y: 190, width: 240, height: 150 },
      },
    ],
  },
];

interface PropertyConfiguratorProps {
  onEnquireConfig?: (configName: string, roomName: string) => void;
}

export default function PropertyConfigurator({ onEnquireConfig }: PropertyConfiguratorProps) {
  const [selectedTier, setSelectedTier] = useState<ResidenceTier>(residenceTiers[1]); // Default to 3 BHK
  const [selectedRoom, setSelectedRoom] = useState<RoomData>(selectedTier.rooms[0]);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  // When tier changes, default selected room to its first room
  const handleTierChange = (tier: ResidenceTier) => {
    setSelectedTier(tier);
    setSelectedRoom(tier.rooms[0]);
  };

  return (
    <section id="residences" className="relative py-28 sm:py-36 bg-[#0a0c10] text-white">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[500px] ambient-glow opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#d4af37] font-semibold">
                Bespoke Residence Configurator
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-white tracking-tight">
              SPACES DESIGNED <br />
              <span className="gold-text-gradient font-bold">AROUND YOUR RHYTHM</span>
            </h2>
          </div>

          <div className="text-xs text-zinc-400 font-light max-w-sm">
            Select an architectural floorplate below. Click individual rooms on the interactive blueprint to inspect spatial dimensions and craftsmanship finishes.
          </div>
        </div>

        {/* Configuration Tabs (2 BHK, 3 BHK, 4 BHK, Penthouse) */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar border-b border-white/10 mb-10">
          {residenceTiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => handleTierChange(tier)}
              className={`px-6 py-3 rounded-xs text-xs font-semibold uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                selectedTier.id === tier.id
                  ? "bg-[#d4af37] text-[#07080a] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
              }`}
            >
              {tier.title} · <span className="font-mono">{tier.sqft}</span>
            </button>
          ))}
        </div>

        {/* Main Interactive Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Architectural Blueprint (7 cols) */}
          <div className="lg:col-span-7 bg-[#0f121a] rounded-xs border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">
                  Interactive Floorplan Blueprint
                </span>
                <h4 className="font-display text-xl text-white tracking-wide mt-0.5">
                  {selectedTier.title}
                </h4>
              </div>
              <div className="text-right text-[10px] font-mono text-zinc-400">
                <span>SCALE: 1:50</span>
              </div>
            </div>

            {/* Interactive SVG Floor Plan */}
            <div className="relative w-full aspect-[4/3] bg-[#07080a] rounded-xs border border-white/[0.08] overflow-hidden p-4 flex items-center justify-center">
              {/* Background architectural grid */}
              <div className="absolute inset-0 architectural-grid opacity-50 pointer-events-none" />

              <svg
                viewBox="0 0 500 360"
                className="w-full h-full max-h-[360px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer perimeter walls */}
                <rect
                  x="15"
                  y="15"
                  width="470"
                  height="330"
                  fill="none"
                  stroke="#333a4d"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />

                {/* Render interactive rooms */}
                {selectedTier.rooms.map((room) => {
                  const isSelected = selectedRoom.id === room.id;
                  const c = room.coords;

                  return (
                    <g
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className="cursor-pointer transition-all duration-300"
                    >
                      {/* Room boundary */}
                      <rect
                        x={c.x}
                        y={c.y}
                        width={c.width}
                        height={c.height}
                        rx="2"
                        className={`transition-all duration-300 ${
                          isSelected
                            ? "fill-[#d4af37]/20 stroke-[#d4af37] stroke-[2.5]"
                            : "fill-white/[0.03] stroke-white/20 stroke-[1] hover:fill-[#d4af37]/10 hover:stroke-[#d4af37]/60"
                        }`}
                      />

                      {/* Dimension lines & marker inside room */}
                      <circle
                        cx={c.x + c.width / 2}
                        cy={c.y + c.height / 2 - 12}
                        r={isSelected ? 5 : 3}
                        className={`transition-all ${
                          isSelected ? "fill-[#d4af37]" : "fill-zinc-600"
                        }`}
                      />

                      <text
                        x={c.x + c.width / 2}
                        y={c.y + c.height / 2 + 8}
                        textAnchor="middle"
                        className={`text-[10px] font-mono tracking-wider select-none pointer-events-none uppercase font-semibold ${
                          isSelected ? "fill-white" : "fill-zinc-400"
                        }`}
                      >
                        {room.name}
                      </text>

                      <text
                        x={c.x + c.width / 2}
                        y={c.y + c.height / 2 + 24}
                        textAnchor="middle"
                        className={`text-[8.5px] font-mono select-none pointer-events-none ${
                          isSelected ? "fill-[#d4af37]" : "fill-zinc-500"
                        }`}
                      >
                        {room.dimensions}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Bottom indicator hint */}
              <div className="absolute bottom-3 left-4 text-[9px] font-mono text-zinc-500 uppercase tracking-widest pointer-events-none">
                Click any room zone to inspect dimensions
              </div>
            </div>

            {/* Quick Specs Matrix */}
            <div className="grid grid-cols-4 gap-2 mt-6 pt-4 border-t border-white/[0.08] text-center">
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">Bedrooms</span>
                <span className="text-xs font-semibold text-white">{selectedTier.bedrooms}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">Baths</span>
                <span className="text-xs font-semibold text-white">{selectedTier.bathrooms}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">Ceiling</span>
                <span className="text-xs font-semibold text-white">{selectedTier.ceiling}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">Terraces</span>
                <span className="text-xs font-semibold text-[#d4af37]">{selectedTier.terraces}</span>
              </div>
            </div>
          </div>

          {/* Right: Selected Room Detail Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#0f121a] rounded-xs border border-[#d4af37]/35 p-6 sm:p-8 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoom.id + selectedTier.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* Room Image Preview */}
                <div className="relative h-56 sm:h-64 w-full rounded-xs overflow-hidden border border-white/10 group">
                  <Image
                    src={selectedRoom.image}
                    alt={selectedRoom.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f121a] via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[10px] font-mono text-[#d4af37] uppercase backdrop-blur-md">
                      {selectedRoom.dimensions}
                    </span>
                    <button
                      onClick={() => setIsRoomModalOpen(true)}
                      className="px-3 py-1 rounded-full bg-[#d4af37] text-[#07080a] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-[#e5c07b] transition-colors"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Expand</span>
                    </button>
                  </div>
                </div>

                {/* Room Title & Description */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#d4af37]">
                      Room Specification
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {selectedRoom.dimensions}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide">
                    {selectedRoom.name}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-300 font-light leading-relaxed">
                    “{selectedRoom.description}”
                  </p>
                </div>

                {/* Materials Detail */}
                <div className="p-4 rounded-xs bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#d4af37] block mb-1">
                    Signature Material Finishes
                  </span>
                  <div className="text-xs text-zinc-200 font-medium">
                    {selectedRoom.materials}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => setIsRoomModalOpen(true)}
                    className="flex-1 py-3 px-5 rounded-xs border border-[#d4af37] text-[#f5e8c7] hover:bg-[#d4af37]/15 font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4 text-[#d4af37]" />
                    <span>Explore Room</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onEnquireConfig) {
                        onEnquireConfig(selectedTier.title, selectedRoom.name);
                      } else {
                        const el = document.querySelector("#contact");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="flex-1 py-3 px-5 rounded-xs bg-[#d4af37] hover:bg-[#e5c07b] text-[#07080a] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Reserve Residence</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Expanded Room Modal */}
      <AnimatePresence>
        {isRoomModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsRoomModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#07080a]/95 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#0c0e14] border border-[#d4af37]/40 rounded-xs overflow-hidden p-6 sm:p-8"
            >
              <button
                onClick={() => setIsRoomModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-zinc-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative h-80 sm:h-96 w-full rounded-xs overflow-hidden mb-6">
                <Image
                  src={selectedRoom.image}
                  alt={selectedRoom.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest">
                    {selectedTier.title}
                  </span>
                  <h3 className="font-display text-3xl text-white">{selectedRoom.name}</h3>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-300 font-light max-w-xl">
                    “{selectedRoom.description}”
                  </p>
                  <div className="mt-2 text-xs font-mono text-[#d4af37]">
                    Dimensions: {selectedRoom.dimensions} · Finishes: {selectedRoom.materials}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsRoomModalOpen(false);
                    if (onEnquireConfig) onEnquireConfig(selectedTier.title, selectedRoom.name);
                    else {
                      const el = document.querySelector("#contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="px-6 py-3 bg-[#d4af37] text-[#07080a] text-xs font-bold uppercase tracking-widest whitespace-nowrap"
                >
                  Consult on this layout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
