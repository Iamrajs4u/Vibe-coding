"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, CheckCircle2, Layers, ShieldCheck, ArrowRight } from "lucide-react";

export interface ProjectData {
  id: string;
  name: string;
  location: string;
  type: string;
  tagline: string;
  description: string;
  image: string;
  units: string;
  area: string;
  architect: string;
  completion: string;
  specs: { label: string; value: string }[];
  highlights: string[];
  gallery: string[];
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onEnquireProject: (projectName: string) => void;
}

export default function ProjectModal({
  project,
  onClose,
  onEnquireProject,
}: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#07080a]/90 backdrop-blur-2xl overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl bg-[#0c0e14] border border-[#d4af37]/30 rounded-xs shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#d4af37] transition-colors"
            aria-label="Close Project Details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Media Banner */}
          <div className="relative w-full h-72 sm:h-96 shrink-0">
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-[#0c0e14]/40 to-transparent" />

            <div className="absolute bottom-6 left-6 sm:left-10 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] tracking-[0.35em] text-[#d4af37] uppercase font-semibold">
                  {project.location} · {project.type}
                </span>
                <h3 className="font-display text-3xl sm:text-5xl text-white tracking-wide mt-1">
                  {project.name}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[11px] font-mono text-zinc-300 uppercase">
                  {project.completion}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-10">
            {/* Description & Overview */}
            <div>
              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Quick Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xs bg-[#12151d] border border-white/[0.06]">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                  Residential Scale
                </span>
                <div className="text-sm sm:text-base font-semibold text-white mt-1">
                  {project.units}
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                  Footprint
                </span>
                <div className="text-sm sm:text-base font-semibold text-white mt-1">
                  {project.area}
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                  Lead Architecture
                </span>
                <div className="text-sm sm:text-base font-semibold text-white mt-1">
                  {project.architect}
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                  Handover
                </span>
                <div className="text-sm sm:text-base font-semibold text-[#d4af37] mt-1">
                  {project.completion}
                </div>
              </div>
            </div>

            {/* Architectural Highlights */}
            <div>
              <h4 className="font-display text-lg text-white tracking-wide mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                Structural & Lifestyle Innovations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {project.highlights.map((highlight, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xs bg-white/[0.02] border border-white/[0.05]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 font-light">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Thumbnail Preview */}
            <div>
              <h4 className="font-display text-lg text-white tracking-wide mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#d4af37]" />
                Architectural Angles
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.gallery.map((img, i) => (
                  <div key={i} className="relative h-36 rounded-xs overflow-hidden border border-white/10 group">
                    <Image
                      src={img}
                      alt={`${project.name} viewpoint ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-zinc-400 font-light text-center sm:text-left">
                Direct portfolio consultation available with our Chief Real Estate Partner.
              </div>
              <button
                onClick={() => {
                  onClose();
                  onEnquireProject(project.name);
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#d4af37] hover:bg-[#e5c07b] text-[#07080a] font-semibold text-xs uppercase tracking-[0.24em] transition-all flex items-center justify-center gap-2"
              >
                <span>Enquire For {project.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
