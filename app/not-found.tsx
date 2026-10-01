"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="relative z-10 max-w-lg space-y-6">
        <span className="text-xs uppercase tracking-[0.35em] text-[#B600A8] font-bold block">
          404 · Page Not Found
        </span>

        <h1 className="hero-heading font-black text-5xl sm:text-6xl uppercase tracking-tight">
          Lost in 3D Space
        </h1>

        <p className="text-sm text-zinc-400 font-light leading-relaxed">
          The page or asset you are looking for does not exist or has been shifted into another dimension.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium text-xs uppercase tracking-[0.2em] hover:bg-[#D7E2EA]/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
