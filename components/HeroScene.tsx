"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Compass } from "lucide-react";
import * as THREE from "three";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGlLoaded, setWebGlLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    let animationFrameId: number;

    // Detect mobile or low performance
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080a, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.8, 12);

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      requestAnimationFrame(() => {
        setWebGlLoaded(true);
      });
    } catch (e) {
      console.warn("WebGL initialization skipped:", e);
      return;
    }

    // Architectural 3D Group
    const architectureGroup = new THREE.Group();
    scene.add(architectureGroup);

    // 1. Water Reflection Base (Infinity Pool)
    const waterGeo = new THREE.PlaneGeometry(30, 30, 32, 32);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x071118,
      roughness: 0.1,
      metalness: 0.9,
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -1.2;
    architectureGroup.add(water);

    // 2. Travertine Stone Plinth & Terraces
    const terraceGeo = new THREE.BoxGeometry(14, 0.3, 10);
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x22242b,
      roughness: 0.7,
      metalness: 0.1,
    });
    const terrace = new THREE.Mesh(terraceGeo, stoneMat);
    terrace.position.set(0, -1.05, -2);
    architectureGroup.add(terrace);

    // 3. Cantilever Upper Pavilion Slab (Brutalist Luxury)
    const upperRoofGeo = new THREE.BoxGeometry(12, 0.35, 8);
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x14161c,
      roughness: 0.5,
      metalness: 0.2,
    });
    const upperRoof = new THREE.Mesh(upperRoofGeo, concreteMat);
    upperRoof.position.set(0.5, 3.6, -2);
    architectureGroup.add(upperRoof);

    // Mid cantilever slab
    const midSlabGeo = new THREE.BoxGeometry(11, 0.25, 7.5);
    const midSlab = new THREE.Mesh(midSlabGeo, concreteMat);
    midSlab.position.set(0.2, 1.2, -2);
    architectureGroup.add(midSlab);

    // 4. Floor-to-Ceiling Architectural Glass Panels (Double glazed reflective)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x6688aa,
      transparent: true,
      opacity: 0.35,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.8,
      ior: 1.5,
      reflectivity: 0.9,
    });

    // Lower glass box
    const lowerGlassGeo = new THREE.BoxGeometry(8, 2.2, 5.5);
    const lowerGlass = new THREE.Mesh(lowerGlassGeo, glassMat);
    lowerGlass.position.set(-0.5, 0, -2);
    architectureGroup.add(lowerGlass);

    // Upper glass box
    const upperGlassGeo = new THREE.BoxGeometry(8.5, 2.2, 6);
    const upperGlass = new THREE.Mesh(upperGlassGeo, glassMat);
    upperGlass.position.set(0.4, 2.4, -2);
    architectureGroup.add(upperGlass);

    // 5. Interior Warm Light Cores (Glowing interior sanctuary)
    const interiorCoreGeo = new THREE.BoxGeometry(2.5, 1.6, 2.5);
    const warmGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffcc77,
    });
    const lowerCore = new THREE.Mesh(interiorCoreGeo, warmGlowMat);
    lowerCore.position.set(-0.5, 0, -2);
    architectureGroup.add(lowerCore);

    const upperCore = new THREE.Mesh(interiorCoreGeo, warmGlowMat);
    upperCore.position.set(0.4, 2.4, -2);
    architectureGroup.add(upperCore);

    // Point lights for warm interior radiance
    const interiorLight1 = new THREE.PointLight(0xffa834, 4.5, 8);
    interiorLight1.position.set(-0.5, 0.2, -1.8);
    architectureGroup.add(interiorLight1);

    const interiorLight2 = new THREE.PointLight(0xffd27d, 5.0, 9);
    interiorLight2.position.set(0.4, 2.5, -1.8);
    architectureGroup.add(interiorLight2);

    // 6. Architectural Fluted Columns & Mullions
    const columnGeo = new THREE.CylinderGeometry(0.08, 0.08, 4.8, 16);
    const columnMat = new THREE.MeshStandardMaterial({
      color: 0x997d26, // Brushed champagne brass
      roughness: 0.3,
      metalness: 0.85,
    });

    const colPositions = [
      [-4.5, 1.2, 1.2],
      [-4.5, 1.2, -5.2],
      [4.8, 1.2, 1.2],
      [4.8, 1.2, -5.2],
      [1.5, 1.2, 1.2],
    ];

    colPositions.forEach(([x, y, z]) => {
      const col = new THREE.Mesh(columnGeo, columnMat);
      col.position.set(x, y, z);
      architectureGroup.add(col);
    });

    // 7. Ambient Starlight & Floating Golden Dust Particle System
    const particleCount = isMobile ? 300 : 700;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 24;
      particlePositions[i + 1] = Math.random() * 10 - 1;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20;
      particleScales[i / 3] = Math.random() * 0.05 + 0.02;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.06,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Lights & Sun Atmosphere
    const ambientLight = new THREE.AmbientLight(0x0c121e, 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xe8d09f, 2.2);
    sunLight.position.set(8, 12, 10);
    scene.add(sunLight);

    const twilightRim = new THREE.DirectionalLight(0x3a6088, 1.5);
    twilightRim.position.set(-10, 4, -8);
    scene.add(twilightRim);

    // Mouse Parallax & Scroll variables
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollProgress = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      scrollProgress = Math.min(scrollY / height, 1.5);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    const startTime = performance.now();

    const animate = () => {
      const elapsedTime = (performance.now() - startTime) / 1000;

      // Smooth mouse lerping
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      if (!prefersReducedMotion) {
        // Floating building gentle sway
        architectureGroup.rotation.y = mouseX * 0.12 + Math.sin(elapsedTime * 0.2) * 0.03;
        architectureGroup.rotation.x = -mouseY * 0.06;

        // Camera scroll forward & parallax
        camera.position.z = 12 - scrollProgress * 4;
        camera.position.y = 1.8 - mouseY * 0.4 + scrollProgress * 0.6;
        camera.position.x = mouseX * 0.6;
        camera.lookAt(0, 1.0, 0);

        // Particle subtle drift
        const positions = particleGeo.attributes.position.array as Float32Array;
        for (let i = 1; i < particleCount * 3; i += 3) {
          positions[i] += 0.003;
          if (positions[i] > 9) positions[i] = -1;
        }
        particleGeo.attributes.position.needsUpdate = true;

        // Pulse interior illumination gently
        interiorLight1.intensity = 4.2 + Math.sin(elapsedTime * 1.5) * 0.6;
        interiorLight2.intensity = 4.8 + Math.cos(elapsedTime * 1.2) * 0.5;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  const scrollToResidences = () => {
    const el = document.querySelector("#residences");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    const el = document.querySelector("#projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[720px] overflow-hidden flex items-center justify-center bg-[#07080a]"
    >
      {/* Fallback photographic background for instant visual splendor */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Valmont Luxury Architectural Residence"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-1000 ${
            webGlLoaded ? "opacity-35 scale-105" : "opacity-75 scale-100"
          }`}
        />
        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/80 via-transparent to-[#07080a]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#07080a]/30 to-[#07080a]/90" />
      </div>

      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
      />

      {/* Hero Typography & Content Overlay */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center pt-16">
        {/* Curated Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/35 bg-[#0d0f14]/70 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-semibold text-[#f5e8c7]">
            Valmont Architectural Atelier · 2026 Collection
          </span>
        </motion.div>

        {/* Master Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] text-white max-w-4xl"
        >
          SHAPING THE <br className="hidden sm:inline" />
          <span className="gold-text-gradient font-bold">
            FUTURE OF LIVING
          </span>
        </motion.h1>

        {/* Subtitle / Quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 font-light max-w-2xl leading-relaxed tracking-wide"
        >
          Exceptional architecture. Intelligent spaces. <br className="hidden sm:inline" />
          A lifestyle designed around you.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <button
            onClick={scrollToResidences}
            data-cursor-text="EXPLORE"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xs bg-[#d4af37] hover:bg-[#e5c07b] text-[#07080a] font-semibold text-xs uppercase tracking-[0.24em] transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_40px_rgba(212,175,55,0.55)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore Residences
          </button>

          {/* Secondary CTA */}
          <button
            onClick={scrollToProjects}
            data-cursor-text="PORTFOLIO"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xs border border-white/20 hover:border-[#d4af37]/60 bg-white/[0.03] hover:bg-white/[0.08] text-zinc-200 hover:text-white font-medium text-xs uppercase tracking-[0.24em] backdrop-blur-md transition-all duration-300"
          >
            View Projects
          </button>
        </motion.div>

        {/* 3D Interaction Hint Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-8 hidden md:flex items-center gap-2 text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-light"
        >
          <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Interactive 3D Viewport · Move Cursor to Shift Perspective</span>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-400 font-semibold">
          Scroll to Discover
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#d4af37] via-[#d4af37]/40 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 32, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-3 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
