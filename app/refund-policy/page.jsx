/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { RotateCcw, CheckCircle2, ShieldAlert, PackageX, Clock, CreditCard, Ban, FileText, Sparkles, ArrowRight } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
      <Header />

      <main className="flex-grow pb-24">
        
        {/* 1. MASTER HERO BANNER SECTION */}
        <section className="relative w-full py-12 sm:py-16 bg-slate-950 overflow-hidden mb-12 sm:mb-16">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#046A38]/70 to-slate-950" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 text-center space-y-5">
            <span className="bg-white/10 border border-white/20 text-amber-300 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center space-x-1.5 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span>Hassle-Free Returns & Satisfaction Guarantee</span>
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-serif font-black text-white tracking-tight leading-tight max-w-5xl mx-auto drop-shadow-xl">
              Refund & Cancellation Policy
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              At Ecoensa, we stand behind the quality of our 100% certified organic products. Learn about our easy 5-day returns, zero-fee damaged replacements, and swift 3 to 5-day refund process.
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
                Contact Support
              </Link>
            </div>
          </div>
        </section>

        {/* GLOBAL 1400PX FULL-WIDTH CONTAINER */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-10">

          {/* QUICK REFUND TIMELINE SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <Clock className="w-6 h-6 text-[#046A38] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">5-Day Return Window</h4>
              <p className="text-xs text-slate-500 font-medium">Easy request within 5 days of delivery for eligible sealed items.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <CreditCard className="w-6 h-6 text-[#FF6B00] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">3 to 5 Days Refund SLA</h4>
              <p className="text-xs text-slate-500 font-medium">Refund credited directly to original UPI, Card, or Bank account.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <PackageX className="w-6 h-6 text-[#046A38] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">Zero-Fee Damaged Return</h4>
              <p className="text-xs text-slate-500 font-medium">Full return shipping paid by Ecoensa if damaged item is received.</p>
            </div>
          </div>

          {/* POLICY CONTENT CONTAINER */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-slate-200/80 space-y-10 text-slate-700 text-sm sm:text-base font-medium leading-relaxed w-full">
            
            {/* 1. RETURNS POLICY */}
            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
                <RotateCcw className="w-6 h-6 text-[#046A38]" />
                <span>1. Easy Return Guidelines</span>
              </h3>
              <p className="text-slate-600">
                At Ecoensa Private Limited, we take extreme pride in delivering 100% pure, unadulterated organic spices, dry fruits, seeds, and A2 ghee. If you are not completely satisfied with your purchase, our straightforward policy ensures peace of mind:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>We offer a 5-day return window from the date of physical delivery for sealed, unopened items.</li>
                <li>Items returned due to customer preference change attract a minimal 20% restocking and processing fee.</li>
                <li>All returned merchandise must be unused, unwashed, unsealed, and in original brand packaging with labels intact.</li>
                <li>If a wrong, missing, or damaged item is delivered, Ecoensa covers 100% of the return shipping cost.</li>
                <li>For standard non-damaged returns, return courier charges are borne by the buyer.</li>
              </ul>
            </div>

            {/* 2. CANCELLATION POLICY */}
            <div className="space-y-3 pt-8 border-t border-slate-100">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
                <Ban className="w-6 h-6 text-[#FF6B00]" />
                <span>2. Order Cancellation Policy</span>
              </h3>
              <p className="text-slate-600">
                We process orders quickly to maintain farm-fresh delivery standards. You can cancel your order according to the following conditions:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li><strong>Before Dispatch:</strong> You can cancel any order free of cost before it is handed over to our courier partner. 100% full refund will be initiated instantly.</li>
                <li><strong>After Dispatch:</strong> If the shipment has already been dispatched, orders cannot be cancelled mid-transit. You may refuse delivery at your doorstep or request a standard return upon receipt.</li>
              </ul>
            </div>

            {/* 3. RETURN PROCEDURE */}
            <div className="space-y-3 pt-8 border-t border-slate-100">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
                <CheckCircle2 className="w-6 h-6 text-[#046A38]" />
                <span>3. Step-by-Step Return Procedure</span>
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Please send an email to <a href="mailto:info@ecoensa.com" className="text-[#FF6B00] underline font-bold">info@ecoensa.com</a> or submit a message via our <Link href="/contact" className="text-[#FF6B00] underline font-bold">Contact Us Page</Link>.</li>
                <li>Upon verifying your request, our support team will issue a Return Approval and provide shipping guidelines.</li>
                <li>Once the returned package reaches our facility, our quality team conducts a thorough physical inspection within 24 hours.</li>
                <li>Approved refunds are credited to your original payment method (UPI, Card, Net Banking) within 3 to 5 business days.</li>
              </ul>
            </div>

            {/* 4. DETAILS REQUIRED */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-serif font-black text-slate-900 text-base sm:text-lg flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#046A38]" />
                <span>Information Needed For Faster Return Processing:</span>
              </h4>
              <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-700 font-semibold">
                <li>Full Name & Registered Phone Number</li>
                <li>Order ID (e.g., #ECO-89241)</li>
                <li>Clear Photo / Unboxing Video of the Product & Box Label</li>
                <li>Reason for Return (Damaged, Expired, Wrong Item)</li>
              </ul>
            </div>

            {/* 5. NON-RETURNABLE FOOD ITEMS */}
            <div className="space-y-3 pt-8 border-t border-slate-100">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
                <PackageX className="w-6 h-6 text-[#FF6B00]" />
                <span>5. Non-Returnable & Non-Refundable Items</span>
              </h3>
              <p className="text-slate-600">
                Due to strict FSSAI hygiene and food safety regulations, the following items cannot be returned once opened:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Products with broken security seals or opened nitrogen-flushed pouches.</li>
                <li>Perishable food items damaged due to improper storage at customer end.</li>
                <li>Items purchased during clearance or flash mega-sales.</li>
              </ul>
            </div>

            {/* 6. LATE OR MISSING REFUNDS */}
            <div className="space-y-3 pt-8 border-t border-slate-100">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
                <ShieldAlert className="w-6 h-6 text-[#FF6B00]" />
                <span>6. Late or Missing Refunds Support</span>
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>If you have not received your refund after 5 business days, please re-check your bank statement or UPI app.</li>
                <li>Credit card refunds may take an additional 2-3 billing cycles to reflect on your physical statement.</li>
                <li>If you have verified with your bank and still need assistance, reach out directly to our finance team at <a href="mailto:info@ecoensa.com" className="text-[#FF6B00] underline font-bold">info@ecoensa.com</a> or call <strong>+91-9871500373</strong>.</li>
              </ul>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}