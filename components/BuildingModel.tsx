"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, RotateCcw, Eye, Sparkles, ChevronRight } from "lucide-react";
import * as THREE from "three";

interface FloorInfo {
  id: string;
  name: string;
  label: string;
  levelY: number;
  height: string;
  area: string;
  residences: string;
  amenities: string[];
  description: string;
}

const floorsData: FloorInfo[] = [
  {
    id: "ground",
    name: "Grand Arrival & Plinth",
    label: "GROUND",
    levelY: 0,
    height: "24 Ft Clear Galleria",
    area: "18,500 Sq.Ft",
    residences: "Concierge & Arrival",
    amenities: ["Valet motor court", "Reflecting water plaza", "Private art gallery", "Concierge lounge"],
    description: "Monolithic Roman travertine plinth featuring triple-height arrival colonnade and biometric private elevator banks.",
  },
  {
    id: "01",
    name: "Wellness & Thermal Sanctuary",
    label: "01",
    levelY: 1.2,
    height: "16 Ft Ceiling",
    area: "14,200 Sq.Ft",
    residences: "Private Resident Club",
    amenities: ["Himalayan salt sauna", "Hydrotherapy vitality pool", "Sound-isolated Pilates studio", "Private squash court"],
    description: "An entire dedicated floor for restorative vitality, overlooking the manicured perimeter forest canopy.",
  },
  {
    id: "02",
    name: "Horizon Executive Residences",
    label: "02",
    levelY: 2.4,
    height: "13.5 Ft Finished",
    area: "12,600 Sq.Ft (Floor Plate)",
    residences: "2 × 3 BHK Executive Suites",
    amenities: ["Wraparound corner terrace", "Wine conditioning room", "Chef prep scullery"],
    description: "Spacious dual-key sky residences featuring triple-aspect vistas and floor-to-ceiling Low-E acoustic glazing.",
  },
  {
    id: "03",
    name: "The Cantilever Duplexes",
    label: "03",
    levelY: 3.6,
    height: "22 Ft Double-Height Voids",
    area: "11,800 Sq.Ft (Floor Plate)",
    residences: "2 × 4 BHK Duplex Mansions",
    amenities: ["Private cantilever plunge pool", "Internal sculptural bronze staircase", "Double-height living salon"],
    description: "Daring architectural cantilevers extending 18 feet outward from the core, providing vertigo-inducing sky living.",
  },
  {
    id: "04",
    name: "The Royal Panorama Suite",
    label: "04",
    levelY: 4.8,
    height: "14.5 Ft Finished",
    area: "10,800 Sq.Ft (Single Residence)",
    residences: "Full-Floor Royal Residence",
    amenities: ["360° Panoramic wrap terrace", "Master wing with dual marble spas", "Private security vestibule"],
    description: "An entire floor dedicated to a singular sovereign residence, commanding unobstructed skyline horizons in all directions.",
  },
  {
    id: "05",
    name: "Signature Sky Sanctuary",
    label: "05",
    levelY: 6.0,
    height: "15.0 Ft Finished",
    area: "9,600 Sq.Ft (Single Residence)",
    residences: "Full-Floor Signature Residence",
    amenities: ["Private elevator direct to foyer", "Bespoke Poliform kitchen", "Private infrared sauna"],
    description: "Unparalleled prestige situated immediately beneath the crown, featuring acoustic decoupling and bespoke Italian finishes.",
  },
  {
    id: "rooftop",
    name: "The Crown & Starlight Pool",
    label: "ROOFTOP",
    levelY: 7.2,
    height: "Open Sky Observatory",
    area: "8,400 Sq.Ft",
    residences: "Resident Exclusive Crown",
    amenities: ["50m Glass-bottom infinity pool", "Starlight celestial observatory", "Private resident dining pavilion", "Helipad access"],
    description: "Suspended 700 feet above the metropolis, the rooftop represents the zenith of architectural aspiration and leisure.",
  },
];

interface BuildingModelProps {
  onEnquireFloor?: (floorName: string) => void;
}

