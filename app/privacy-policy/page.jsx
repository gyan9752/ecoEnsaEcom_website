/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, Server, Cookie, Mail, ArrowRight } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between relative overflow-x-clip">
      {/* STICKY HEADER */}
      <Header />

      <main className="flex-grow pb-24">
        
        {/* 1. HERO BANNER SECTION (WITH NEW HERO BANNER DESIGN & DEWDROP LEAVES BG AT OPACITY-40) */}
        <section className="relative w-full py-16 sm:py-24 bg-slate-950 text-white text-center overflow-hidden mb-12 sm:mb-16">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
            style={{
              backgroundImage:"url('/images/bg.webp')",            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#046A38]/40 to-slate-950" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 space-y-4">
            {/* SUB-TAG WITH ORANGE DASHES ON BOTH SIDES */}
            <div className="flex items-center justify-center space-x-3 text-[#FF6B00] text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em]">
              <span className="w-8 sm:w-12 h-[2px] bg-[#FF6B00]" />
              <span>PRIVACY POLICY</span>
              <span className="w-8 sm:w-12 h-[2px] bg-[#FF6B00]" />
            </div>

            {/* MAIN PAGE TITLE */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white drop-shadow-md">
              Privacy Policy
            </h1>

            <p className="text-base sm:text-lg text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Your privacy is important to us. Learn how Ecoensa protects your personal data, ensures 256-bit SSL encrypted checkout, and adheres to strict PCI-DSS standards.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/shop"
                className="bg-[#FF6B00] hover:bg-[#e05e00] text-white font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full border border-white/30 backdrop-blur-md transition-all duration-300"
              >
                Contact Privacy Officer
              </Link>
            </div>
          </div>
        </section>

        {/* GLOBAL 1400PX FULL-WIDTH CONTAINER */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-8">

          {/* QUICK SECURITY SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <Lock className="w-6 h-6 text-[#046A38] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">256-Bit SSL Encrypted</h4>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">Your personal details and transactions are 100% encrypted.</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <Eye className="w-6 h-6 text-[#FF6B00] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">Zero Data Selling</h4>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">We never sell or rent your mobile number or email address.</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#046A38] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">PCI-DSS Compliant</h4>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">Payment details processed safely via RBI-approved Razorpay gateway.</p>
            </div>
          </div>

          {/* PRIVACY CONTENT (FULL 1400PX CARD) */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-slate-200/80 space-y-8 text-slate-700 text-base sm:text-lg font-normal leading-relaxed w-full">
            
            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <Server className="w-5 h-5 text-[#046A38]" />
                <span>SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?</span>
              </h3>
              <p>
                When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, delivery address, phone number, and email address. When you browse our store, we also automatically receive your computer&apos;s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />
                <span>SECTION 2 - CONSENT &amp; WITHDRAWAL</span>
              </h3>
              <p>
                <strong className="text-slate-900 font-bold">How do you get my consent?</strong> When you provide us with personal information to complete a transaction, verify your payment card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.
              </p>
              <p>
                <strong className="text-slate-900 font-bold">How do I withdraw my consent?</strong> If after you opt-in, you change your mind, you may withdraw your consent for us to contact you by emailing us at <a href="mailto:info@ecoensa.com" className="text-[#FF6B00] underline font-bold">info@ecoensa.com</a> or writing to us at Ecoensa Private Limited, Noida, Uttar Pradesh, India.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <Lock className="w-5 h-5 text-[#046A38]" />
                <span>SECTION 3 - DISCLOSURE</span>
              </h3>
              <p>
                We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <Server className="w-5 h-5 text-[#FF6B00]" />
                <span>SECTION 4 - SECURE PAYMENT &amp; DATA STORAGE</span>
              </h3>
              <p>
                Our store is hosted on secure cloud infrastructure with 256-bit SSL encryption. Your purchase transaction data is stored only as long as is necessary to complete your purchase transaction. All direct payment gateways adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council (Visa, MasterCard, Razorpay, UPI).
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <Cookie className="w-5 h-5 text-[#046A38]" />
                <span>SECTION 5 - THIRD-PARTY SERVICES &amp; COOKIES</span>
              </h3>
              <p>
                In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us (e.g. payment processors and courier providers). We use cookies to store session details and keep track of your shopping cart.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#FF6B00]" />
                <span>QUESTIONS AND CONTACT INFORMATION</span>
              </h3>
              <p>
                If you would like to access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information, contact our Privacy Officer at <a href="mailto:info@ecoensa.com" className="text-[#FF6B00] underline font-bold">info@ecoensa.com</a>.
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}