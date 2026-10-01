"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "text">("default");
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor lag effect
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device or reduced motion
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    const rafId = requestAnimationFrame(() => {
      setIsTouchDevice(false);
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTextEl = target.closest("[data-cursor-text]") as HTMLElement;
      const clickableEl = target.closest("button, a, [role='button'], input, select, textarea");

      if (cursorTextEl) {
        setCursorText(cursorTextEl.getAttribute("data-cursor-text") || "");
        setCursorVariant("text");
      } else if (clickableEl) {
        setCursorText("");
        setCursorVariant("hover");
      } else {
        setCursorText("");
        setCursorVariant("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Center pinpoint */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: cursorVariant === "text" ? 0 : 1,
        }}
      />

      {/* Outer reactive circle */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full border text-[10px] font-medium tracking-widest text-[#07080a] uppercase transition-colors"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorVariant === "text" ? 88 : cursorVariant === "hover" ? 48 : 26,
          height: cursorVariant === "text" ? 88 : cursorVariant === "hover" ? 48 : 26,
          backgroundColor:
            cursorVariant === "text"
              ? "rgba(212, 175, 55, 0.95)"
              : cursorVariant === "hover"
              ? "rgba(212, 175, 55, 0.15)"
              : "rgba(255, 255, 255, 0.04)",
          borderColor:
            cursorVariant === "text"
              ? "#d4af37"
              : cursorVariant === "hover"
              ? "rgba(212, 175, 55, 0.8)"
              : "rgba(255, 255, 255, 0.35)",
          scale: 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {cursorVariant === "text" && (
          <span className="px-2 text-center font-bold leading-tight select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
