


// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";

// export default function HeroSection() {
//   // Guaranteed Working HD Background Images
//   const backgroundImages = [
//     "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80",
//     "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1920&q=80",
//     "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
//   ];

//   const [currentBgIndex, setCurrentBgIndex] = useState(0);

//   // Auto Slider every 3 Seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
//     }, 3000);

//     return () => clearInterval(timer);
//   }, [backgroundImages.length]);

//   return (
//     /* HEIGHT REDUCED FROM 85vh TO 60vh/65vh */
//     <section className="relative w-full min-h-[82vh] sm:min-h-[86vh] flex items-center justify-center overflow-hidden bg-slate-950">
      
//       {/* STABLE BACKGROUND SLIDER WITH SMOOTH TRANSITION */}
//       {backgroundImages.map((imgUrl, idx) => (
//         <div
//           key={idx}
//           className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center ${
//             idx === currentBgIndex ? "opacity-100 scale-105 transition-transform duration-[4000ms]" : "opacity-0 pointer-events-none"
//           }`}
//           style={{ backgroundImage: `url(${imgUrl})` }}
//         />
//       ))}

//       {/* OVERLAY FOR HIGH CONTRAST READABILITY */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-slate-950/90 pointer-events-none" />

//       {/* HERO CONTENT CONTAINER - TOP PADDING REDUCED TO SHIFT CONTENT UP */}
//       <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-5 pt-30 sm:pt-10 pb-15">
        
//         {/* SINGLE LINE ORANGE SUBHEADING */}
//         <div className="w-full flex justify-center overflow-x-auto no-scrollbar py-1">
//           <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-[#FF6B00] tracking-wide whitespace-normal md:whitespace-nowrap drop-shadow-md">
//             Science-driven Environmental Solutions for a Sustainable Future !
//           </h2>
//         </div>

//         {/* MAIN HEADING / H1 TEXT */}
//         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight sm:leading-snug max-w-5xl mx-auto drop-shadow-lg tracking-tight">
//           Helping Industries, Governments, Institutions and Communities solve biodiversity, climate and sustainability challenges
//         </h1>

//         {/* ORANGE PILL BUTTONS */}
//         <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          
//           <Link
//             href="/contact"
//             className="bg-[#D95A00] hover:bg-[#C24E00] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase px-7 py-3.5 rounded-full shadow-2xl shadow-orange-950/50 hover:scale-105 transition-all duration-300 cursor-pointer"
//           >
//             CONTACT US
//           </Link>

//           <Link
//             href="/contact"
//             className="bg-[#D95A00] hover:bg-[#C24E00] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase px-7 py-3.5 rounded-full shadow-2xl shadow-orange-950/50 hover:scale-105 transition-all duration-300 cursor-pointer"
//           >
//             REQUEST CONSULTATION
//           </Link>

//         </div>

//       </div>

//       {/* BOTTOM SLIDER INDICATOR DOTS */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
//         {backgroundImages.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentBgIndex(idx)}
//             aria-label={`Slide ${idx + 1}`}
//             className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
//               idx === currentBgIndex ? "w-8 bg-[#FF6B00]" : "w-2 bg-white/50 hover:bg-white/80"
//             }`}
//           />
//         ))}
//       </div>

//     </section>
//   );
// }





