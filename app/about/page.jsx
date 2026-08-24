// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import { Leaf, ShieldCheck, Heart, Award, Users, TreePine, Sparkles, CheckCircle2, ArrowRight, Sun, Microscope, Box, FileCheck, Check, ChevronDown, HelpCircle } from "lucide-react";

// export default function AboutPage() {
//   const [openFaq, setOpenFaq] = useState(0);

//   const faqs = [
//     {
//       q: "Are all Ecoensa products 100% certified organic?",
//       a: "Yes, 100%! All our spices, dry fruits, seeds, A2 ghee, and wild honey are sourced directly from certified organic farms in Western Ghats, Kerala & the Himalayas. We never use chemical fertilizers or artificial food dyes.",
//     },
//     {
//       q: "How do you ensure zero pesticide contamination in your products?",
//       a: "Every harvest batch undergoes rigorous third-party NABL lab testing for over 200+ pesticide residues, heavy metals, and synthetic additives before Nitrogen-flushed packaging.",
//     },
//     {
//       q: "What makes your A2 Desi Cow Ghee different from commercial ghee?",
//       a: "Our A2 Ghee is hand-crafted using the ancient Vedic Bilona method from grass-fed indigenous Gir cows. We churn curd (dahi) into butter, preserving pure Omega-3 fatty acids, natural aroma, and medicinal potency.",
//     },
//     {
//       q: "How long does delivery take across India?",
//       a: "We offer Free Express Shipping on orders above ₹999. Orders are dispatched within 24 hours and delivered within 2 to 4 business days via BlueDart, DTDC, and Delhivery.",
//     },
//     {
//       q: "What is your return & refund policy?",
//       a: "We offer a hassle-free 5-day easy return policy for damaged, unsealed, or unsatisfactory products with a 100% full money-back guarantee.",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
//       <Header />

//       <main className="flex-grow pb-24">
        
//         {/* 1. HERO BANNER SECTION */}
//         <section className="relative w-full py-12 sm:py-16 bg-slate-950 overflow-hidden">
//           <div
//             className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
//             style={{
//               backgroundImage:
//                 "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80')",
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#046A38]/70 to-slate-950" />

//           <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 text-center space-y-5">
//             <span className="bg-white/10 border border-white/20 text-amber-300 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center space-x-1.5 shadow-lg">
//               <Sparkles className="w-4 h-4" />
//               <span>About Ecoensa Private Limited</span>
//             </span>

//             <h1 className="text-2xl sm:text-4xl lg:text-6xl font-serif font-black text-white tracking-tight leading-tight max-w-5xl mx-auto drop-shadow-xl">
//               Pioneering Environmental Science &amp; Sustainable Organic Living
//             </h1>

//             <p className="text-sm sm:text-base text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
//               Founded by passionate ecologists and environmental scientists, Ecoensa bridges nature and wellness to deliver 100% pure organic food, spices, and environmental conservation solutions.
//             </p>

//             <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
//               <Link
//                 href="/shop"
//                 className="bg-[#FF6B00] hover:bg-[#e05e00] text-white font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
//               >
//                 <span>Explore Our Products</span>
//                 <ArrowRight className="w-4 h-4" />
//               </Link>
//               <Link
//                 href="/contact"
//                 className="bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full border border-white/30 backdrop-blur-md transition-all duration-300"
//               >
//                 Contact Our Team
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* 2. OUR VISION & STORY SECTION */}
//         <section className="py-16 sm:py-24 bg-white">
//           <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-16">
            
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
//               <div className="lg:col-span-6 relative">
//                 <div className="relative w-full aspect-[4/3.5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
//                   <img
//                     src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80"
//                     alt="Ecoensa Organic Farm"
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//                 </div>

//                 <div className="absolute -bottom-6 -right-2 sm:right-6 bg-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-slate-200 flex items-center space-x-3">
//                   <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#046A38] flex items-center justify-center font-black">
//                     <Leaf className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <span className="text-xl font-black text-slate-900 block">100% Pure</span>
//                     <span className="text-xs text-slate-500 font-bold">Organic Certified</span>
//                   </div>
//                 </div>

