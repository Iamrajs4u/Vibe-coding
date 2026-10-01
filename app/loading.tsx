export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0C0C0C] flex flex-col items-center justify-center pointer-events-none">
      <div className="relative w-12 h-12 flex items-center justify-center border border-[#D7E2EA]/30 rounded-full bg-neutral-900">
        <span className="font-bold text-sm text-[#D7E2EA]">J</span>
        <div className="absolute -inset-2 border border-[#B600A8]/30 rounded-full animate-ping opacity-60" />
      </div>
      <div className="mt-6 flex flex-col items-center gap-1.5">
        <span className="text-xs tracking-[0.35em] text-[#D7E2EA] uppercase font-medium">
          LUXURY
        </span>
        <span className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
          Real Estate
        </span>
      </div>
    </div>
  );
}
