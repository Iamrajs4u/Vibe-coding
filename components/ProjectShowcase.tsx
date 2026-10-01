"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import ProjectModal, { ProjectData } from "./ProjectModal";

const projectsData: ProjectData[] = [
  {
    id: "aurelia",
    name: "AURELIA",
    location: "Hyderabad",
    type: "Luxury Residences",
    tagline: "Suspended Sky Villas Over Financial District Lake",
    description:
      "Aurelia introduces 62 floors of cantilevered glass and fluted stone architecture. Each sky-villa features a 40-foot private infinity plunge pool jutting into the clouds, quadruple-glazed acoustic envelopes, and dedicated high-speed elevators.",
    image: "/images/project-aurelia.jpg",
    units: "42 Bespoke Sky Mansions",
    area: "6,800 – 14,500 Sq.Ft",
    architect: "Foster & Valmont Studio",
    completion: "Q4 2027",
    specs: [
      { label: "Ceiling Height", value: "14.5 Ft Clear" },
      { label: "Private Pool", value: "Included in all units" },
      { label: "Elevators", value: "2 Private per residence" },
      { label: "HVAC", value: "Hospital-grade HEPA 14" },
    ],
    highlights: [
      "Cantilevered heated glass-bottom infinity pool on floor 45",
      "Private subterranean 6-car temperature-controlled vault",
      "Biometric iris recognition and automated private lift vestibule",
      "24/7 Sommelier cellar and private resident dining salon",
    ],
    gallery: [
      "/images/project-aurelia.jpg",
      "/images/hero.jpg",
      "/images/project-orchard.jpg",
    ],
  },
  {
    id: "the-orchard",
    name: "THE ORCHARD",
    location: "Bengaluru",
    type: "Private Villas",
    tagline: "Biophilic Pavilions Immersed In 40 Acres Of Teak Canopies",
    description:
      "Nestled within century-old teak groves, The Orchard reimagines tropical estate living. Passive geothermal cooling channels, water courtyards, and handcrafted basalt walls dissolve the barrier between pristine nature and modern sanctuary.",
    image: "/images/project-orchard.jpg",
    units: "28 Private Estate Pavilions",
    area: "8,200 – 16,000 Sq.Ft",
    architect: "Shintaro Studio Tokyo & Valmont",
    completion: "Ready To Inhabit",
    specs: [
      { label: "Lot Sizes", value: "0.75 – 1.80 Acres" },
      { label: "Water Features", value: "Reflecting lagoon in each villa" },
      { label: "Sustainability", value: "100% Net Zero Energy" },
      { label: "Timber", value: "Certified Reclaimed Teak" },
    ],
    highlights: [
      "Natural perimeter moat and private botanical trail network",
      "Indoor-outdoor pavilions with motorized sliding pocket walls",
      "Private solar microgrid with battery storage resilience",
      "On-site Ayurvedic wellness pavilion and organic fruit orchards",
    ],
    gallery: [
      "/images/project-orchard.jpg",
      "/images/hero.jpg",
      "/images/project-aurelia.jpg",
    ],
  },
  {
    id: "vertex-one",
    name: "VERTEX ONE",
    location: "Mumbai",
    type: "Premium Offices",
    tagline: "The Carbon-Negative Diagrid Monolith of BKC",
    description:
      "Vertex One is Mumbai's pinnacle corporate address. Its bronze diagrid structural exoskeleton eliminates all interior load-bearing columns, giving 360-degree unobstructed panoramas of the Arabian Sea and city skyline.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
    units: "54 Commercial Levels",
    area: "1.6M Sq.Ft Gross Leasable",
    architect: "Valmont Urban Lab London",
    completion: "Q2 2028",
    specs: [
      { label: "Floor Plates", value: "32,000 Sq.Ft Column-Free" },
      { label: "Efficiency", value: "LEED Platinum Certified" },
      { label: "Sky Atrium", value: "Triple-height hanging gardens" },
      { label: "Transit", value: "Direct subterranean metro concourse" },
    ],
    highlights: [
      "Parametric aerodynamic form reducing wind load by 28%",
      "Photovoltaic solar facade generating 22% of daily power",
      "Executive helicopter pad and drone logistics port",
      "Auditorium and private global conferencing suites",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
      "/images/hero.jpg",
      "/images/project-aurelia.jpg",
    ],
  },
  {
    id: "serenity-heights",
    name: "SERENITY HEIGHTS",
    location: "Hyderabad",
    type: "Urban Residences",
    tagline: "Sculptural Living Designed For Acoustic Serenity",
    description:
      "Positioned adjacent to the Jubilee Hills ridge, Serenity Heights offers an oasis of calm amid metropolitan vitality. Featuring cascading tiered green terraces, triple-height indoor sky gardens, and an iconic elliptical silhouette.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80",
    units: "84 Curated Residences",
    area: "3,400 – 6,500 Sq.Ft",
    architect: "Valmont Atelier",
    completion: "Q1 2027",
    specs: [
      { label: "Acoustic Rating", value: "STC 58 Silent Envelope" },
      { label: "Outdoor Living", value: "Wraparound cantilever terrace" },
      { label: "Air Filtration", value: "Triple filtration active ionization" },
      { label: "Amenities", value: "4-Level Sky Club" },
    ],
    highlights: [
      "Signature rooftop starlight lounge and observatory",
      "Private screening theater with Meyer Sound acoustics",
      "Dedicated wellness floor with cryotherapy and hydrotherapy pools",
      "Valet chauffeur fleet with Tesla and Maybach house cars",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80",
      "/images/project-orchard.jpg",
      "/images/project-aurelia.jpg",
    ],
  },
];