"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroSection() {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80",
      tagline: "SCIENCE-DRIVEN ENVIRONMENTAL SOLUTIONS FOR A SUSTAINABLE FUTURE",
      heading: "Helping Industries, Governments, Institutions & Communities",
      description: "Solving biodiversity, climate, and sustainability challenges with research-backed environmental strategies, ecological conservation, and global compliance."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1920&q=80",
      tagline: "ECOLOGICAL CONSERVATION & BIODIVERSITY ASSESSMENT",
      heading: "Restoring Natural Habitats & Empowering Ecosystem Resilience",
      description: "Pioneering scientific habitat evaluation, carbon offset management, and eco-friendly industrial strategies to protect natural ecosystems."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
      tagline: "CLIMATE RISK & SUSTAINABILITY CONSULTING",
      heading: "Guiding Organizations Towards Net-Zero Green Transitions",
      description: "Data-driven climate risk advisory, ESG environmental reporting, and renewable integration tailored for modern sustainable growth."
    }
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Auto Slider every 4.5 Seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full min-h-[84vh] sm:min-h-[88vh] flex items-center justify-start overflow-hidden bg-slate-950 select-none">
      
      {/* INLINE CSS FOR PREMIUM ENTRANCE ANIMATIONS */}
      <style jsx global>{`
        @keyframes slideInRightCustom {
          0% {
            opacity: 0;
            transform: translateX(-40px) scale(0.98);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }

        .anim-pill {
          animation: slideInRightCustom 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }
        .anim-heading {
          animation: slideInRightCustom 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
        }
        .anim-para {
          animation: slideInRightCustom 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
        }
      `}</style>

      {/* BACKGROUND IMAGE SLIDER WITH KEN BURNS EFFECT */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-out bg-cover bg-center ${
            idx === currentBgIndex
              ? "opacity-100 scale-105 transition-transform duration-[6000ms]"
              : "opacity-0 pointer-events-none scale-110"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      {/* MULTI-STAGE GRADIENT OVERLAY FOR CRISP TEXT READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/35 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

      {/* HERO CONTENT CONTAINER - 1400PX EXACT HEADER LOGO ALIGNED */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 w-full text-left pt-20 sm:pt-24 pb-20">
        
        {/* INNER CONTENT WRAPPER - MAX-W-4XL FOR PERFECT ALIGNMENT */}
        <div className="max-w-4xl space-y-6 text-left">
          
          {/* DYNAMIC ANIMATED CONTENT BLOCK (ONLY TEXT ANIMATES) */}
          <div key={currentBgIndex} className="space-y-5 text-left">
            
            {/* 1. TOP PILL BADGE WITH LIVE PULSING ACCENT DOT */}
            <div className="anim-pill flex justify-start items-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-md bg-black/60 backdrop-blur-md border-l-4 border-[#FF6B00] text-[#FF6B00] font-extrabold text-xs sm:text-sm tracking-widest uppercase shadow-2xl border border-white/10">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6B00]"></span>
                </span>
                <span>{slides[currentBgIndex].tagline}</span>
              </div>
            </div>

            {/* 2. MAIN HEADING / H1 TEXT */}
            <h1 className="anim-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] drop-shadow-2xl tracking-tight text-left">
              {slides[currentBgIndex].heading}
            </h1>

            {/* 3. PARAGRAPH DESCRIPTION */}
            <p className="anim-para text-slate-200 text-sm sm:text-base md:text-lg font-medium max-w-2xl leading-relaxed drop-shadow-lg text-left">
              {slides[currentBgIndex].description}
            </p>

          </div>

          {/* STATIC / STUCK PERSISTENT BUTTONS ROW */}
          <div className="pt-2 flex flex-wrap items-center justify-start gap-4 sm:gap-5 z-20 text-left">
            <Link
              href="/shop"
              className="bg-[#D95A00] hover:bg-[#C24E00] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase px-8 py-4 rounded-full shadow-2xl shadow-orange-950/60 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              SHOP NOW
            </Link>

            <Link
              href="/contact"
              className="bg-[#D95A00] hover:bg-[#C24E00] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase px-8 py-4 rounded-full shadow-2xl shadow-orange-950/60 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              CONTACT US
            </Link>
          </div>

        </div>

      </div>

      {/* BOTTOM SLIDER INDICATOR DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 shadow-xl">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentBgIndex(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
              idx === currentBgIndex ? "w-8 bg-[#FF6B00]" : "w-2.5 bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

    </section>
  );
}