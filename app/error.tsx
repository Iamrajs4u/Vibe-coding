"use client";

import { useEffect } from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime Boundary caught error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="relative z-10 max-w-md space-y-6">
        <div className="w-12 h-12 mx-auto flex items-center justify-center border border-red-500/40 bg-neutral-900 rounded-full">
          <AlertTriangle className="w-6 h-6 text-[#B600A8]" />
        </div>

        <span className="text-xs uppercase tracking-[0.35em] text-[#B600A8] font-bold block">
          Render Interruption
        </span>

        <h2 className="hero-heading font-black text-3xl sm:text-4xl uppercase tracking-tight">
          Visual Buffer Disrupted
        </h2>

        <p className="text-xs text-zinc-400 font-light leading-relaxed">
          An unexpected rendering interruption occurred. Click below to reload the viewport.
        </p>

        <div className="pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium text-xs uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Recalibrate Viewport</span>
          </button>
        </div>
      </div>
    </div>
  );
}
