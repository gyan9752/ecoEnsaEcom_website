"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroSection() {
  // Guaranteed Working HD Background Images
  const backgroundImages = [
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Auto Slider every 3 Seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden bg-slate-950">
      
      {/* STABLE BACKGROUND SLIDER WITH SMOOTH TRANSITION */}
      {backgroundImages.map((imgUrl, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center ${
            idx === currentBgIndex ? "opacity-100 scale-105 transition-transform duration-[4000ms]" : "opacity-0 pointer-events-none"
          }`}
          style={{ backgroundImage: `url(${imgUrl})` }}
        />
      ))}

      {/* OVERLAY FOR HIGH CONTRAST READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-slate-950/90 pointer-events-none" />

      {/* HERO CONTENT CONTAINER WITH PERFECT PADDING */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6 pt-36 sm:pt-40 pb-20">
        
        {/* SINGLE LINE ORANGE SUBHEADING */}
        <div className="w-full flex justify-center overflow-x-auto no-scrollbar py-1">
          <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-[#FF6B00] tracking-wide whitespace-normal md:whitespace-nowrap drop-shadow-md">
            Science-driven Environmental Solutions for a Sustainable Future !
          </h2>
        </div>

        {/* MAIN HEADING / H1 TEXT */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight sm:leading-snug max-w-5xl mx-auto drop-shadow-lg tracking-tight">
          Helping Industries, Governments, Institutions and Communities solve biodiversity, climate and sustainability challenges
        </h1>

        {/* ORANGE PILL BUTTONS */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          
          <Link
            href="/contact"
            className="bg-[#D95A00] hover:bg-[#C24E00] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase px-8 py-4 rounded-full shadow-2xl shadow-orange-950/50 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            CONTACT US
          </Link>

          <Link
            href="/contact"
            className="bg-[#D95A00] hover:bg-[#C24E00] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase px-8 py-4 rounded-full shadow-2xl shadow-orange-950/50 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            REQUEST CONSULTATION
          </Link>

        </div>

      </div>

      {/* BOTTOM SLIDER INDICATOR DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
        {backgroundImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentBgIndex(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentBgIndex ? "w-9 bg-[#FF6B00]" : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

    </section>
  );
}