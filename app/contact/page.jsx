/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-24 sm:pt-28 pb-20">
        {/* GLOBAL 1400PX CONTAINER */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-16">
          
          {/* HERO HEADER (HEADING IS NOW BLACK) */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 border border-orange-200 px-4 py-1.5 rounded-full inline-block">
              We Are Here To Help
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-slate-900 tracking-tight">
              Get in Touch With Us
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Have questions about our organic products, sustainability solutions, bulk orders, or partnerships? Fill out the form below or reach us directly.
            </p>
            <div className="w-20 h-1.5 bg-[#FF6B00] rounded-full mx-auto" />
          </div>

          {/* MAIN 2-COLUMN GRID (CONTACT INFO + FORM) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: DIRECT CONTACT DETAILS */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-gradient-to-br from-[#1E7E34] via-[#046A38] to-slate-900 rounded-3xl p-8 text-white space-y-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B00]/20 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-black text-white">
                    Contact Information
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium">
                    Reach out to our eco-consultants and customer support team directly.
                  </p>
                </div>

                <div className="space-y-6 text-xs sm:text-sm font-medium">
                  {/* REGISTERED OFFICE */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <MapPin className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <span className="font-extrabold text-white text-sm block">Registered Office:</span>
                      <span className="text-slate-200 leading-snug">
                        JG_III, 228-B, Vikas Puri, New Delhi, India - 110018
                      </span>
                    </div>
                  </div>

                  {/* CORPORATE OFFICE */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <MapPin className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <span className="font-extrabold text-white text-sm block">Corporate Office:</span>
                      <span className="text-slate-200 leading-snug">
                        B-208, Tower 3, Techzone VI, Greater Noida West, 201306
                      </span>
                    </div>
                  </div>

                  {/* PHONE NUMBERS */}
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <Phone className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <span className="font-extrabold text-white text-sm block">Phone Numbers:</span>
                      <a href="tel:+919871500373" className="text-slate-200 hover:text-amber-300 transition-colors font-bold">
                        0120-6050108, +91-9871500373
                      </a>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <Mail className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <span className="font-extrabold text-white text-sm block">Email Address:</span>
                      <a href="mailto:info@ecoensa.com" className="text-slate-200 hover:text-emerald-300 transition-colors font-bold">
                        info@ecoensa.com
                      </a>
                    </div>
                  </div>

                  {/* WORKING HOURS */}
                  <div className="flex items-center space-x-4 pt-2 border-t border-white/10">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <Clock className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <span className="font-extrabold text-white text-sm block">Business Hours:</span>
                      <span className="text-slate-300 text-xs">Monday – Saturday: 9:00 AM – 7:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-mono opacity-80 border-t border-white/10 space-y-0.5">
                  <p>CIN: U93090DL2021PTC383439</p>
                  <p>GSTIN: 09AAGCE5473Q1ZU</p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: INTERACTIVE FORM */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80">
              
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#046A38] mx-auto flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif font-black text-slate-900">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 font-medium max-w-md mx-auto">
                    Thank you for contacting Ecoensa. Our representative will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-serif font-black text-slate-900">
                      Send Us a Message
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Fill in your details below and we will get back to you promptly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* FULL NAME */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-slate-700 tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Archana Naithani"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#046A38] focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium outline-none transition-all"
                      />
                    </div>

                    {/* EMAIL ADDRESS */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-slate-700 tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#046A38] focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* PHONE NUMBER */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-slate-700 tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 9871500373"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#046A38] focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium outline-none transition-all"
                      />
                    </div>

                    {/* SUBJECT DROPDOWN */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-slate-700 tracking-wider">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#046A38] focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium outline-none transition-all bg-white"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Organic Product Orders">Organic Product Orders</option>
                        <option value="Partnership & Affiliate">Partnership & Affiliate</option>
                        <option value="Environmental Consultation">Environmental Consultation</option>
                        <option value="Bulk Order Inquiry">Bulk Order Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* MESSAGE TEXTAREA */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-slate-700 tracking-wider">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write your message or inquiry here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#046A38] focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium outline-none transition-all resize-none"
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    className="w-full bg-[#046A38] hover:bg-[#FF6B00] text-white font-extrabold text-sm py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}

            </div>

          </div>

          {/* QUICK SUPPORT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 text-center shadow-xs">
              <MessageSquare className="w-6 h-6 text-[#046A38] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">Instant Support</h4>
              <p className="text-xs text-slate-500 font-medium">Get fast replies on WhatsApp and email within business hours.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 text-center shadow-xs">
              <Mail className="w-6 h-6 text-[#FF6B00] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">Corporate Inquiries</h4>
              <p className="text-xs text-slate-500 font-medium">For corporate orders & consultancy, email info@ecoensa.com.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 text-center shadow-xs">
              <MapPin className="w-6 h-6 text-[#046A38] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">PAN India Presence</h4>
              <p className="text-xs text-slate-500 font-medium">Offices in Delhi NCR & Greater Noida West with nationwide shipping.</p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}