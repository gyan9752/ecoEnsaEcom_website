/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

export default function FounderMessage() {
  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      {/* GLOBAL 1400PX CONTAINER MATCHING HEADER & FOOTER ALIGNMENT */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* FULL-WIDTH COLUMN FILLING GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: BALANCED HEIGHT IMAGE (MATCHING TEXT HEIGHT) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full aspect-[4/3.4] rounded-[28px] overflow-hidden shadow-2xl border-4 border-white bg-slate-200 group">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                alt="Dr. Archana Naithani - Founder & Chairwomen"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 object-top"
              />
              
              {/* DESK NAMEPLATE OVERLAY */}
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md border border-white/20 p-2.5 rounded-2xl text-center text-white">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 block">
                  FOUNDER & CHAIRWOMEN
                </span>
                <span className="text-[10px] text-slate-300 font-semibold">
                  Vision • Leadership • Excellence
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FOUNDER'S MESSAGE CONTENT */}
          <div className="lg:col-span-7 space-y-4 text-slate-700 w-full">
            
            {/* SERIF HEADING - CHANGED FROM GREEN TO BLACK */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight">
              Founder&apos;s Message
            </h2>

            {/* PARAGRAPHS */}
            <div className="space-y-3.5 text-sm sm:text-base font-medium leading-relaxed text-slate-700">
              <p>
                Women sustain the traditional wisdom of conserving the environment because they play important roles as land managers and natural resources managers. Climate change is real. Women in many parts of the world, especially in indigenous communities, are the first to experience this devastating impact of the biodiversity crisis and environmental degradation. In light of the current biodiversity crisis, it is obvious that we must urgently accelerate this pace, and women need to be equally involved in the ecosystem of sustainable development. We should look to this inclusive collaborative approach to address these issues.
              </p>

              <p>
                Empowering women is a way to empower our natural resources on which every aspect of life depends. Time is now to act and take action to make our environment more sustainable for the future generation.
              </p>

              {/* CALLOUT PARAGRAPH - CHANGED FROM GREEN TO BLACK */}
              <p className="font-extrabold text-slate-900 text-base">
                Come together to act now!
              </p>
            </div>

            {/* RIGHT ALIGNED SIGNATURE NAME - CHANGED FROM GREEN TO BLACK */}
            <div className="pt-2 text-right">
              <h4 className="text-2xl sm:text-3xl font-serif font-black text-slate-900">
                Dr. Archana Naithani
              </h4>
              <span className="text-xs font-bold text-slate-500 block">
                Founder, Ecoensa
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}