//                 <div className="absolute -top-6 -left-2 sm:left-6 bg-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/20 flex items-center space-x-3">
//                   <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-[#FF6B00] flex items-center justify-center font-black">
//                     <Users className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <span className="text-xl font-black text-amber-300 block">50,000+</span>
//                     <span className="text-xs text-slate-300 font-bold">Happy Families</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="lg:col-span-6 space-y-6">
//                 <div className="space-y-2">
//                   <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-4 py-1.5 rounded-full inline-block border border-orange-200">
//                     Our Origin Story
//                   </span>
//                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight">
//                     Rooted in Ecology, Driven by Science
//                   </h2>
//                 </div>

//                 <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
//                   Ecoensa Private Limited was founded by a team of visionary ecologists and environmental scientists who recognized the urgent need to reconnect modern lifestyles with pure, unadulterated natural nutrition.
//                 </p>

//                 <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
//                   By collaborating with indigenous farmers and women-led agricultural communities across India, we curate hand-harvested spices, premium dry fruits, cold-pressed A2 ghee, and raw wild honey that retain their full medicinal and nutritional potency.
//                 </p>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
//                   {[
//                     "Zero Chemical Fertilizers",
//                     "Direct Farm-to-Kitchen Sourcing",
//                     "Women Farmer Empowerment",
//                     "Regenerative Agriculture",
//                   ].map((feat, idx) => (
//                     <div key={idx} className="flex items-center space-x-2.5">
//                       <CheckCircle2 className="w-5 h-5 text-[#046A38] shrink-0" />
//                       <span className="text-xs sm:text-sm font-bold text-slate-800">{feat}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//             </div>

//           </div>
//         </section>

//         {/* 3. FARM-TO-KITCHEN 4-STEP TIMELINE */}
//         <section className="py-16 sm:py-24 bg-emerald-950 text-white relative overflow-hidden">
//           <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-14 relative z-10">
            
//             <div className="text-center space-y-3 max-w-2xl mx-auto">
//               <span className="text-amber-300 text-xs font-black uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/20 inline-block">
//                 Our Transparent Journey
//               </span>
//               <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
//                 From Kerala Farms To Your Kitchen
//               </h2>
//               <p className="text-sm text-slate-300 font-medium">How we preserve 100% natural aroma, flavor, and medicinal potency.</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
//               <div className="bg-white/5 border border-white/15 p-8 rounded-3xl space-y-4 hover:bg-white/10 transition-all group">
//                 <span className="text-4xl font-serif font-black text-amber-400 opacity-60 group-hover:opacity-100">01</span>
//                 <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
//                   <Sun className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-xl font-serif font-bold text-[#FFF]">1. Soil &amp; Seed Selection</h3>
//                 <p className="text-xs text-slate-300 leading-relaxed font-medium">
//                   We partner only with organic certified farms in Western Ghats, Kerala that practice heirloom seed preservation.
//                 </p>
//               </div>

//               <div className="bg-white/5 border border-white/15 p-8 rounded-3xl space-y-4 hover:bg-white/10 transition-all group">
//                 <span className="text-4xl font-serif font-black text-amber-400 opacity-60 group-hover:opacity-100">02</span>
//                 <div className="w-12 h-12 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center">
//                   <Leaf className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-xl font-serif font-bold text-white">2. Natural Sun Drying</h3>
//                 <p className="text-xs text-slate-300 leading-relaxed font-medium">
//                   Spices and berries are sun-dried naturally without heat blasts or artificial color treatments.
//                 </p>
//               </div>

//               <div className="bg-white/5 border border-white/15 p-8 rounded-3xl space-y-4 hover:bg-white/10 transition-all group">
//                 <span className="text-4xl font-serif font-black text-amber-400 opacity-60 group-hover:opacity-100">03</span>
//                 <div className="w-12 h-12 rounded-xl bg-blue-400/20 text-blue-300 flex items-center justify-center">
//                   <Microscope className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-xl font-serif font-bold text-white">3. Rigorous Lab Testing</h3>
//                 <p className="text-xs text-slate-300 leading-relaxed font-medium">
//                   Every batch is lab-tested for heavy metals, pesticides, and microbial purity before approval.
//                 </p>
//               </div>

