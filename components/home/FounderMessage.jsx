/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

export default function FounderMessage() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      {/* 1400PX CONTAINER MATCHING HEADER & FOOTER */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: 280PX WIDTH TO MATCH TEXT HEIGHT PERFECTLY IN 1400PX CONTAINER */}
          <div className="w-full lg:w-[280px] shrink-0 flex justify-center">
            <div className="w-full rounded-2xl overflow-hidden shadow-xs border border-slate-100 bg-white">
              <img
                src="/images/ecoensafounder.webp"
                alt="Dr. Archana Naithani - Founder"
                className="w-full h-auto block rounded-2xl"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: TEXT CONTENT IN 1400PX CONTAINER */}
          <div className="flex-1 space-y-4 text-slate-700 w-full">
            
            {/* GREEN HEADING */}
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight">
              Founder’s Message
            </h2>

            {/* PARAGRAPHS */}
            <div className="space-y-3.5 text-sm sm:text-base font-normal leading-relaxed text-slate-700">
              <p>
                Women sustain the traditional wisdom of conserving the environment because they play important roles as land managers and natural resources managers. Climate change is real. Women in many parts of the world, especially in indigenous communities, are the first to experience this devastating impact of the biodiversity crisis and environmental degradation. In light of the current biodiversity crisis, it is obvious that we must urgently accelerate this pace, and women need to be equally involved in the ecosystem of sustainable development. We should look to this inclusive collaborative approach to address these issues.
              </p>

              <p>
                Empowering women is a way to empower our natural resources on which every aspect of life depends. Time is now to act and take action to make our environment more sustainable for the future generation.
              </p>

              <p className="font-bold text-slate-900 text-sm sm:text-base pt-1">
                Come together to act now!
              </p>
            </div>

            {/* RIGHT ALIGNED GREEN SIGNATURE */}
            <div className="pt-2 text-right">
              <h4 className="text-xl sm:text-2xl font-sans font-bold">
                Dr. Archana Naithani
              </h4>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}