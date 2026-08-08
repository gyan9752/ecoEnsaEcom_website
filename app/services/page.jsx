/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Leaf, TreePine, Gift, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, Building2, ChevronDown, HelpCircle } from "lucide-react";

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const servicesList = [
    {
      id: "organic-supply",
      icon: Leaf,
      badge: "Pure Farm-to-Kitchen",
      title: "1. Organic Food & Spices Supply",
      subtitle: "B2B Bulk Supply & Retail Superfood Range",
      desc: "Direct farm-fresh sourcing of 100% certified organic spices, cold-pressed A2 Gir Cow Ghee, raw wild honey, and premium sun-dried fruits directly from indigenous Western Ghats and Himalayan farmer cooperatives.",
      features: [
        "100% Zero Chemical Pesticides & Synthetic Additives",
        "NABL Third-Party Lab Certified for 200+ Heavy Metal Tests",
        "Direct Fair-Trade Pricing Support to Indigenous Farmers",
        "Food-Grade Nitrogen-Flushed Eco Packaging",
      ],
      image: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "environmental-consulting",
      icon: TreePine,
      badge: "Scientific Advisory",
      title: "2. Environmental & Ecological Consulting",
      subtitle: "Soil Regeneration & Impact Audits",
      desc: "Led by Dr. Archana Naithani and our team of senior ecologists, we provide scientific Environmental Impact Assessments (EIA), biodiversity restoration blueprints, and industrial soil health remediation.",
      features: [
        "Environmental Impact Assessment (EIA) & Compliance Reports",
        "Biodiversity Conservation & Native Afforestation Plans",
        "Soil Microbe Regeneration & Natural Water Harvesting",
        "Corporate ESG & Environmental Audits",
      ],
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "corporate-gifting",
      icon: Gift,
      badge: "Sustainable Luxury",
      title: "3. Corporate Eco Gifting & Custom Hampers",
      subtitle: "Zero-Plastic Custom Brand Hampers",
      desc: "Custom curated organic food gift boxes, handcrafted wooden and jute packaging, and festive hampers for Diwali, corporate anniversaries, employee wellness drives, and VIP client appreciation.",
      features: [
        "Custom Corporate Brand Logo & Laser Engraving",
        "Handcrafted Eco-Friendly Wooden & Jute Baskets",
        "100% Plastic-Free & Zero-Waste Packaging",
        "PAN India & International Doorstep Express Delivery",
      ],
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "regenerative-agronomy",
      icon: ShieldCheck,
      badge: "Grassroots Impact",
      title: "4. Regenerative Farming & Agronomy Support",
      subtitle: "Empowering Rural Women Farmer Cooperatives",
      desc: "Empowering rural women land managers and indigenous farmers across Kerala and Uttar Pradesh with organic certification guidance, heirloom seed bank preservation, and zero-cost bio-fertilizer training.",
      features: [
        "Heirloom Native Seed Bank Preservation",
        "Women Farmer Cooperative Skill Development",
        "Zero Budget Natural Farming (ZBNF) Workshops",
        "Organic Certification & Government Grant Assistance",
      ],
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const methodology = [
    {
      step: "01",
      title: "Ecological Assessment",
      desc: "Scientific evaluation of soil health, water purity, and seed quality directly at farm level.",
    },
    {
      step: "02",
      title: "Sustainable Harvest",
      desc: "Sun-drying and traditional hand-processing by trained rural women cooperatives.",
    },
    {
      step: "03",
      title: "NABL Lab Certification",
      desc: "100% chemical, heavy metal, and pesticide-free lab testing before approval.",
    },
    {
      step: "04",
      title: "Eco Packaging & Dispatch",
      desc: "Sealed in food-grade eco-pouches & glass jars for express doorstep shipping.",
    },
  ];

  const industries = [
    { name: "Corporate Offices & IT Parks", desc: "Employee wellness drives & executive organic snack boxes." },
    { name: "Luxury Hotels & Restaurants", desc: "Bulk organic spices, A2 Ghee, and wild honey supply." },
    { name: "Wellness Resorts & Spas", desc: "Pure ayurvedic & herbal organic food ingredients." },
    { name: "Global Exporters & Importers", desc: "Certified organic exports to USA, UK, UAE, and Canada." },
  ];

  const faqs = [
    {
      q: "Can we order custom corporate gift hampers with our company logo?",
      a: "Yes, absolutely! We specialize in custom corporate eco-gifting. We provide custom laser-engraved wooden boxes, jute hampers, and personalized greeting cards with your company branding.",
    },
    {
      q: "How does Ecoensa conduct Environmental Impact Assessments (EIA)?",
      a: "Our team of PhD ecologists conducts field audits, soil microbiology testing, biodiversity mapping, and environmental compliance reports tailored for industries, farms, and eco-resorts.",
    },
    {
      q: "Do you supply bulk organic spices and A2 Ghee for commercial kitchens?",
      a: "Yes, we supply bulk organic spices, A2 Gir Cow Ghee, and wild honey in 5kg, 10kg, and custom packaging to luxury hotels, restaurants, and organic food brands.",
    },
    {
      q: "Are all Ecoensa products certified organic?",
      a: "100% Yes. All our products are FSSAI certified, India Organic compliant, and NABL lab-tested for zero pesticide residues.",
    },
    {
      q: "Can we order custom corporate gift hampers with our company logo?",
      a: "Yes, absolutely! We specialize in custom corporate eco-gifting. We provide custom laser-engraved wooden boxes, jute hampers, and personalized greeting cards with your company branding.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
      <Header />

      {/* TOP PADDING SET TO pt-8 sm:pt-10 TO MATCH ALL OTHER PAGES CLEANLY */}
      <main className="flex-grow pt-8 sm:pt-10 pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-14">
          
          {/* 🌟 SHORT & COMPACT HERO BANNER */}
          <div className="bg-gradient-to-br from-emerald-950 via-[#046A38] to-slate-950 rounded-3xl py-10 sm:py-14 px-6 sm:px-12 text-white text-center space-y-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF6B00]/20 rounded-full blur-3xl pointer-events-none" />

            <span className="bg-white/10 border border-white/20 text-amber-300 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scientific Excellence & Organic Living</span>
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight max-w-4xl mx-auto leading-tight">
              Pioneering Ecological Solutions & Organic Food Excellence
            </h1>

            <p className="text-xs sm:text-base text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed">
              Bridging Environmental Science, Biodiversity Restoration, and Farm-to-Kitchen Pure Organic Nutrition for Families & Enterprises.
            </p>

            {/* COMPACT INLINE HIGHLIGHT BADGES */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <span className="bg-white/10 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-white/15 text-amber-300">
                100+ B2B Clients
              </span>
              <span className="bg-white/10 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-white/15 text-emerald-300">
                25,000+ Trees Planted
              </span>
              <span className="bg-white/10 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-white/15 text-amber-300">
                100% Certified Organic
              </span>
              <span className="bg-white/10 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-white/15 text-emerald-300">
                NABL Lab Tested
              </span>
            </div>
          </div>

          {/* 2. PAGE HEADER (SMALLER HEADING & SOLID BLACK) */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 inline-block">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
              Our Specialized Services & Solutions
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Explore how Ecoensa delivers scientific rigor across retail, corporate gifting, and environmental consultancy.
            </p>
            <div className="w-16 h-1 bg-[#FF6B00] rounded-full mx-auto" />
          </div>

          {/* 3. ALTERNATING (ZIG-ZAG) 4 SERVICES CARDS */}
          <div className="space-y-12">
            {servicesList.map((service, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl flex flex-col ${
                    isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                  } gap-8 lg:gap-12 items-center`}
                >
                  {/* IMAGE SIDE (50% WIDTH) */}
                  <div className="w-full lg:w-1/2 relative">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group shadow-md">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-amber-300 text-xs font-black uppercase px-3.5 py-1 rounded-full border border-white/20">
                        {service.badge}
                      </div>
                    </div>
                  </div>

                  {/* CONTENT SIDE (50% WIDTH) */}
                  <div className="w-full lg:w-1/2 space-y-5">
                    <div className="space-y-1">
                      <span className="text-xs font-black text-[#FF6B00] uppercase tracking-wider block">{service.subtitle}</span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-900">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      {service.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {service.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-start space-x-2.5">
                          <CheckCircle2 className="w-5 h-5 text-[#046A38] shrink-0 mt-0.5" />
                          <span className="text-xs font-bold text-slate-800">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <Link
                        href="/contact"
                        className="bg-black hover:bg-slate-800 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-all inline-flex items-center space-x-2 cursor-pointer"
                      >
                        <span>Inquire About {service.badge}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* 4. OUR METHODOLOGY (4-PHASE PROCESS) */}
          <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 space-y-10">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-amber-300 text-xs font-black uppercase tracking-widest bg-white/10 px-4 py-1 rounded-full border border-white/20">
                Scientific Approach
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-white">
                Our 4-Phase Quality Methodology
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodology.map((m, idx) => (
                <div key={idx} className="bg-white/5 border border-white/15 p-6 rounded-2xl space-y-3">
                  <span className="text-3xl font-serif font-black text-amber-400 block">{m.step}</span>
                  <h4 className="font-serif font-bold text-lg text-white">{m.title}</h4>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. INDUSTRIES WE SERVE */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-lg space-y-8">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-black uppercase text-[#FF6B00] bg-orange-100/80 px-4 py-1 rounded-full border border-orange-200">
                Diverse Client Footprint
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900">
                Industries & Sector Expertise
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((ind, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
                  <Building2 className="w-6 h-6 text-[#046A38]" />
                  <h4 className="font-extrabold text-sm text-slate-900">{ind.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. 2-COLUMN FAQ SECTION (IMAGE LEFT + FAQ ACCORDION RIGHT) */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-lg space-y-8">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-black uppercase text-[#046A38] bg-emerald-50 px-4 py-1 rounded-full border border-emerald-200">
                Service Inquiries
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900">
                Frequently Asked Questions
              </h2>
            </div>

            {/* 2-COLUMN GRID (LEFT IMAGE, RIGHT ACCORDION) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT IMAGE WITH FLOATING SUPPORT BADGE */}
              <div className="lg:col-span-5 relative">
                <div className="relative w-full aspect-[4/4.5] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md group">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                    alt="Ecoensa Service Support Team"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <span className="text-xs font-black text-amber-300 uppercase tracking-widest">Expert Consultation</span>
                    <h4 className="text-lg font-serif font-bold">Need Personal Assistance?</h4>
                    <p className="text-xs text-slate-300">Our environmental scientists respond to enterprise queries within 24 hours.</p>
                  </div>
                </div>

                {/* FLOATING BADGE */}
                <div className="absolute -top-4 -right-2 bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl border border-white/20 flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-[#046A38] text-white flex items-center justify-center font-black">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-amber-300 block">Direct Line</span>
                    <span className="text-[11px] text-slate-300 font-semibold">+91-9871500373</span>
                  </div>
                </div>
              </div>

              {/* RIGHT FAQ ACCORDION LIST */}
              <div className="lg:col-span-7 space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left p-5 flex items-center justify-between font-bold text-sm sm:text-base text-slate-900 cursor-pointer hover:text-[#046A38]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-[#046A38] shrink-0 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                    </button>

                    {openFaq === idx && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 font-medium border-t border-slate-200/60 pt-2 bg-white leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* 7. GRAND ENTERPRISE CTA BANNER */}
          <div className="bg-gradient-to-br from-[#1E7E34] via-[#046A38] to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-black uppercase text-amber-300 tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block">
                Custom Enterprise Inquiries
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black">Need Environmental Consultation or Bulk Organic Supply?</h3>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">Contact our senior ecological team directly for custom B2B pricing and project execution.</p>
            </div>

            <Link
              href="/contact"
              className="bg-[#FF6B00] hover:bg-[#e05e00] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-xl hover:scale-105 transition-all shrink-0 whitespace-nowrap"
            >
              Contact Support Team
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}