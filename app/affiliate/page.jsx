/* eslint-disable @next/next/no-img-element */
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Users, Award, TrendingUp, DollarSign, Share2, UserPlus } from "lucide-react";

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between relative overflow-x-clip">
      {/* STICKY HEADER */}
      <Header />

      <main className="flex-grow pb-20">
        
        {/* 1. HERO BANNER SECTION */}
        <section className="relative w-full py-16 sm:py-24 bg-slate-950 text-white text-center overflow-hidden mb-12 sm:mb-16">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
            style={{
              backgroundImage:
                "url('/images/bg.webp')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#046A38]/40 to-slate-950" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 space-y-4">
            {/* SUB-TAG WITH ORANGE DASHES ON BOTH SIDES */}
            <div className="flex items-center justify-center space-x-3 text-[#FF6B00] text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em]">
              <span className="w-8 sm:w-12 h-[2px] bg-[#FF6B00]" />
              <span>PARTNER PROGRAM</span>
              <span className="w-8 sm:w-12 h-[2px] bg-[#FF6B00]" />
            </div>

            {/* MAIN PAGE TITLE */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white drop-shadow-md">
              Join the Ecoensa Community &amp; Earn Money!
            </h1>

            <p className="text-base sm:text-lg text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Ecoensa is proud to offer a robust affiliate partner program for creators, health influencers, and bloggers who share our passion for 100% pure organic spices, dry fruits, and A2 ghee. Earn generous monthly commissions for every order through your link.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#FF6B00] hover:bg-[#e05e00] text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Apply for Affiliate Partnership
              </Link>
            </div>
            
            <div className="text-sm sm:text-base text-slate-200 font-medium pt-1">
              Already an affiliate partner? <Link href="/contact" className="text-amber-300 underline font-bold">Log in here</Link>
            </div>
          </div>
        </section>

        {/* GLOBAL 1400PX CONTAINER FOR PAGE CONTENT */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-12">

          {/* 4-STEP HOW IT WORKS PROCESS */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-slate-200/80 space-y-8">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs sm:text-sm font-extrabold uppercase text-[#046A38] bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full inline-block">
                Simple 4-Step Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900">
                How Our Affiliate Program Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#046A38] flex items-center justify-center mx-auto">
                  <UserPlus className="w-6 h-6" />
                </div>
                <span className="text-xs sm:text-sm font-black text-[#FF6B00] block">STEP 01</span>
                <h4 className="font-extrabold text-slate-900 text-lg">Sign Up Free</h4>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">Create your affiliate account in less than 2 minutes with instant approval.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative text-center">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF6B00] flex items-center justify-center mx-auto">
                  <Share2 className="w-6 h-6" />
                </div>
                <span className="text-xs sm:text-sm font-black text-[#FF6B00] block">STEP 02</span>
                <h4 className="font-extrabold text-slate-900 text-lg">Share Your Link</h4>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">Share custom referral links &amp; promo codes on Instagram, YouTube, or Blog.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#046A38] flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs sm:text-sm font-black text-[#FF6B00] block">STEP 03</span>
                <h4 className="font-extrabold text-slate-900 text-lg">Track Purchases</h4>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">Customers get 30-day cookie period to complete orders via your link.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative text-center">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF6B00] flex items-center justify-center mx-auto">
                  <DollarSign className="w-6 h-6" />
                </div>
                <span className="text-xs sm:text-sm font-black text-[#FF6B00] block">STEP 04</span>
                <h4 className="font-extrabold text-slate-900 text-lg">Get Paid Monthly</h4>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">Direct UPI or Bank payout credited automatically on the 1st of every month.</p>
              </div>

            </div>
          </div>

          {/* PARTNERSHIP OPPORTUNITIES TAGS */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-200/80 text-center space-y-6">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#046A38]">
              PARTNERSHIP OPPORTUNITIES &amp; CAMPAIGNS
            </h3>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                "Affiliate Marketing",
                "Creator Campaigns",
                "Exclusive Coupon Codes",
                "Product Gifting & PR",
                "Recipe Content Creation",
                "Eco Awareness Drives",
                "Bulk B2B Referrals",
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 border border-slate-200 text-slate-800 text-sm sm:text-base font-bold px-5 py-2.5 rounded-xl hover:border-[#046A38] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* COMMISSION TIERS & BENEFITS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-3 text-center shadow-xs">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#046A38] mx-auto flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-black text-xl text-slate-900">15% High Commission</h4>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">Earn up to 15% commission on every successful customer purchase generated through your referral code.</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-3 text-center shadow-xs">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-[#FF6B00] mx-auto flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-black text-xl text-slate-900">30-Day Cookie Window</h4>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">Even if a customer returns within 30 days of clicking your link, you still get full credit for the sale.</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-3 text-center shadow-xs">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#046A38] mx-auto flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-black text-xl text-slate-900">1:1 Partner Manager</h4>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">Get personalized banners, promo graphic assets, and dedicated support from our marketing team.</p>
            </div>
          </div>

          {/* AFFILIATE FAQ BOX */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-amber-300">
              Affiliate Program FAQs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm sm:text-base font-medium">
              <div className="space-y-2">
                <span className="font-extrabold text-white text-base sm:text-lg block">Q: Is there any registration fee to join?</span>
                <p className="text-slate-200 leading-relaxed">No, the Ecoensa Affiliate Partner Program is 100% free to join.</p>
              </div>

              <div className="space-y-2">
                <span className="font-extrabold text-white text-base sm:text-lg block">Q: What is the minimum payout threshold?</span>
                <p className="text-slate-200 leading-relaxed">The minimum payout threshold is ₹1,000. Earnings are transferred via UPI or Bank transfer.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}