//               <div className="bg-white/5 border border-white/15 p-8 rounded-3xl space-y-4 hover:bg-white/10 transition-all group">
//                 <span className="text-4xl font-serif font-black text-amber-400 opacity-60 group-hover:opacity-100">04</span>
//                 <div className="w-12 h-12 rounded-xl bg-orange-400/20 text-orange-300 flex items-center justify-center">
//                   <Box className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-xl font-serif font-bold text-white">4. Eco Nitrogen Pouch</h3>
//                 <p className="text-xs text-slate-300 leading-relaxed font-medium">
//                   Packed in food-grade, nitrogen-flushed eco-pouches to lock in essential oils and crisp freshness.
//                 </p>
//               </div>

//             </div>

//           </div>
//         </section>

//         {/* 4. FOUR CORE VALUES CARDS */}
//         <section className="py-16 sm:py-24 bg-slate-100 border-y border-slate-200">
//           <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-12">
            
//             <div className="text-center space-y-3 max-w-2xl mx-auto">
//               <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-white px-4 py-1.5 rounded-full border border-slate-200 inline-block shadow-xs">
//                 Guiding Principles
//               </span>
//               <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
//                 Our Core Pillars
//               </h2>
//               <div className="w-16 h-1 bg-[#FF6B00] rounded-full mx-auto" />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              
//               <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-200 space-y-4 hover:shadow-xl transition-all group">
//                 <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#046A38] flex items-center justify-center group-hover:scale-110 transition-transform">
//                   <Award className="w-7 h-7" />
//                 </div>
//                 <h3 className="text-lg font-bold text-slate-900">Scientific Rigor</h3>
//                 <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
//                   Every product undergoes strict lab testing to ensure zero pesticide residues, 100% purity, and maximum nutrient density.
//                 </p>
//               </div>

//               <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-200 space-y-4 hover:shadow-xl transition-all group">
//                 <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#FF6B00] flex items-center justify-center group-hover:scale-110 transition-transform">
//                   <Heart className="w-7 h-7" />
//                 </div>
//                 <h3 className="text-lg font-bold text-slate-900">Women Empowerment</h3>
//                 <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
//                   We empower rural women land managers who sustain traditional biodiversity conservation wisdom.
//                 </p>
//               </div>

//               <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-200 space-y-4 hover:shadow-xl transition-all group">
//                 <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#046A38] flex items-center justify-center group-hover:scale-110 transition-transform">
//                   <TreePine className="w-7 h-7" />
//                 </div>
//                 <h3 className="text-lg font-bold text-slate-900">Climate Resilience</h3>
//                 <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
//                   Our eco-initiatives actively combat biodiversity crisis and promote sustainable natural resource management.
//                 </p>
//               </div>

//               <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-200 space-y-4 hover:shadow-xl transition-all group">
//                 <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#FF6B00] flex items-center justify-center group-hover:scale-110 transition-transform">
//                   <ShieldCheck className="w-7 h-7" />
//                 </div>
//                 <h3 className="text-lg font-bold text-slate-900">Uncompromised Quality</h3>
//                 <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
//                   From sun-dried organic spices to traditional Bilona A2 Ghee, we never compromise on authentic purity.
//                 </p>
//               </div>

//             </div>

//           </div>
//         </section>

//         {/* 5. OFFICIAL CERTIFICATIONS */}
//         <section className="py-16 sm:py-24 bg-white">
//           <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-12">
            
//             <div className="text-center space-y-3 max-w-2xl mx-auto">
//               <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 inline-block">
//                 Trust &amp; Standards
//               </span>
//               <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
//                 Our Quality Certifications
//               </h2>
//               <p className="text-sm text-slate-600 font-medium">Certified by leading food safety and organic authority standards.</p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
//               <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-center space-y-3">
//                 <div className="w-14 h-14 bg-emerald-100 text-[#046A38] rounded-2xl flex items-center justify-center mx-auto">
//                   <FileCheck className="w-7 h-7" />
//                 </div>
//                 <h4 className="font-extrabold text-base text-slate-900">FSSAI Certified</h4>
//                 <p className="text-xs text-slate-600 font-medium">Licensed food safety compliant processing and hygienic packaging.</p>
//               </div>

//               <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-center space-y-3">
//                 <div className="w-14 h-14 bg-emerald-100 text-[#046A38] rounded-2xl flex items-center justify-center mx-auto">
//                   <Leaf className="w-7 h-7" />
//                 </div>
//                 <h4 className="font-extrabold text-base text-slate-900">100% Organic India</h4>
//                 <p className="text-xs text-slate-600 font-medium">Authentic organic farming practices without synthetic chemicals.</p>
//               </div>