interface ProjectShowcaseProps {
  onEnquireProject?: (name: string) => void;
}

export default function ProjectShowcase({ onEnquireProject }: ProjectShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filteredProjects =
    activeFilter === "ALL"
      ? projectsData
      : projectsData.filter((p) => p.type.toUpperCase().includes(activeFilter));

  const handleEnquire = (name: string) => {
    if (onEnquireProject) {
      onEnquireProject(name);
    } else {
      const contactEl = document.querySelector("#contact");
      if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="relative py-28 sm:py-36 bg-[#07080a] text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] ambient-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#d4af37] font-semibold">
                Curated Portfolio
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              ARCHITECTURE WORTH <br />
              <span className="gold-text-gradient font-bold">EXPERIENCING</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {["ALL", "RESIDENCES", "VILLAS", "OFFICES"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xs text-[11px] font-medium tracking-widest uppercase transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-[#d4af37] text-[#07080a] font-bold"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Cinematic Large Project Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              onClick={() => setSelectedProject(project)}
              data-cursor-text="VIEW PROJECT"
              className="group relative cursor-pointer overflow-hidden rounded-xs border border-white/[0.08] bg-[#0c0e14] transition-all duration-700 hover:border-[#d4af37]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {/* Media Container */}
              <div className="relative h-[380px] sm:h-[480px] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.name} - ${project.location}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/40 to-transparent" />
                <div className="absolute inset-0 bg-[#07080a]/20 group-hover:bg-transparent transition-colors duration-500" />

                {/* Top Floating Badges */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-[10px] uppercase font-mono tracking-widest text-zinc-200">
                    <MapPin className="w-3 h-3 text-[#d4af37]" />
                    <span>{project.location}</span>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:border-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#07080a] transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Bottom Content within Image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] tracking-[0.35em] uppercase text-[#d4af37] font-semibold block mb-1">
                    {project.type}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide group-hover:text-[#f5e8c7] transition-colors">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-300 font-light line-clamp-2 max-w-lg leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity">
                    {project.tagline}
                  </p>
                </div>
              </div>

              {/* Bottom Specs Bar */}
              <div className="p-6 bg-[#0c0e14] border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400 font-mono">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">
                    Scale
                  </span>
                  <span className="text-zinc-200">{project.units}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">
                    Handover
                  </span>
                  <span className="text-[#d4af37]">{project.completion}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEnquireProject={handleEnquire}
      />
    </section>
  );
}
