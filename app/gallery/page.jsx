/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { X, ZoomIn } from "lucide-react";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  // AUTHENTIC COMPANY IMAGES WITH EXACT MATHEMATICAL SPANS THAT COMPLETE EVERY ROW 100%
  const galleryItems = [
    {
      id: 1,
      image: "/images/1.webp",
      category: "Biodiversity",
      title: "Himalayan Avifauna Survey",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 2,
      image: "/images/2.webp",
      category: "Organic Farming",
      title: "Western Ghats Organic Spices Farm",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 3,
      image: "/images/3.webp",
      category: "Conservation",
      title: "PET Recycling & Waste Management",
      span: "md:col-span-1 md:row-span-2",
    },
    {
      id: 4,
      image: "/images/4.webp",
      category: "Tree Plantation",
      title: "One Plant One Life Sapling Plantation",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      id: 5,
      image: "/images/5.webp",
      category: "Conservation",
      title: "Bring Back the Chiraiya Nest Boxes",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 6,
      image: "/images/about.webp",
      category: "Community",
      title: "Ecoensa Youth Brigade & Ecologists",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=1000&q=80",
      category: "Community",
      title: "Women Farmer Empowerment Drive",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80",
      category: "Organic Farming",
      title: "Vedic Bilona A2 Desi Cow Ghee",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
      category: "Tree Plantation",
      title: "Eco Forest Restoration Drive",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: 10,
      image: "/images/1.webp",
      category: "Biodiversity",
      title: "Avifauna Diversity Survey",
      span: "md:col-span-1 md:row-span-1",
    },
  ];

  const categories = [
    "All",
    "Biodiversity",
    "Organic Farming",
    "Tree Plantation",
    "Community",
    "Conservation",
  ];

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col justify-between relative overflow-x-clip">
      {/* STICKY HEADER */}
      <Header />

      <main className="flex-grow pb-24">
        
        {/* HERO BANNER SECTION (WITH EXACT LIVE GREEN/RED LEAVES DEWDROPS BACKGROUND IMAGE) */}
        <section className="relative w-full py-16 sm:py-24 bg-slate-950 text-white text-center overflow-hidden mb-12">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-45 scale-105"
            style={{
              backgroundImage:
                "url('/images/bg.webp')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-slate-950" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 space-y-4">
            {/* SUB-TAG WITH ORANGE DASHES ON BOTH SIDES */}
            <div className="flex items-center justify-center space-x-3 text-[#FF6B00] text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em]">
              <span className="w-8 sm:w-12 h-[2px] bg-[#FF6B00]" />
              <span>GALLERY</span>
              <span className="w-8 sm:w-12 h-[2px] bg-[#FF6B00]" />
            </div>

            {/* MAIN PAGE TITLE */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white drop-shadow-md">
              Ecoensa Photo Gallery
            </h1>
          </div>
        </section>

        {/* MAIN CONTAINER (1400PX) */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-10">

          {/* 1. PILL CATEGORY FILTER BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#FF6B00] text-white shadow-md scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 2. MATHEMATICALLY FLUSH GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[220px] sm:auto-rows-[240px]">
            {filteredItems.map((item, index) => {
              const cardSpan = activeCategory === "All" ? item.span : "md:col-span-1 md:row-span-1";
              
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  style={{ animationDelay: `${index * 60}ms` }}
                  className={`relative rounded-2xl overflow-hidden bg-slate-900 group cursor-pointer shadow-xs hover:shadow-2xl border border-slate-200/60 transition-all duration-500 animate-reveal-card ${cardSpan}`}
                >
                  {/* PHOTO IMAGE */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
                  />

                  {/* HOVER OVERLAY WITH CENTERED ZOOM ICON ⊕ */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md text-white border border-white/40 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <ZoomIn className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />

      {/* 3. INTERACTIVE LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-950 text-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-white/20 relative"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 hover:bg-rose-600 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* FULL RESOLUTION IMAGE */}
            <div className="w-full max-h-[80vh] bg-black flex items-center justify-center p-2">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-[75vh] object-contain block rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}