//               <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-center space-y-3">
//                 <div className="w-14 h-14 bg-emerald-100 text-[#046A38] rounded-2xl flex items-center justify-center mx-auto">
//                   <ShieldCheck className="w-7 h-7" />
//                 </div>
//                 <h4 className="font-extrabold text-base text-slate-900">Zero Pesticide Guarantee</h4>
//                 <p className="text-xs text-slate-600 font-medium">Lab verified free from artificial colors, dyes, or harmful preservatives.</p>
//               </div>

//               <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-center space-y-3">
//                 <div className="w-14 h-14 bg-emerald-100 text-[#046A38] rounded-2xl flex items-center justify-center mx-auto">
//                   <Check className="w-7 h-7" />
//                 </div>
//                 <h4 className="font-extrabold text-base text-slate-900">Non-GMO Verified</h4>
//                 <p className="text-xs text-slate-600 font-medium">100% natural heirloom crop varieties grown in sustainable soil.</p>
//               </div>

//             </div>

//           </div>
//         </section>

//         {/* 6. FOUNDER LEADERSHIP SPOTLIGHT (UNCROPPED NATURAL ASPECT RATIO, PERFECT SIZE) */}
//         <section className="py-16 sm:py-24 bg-slate-100">
//           <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-gradient-to-br from-emerald-900 via-[#046A38] to-slate-950 text-white rounded-[36px] p-8 sm:p-14 shadow-2xl relative overflow-hidden">
              
//               <div className="lg:col-span-5 w-full flex justify-center">
//                 <div className="max-w-[340px] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 bg-slate-950">
//                   <img
//                     src="/images/ecoensafounder.webp"
//                     alt="Dr. Archana Naithani"
//                     className="w-full h-auto block rounded-2xl"
//                   />
//                 </div>
//               </div>

//               <div className="lg:col-span-7 space-y-6">
//                 <span className="text-amber-300 text-xs font-black uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/20 inline-block">
//                   Visionary Leadership
//                 </span>

//                 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight">
//                   &quot;Empowering women is empowering our natural resources.&quot;
//                 </h2>

//                 <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
//                   Climate change is real. Women in indigenous communities are the first to experience the devastating impacts of biodiversity degradation. Ecoensa was created to build an inclusive, collaborative ecosystem where science and community action unite for a sustainable future.
//                 </p>

//                 <div className="pt-4 border-t border-white/20 flex items-center justify-between">
//                   <div>
//                     <h4 className="text-xl font-serif font-black text-amber-300">Dr. Archana Naithani</h4>
//                     <span className="text-xs text-slate-300 font-semibold">Founder, Ecoensa Private Limited</span>
//                   </div>
//                   <Link
//                     href="/contact"
//                     className="bg-[#FF6B00] hover:bg-[#e05e00] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full transition-all"
//                   >
//                     Read Full Story
//                   </Link>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </section>

//         {/* 7. 2-COLUMN FAQ SECTION */}
//         <section className="py-16 sm:py-24 bg-white">
//           <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-12">
            
//             <div className="text-center space-y-3 max-w-2xl mx-auto">
//               <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 inline-block">
//                 Got Questions?
//               </span>
//               <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
//                 Frequently Asked Questions
//               </h2>
//               <p className="text-sm text-slate-600 font-medium">Find instant answers to common questions about Ecoensa organic products.</p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
//               <div className="lg:col-span-5 relative">
//                 <div className="relative w-full aspect-[4/4.5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
//                   <img
//                     src="https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=1000&q=80"
//                     alt="Ecoensa Support & Quality Assurance"
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
//                   <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
//                     <span className="text-xs font-black text-amber-300 uppercase tracking-widest">24/7 Organic Assistance</span>
//                     <h4 className="text-lg font-serif font-bold">Have Specific Health Queries?</h4>
//                     <p className="text-xs text-slate-300">Our team of ecologists is always ready to guide your organic living journey.</p>
//                   </div>
//                 </div>

