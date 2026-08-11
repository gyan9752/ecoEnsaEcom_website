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
                  e.target.src = "/logo.png";
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
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
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
    {/* FACEBOOK */}
    <a
      href="https://www.facebook.com/people/Ecoensa/61550551033054/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="w-9 h-9 rounded-full bg-white text-[#1E7E34] hover:bg-slate-100 flex items-center justify-center transition-colors shadow-sm"
    >
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    </a>

    {/* INSTAGRAM */}
    <a
      href="https://www.instagram.com/ecoensa_/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="w-9 h-9 rounded-full bg-white text-[#1E7E34] hover:bg-slate-100 flex items-center justify-center transition-colors shadow-sm"
    >
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    </a>

    {/* LINKEDIN */}
    <a
      href="https://www.linkedin.com/company/ecoensa-private-limited/about/?viewAsMember=true"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="w-9 h-9 rounded-full bg-white text-[#1E7E34] hover:bg-slate-100 flex items-center justify-center transition-colors shadow-sm"
    >
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    </a>

    {/* WHATSAPP (REPLACING YOUTUBE) */}
    <a
      href="https://api.whatsapp.com/send?phone=919871500373"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="w-9 h-9 rounded-full bg-white text-[#1E7E34] hover:bg-slate-100 flex items-center justify-center transition-colors shadow-sm"
    >
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
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