
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

// ==========================================
// 100% LIVE API BASE CONFIGURATION
const API_BASE = "https://moteligo.in/ecoback";
// ==========================================

const resolveImageUrl = (url) => {
  if (!url) return "/images/logo.png";
  if (url.startsWith("http")) return url;
  const cleanBase = API_BASE.replace(/\/$/, "");
  const cleanUrl = url.startsWith("/") ? url : `/${url}`;
  return `${cleanBase}${cleanUrl}`;
};

export default function CategoriesSection() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/collections/visible`);
        const json = await res.json();
        if (json?.status && Array.isArray(json?.data)) {
          setCategoriesList(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      {/* GLOBAL 1400PX CONTAINER */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-12">
        
        {/* SECTION HEADING WITH PERFECT ALIGNMENT */}
        <div className="text-center space-y-3">
          <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 border border-orange-200 px-4 py-1.5 rounded-full inline-block">
            Our Organic Range
          </span> 
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
            Collection
          </h2>
          <div className="w-16 h-1 bg-[#FF6B00] rounded-full mx-auto" />
        </div>

        {/* LOADING SKELETON STATE */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="h-64 sm:h-72 lg:h-80 rounded-[28px] bg-slate-200 animate-pulse"
              />
            ))}
          </div>
        ) : (
          /* CATEGORIES CARD GRID (3 COLUMNS LIKE SCREENSHOT) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categoriesList.map((item) => {
              const bgImage = resolveImageUrl(item.image || item.imageUrl);
              const itemCount =
                item.productCount ??
                item.productsCount ??
                item.totalProducts ??
                (Array.isArray(item.products) ? item.products.length : 12);
              const targetSlug = `/shop?category=${item.slug || item._id}`;

              return (
                <Link
                  key={item._id || item.id}
                  href={targetSlug}
                  className="group relative h-64 sm:h-72 lg:h-80 rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 block border border-slate-200/80 cursor-pointer"
                >
                  {/* BACKGROUND IMAGE WITH HOVER ZOOM */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${bgImage})` }}
                  />

                  {/* GRADIENT OVERLAY (DARK AT BOTTOM) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-opacity duration-300 group-hover:from-black/95" />

                  {/* CENTERED TITLE, QUANTITY & GOLDEN UNDERLINE */}
                  <div className="absolute bottom-6 left-0 right-0 text-center space-y-1.5 z-10 px-4">
                    <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-wide drop-shadow-md group-hover:text-amber-200 transition-colors">
                      {item.name}
                    </h3>
                    
                    {/* CLEAN FORMATTED AVAILABLE TEXT WITHOUT ICON */}
                    <p className="text-xs font-bold text-emerald-300">
                      {itemCount}+ {item.name} Available
                    </p>
                    
                    {/* GOLDEN ACCENT UNDERLINE */}
                    <div className="w-10 h-1 bg-[#D97706] rounded-full mx-auto group-hover:w-20 transition-all duration-300 mt-1" />
                  </div>

                </Link>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}