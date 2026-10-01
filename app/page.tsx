"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import HeroScene from "@/components/HeroScene";
import ProjectShowcase from "@/components/ProjectShowcase";
import StatsSection from "@/components/StatsSection";
import StorytellingSection from "@/components/StorytellingSection";
import LifestyleGallery from "@/components/LifestyleGallery";
import PropertyConfigurator from "@/components/PropertyConfigurator";
import MaterialsSection from "@/components/MaterialsSection";
import JournalSection from "@/components/JournalSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocationMap from "@/components/LocationMap";
import CtaSection from "@/components/CtaSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      id="root"
      className="main-wrapper w-full overflow-x-hidden min-h-screen bg-[#0a0a0a] text-white relative"
    >
      <Navbar />
      <HeroScene />
      <ProjectShowcase />
      <StatsSection />
      <StorytellingSection />
      <LifestyleGallery />
      <PropertyConfigurator />
      <MaterialsSection />
      <JournalSection />
      <TestimonialsSection />
      <LocationMap />
      <CtaSection />
      <ContactForm />
      <Footer />
    </div>
  );
}
