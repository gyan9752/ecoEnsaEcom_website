/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";

export default function VolunteerSection() {
  return (
    <div className="w-full font-sans">
      
      {/* 1. TOP GREEN SECTION: THE PERILS OF PLASTIC ON OUR ENVIRONMENT */}
      <section className="w-full bg-[#046A38] text-white py-16 sm:py-20 relative overflow-hidden">
        {/* GLOBAL 1400PX CONTAINER */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: HEADING & PARAGRAPH */}
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-tight text-white drop-shadow-md">
                The Perils of Plastic on Our Environment
              </h2>

              <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed opacity-95">
                Plastic, once hailed as a miracle material, has become an environmental crisis. Its durability, ironically, is its doom. Every piece of plastic ever made still exists today, leading to clogged waterways, polluted oceans, and harm to marine life who mistake it for food. As plastics break down into microplastics, they permeate our soils and water systems, entering the food chain and potentially impacting human health. Additionally, the production and disposal of plastics release harmful greenhouse gases, exacerbating climate change. We&apos;re witnessing a planet enveloped in plastic, and the consequences are dire. It&apos;s imperative we address this issue head-on for the sake of our planet and future generations. 🌎🚫🥤
              </p>
            </div>

            {/* RIGHT COLUMN: FULL NATIVE YOUTUBE PLAYER WITH ALL CONTROLS */}
            <div className="lg:col-span-5 w-full">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-black border-2 border-white/20">
                <iframe
                  className="w-full h-full rounded-2xl"
                  src="https://www.youtube.com/embed/jAa58N4Jlos?rel=0&controls=1"
                  title="Climate Change - A Short Film [4K]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BOTTOM SECTION: BECOME OUR VOLUNTEER (WITH STUCK / FIXED PARALLAX BACKGROUND) */}
      <section
        className="w-full py-20 sm:py-28 relative bg-fixed bg-cover bg-center overflow-hidden border-t border-b border-white/10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        {/* DARK OVERLAY FOR TEXT READABILITY */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-xs pointer-events-none" />

        {/* CENTER CONTENT */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-[#00E676] tracking-tight drop-shadow-lg">
            Become Our Volunteer
          </h2>

          <p className="text-base sm:text-xl text-white font-semibold italic max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            &ldquo;Passionate about driving real change? Join EcoEnsa as a volunteer and turn your time and skills into powerful action for a healthier, greener, and more sustainable future.&rdquo;
          </p>

          <div className="pt-3">
            <Link
              href="/contact?subject=Become+a+Volunteer"
              className="bg-[#046A38] hover:bg-[#FF6B00] text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest px-8 py-4 rounded-xl shadow-2xl hover:scale-105 transition-all inline-block border border-white/20"
            >
              JOIN US
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}