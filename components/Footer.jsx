/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1E7E34] text-white pt-16 pb-10 border-t border-white/10 font-sans relative">
      {/* GLOBAL 1400PX CONTAINER */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-10">
        
        {/* TOP 4-COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* COLUMN 1: PERFECT MID-SIZE DIRECT LOGO & TEAM STORY */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block group">
              <img
                src="/images/logo.png"
                alt="Ecoensa Logo"
                className="w-20 sm:w-24 h-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/ecosenalogo.webp";
                }}
              />
            </Link>

            <div className="space-y-2">
              <h4 className="text-lg sm:text-xl font-black text-white tracking-wide">
                Team Story:
              </h4>
              <p className="text-sm sm:text-base text-white/95 leading-relaxed font-medium">
                Ecoensa Private Limited was founded by a group of passionate and highly skilled ecologists and environmentalists who came together with a shared vision of promoting sustainable development and responsible environmental practices.
              </p>
              <div className="pt-2 text-xs space-y-1 opacity-90 font-mono font-bold">
                <p>CIN No.U93090DL2021PTC383439</p>
                <p>GSTIN: 09AAGCE5473Q1ZU</p>
              </div>
            </div>
          </div>

          {/* COLUMN 2: CATEGORIES */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-lg sm:text-xl font-black text-white tracking-wide border-b border-white/20 pb-2">
              Categories
            </h4>
            <ul className="space-y-2 text-sm font-semibold text-white/95">
              <li><Link href="/shop?category=dry-fruits" className="hover:underline">Dry Fruits & Nuts</Link></li>
              <li><Link href="/shop?category=spices" className="hover:underline">Organic Spices & Herbs</Link></li>
              <li><Link href="/shop?category=seeds" className="hover:underline">Super Seeds Range</Link></li>
              <li><Link href="/shop?category=millets" className="hover:underline">Healthy Millets & Grains</Link></li>
              <li><Link href="/shop?category=berries" className="hover:underline">Dried Berries</Link></li>
              <li><Link href="/shop?category=a2-ghee" className="hover:underline">A2 Vedic Ghee</Link></li>
              <li><Link href="/shop?category=honey" className="hover:underline">Pure Organic Honey</Link></li>
              <li><Link href="/shop" className="hover:underline">Wellness Essentials</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: QUICK LINKS */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-lg sm:text-xl font-black text-white tracking-wide border-b border-white/20 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-white/95">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/services" className="hover:underline">Services</Link></li>
              <li><Link href="/shop" className="hover:underline">Shop</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: CONTACT INFO WITH MAP PIN ICONS FOR BOTH OFFICES */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-lg sm:text-xl font-black text-white tracking-wide border-b border-white/20 pb-2">
              Contact Info
            </h4>

            <div className="space-y-4 text-sm sm:text-base text-white/95 font-medium leading-relaxed">
              
              {/* REGISTERED OFFICE */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-1" />
                <div>
                  <span className="font-extrabold block text-white text-base">Registered Office:</span>
                  <span className="text-sm">JG_III, 228-B, Vikas Puri, New Delhi. India, Pincode - 110018</span>
                </div>
              </div>

              {/* CORPORATE OFFICE WITH LOCATION ICON */}
              <div className="flex items-start space-x-3 pt-1">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-1" />
                <div>
                  <span className="font-extrabold block text-white text-base">Corporate Office:</span>
                  <span className="text-sm">B-208, Tower 3, Techzone VI, Greater Noida West, 201306</span>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-center space-x-3 pt-1">
                <Phone className="w-5 h-5 text-white shrink-0" />
                <a href="tel:+919871500373" className="hover:underline font-bold text-base">0120-6050108, +91-9871500373</a>
              </div>

              {/* EMAIL */}
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white shrink-0" />
                <a href="mailto:info@ecoensa.com" className="hover:underline font-bold text-base">info@ecoensa.com</a>
              </div>

            </div>
          </div>

        </div>

        {/* POLICIES ROW RIGHT ABOVE SOCIAL MEDIA ICONS */}
        <div className="pt-6 border-t border-white/20">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 text-xs sm:text-sm font-bold text-white/90">
            <span className="text-amber-300 font-black uppercase tracking-wider">Policies:</span>
            <Link href="/affiliate" className="hover:underline hover:text-white">Become an Affiliate!</Link>
            <span className="text-white/40">•</span>
            <Link href="/refund-policy" className="hover:underline hover:text-white">Refund Policy</Link>
            <span className="text-white/40">•</span>
            <Link href="/shipping-policy" className="hover:underline hover:text-white">Shipping Policy</Link>
            <span className="text-white/40">•</span>
            <Link href="/privacy-policy" className="hover:underline hover:text-white">Privacy Policy</Link>
            <span className="text-white/40">•</span>
            <Link href="/terms-of-service" className="hover:underline hover:text-white">Terms of Service</Link>
          </div>
        </div>

        {/* BOTTOM SOCIAL & REAL BRANDED PAYMENT BADGES BAR */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          
          {/* SOCIAL MEDIA ICONS ON THE LEFT */}
          <div className="flex items-center space-x-3 text-white">
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white text-[#1E7E34] hover:bg-slate-100 flex items-center justify-center transition-colors shadow-sm">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
              </svg>
            </a>

            <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white text-[#1E7E34] hover:bg-slate-100 flex items-center justify-center transition-colors shadow-sm">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>

            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white text-[#1E7E34] hover:bg-slate-100 flex items-center justify-center transition-colors shadow-sm">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white text-[#1E7E34] hover:bg-slate-100 flex items-center justify-center transition-colors shadow-sm">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
          </div>

          {/* REAL BRANDED PAYMENT BADGES WITH ORIGINAL COLORS */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* AMEX */}
            <span className="bg-[#006FCF] text-white px-2.5 py-1 rounded text-[11px] font-black tracking-tighter shadow-sm border border-white/20">
              AMEX
            </span>

            {/* APPLE PAY */}
            <span className="bg-black text-white px-2.5 py-1 rounded text-[11px] font-black shadow-sm border border-white/20 flex items-center space-x-1">
              <span></span><span>Pay</span>
            </span>

            {/* DISCOVER */}
            <span className="bg-[#FF6000] text-white px-2.5 py-1 rounded text-[11px] font-black shadow-sm border border-white/20">
              DISCOVER
            </span>

            {/* GOOGLE PAY */}
            <span className="bg-white text-slate-800 px-2.5 py-1 rounded text-[11px] font-black shadow-sm flex items-center space-x-0.5">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">P</span>
              <span className="text-[#FBBC05]">a</span>
              <span className="text-[#34A853]">y</span>
            </span>

            {/* MASTERCARD */}
            <span className="bg-[#1A1919] text-white px-2.5 py-1 rounded text-[11px] font-black shadow-sm flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B] inline-block -mr-1" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] inline-block" />
            </span>

            {/* PAYPAL */}
            <span className="bg-[#003087] text-white px-2.5 py-1 rounded text-[11px] font-black shadow-sm border border-white/20 flex items-center space-x-0.5">
              <span className="text-[#0079C1] italic">P</span>
              <span className="text-[#00457C] italic">P</span>
              <span>PayPal</span>
            </span>

            {/* SHOP PAY */}
            <span className="bg-[#5C6AC4] text-white px-2.5 py-1 rounded text-[11px] font-black shadow-sm">
              shop
            </span>

            {/* VISA */}
            <span className="bg-[#1A1F71] text-[#F7B600] px-2.5 py-1 rounded text-[11px] font-black tracking-wider shadow-sm border border-white/20">
              VISA
            </span>
          </div>

        </div>

        {/* COPYRIGHT LINE */}
        <div className="text-center sm:text-left text-xs sm:text-sm text-white/90 font-medium pt-2">
          <p>Copyright © 2026 Ecoensa Private Limited. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}