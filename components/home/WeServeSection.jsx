/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { 
  Sun, Building2, Mountain, PackageCheck, Recycle, Factory, Building 
} from "lucide-react";

export default function WeServeSection() {
  const industries = [
    {
      name: "Renewable energy",
      icon: Sun,
    },
    {
      name: "Construction",
      icon: Building2,
    },
    {
      name: "Mining",
      icon: Mountain,
    },
    {
      name: "Products",
      icon: PackageCheck,
    },
    {
      name: "Waste management",
      icon: Recycle,
    },
    {
      name: "Manufacturing",
      icon: Factory,
    },
    {
      name: "Real Estate",
      icon: Building,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-50 font-sans text-slate-900 border-t border-slate-200">
      {/* GLOBAL 1400PX CONTAINER */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-10 text-center">
        
        {/* HEADER BLOCK (100% SOLID BLACK HEADING - ZERO GREEN) */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 border border-orange-200 px-4 py-1.5 rounded-full inline-block">
            Industries &amp; Sector Impact
          </span>

          {/* 100% SOLID BLACK HEADING */}
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
            We Serve
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed pt-1">
            In our journey towards a greener and more sustainable tomorrow, we remain dedicated to our partners and industries.
          </p>

          <div className="w-16 h-1 bg-[#FF6B00] rounded-full mx-auto" />
        </div>

        {/* 7 INDUSTRIES FLAT STATIC CARDS (ZERO HOVER EFFECTS) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-5 pt-2">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center space-y-3 select-none"
              >
                {/* ICON */}
                <div className="w-11 h-11 rounded-xl bg-slate-100 text-[#046A38] flex items-center justify-center shrink-0 border border-slate-200">
                  <Icon className="w-5 h-5" />
                </div>

                {/* NAME */}
                <h3 className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                  {ind.name}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}