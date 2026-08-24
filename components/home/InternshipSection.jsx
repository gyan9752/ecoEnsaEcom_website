/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";

export default function InternshipSection() {
  const sectors = [
    {
      id: "conservation",
      title: "Conservation & Wildlife",
      image: "/images/5.webp",
    },
    {
      id: "policy",
      title: "Environmental Policy & Advocacy",
      image: "/images/1.webp",
    },
    {
      id: "sustainable-dev",
      title: "Sustainable Development",
      image: "/images/sd.jpeg",
    },
    {
      id: "research",
      title: "Research & Academia",
      image: "/images/2.webp",
    },
    {
      id: "climate-change",
      title: "Climate Change",
      image: "/images/cc.jpeg",
    },
    {
      id: "clean-energy",
      title: "Clean Energy & Renewable Resources",
      image: "/images/env1.webp",
    },
    {
      id: "education",
      title: "Environmental Education",
      image: "/images/eedu.webp",
    },
    {
      id: "carbon-monitoring",
      title: "Carbon Monitoring",
      image: "/images/cm.webp",
    },
  ];

  const [activeIdx, setActiveIdx] = useState(7);

  return (
    <div className="w-full font-sans">
      
      {/* 1. TOP HEADING & PILL (OUTSIDE DARK SECTION - 1400PX SITE CONTAINER) */}
      <section className="pt-12 sm:pt-16 pb-8 sm:pb-10 bg-slate-50 text-slate-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 text-center space-y-3">
          <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 border border-orange-200 px-4 py-1.5 rounded-full inline-block">
            Join Our Team
          </span> 
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
            Internship
          </h2>
          <div className="w-16 h-1 bg-[#FF6B00] rounded-full mx-auto" />
        </div>
      </section>

      {/* 2. FULL-WIDTH DARK SECTION (100% SITE ALIGNED 1400PX CONTAINER) */}
      <section className="w-full bg-[#383838] text-white py-12 sm:py-16 border-t border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: INTRO PARAGRAPH + 8 LINKS */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* INTRO PARAGRAPH */}
              <p className="text-slate-100 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-3xl">
                🌎 Ecoensa invites you to join us as interns across diverse sectors, a chance to learn, grow, and lead the movement for a sustainable tomorrow. Together, let’s protect and restore nature <strong className="text-white font-bold">today</strong> so the next generation inherits a thriving planet. The future is in our hands let’s shape it now!
              </p>

              {/* 8 CLICKABLE LINKS WITH EXACT ACTIVE PILL HIGHLIGHT */}
              <div className="space-y-2.5 pt-1">
                {sectors.map((sec, idx) => {
                  const isActive = idx === activeIdx;

                  return (
                    <div key={sec.id} className="flex items-center space-x-2">
                      <span className="text-slate-300 font-bold">-</span>
                      <button
                        onClick={() => setActiveIdx(idx)}
                        className={`text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#FF6B00] text-white px-3 py-1.5 rounded-lg shadow-md font-bold tracking-wide"
                            : "text-slate-200 hover:text-white hover:underline"
                        }`}
                      >
                        {sec.title}
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* RIGHT COLUMN: FULL-COLUMN BALANCED DYNAMIC IMAGE */}
            <div className="lg:col-span-5 w-full">
              <div className="relative w-full aspect-[4/3.2] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
                <img
                  key={sectors[activeIdx].id}
                  src={sectors[activeIdx].image}
                  alt={sectors[activeIdx].title}
                  className="w-full h-full object-cover transition-opacity duration-500 block"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}