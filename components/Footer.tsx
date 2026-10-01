"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

interface CityTime {
  city: string;
  timeZone: string;
}

const cities: CityTime[] = [
  { city: "MUMBAI", timeZone: "Asia/Kolkata" },
  { city: "LONDON", timeZone: "Europe/London" },
  { city: "SINGAPORE", timeZone: "Asia/Singapore" },
  { city: "NEW YORK", timeZone: "America/New_York" },
];

export default function Footer() {
  const [times, setTimes] = useState<{ [key: string]: string }>({});
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const updated: { [key: string]: string } = {};

      cities.forEach((c) => {
        try {
          const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: c.timeZone,
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          updated[c.city] = formatter.format(now);
        } catch {
          updated[c.city] = "--:--";
        }
      });

      setTimes(updated);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="relative bg-[#050608] border-t border-white/[0.08] text-white pt-20 pb-12 overflow-hidden">
      {/* Background blueprint subtle lines */}
      <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Top World Clocks Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-12 border-b border-white/[0.08]">
          {cities.map((c) => (
            <div key={c.city} className="flex flex-col">
              <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
                {c.city}
              </span>
              <span className="font-mono text-sm text-[#d4af37] font-semibold mt-1">
                {times[c.city] || "12:00"} <span className="text-[10px] text-zinc-500 font-normal">GMT</span>
              </span>
            </div>
          ))}
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 py-16">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center border border-[#d4af37] bg-[#0d0f14]">
                <span className="font-editorial text-xs text-[#d4af37] font-bold">VH</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl tracking-[0.25em] text-white font-semibold">
                  VALMONT
                </span>
                <span className="text-[8.5px] tracking-[0.38em] text-[#d4af37] uppercase -mt-0.5">
                  HORIZONS
                </span>
              </div>
            </div>

            <p className="font-serif italic text-sm text-[#f5e8c7] font-light">
              “Spaces That Define Tomorrow.”
            </p>

            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              Luxury residential and commercial real estate with a focus on architecture, lifestyle, technology, sustainability, and premium living.
            </p>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase block mb-3">
              Portfolio
            </span>
            <ul className="space-y-2 text-xs font-light text-zinc-400">
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Aurelia (Hyderabad)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  The Orchard (Bengaluru)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Vertex One (Mumbai)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Serenity Heights
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-white transition-colors">
                  3D Building Showcase
                </a>
              </li>
            </ul>
          </div>

          {/* Directory (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase block mb-3">
              Atelier
            </span>
            <ul className="space-y-2 text-xs font-light text-zinc-400">
              <li>
                <a href="#residences" className="hover:text-white transition-colors">
                  Residences
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  About & Story
                </a>
              </li>
              <li>
                <a href="#materials" className="hover:text-white transition-colors">
                  Materials & Craft
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-white transition-colors">
                  Journal & Essays
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Enquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Monograph Subscription (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase block">
              Architectural Monograph
            </span>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Receive quarterly private editions documenting structural innovations and pre-market residential releases.
            </p>

            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter private email address..."
                className="bg-[#12151d] border border-white/10 rounded-xs px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none placeholder:text-zinc-600 flex-1"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#d4af37] hover:bg-[#e5c07b] text-[#07080a] font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
              >
                Join
              </button>
            </form>
            {subscribed && (
              <span className="text-[10px] font-mono text-[#d4af37] block">
                Privilege accession granted. Check your dispatch inbox.
              </span>
            )}
          </div>
        </div>

        {/* Bottom Legal & Back to Top Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-6">
            <span>© 2026 VALMONT HORIZONS. All rights reserved.</span>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Terms & Legal
            </a>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-zinc-400">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors">
                Instagram
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors">
                LinkedIn
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors">
                YouTube
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-2 rounded-xs border border-white/10 hover:border-[#d4af37] text-zinc-300 hover:text-white transition-colors"
              title="Return to Zenith"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[10px] uppercase tracking-widest">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