export default function BuildingModel({ onEnquireFloor }: BuildingModelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedFloor, setSelectedFloor] = useState<FloorInfo>(floorsData[3]); // Default to duplex
  const [isNightMode, setIsNightMode] = useState<boolean>(true);

  // Scene references to update on state change
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCameraY = useRef<number>(3.5);
  const currentCameraY = useRef<number>(3.5);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const moonLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const floorMeshGroups = useRef<Map<string, THREE.Group>>(new Map());
  const highlightRing = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    let animId: number;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x07080a, 0.04);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(9.5, 3.8, 11);
    camera.lookAt(0, 3.5, 0);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
    } catch {
      return;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0a101d, 1.4);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const sunLight = new THREE.DirectionalLight(0xfff1cf, 2.5);
    sunLight.position.set(12, 18, 10);
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    const moonLight = new THREE.DirectionalLight(0x4070a0, 0.8);
    moonLight.position.set(-10, 8, -10);
    scene.add(moonLight);
    moonLightRef.current = moonLight;

    // Architectural Tower Group
    const towerGroup = new THREE.Group();
    scene.add(towerGroup);

    // Floor Ring Highlight Mesh
    const ringGeo = new THREE.RingGeometry(3.6, 3.8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 3.6;
    scene.add(ring);
    highlightRing.current = ring;

    // Procedural Tower Construction
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x181a20,
      roughness: 0.6,
      metalness: 0.2,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x4a6572,
      transparent: true,
      opacity: 0.45,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.75,
      reflectivity: 0.9,
    });

    const warmInteriorMat = new THREE.MeshBasicMaterial({
      color: 0xffb84d,
    });

    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0x997d26,
      roughness: 0.35,
      metalness: 0.85,
    });

    // Water Plinth Base
    const baseGeo = new THREE.CylinderGeometry(6, 6.5, 0.4, 32);
    const base = new THREE.Mesh(baseGeo, concreteMat);
    base.position.y = -0.2;
    towerGroup.add(base);

    // Generate each floor level
    floorsData.forEach((floor, index) => {
      const floorGrp = new THREE.Group();
      floorGrp.position.y = floor.levelY;

      // Floor slab (monolithic dark basalt / concrete)
      const slabRadius = 3.2 - index * 0.18;
      const slabGeo = new THREE.BoxGeometry(slabRadius * 1.8, 0.16, slabRadius * 1.8);
      const slabMesh = new THREE.Mesh(slabGeo, concreteMat);
      floorGrp.add(slabMesh);

      // Glass envelope walls
      const glassGeo = new THREE.BoxGeometry(slabRadius * 1.65, 0.95, slabRadius * 1.65);
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      glassMesh.position.y = 0.5;
      floorGrp.add(glassMesh);

      // Glowing interior core
      const coreGeo = new THREE.BoxGeometry(slabRadius * 0.85, 0.8, slabRadius * 0.85);
      const coreMesh = new THREE.Mesh(coreGeo, warmInteriorMat);
      coreMesh.position.y = 0.5;
      floorGrp.add(coreMesh);

      // Architectural bronze vertical mullions
      const mullionGeo = new THREE.BoxGeometry(0.06, 0.95, 0.06);
      const step = (slabRadius * 1.65) / 4;
      for (let m = -2; m <= 2; m++) {
        const m1 = new THREE.Mesh(mullionGeo, bronzeMat);
        m1.position.set(m * step, 0.5, slabRadius * 0.82);
        floorGrp.add(m1);

        const m2 = new THREE.Mesh(mullionGeo, bronzeMat);
        m2.position.set(m * step, 0.5, -slabRadius * 0.82);
        floorGrp.add(m2);
      }

      // Special cantilever balcony on duplex level 03
      if (floor.id === "03") {
        const cantGeo = new THREE.BoxGeometry(1.4, 0.16, 2.2);
        const cantMesh = new THREE.Mesh(cantGeo, concreteMat);
        cantMesh.position.set(slabRadius * 0.9 + 0.5, 0, 0);
        floorGrp.add(cantMesh);

        // Glass pool on cantilever
        const poolWaterGeo = new THREE.BoxGeometry(1.2, 0.1, 1.8);
        const poolWaterMat = new THREE.MeshStandardMaterial({
          color: 0x00d2ff,
          roughness: 0.1,
          metalness: 0.9,
        });
        const poolMesh = new THREE.Mesh(poolWaterGeo, poolWaterMat);
        poolMesh.position.set(slabRadius * 0.9 + 0.5, 0.15, 0);
        floorGrp.add(poolMesh);
      }

      // Rooftop observatory & pool
      if (floor.id === "rooftop") {
        const pergolaGeo = new THREE.CylinderGeometry(2.0, 2.0, 0.1, 16);
        const pergola = new THREE.Mesh(pergolaGeo, bronzeMat);
        pergola.position.y = 0.9;
        floorGrp.add(pergola);

        const rooftopPoolGeo = new THREE.BoxGeometry(2.4, 0.12, 1.4);
        const poolWaterMat = new THREE.MeshStandardMaterial({
          color: 0x00e1d9,
          roughness: 0.05,
          metalness: 0.9,
        });
        const rPool = new THREE.Mesh(rooftopPoolGeo, poolWaterMat);
        rPool.position.set(0, 0.12, 0);
        floorGrp.add(rPool);
      }

      towerGroup.add(floorGrp);
      floorMeshGroups.current.set(floor.id, floorGrp);
    });

    // Orbit Drag Interaction
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      towerGroup.rotation.y += deltaX * 0.008;
      targetCameraY.current = Math.max(1, Math.min(8, targetCameraY.current - deltaY * 0.015));

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        towerGroup.rotation.y += deltaX * 0.008;
        targetCameraY.current = Math.max(1, Math.min(8, targetCameraY.current - deltaY * 0.015));
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);

      // Gentle auto-rotation when not dragging
      if (!isDragging) {
        towerGroup.rotation.y += 0.0025;
      }

      // Camera Y lerping toward selected floor
      currentCameraY.current += (targetCameraY.current - currentCameraY.current) * 0.05;
      camera.position.y = currentCameraY.current;
      camera.lookAt(0, currentCameraY.current - 0.5, 0);

      // Ring pulse
      if (highlightRing.current) {
        highlightRing.current.rotation.z += 0.01;
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  // Update Day/Night lights when toggled
  useEffect(() => {
    if (!sunLightRef.current || !moonLightRef.current || !ambientLightRef.current) return;

    if (isNightMode) {
      sunLightRef.current.intensity = 0.3;
      sunLightRef.current.color.setHex(0x334466);
      moonLightRef.current.intensity = 1.4;
      ambientLightRef.current.intensity = 0.9;
      if (sceneRef.current) sceneRef.current.fog?.color.setHex(0x07080a);
    } else {
      sunLightRef.current.intensity = 2.6;
      sunLightRef.current.color.setHex(0xfff4d6);
      moonLightRef.current.intensity = 0.2;
      ambientLightRef.current.intensity = 1.8;
      if (sceneRef.current) sceneRef.current.fog?.color.setHex(0x1a2130);
    }
  }, [isNightMode]);

  // Update selected floor camera target and highlight ring
  useEffect(() => {
    targetCameraY.current = selectedFloor.levelY + 1.2;
    if (highlightRing.current) {
      highlightRing.current.position.y = selectedFloor.levelY + 0.08;
      // Adjust ring radius for floor taper
      const idx = floorsData.findIndex((f) => f.id === selectedFloor.id);
      const rad = 3.2 - idx * 0.18;
      highlightRing.current.scale.set(rad / 2.5, rad / 2.5, 1);
    }
  }, [selectedFloor]);

  const handleResetCamera = () => {
    targetCameraY.current = 3.5;
  };

  return (
    <section id="showcase" className="relative py-28 sm:py-36 bg-[#07080a] text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] ambient-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#d4af37] font-semibold">
                Interactive Architectural Twin
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-white tracking-tight">
              SEE IT. FEEL IT. <span className="gold-text-gradient font-bold">LIVE IT.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            Orbit in real-time WebGL. Toggle solar daylight or twilight ambiance, and select individual floor plates to inspect private amenities.
          </p>
        </div>

        {/* 3D Interactive Stage Canvas & Control Overlay */}
        <div
          ref={containerRef}
          className="relative w-full h-[620px] sm:h-[700px] rounded-xs border border-white/[0.08] bg-radial from-[#11141c] to-[#07080a] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
        >
          {/* Three.js Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            data-cursor-text="EXPLORE"
          />

          {/* Top Bar Controls */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
            {/* Day / Night Mode Buttons */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md pointer-events-auto">
              <button
                onClick={() => setIsNightMode(false)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 ${
                  !isNightMode
                    ? "bg-[#d4af37] text-[#07080a] font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Sun className="w-3 h-3" />
                <span>DAY</span>
              </button>
              <button
                onClick={() => setIsNightMode(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-300 ${
                  isNightMode
                    ? "bg-[#d4af37] text-[#07080a] font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Moon className="w-3 h-3" />
                <span>NIGHT</span>
              </button>
            </div>

            {/* Interaction Tip / Reset */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={handleResetCamera}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono tracking-wider uppercase text-zinc-300 hover:border-[#d4af37] transition-all"
                title="Reset Camera Angle"
              >
                <RotateCcw className="w-3 h-3 text-[#d4af37]" />
                <span className="hidden sm:inline">Reset Orbit</span>
              </button>
            </div>
          </div>

          {/* Left Vertical Floor Selector */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 p-2 rounded-xs bg-black/60 border border-white/10 backdrop-blur-xl z-20">
            <span className="text-[8px] uppercase tracking-widest text-[#d4af37] text-center font-mono pb-1 border-b border-white/10">
              Floors
            </span>
            {floorsData
              .slice()
              .reverse()
              .map((floor) => (
                <button
                  key={floor.id}
                  onClick={() => setSelectedFloor(floor)}
                  className={`px-3 py-1.5 rounded-xs text-[10px] font-mono tracking-widest transition-all text-center ${
                    selectedFloor.id === floor.id
                      ? "bg-[#d4af37] text-[#07080a] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {floor.label}
                </button>
              ))}
          </div>

          {/* Right Floating Floor Info Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFloor.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute right-6 bottom-6 max-w-sm w-full p-6 rounded-xs bg-[#0c0e14]/90 border border-[#d4af37]/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#d4af37] uppercase">
                  Level {selectedFloor.label}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  {selectedFloor.residences}
                </span>
              </div>

              <h4 className="font-display text-xl text-white tracking-wide mt-3 mb-1">
                {selectedFloor.name}
              </h4>
              <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
                {selectedFloor.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-4 p-3 bg-white/[0.03] rounded-xs border border-white/[0.05]">
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Ceiling</span>
                  <span className="text-zinc-200">{selectedFloor.height}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Floor Plate</span>
                  <span className="text-zinc-200">{selectedFloor.area}</span>
                </div>
              </div>

              <div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#d4af37] block mb-2">
                  Featured Amenities
                </span>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selectedFloor.amenities.map((a, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] text-zinc-300 font-light"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (onEnquireFloor) onEnquireFloor(selectedFloor.name);
                  else {
                    const el = document.querySelector("#contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full py-2.5 bg-[#d4af37] hover:bg-[#e5c07b] text-[#07080a] font-semibold text-[10px] uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-1.5"
              >
                <span>Reserve Level {selectedFloor.label}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Center Drag Tip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 text-[10px] font-mono text-zinc-400 pointer-events-none">
            <Eye className="w-3 h-3 text-[#d4af37]" />
            <span>Click & Drag to Rotate · Scroll to Zoom</span>
          </div>
        </div>
      </div>
    </section>
  );
}