//                 <div className="absolute -top-5 -right-2 sm:right-4 bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-white/20 flex items-center space-x-3">
//                   <div className="w-10 h-10 rounded-xl bg-[#046A38] text-[#FFFFFF] flex items-center justify-center font-black">
//                     <HelpCircle className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <span className="text-sm font-black text-amber-300 block">Instant Help</span>
//                     <span className="text-[11px] text-slate-300 font-semibold">info@ecoensa.com</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="lg:col-span-7 space-y-4">
//                 {faqs.map((faq, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-slate-50 border border-slate-200/90 rounded-2xl overflow-hidden transition-all shadow-xs"
//                   >
//                     <button
//                       onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
//                       className="w-full text-left p-5 flex items-center justify-between space-x-4 cursor-pointer font-bold text-sm sm:text-base text-slate-900 hover:text-[#046A38]"
//                     >
//                       <span>{faq.q}</span>
//                       <ChevronDown
//                         className={`w-5 h-5 text-[#046A38] shrink-0 transition-transform duration-300 ${
//                           openFaq === idx ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>

//                     {openFaq === idx && (
//                       <div className="px-5 pb-5 pt-1 text-xs sm:text-sm font-medium text-slate-600 border-t border-slate-200/60 leading-relaxed bg-white">
//                         {faq.a}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//             </div>

//           </div>
//         </section>

//         {/* 8. IMPACT NUMBERS BANNER */}
//         <section className="py-12 bg-[#1E7E34] text-white">
//           <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              
//               <div className="space-y-1">
//                 <span className="text-3xl sm:text-5xl font-serif font-black text-amber-300 block">50,000+</span>
//                 <span className="text-xs sm:text-sm font-extrabold text-white/90">Satisfied Families</span>
//               </div>

//               <div className="space-y-1">
//                 <span className="text-3xl sm:text-5xl font-serif font-black text-amber-300 block">100+</span>
//                 <span className="text-xs sm:text-sm font-extrabold text-white/90">Organic Partner Farms</span>
//               </div>

//               <div className="space-y-1">
//                 <span className="text-3xl sm:text-5xl font-serif font-black text-amber-300 block">25,000+</span>
//                 <span className="text-xs sm:text-sm font-extrabold text-white/90">Trees Planted</span>
//               </div>

//               <div className="space-y-1">
//                 <span className="text-3xl sm:text-5xl font-serif font-black text-amber-300 block">4.9 / 5</span>
//                 <span className="text-xs sm:text-sm font-extrabold text-white/90">Customer Satisfaction</span>
//               </div>

//             </div>
//           </div>
//         </section>

//       </main>

//       <Footer />
//     </div>
//   );
// }





/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col justify-between relative overflow-x-clip">
      {/* STICKY HEADER */}
      <Header />

      <main className="flex-grow pb-24">
        
        {/* HERO BANNER SECTION (WITH NEW HERO BANNER DESIGN & DEWDROP LEAVES BG AT OPACITY-40) */}
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
              <span>ABOUT US</span>
              <span className="w-8 sm:w-12 h-[2px] bg-[#FF6B00]" />
            </div>

            {/* MAIN PAGE TITLE */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white drop-shadow-md">
              About Ecoensa
            </h1>
          </div>
        </section>

        {/* MAIN BODY CONTAINER (1400PX - ALIGNS WITH HEADER LOGO & BUTTONS) */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-20 pt-6">

          {/* 1. INTRO STORY SECTION */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* LEFT IMAGE CARD (HEIGHT SLIGHTLY REDUCED TO 16/9.5 ASPECT RATIO) */}
            <div className="w-full flex justify-center">
              <div className="relative w-full aspect-[16/9.5] rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 group">
                <img
                  src="/images/about.webp"
                  alt="Join Us Ecoensa"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
                />
              </div>
            </div>

            {/* RIGHT TEXT CONTENT */}
            <div className="w-full space-y-5 text-slate-700 leading-relaxed text-base sm:text-lg font-normal">
              <p>
                EcoEnsa is an environmental solutions enterprise dedicated to restoring biodiversity and reconnecting people with nature through <strong className="text-slate-900 font-bold">innovative, sustainable, and community-driven initiatives.</strong> Our approach is rooted in science, sustainability, and social participation, ensuring that environmental solutions are not only <strong className="text-slate-900 font-bold">impactful</strong> but also <strong className="text-slate-900 font-bold">scalable and financially viable.</strong> We design and deliver green interventions that promote biodiversity, climate action, and ecological awareness while aligning with the United Nations Sustainable Development Goals (SDGs).
              </p>

              <p>
                Our mission is to create a measurable difference in biodiversity conservation while generating socio-economic value through eco-innovation and community engagement.
              </p>
            </div>

          </section>

          {/* 2. OUR VISION & OUR MISSION (2 EQUAL GREEN CARDS) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* OUR VISION CARD */}
            <div className="bg-[#1E7F34] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl border border-emerald-700 flex flex-col justify-center">
              <h3 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-white">
                Our Vision
              </h3>
              <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal max-w-xl mx-auto">
                To be a global leader in restoring biodiversity and driving sustainable growth, where communities, businesses, and nature flourish together—empowered by innovation, certifications, and carbon solutions for a climate-resilient future.
              </p>
            </div>

            {/* OUR MISSION CARD */}
            <div className="bg-[#1E7F34] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl border border-emerald-700 flex flex-col justify-center">
              <h3 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-white">
                Our Mission
              </h3>
              <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal max-w-xl mx-auto">
                Ecoensa&apos;s mission is to design and deliver scalable, science-based, and community-driven environmental solutions that conserve biodiversity, reduce carbon footprints, and foster ecological awareness. Through sustainability certifications, carbon credit generation, and eco-innovation, we create measurable environmental impact while unlocking socio-economic value and aligning with the UN Sustainable Development Goals.
              </p>
            </div>

          </section>

          {/* 3. TEAM MEMBERS SECTION (EXACT HEADER LOGO & BUTTON ALIGNMENT MATCH) */}
          <section className="space-y-6 text-center w-full">
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
              Team Members
            </h2>

            <div className="space-y-4 text-slate-700 leading-relaxed text-base sm:text-lg font-normal text-left sm:text-center w-full">
              <p>
                Ecoensa is a collective of passionate and highly skilled ecologists, environmentalists, and sustainability experts united by a shared vision of driving sustainable development and responsible environmental practices. With extensive global experience across diverse projects, our team brings unmatched expertise in research, capacity building, and technical assistance for companies, governments, NGOs, and international organizations. We don&apos;t just deliver solutions—we help you make better decisions, spark discussion, and create lasting environmental and socio-economic impact.
              </p>

              <p>
                Our multidisciplinary team spans climate science, engineering, geo-mapping, astrophysics, satellite analytics, and data science equipping us to turn complex environmental data into <strong className="text-slate-900 font-bold">actionable insights and competitive advantage.</strong>
              </p>

              <p>
                By aligning biodiversity conservation, carbon credit innovation, and sustainability certifications with global business priorities, Ecoensa bridges science and commerce. We empower organisations, large and small, public and private to meet sustainability goals while unlocking measurable returns. With our proven expertise, innovative approach, and a deep commitment to impact, Ecoensa is positioned as the trusted partner for driving climate action, risk management, and a truly sustainable future.
              </p>
            </div>
          </section>

          {/* 4. OUR YOUNG BRIGADE SECTION (EXACT HEADER LOGO & BUTTON ALIGNMENT MATCH) */}
          <section className="space-y-6 text-center w-full">
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
              Our Young Brigade
            </h2>

            <p className="text-slate-700 leading-relaxed text-base sm:text-lg font-normal text-left sm:text-center w-full">
              With passion in their hearts and determination in their actions, our young brigade is the driving force of change at Ecoensa. They are <strong className="text-slate-900 font-bold">not just volunteers—they are the pulse of our mission, leading grassroots initiatives, inspiring communities, and championing sustainable solutions with unwavering dedication. Diverse in backgrounds but united in purpose, they prove that one person&apos;s commitment can ignite a movement and inspire many more to act. Their energy, creativity, and resolve illuminate a path toward a greener, fairer world. In their hands and hearts, the promise of a brighter, more sustainable future is alive and growing. 🌎❤️🌱</strong>
            </p>
          </section>

          {/* 5. SHOP CTA BANNER */}
          <div className="bg-gradient-to-r from-emerald-950 via-[#046A38] to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-serif font-black">Looking for Ecoensa Organic Products?</h3>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">Explore 100% pure certified organic spices, A2 Ghee, and wild honey in our online store.</p>
            </div>

            <Link
              href="/shop"
              className="bg-[#FF6B00] hover:bg-[#e05e00] text-white font-extrabold text-xs sm:text-sm px-8 py-4 rounded-full shadow-xl hover:scale-105 transition-all shrink-0 flex items-center space-x-2"
            >
              <span>Explore Products Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}