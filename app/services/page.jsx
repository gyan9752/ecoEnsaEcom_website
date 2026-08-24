// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import { Leaf, TreePine, Gift, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, Building2, ChevronDown, HelpCircle } from "lucide-react";

// export default function ServicesPage() {
//   const [openFaq, setOpenFaq] = useState(0);

//   const servicesList = [
//     {
//       id: "organic-supply",
//       icon: Leaf,
//       badge: "Pure Farm-to-Kitchen",
//       title: "1. Organic Food & Spices Supply",
//       subtitle: "B2B Bulk Supply & Retail Superfood Range",
//       desc: "Direct farm-fresh sourcing of 100% certified organic spices, cold-pressed A2 Gir Cow Ghee, raw wild honey, and premium sun-dried fruits directly from indigenous Western Ghats and Himalayan farmer cooperatives.",
//       features: [
//         "100% Zero Chemical Pesticides & Synthetic Additives",
//         "NABL Third-Party Lab Certified for 200+ Heavy Metal Tests",
//         "Direct Fair-Trade Pricing Support to Indigenous Farmers",
//         "Food-Grade Nitrogen-Flushed Eco Packaging",
//       ],
//       image: "/images/1.webp",
//     },
//     {
//       id: "environmental-consulting",
//       icon: TreePine,
//       badge: "Scientific Advisory",
//       title: "2. Environmental & Ecological Consulting",
//       subtitle: "Soil Regeneration & Impact Audits",
//       desc: "Led by Dr. Archana Naithani and our team of senior ecologists, we provide scientific Environmental Impact Assessments (EIA), biodiversity restoration blueprints, and industrial soil health remediation.",
//       features: [
//         "Environmental Impact Assessment (EIA) & Compliance Reports",
//         "Biodiversity Conservation & Native Afforestation Plans",
//         "Soil Microbe Regeneration & Natural Water Harvesting",
//         "Corporate ESG & Environmental Audits",
//       ],
//       image: "/images/2.webp",
//     },
//     {
//       id: "corporate-gifting",
//       icon: Gift,
//       badge: "Sustainable Luxury",
//       title: "3. Corporate Eco Gifting & Custom Hampers",
//       subtitle: "Zero-Plastic Custom Brand Hampers",
//       desc: "Custom curated organic food gift boxes, handcrafted wooden and jute packaging, and festive hampers for Diwali, corporate anniversaries, employee wellness drives, and VIP client appreciation.",
//       features: [
//         "Custom Corporate Brand Logo & Laser Engraving",
//         "Handcrafted Eco-Friendly Wooden & Jute Baskets",
//         "100% Plastic-Free & Zero-Waste Packaging",
//         "PAN India & International Doorstep Express Delivery",
//       ],
//       image: "/images/3.webp",
//     },
//     {
//       id: "regenerative-agronomy",
//       icon: ShieldCheck,
//       badge: "Grassroots Impact",
//       title: "4. Regenerative Farming & Agronomy Support",
//       subtitle: "Empowering Rural Women Farmer Cooperatives",
//       desc: "Empowering rural women land managers and indigenous farmers across Kerala and Uttar Pradesh with organic certification guidance, heirloom seed bank preservation, and zero-cost bio-fertilizer training.",
//       features: [
//         "Heirloom Native Seed Bank Preservation",
//         "Women Farmer Cooperative Skill Development",
//         "Zero Budget Natural Farming (ZBNF) Workshops",
//         "Organic Certification & Government Grant Assistance",
//       ],
//       image: "/images/4.webp",
//     },
//   ];

//   const methodology = [
//     {
//       step: "01",
//       title: "Ecological Assessment",
//       desc: "Scientific evaluation of soil health, water purity, and seed quality directly at farm level.",
//     },
//     {
//       step: "02",
//       title: "Sustainable Harvest",
//       desc: "Sun-drying and traditional hand-processing by trained rural women cooperatives.",
//     },
//     {
//       step: "03",
//       title: "NABL Lab Certification",
//       desc: "100% chemical, heavy metal, and pesticide-free lab testing before approval.",
//     },
//     {
//       step: "04",
//       title: "Eco Packaging & Dispatch",
//       desc: "Sealed in food-grade eco-pouches & glass jars for express doorstep shipping.",
//     },
//   ];

//   const industries = [
//     { name: "Corporate Offices & IT Parks", desc: "Employee wellness drives & executive organic snack boxes." },
//     { name: "Luxury Hotels & Restaurants", desc: "Bulk organic spices, A2 Ghee, and wild honey supply." },
//     { name: "Wellness Resorts & Spas", desc: "Pure ayurvedic & herbal organic food ingredients." },
//     { name: "Global Exporters & Importers", desc: "Certified organic exports to USA, UK, UAE, and Canada." },
//   ];

//   const faqs = [
//     {
//       q: "Can we order custom corporate gift hampers with our company logo?",
//       a: "Yes, absolutely! We specialize in custom corporate eco-gifting. We provide custom laser-engraved wooden boxes, jute hampers, and personalized greeting cards with your company branding.",
//     },
//     {
//       q: "How does Ecoensa conduct Environmental Impact Assessments (EIA)?",
//       a: "Our team of PhD ecologists conducts field audits, soil microbiology testing, biodiversity mapping, and environmental compliance reports tailored for industries, farms, and eco-resorts.",
//     },
//     {
//       q: "Do you supply bulk organic spices and A2 Ghee for commercial kitchens?",
//       a: "Yes, we supply bulk organic spices, A2 Gir Cow Ghee, and wild honey in 5kg, 10kg, and custom packaging to luxury hotels, restaurants, and organic food brands.",
//     },
//     {
//       q: "Are all Ecoensa products certified organic?",
//       a: "100% Yes. All our products are FSSAI certified, India Organic compliant, and NABL lab-tested for zero pesticide residues.",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
//       <Header />

//       <main className="flex-grow pb-20">
        
//         {/* 🌟 FULL-WIDTH HERO BANNER (TOUCHING TOP & BOTH EDGES WITH ZERO MARGIN) */}
//         <section className="w-full bg-gradient-to-br from-emerald-950 via-[#046A38] to-slate-950 py-12 sm:py-16 px-4 sm:px-8 text-white text-center relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6B00]/20 rounded-full blur-3xl pointer-events-none" />

//           <div className="max-w-[1400px] mx-auto space-y-5 relative z-10">
//             <span className="bg-white/10 border border-white/20 text-amber-300 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center space-x-1.5">
//               <Sparkles className="w-3.5 h-3.5" />
//               <span>Scientific Excellence & Organic Living</span>
//             </span>

//             <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight max-w-4xl mx-auto leading-tight">
//               Pioneering Ecological Solutions & Organic Food Excellence
//             </h1>

//             <p className="text-xs sm:text-base text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed">
//               Bridging Environmental Science, Biodiversity Restoration, and Farm-to-Kitchen Pure Organic Nutrition for Families & Enterprises.
//             </p>

//             {/* COMPACT INLINE HIGHLIGHT BADGES */}
//             <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
//               <span className="bg-white/10 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-white/15 text-amber-300">
//                 100+ B2B Clients
//               </span>
//               <span className="bg-white/10 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-white/15 text-emerald-300">
//                 25,000+ Trees Planted
//               </span>
//               <span className="bg-white/10 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-white/15 text-amber-300">
//                 100% Certified Organic
//               </span>
//               <span className="bg-white/10 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-white/15 text-emerald-300">
//                 NABL Lab Tested
//               </span>
//             </div>
//           </div>
//         </section>

//         {/* REST OF CONTENT INSIDE 1400PX CONTAINER */}
//         <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-14 pt-10 sm:pt-14">

//           {/* 2. PAGE HEADER (SMALLER HEADING & SOLID BLACK) */}
//           <div className="text-center space-y-3 max-w-3xl mx-auto">
//             <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 inline-block">
//               Core Capabilities
//             </span>
//             <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
//               Our Specialized Services & Solutions
//             </h2>
//             <p className="text-sm text-slate-600 font-medium">
//               Explore how Ecoensa delivers scientific rigor across retail, corporate gifting, and environmental consultancy.
//             </p>
//             <div className="w-16 h-1 bg-[#FF6B00] rounded-full mx-auto" />
//           </div>

//           {/* 3. ALTERNATING (ZIG-ZAG) 4 SERVICES CARDS */}
//           <div className="space-y-12">
//             {servicesList.map((service, idx) => {
//               const isEven = idx % 2 === 1;

//               return (
//                 <div
//                   key={service.id}
//                   className={`bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl flex flex-col ${
//                     isEven ? "lg:flex-row-reverse" : "lg:flex-row"
//                   } gap-8 lg:gap-12 items-center`}
//                 >
//                   {/* IMAGE SIDE (50% WIDTH) */}
//                   <div className="w-full lg:w-1/2 relative">
//                     <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group shadow-md">
//                       <img
//                         src={service.image}
//                         alt={service.title}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                       />
//                       <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-amber-300 text-xs font-black uppercase px-3.5 py-1 rounded-full border border-white/20">
//                         {service.badge}
//                       </div>
//                     </div>
//                   </div>

//                   {/* CONTENT SIDE (50% WIDTH) */}
//                   <div className="w-full lg:w-1/2 space-y-5">
//                     <div className="space-y-1">
//                       <span className="text-xs font-black text-[#FF6B00] uppercase tracking-wider block">{service.subtitle}</span>
//                       <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-900">
//                         {service.title}
//                       </h3>
//                     </div>

//                     <p className="text-sm text-slate-600 font-medium leading-relaxed">
//                       {service.desc}
//                     </p>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
//                       {service.features.map((feat, fidx) => (
//                         <div key={fidx} className="flex items-start space-x-2.5">
//                           <CheckCircle2 className="w-5 h-5 text-[#046A38] shrink-0 mt-0.5" />
//                           <span className="text-xs font-bold text-slate-800">{feat}</span>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="pt-4 border-t border-slate-100">
//                       <Link
//                         href="/contact"
//                         className="bg-black hover:bg-slate-800 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-all inline-flex items-center space-x-2 cursor-pointer"
//                       >
//                         <span>Inquire About {service.badge}</span>
//                         <ArrowRight className="w-4 h-4" />
//                       </Link>
//                     </div>
//                   </div>

//                 </div>
//               );
//             })}
//           </div>

//           {/* 4. OUR METHODOLOGY (4-PHASE PROCESS) */}
//           <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 space-y-10">
//             <div className="text-center space-y-2 max-w-xl mx-auto">
//               <span className="text-amber-300 text-xs font-black uppercase tracking-widest bg-white/10 px-4 py-1 rounded-full border border-white/20">
//                 Scientific Approach
//               </span>
//               <h2 className="text-2xl sm:text-4xl font-serif font-black text-white">
//                 Our 4-Phase Quality Methodology
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {methodology.map((m, idx) => (
//                 <div key={idx} className="bg-white/5 border border-white/15 p-6 rounded-2xl space-y-3">
//                   <span className="text-3xl font-serif font-black text-amber-400 block">{m.step}</span>
//                   <h4 className="font-serif font-bold text-lg text-white">{m.title}</h4>
//                   <p className="text-xs text-slate-300 font-medium leading-relaxed">{m.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* 5. INDUSTRIES WE SERVE */}
//           <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-lg space-y-8">
//             <div className="text-center space-y-2 max-w-xl mx-auto">
//               <span className="text-xs font-black uppercase text-[#FF6B00] bg-orange-100/80 px-4 py-1 rounded-full border border-orange-200">
//                 Diverse Client Footprint
//               </span>
//               <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900">
//                 Industries & Sector Expertise
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {industries.map((ind, idx) => (
//                 <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
//                   <Building2 className="w-6 h-6 text-[#046A38]" />
//                   <h4 className="font-extrabold text-sm text-slate-900">{ind.name}</h4>
//                   <p className="text-xs text-slate-500 font-medium">{ind.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* 6. 2-COLUMN FAQ SECTION (IMAGE LEFT + FAQ ACCORDION RIGHT) */}
//           <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-lg space-y-8">
//             <div className="text-center space-y-2 max-w-xl mx-auto">
//               <span className="text-xs font-black uppercase text-[#046A38] bg-emerald-50 px-4 py-1 rounded-full border border-emerald-200">
//                 Service Inquiries
//               </span>
//               <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900">
//                 Frequently Asked Questions
//               </h2>
//             </div>

//             {/* 2-COLUMN GRID (LEFT IMAGE, RIGHT ACCORDION) */}
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
//               {/* LEFT IMAGE WITH FLOATING SUPPORT BADGE */}
//               <div className="lg:col-span-5 relative">
//                 <div className="relative w-full aspect-[4/4.5] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md group">
//                   <img
//                     src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
//                     alt="Ecoensa Service Support Team"
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
//                   <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
//                     <span className="text-xs font-black text-amber-300 uppercase tracking-widest">Expert Consultation</span>
//                     <h4 className="text-lg font-serif font-bold">Need Personal Assistance?</h4>
//                     <p className="text-xs text-slate-300">Our environmental scientists respond to enterprise queries within 24 hours.</p>
//                   </div>
//                 </div>

//                 {/* FLOATING BADGE */}
//                 <div className="absolute -top-4 -right-2 bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl border border-white/20 flex items-center space-x-3">
//                   <div className="w-9 h-9 rounded-xl bg-[#046A38] text-white flex items-center justify-center font-black">
//                     <HelpCircle className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <span className="text-xs font-black text-amber-300 block">Direct Line</span>
//                     <span className="text-[11px] text-slate-300 font-semibold">+91-9871500373</span>
//                   </div>
//                 </div>
//               </div>

//               {/* RIGHT FAQ ACCORDION LIST */}
//               <div className="lg:col-span-7 space-y-4">
//                 {faqs.map((faq, idx) => (
//                   <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all">
//                     <button
//                       onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
//                       className="w-full text-left p-5 flex items-center justify-between font-bold text-sm sm:text-base text-slate-900 cursor-pointer hover:text-[#046A38]"
//                     >
//                       <span>{faq.q}</span>
//                       <ChevronDown className={`w-5 h-5 text-[#046A38] shrink-0 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
//                     </button>

//                     {openFaq === idx && (
//                       <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 font-medium border-t border-slate-200/60 pt-2 bg-white leading-relaxed">
//                         {faq.a}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//             </div>
//           </div>

//           {/* 7. GRAND ENTERPRISE CTA BANNER */}
//           <div className="bg-gradient-to-br from-[#1E7E34] via-[#046A38] to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
//             <div className="space-y-2 text-center sm:text-left">
//               <span className="text-xs font-black uppercase text-amber-300 tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block">
//                 Custom Enterprise Inquiries
//               </span>
//               <h3 className="text-2xl sm:text-3xl font-serif font-black">Need Environmental Consultation or Bulk Organic Supply?</h3>
//               <p className="text-xs sm:text-sm text-slate-200 font-medium">Contact our senior ecological team directly for custom B2B pricing and project execution.</p>
//             </div>

//             <Link
//               href="/contact"
//               className="bg-[#FF6B00] hover:bg-[#e05e00] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-xl hover:scale-105 transition-all shrink-0 whitespace-nowrap"
//             >
//               Contact Support Team
//             </Link>
//           </div>

//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }





// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// export default function ServicesPage() {

//   // 1. CORE 4 PILLARS (EXACT TEXT FROM LIVE WEBSITE)
//   const coreServices = [
//     {
//       title: "RESEARCH",
//       desc: "At Ecoensa, we conduct applied scientific research rooted in the well-being of people and the planet. Our work explores the evolving relationship between humans and natural resources, generating insights that shape practical, scalable solutions. We believe true biodiversity and habitat conservation can only succeed when local communities also benefit economically. Through our research, we advance knowledge of natural systems, uncovering both the promise and the challenges of human-nature interactions, and translating this understanding into strategies that drive resilience, equity, and long-term sustainability."
//     },
//     {
//       title: "TRAINING",
//       desc: "Ecoensa delivers specialized training programs designed for community-based organizations, youth networks, women's groups, and government agencies. Our capacity-building initiatives focus on sustainable development and natural resource management, covering critical areas such as forestry, renewable energy, waste management, climate change, and environmental policy advocacy. By equipping stakeholders with practical skills and knowledge, we empower communities and institutions to lead meaningful change and build a resilient, sustainable future."
//     },
//     {
//       title: "CONSULTANCY",
//       desc: "Ecoensa provides comprehensive consultancy services across the full spectrum of environmental and natural resource development. Our expertise spans climate change mitigation, conservation and wildlife, environmental policy and advocacy, sustainable development, clean energy and renewable resources, environmental education, waste management and recycling, marine and coastal conservation, carbon monitoring, and environmental impact assessments with specialized audits. We help organizations, governments, and businesses achieve their sustainability goals while driving measurable impact for people and the planet."
//     },
//     {
//       title: "CERTIFICATION",
//       desc: "At Ecoensa, our core strength lies in delivering trusted sustainability certifications that enable organizations to validate their environmental performance, meet global compliance standards, and gain a competitive edge in an evolving green economy. From carbon credit certifications and biodiversity impact assessments to renewable energy, waste management, and ESG compliance frameworks, our certification services are designed to provide credibility, transparency, and measurable results. With Ecoensa certifications, clients not only meet their environmental goals but also strengthen their reputation as leaders in the transition toward a climate-resilient and responsible future."
//     }
//   ];

//   // 2. 5 DOMAINS (EXACT TEXT FROM LIVE WEBSITE)
//   const domains = [
//     {
//       title: "BIODIVERSITY",
//       points: [
//         "Ecological Assessment",
//         "Habitat Survey",
//         "Species Inventory",
//         "Baseline Studies",
//         "Restoration strategies",
//         "Ecosystem management"
//       ]
//     },
//     {
//       title: "ESG",
//       points: [
//         "ESG Reporting",
//         "ESG Strategy Development",
//         "Materiality Assessment",
//         "Sustainability Reporting",
//         "SDG alignment",
//         "CSR Sustainability Planning",
//         "Carbon Accounting"
//       ]
//     },
//     {
//       title: "CLIMATE",
//       points: [
//         "Carbon Footprint",
//         "Net Zero Roadmap",
//         "Carbon credit advisory",
//         "Climate Risk assessment",
//         "Carbon reduction Planning"
//       ]
//     },
//     {
//       title: "GIS",
//       points: [
//         "Satellite Mapping",
//         "Drone Survey",
//         "Remote Sensing",
//         "Spatial Analysis"
//       ]
//     },
//     {
//       title: "NATURE BASED SOLUTIONS",
//       points: [
//         "Urban Biodiversity",
//         "Wetland Restoration",
//         "Green Infrastructure",
//         "Wildlife Conservation Plan..",
//         "Wildlife Restoration"
//       ]
//     }
//   ];

//   // 3. OUR PROJECTS (EXACT FULL TEXT FROM LIVE WEBSITE)
//   const projects = [
//     {
//       id: 1,
//       title: "Biodiversity Assessment of Avifauna in Western Himalaya",
//       highlightText: "The Biodiversity Assessment of Avifauna in the Western Himalaya",
//       restDesc: "highlights the region's rich bird diversity shaped by varied altitudinal gradients and unique habitats. This study helps document species distribution, population trends, and habitat preferences, providing crucial insights into conservation priorities. Such assessments are vital for understanding the impact of climate change and human activities on fragile mountain ecosystems.",
//       image: "/images/1.webp"
//     },
//     {
//       id: 2,
//       title: "Environmental Awareness Programmes in Educational Institutions",
//       highlightText: "Environmental Awareness Programmes in Educational Institutions",
//       restDesc: "aim to foster eco-consciousness among students through interactive activities, workshops, and campaigns. These programmes encourage sustainable practices like waste management, energy conservation, and biodiversity protection. By instilling responsibility at a young age, they help build environmentally sensitive citizens for a greener future.",
//       image: "/images/2.webp"
//     },
//     {
//       id: 3,
//       title: "Waste Management and Pet bottle Recycling",
//       highlightText: "Waste Management and PET Bottle Recycling",
//       restDesc: "play a key role in reducing plastic pollution and conserving resources. Recycling PET bottles helps divert waste from landfills and oceans, giving plastic a new life as textiles, packaging, or reusable products. Effective systems of segregation, collection, and awareness can turn waste into a valuable resource while protecting the environment.",
//       image: "/images/3.webp"
//     },
//     {
//       id: 4,
//       title: "One Plant One Life",
//       highlightText: "One Plant One Life",
//       restDesc: "is an initiative that promotes tree plantation as a step toward restoring ecological balance and combating climate change. Each sapling planted represents a commitment to cleaner air, healthier ecosystems, and sustainable living. By connecting individuals to the act of nurturing a plant, the project fosters a culture of responsibility toward nature and future generations.",
//       image: "/images/4.webp"
//     },
//     {
//       id: 5,
//       title: "Bring Back The Chiraiya",
//       highlightText: "Bring Back the Chiraiya",
//       restDesc: "is a conservation initiative dedicated to reviving the declining populations of house sparrows. Through community participation, distribution of eco-friendly nests, and awareness campaigns, the project aims to restore safe habitats for these small birds. It symbolizes a larger effort to reconnect people with urban biodiversity and protect the delicate balance of ecosystems.",
//       image: "/images/5.webp"
//     },
//     {
//       id: 6,
//       title: "One Plant One Life",
//       highlightText: "One Plant One Life",
//       restDesc: "is an initiative that promotes tree plantation as a step toward restoring ecological balance and combating climate change. Each sapling planted represents a commitment to cleaner air, healthier ecosystems, and sustainable living. By connecting individuals to the act of nurturing a plant, the project fosters a culture of responsibility toward nature and future generations.",
//       image: "/images/6.webp"
//     }
//   ];

//   // 4. PARTNER LOGOS IMAGE ARRAY
//   const partners = [
//     { name: "FinPe", logo: "/images/p1.webp" },
//     { name: "Saurabhya", logo: "/images/p2.webp" },
//     { name: "Women In Nature Network", logo: "/images/p3.webp" },
//     { name: "Ananya Roots", logo: "/images/p4.webp" },
//     { name: "EverGreen", logo: "/images/p5.png" },
//     { name: "Devraj", logo: "/images/p6.png" },
//     { name: "Aadya Creations", logo: "/images/p7.png" }
//   ];

//   // DUPLICATE LIST FOR SEAMLESS INFINITE MARQUEE LOOP
//   const marqueeList = [...partners, ...partners, ...partners];

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between relative overflow-x-clip">
//       {/* STICKY HEADER THAT STAYS STUCK ON SCROLL */}
//       <Header />

//       <main className="flex-grow pb-24">
        
//         {/* HERO BANNER SECTION MATCHING SITE STANDARD */}
//         <section className="relative w-full py-16 sm:py-24 bg-slate-950 text-white text-center overflow-hidden mb-12">
//           <div
//             className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
//             style={{
//               backgroundImage:
//                 "url('https://ecoensa.com/wp-content/uploads/2023/10/closeup-shot-green-red-leaves-covered-with-dewdrops-scaled.jpg')",
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#046A38]/60 to-slate-950" />

//           <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 space-y-4">
//             {/* SUB-TAG WITH ORANGE DASHES ON BOTH SIDES */}
//             <div className="flex items-center justify-center space-x-3 text-[#FF6B00] text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em]">
//               <span className="w-8 sm:w-12 h-[2px] bg-[#FF6B00]" />
//               <span>SERVICES</span>
//               <span className="w-8 sm:w-12 h-[2px] bg-[#FF6B00]" />
//             </div>

//             {/* MAIN PAGE TITLE */}
//             <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white drop-shadow-md">
//               Our Services
//             </h1>
            
//             <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-medium">
//               Empowering environmental sustainability through research, training, consultancy, and certifications.
//             </p>
//           </div>
//         </section>

//         <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-20 pt-6">

//           {/* 1. CORE 4 SERVICES */}
//           <div className="space-y-8">
//             <div className="text-center space-y-2 max-w-2xl mx-auto">
//               <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 inline-block">
//                 Core Capabilities
//               </span>
//               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight">
//                 Our Strategic Pillars
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {coreServices.map((service, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white rounded-2xl p-6 sm:p-8 space-y-4 border border-slate-200/90 shadow-md flex flex-col justify-between hover:shadow-xl transition-all"
//                 >
//                   <div className="space-y-4">
//                     {/* GREEN CIRCLE ICON */}
//                     <div className="w-12 h-12 rounded-full bg-[#046A38] shrink-0 shadow-xs" />

//                     <h3 className="text-xl font-serif font-extrabold text-slate-900 tracking-wider">
//                       {service.title}
//                     </h3>

//                     <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
//                       {service.desc}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* 2. DOMAINS */}
//           <div className="space-y-8">
//             <div className="text-center space-y-2 max-w-2xl mx-auto">
//               <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 inline-block">
//                 Technical Expertise
//               </span>
//               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-800 tracking-tight">
//                 Specialized Service Domains
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//               {domains.map((domain, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white rounded-2xl p-6 space-y-4 border border-slate-200/90 shadow-md hover:shadow-xl transition-all"
//                 >
//                   {/* GREEN CIRCLE ICON */}
//                   <div className="w-12 h-12 rounded-full bg-[#046A38] shrink-0 shadow-xs" />

//                   <h4 className="font-serif font-extrabold text-base text-slate-900 tracking-wider">
//                     {domain.title}
//                   </h4>

//                   <ul className="space-y-2.5 pt-2 border-t border-slate-100">
//                     {domain.points.map((pt, pidx) => (
//                       <li key={pidx} className="text-xs sm:text-sm text-slate-700 font-bold leading-snug">
//                         - {pt}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* 3. OUR PROJECTS SECTION */}
//           <div className="space-y-10">
//             <div className="text-center space-y-2 max-w-2xl mx-auto">
//               <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 inline-block">
//                 Case Studies &amp; Audits
//               </span>
//               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight">
//                 Our Project&apos;s
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {projects.map((proj) => (
//                 <div
//                   key={proj.id}
//                   className="bg-[#046A38] text-white rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl border border-emerald-800 flex flex-col justify-between group hover:shadow-2xl transition-all"
//                 >
//                   <div className="space-y-4 text-center">
//                     {/* IMAGE THUMBNAIL */}
//                     <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border-2 border-white/20 shadow-md">
//                       <img
//                         src={proj.image}
//                         alt={proj.title}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                       />
//                     </div>

//                     {/* CLEAR AMBER HEADING WITH BOTTOM BORDER */}
//                     <h3 className="text-lg sm:text-xl font-serif font-extrabold text-amber-300 tracking-wide border-b border-white/20 pb-3 leading-snug">
//                       {proj.title}
//                     </h3>

//                     {/* CLEAR DISTINCT PARAGRAPH */}
//                     <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal pt-1">
//                       <strong className="text-white font-bold">{proj.highlightText}</strong> {proj.restDesc}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* 4. PARTNERS SECTION WITH BORDERLESS CARDLESS LOGOS */}
//           <div className="space-y-6 text-center overflow-hidden pt-4">
//             <div className="space-y-2 max-w-xl mx-auto px-4">
//               <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 inline-block">
//                 Institutional Network
//               </span>
//               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight">
//                 Partner&apos;s
//               </h2>
//             </div>

//             {/* MARQUEE CONTAINER */}
//             <div className="relative w-full overflow-hidden py-8">
//               {/* SOFT FADE OVERLAYS ON LEFT & RIGHT EDGES */}
//               <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
//               <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

//               {/* SLOW CARDLESS TICKER ROW */}
//               <div className="flex w-max items-center gap-12 sm:gap-16 animate-marquee hover:[animation-play-state:paused] cursor-pointer">
//                 {marqueeList.map((partner, pidx) => (
//                   <div
//                     key={pidx}
//                     className="flex items-center justify-center shrink-0 h-24 px-2"
//                   >
//                     <img
//                       src={partner.logo}
//                       alt={partner.name}
//                       className="max-h-16 sm:max-h-20 max-w-[180px] object-contain block transition-transform duration-300 hover:scale-110"
//                       onError={(e) => {
//                         // Fallback text if image not found
//                         e.currentTarget.style.display = "none";
//                         if (e.currentTarget.nextSibling) {
//                           e.currentTarget.nextSibling.style.display = "block";
//                         }
//                       }}
//                     />
//                     <span className="hidden font-serif font-extrabold text-sm sm:text-base text-slate-800 text-center">
//                       {partner.name}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* 5. SHOP LINK BANNER */}
//           <div className="bg-gradient-to-r from-emerald-950 via-[#046A38] to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
//             <div className="space-y-2 text-center sm:text-left">
//               <span className="text-xs font-black uppercase text-amber-300 tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block">
//                 Direct Farm Sourcing
//               </span>
//               <h3 className="text-2xl sm:text-3xl font-serif font-black">Looking for Ecoensa Organic Products?</h3>
//               <p className="text-xs sm:text-sm text-slate-200 font-medium">Explore 100% pure certified organic spices, A2 Ghee, and wild honey in our online store.</p>
//             </div>

//             <Link
//               href="/shop"
//               className="bg-[#FF6B00] hover:bg-[#e05e00] text-white font-extrabold text-xs sm:text-sm px-8 py-4 rounded-full shadow-xl hover:scale-105 transition-all shrink-0 flex items-center space-x-2"
//             >
//               <span>Explore Products Shop</span>
//               <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>

//         </div>
//       </main>

//       <Footer />

//       {/* INLINE CSS FOR CONTINUOUS SLOW MARQUEE TICKER */}
//       <style jsx global>{`
//         @keyframes marqueeScroll {
//           0% {
//             transform: translateX(0%);
//           }
//           100% {
//             transform: translateX(-33.333%);
//           }
//         }
//         .animate-marquee {
//           animation: marqueeScroll 35s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }




/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  Leaf, BookOpen, Briefcase, Award, ShieldCheck, ArrowRight, 
  CheckCircle2, Building2, Trees, Layers 
} from "lucide-react";

export default function ServicesPage() {

  // 1. CORE 4 STRATEGIC PILLARS (AUTHENTIC TEXT + RICH ZIG-ZAG FEATURE CARD DATA)
  const coreServices = [
    {
      id: "research",
      badge: "Scientific Advisory",
      icon: Leaf,
      title: "1. Scientific Research & Ecological Studies",
      subtitle: "Applied Environmental Research & Biodiversity Conservation",
      desc: "At Ecoensa, we conduct applied scientific research rooted in the well-being of people and the planet. Our work explores the evolving relationship between humans and natural resources, generating insights that shape practical, scalable solutions. We believe true biodiversity and habitat conservation can only succeed when local communities also benefit economically.",
      features: [
        "Applied Biodiversity & Avifauna Habitat Surveys",
        "Ecosystem Services & Community Economic Impact Studies",
        "Scalable & Financially Viable Climate Adaptation Models",
        "Publishing Actionable Insights for Global Policy Alignment",
      ],
      image: "/images/1.webp",
    },
    {
      id: "training",
      badge: "Grassroots Capacity",
      icon: BookOpen,
      title: "2. Capacity Building & Specialized Training",
      subtitle: "Empowering Communities, Youth & Institutions",
      desc: "Ecoensa delivers specialized training programs designed for community-based organizations, youth networks, women's groups, and government agencies. Our capacity-building initiatives focus on sustainable development and natural resource management, covering critical areas such as forestry, renewable energy, waste management, climate change, and environmental policy advocacy.",
      features: [
        "Forestry & Natural Resource Management Workshops",
        "Climate Change & Renewable Energy Advocacy Drives",
        "Waste Management & Plastic Recycling Training",
        "Empowering Stakeholders to Lead Grassroots Change",
      ],
      image: "/images/2.webp",
    },
    {
      id: "consultancy",
      badge: "Environmental Compliance",
      icon: Briefcase,
      title: "3. Environmental & ESG Consultancy Services",
      subtitle: "Comprehensive Natural Resource Development",
      desc: "Ecoensa provides comprehensive consultancy services across the full spectrum of environmental and natural resource development. Our expertise spans climate change mitigation, conservation and wildlife, environmental policy and advocacy, sustainable development, clean energy and renewable resources, environmental education, waste management, marine conservation, and carbon monitoring.",
      features: [
        "Environmental Impact Assessment (EIA) & Audits",
        "Climate Change Mitigation & Carbon Monitoring",
        "Clean Energy & Renewable Resource Integration",
        "Marine, Coastal & Wildlife Conservation Strategies",
      ],
      image: "/images/3.webp",
    },
    {
      id: "certification",
      badge: "Global Certifications",
      icon: Award,
      title: "4. Sustainability & ESG Compliance Certification",
      subtitle: "Validating Green Performance & Carbon Credits",
      desc: "At Ecoensa, our core strength lies in delivering trusted sustainability certifications that enable organizations to validate their environmental performance, meet global compliance standards, and gain a competitive edge in an evolving green economy. From carbon credit certifications to ESG compliance frameworks, our services provide credibility, transparency, and measurable results.",
      features: [
        "Carbon Credit Generation & Advisory Frameworks",
        "Biodiversity Impact Assessments & Offsets",
        "Renewable Energy & Waste Management Compliance",
        "ESG Framework Alignment & Audit Validation",
      ],
      image: "/images/4.webp",
    },
  ];

  // 2. 5 DOMAINS (EXACT LIVE DATA)
  const domains = [
    {
      title: "BIODIVERSITY",
      icon: Trees,
      points: [
        "Ecological Assessment",
        "Habitat Survey",
        "Species Inventory",
        "Baseline Studies",
        "Restoration Strategies",
        "Ecosystem Management"
      ]
    },
    {
      title: "ESG ADVISORY",
      icon: ShieldCheck,
      points: [
        "ESG Reporting & Audits",
        "Strategy Development",
        "Materiality Assessment",
        "Sustainability Reporting",
        "SDG Alignment & CSR",
        "Carbon Accounting"
      ]
    },
    {
      title: "CLIMATE ACTION",
      icon: Layers,
      points: [
        "Carbon Footprint Audit",
        "Net Zero Roadmap",
        "Carbon Credit Advisory",
        "Climate Risk Assessment",
        "Reduction Planning"
      ]
    },
    {
      title: "GIS & ANALYTICS",
      icon: Briefcase,
      points: [
        "Satellite Mapping",
        "Drone Topographic Survey",
        "Remote Sensing Analysis",
        "Spatial Data Analytics"
      ]
    },
    {
      title: "NATURE BASED SOLUTIONS",
      icon: Leaf,
      points: [
        "Urban Biodiversity",
        "Wetland Restoration",
        "Green Infrastructure",
        "Wildlife Conservation",
        "Habitat Restoration"
      ]
    }
  ];

  // 3. CASE STUDY PROJECTS (LIVE WEBSITE DATA)
  const projects = [
    {
      id: 1,
      title: "Biodiversity Assessment of Avifauna in Western Himalaya",
      highlightText: "The Biodiversity Assessment of Avifauna in the Western Himalaya",
      restDesc: "highlights the region's rich bird diversity shaped by varied altitudinal gradients and unique habitats. This study helps document species distribution, population trends, and habitat preferences, providing crucial insights into conservation priorities.",
      image: "/images/1.webp"
    },
    {
      id: 2,
      title: "Environmental Awareness Programmes in Educational Institutions",
      highlightText: "Environmental Awareness Programmes in Educational Institutions",
      restDesc: "aim to foster eco-consciousness among students through interactive activities, workshops, and campaigns. These programmes encourage sustainable practices like waste management, energy conservation, and biodiversity protection.",
      image: "/images/2.webp"
    },
    {
      id: 3,
      title: "Waste Management and Pet Bottle Recycling",
      highlightText: "Waste Management and PET Bottle Recycling",
      restDesc: "play a key role in reducing plastic pollution and conserving resources. Recycling PET bottles helps divert waste from landfills and oceans, giving plastic a new life as textiles, packaging, or reusable products.",
      image: "/images/3.webp"
    },
    {
      id: 4,
      title: "One Plant One Life Sapling Plantation",
      highlightText: "One Plant One Life",
      restDesc: "is an initiative that promotes tree plantation as a step toward restoring ecological balance and combating climate change. Each sapling planted represents a commitment to cleaner air, healthier ecosystems, and sustainable living.",
      image: "/images/4.webp"
    },
    {
      id: 5,
      title: "Bring Back The Chiraiya Sparrow Conservation",
      highlightText: "Bring Back the Chiraiya",
      restDesc: "is a conservation initiative dedicated to reviving the declining populations of house sparrows. Through community participation, distribution of eco-friendly nests, and awareness campaigns, the project aims to restore safe habitats.",
      image: "/images/5.webp"
    },
    {
      id: 6,
      title: "Eco Forest Restoration Drive & Community Welfare",
      highlightText: "Eco Forest Restoration",
      restDesc: "fosters community-led tree plantation and ecological restoration in endangered habitats. By connecting individuals to the act of nurturing plants, the project builds long-term climate resilience for future generations.",
      image: "/images/6.webp"
    }
  ];

  // 4. INDUSTRIES WE SERVE
  const industries = [
    { name: "Government & Public Bodies", desc: "Policy advisory, forestry research, and wetland restoration plans." },
    { name: "Industrial & Manufacturing", desc: "Environmental Impact Assessment (EIA), ESG reporting & carbon offset." },
    { name: "Educational Institutions", desc: "Eco-clubs, student awareness drives, and plastic recycling units." },
    { name: "NGOs & Global Cooperatives", desc: "Community-based conservation, sparrow nest drives, and seed banks." },
  ];

  // 5. PARTNER LOGOS ARRAY
  const partners = [
    { name: "FinPe", logo: "/images/p1.webp" },
    { name: "Saurabhya", logo: "/images/p2.webp" },
    { name: "Women In Nature Network", logo: "/images/p3.webp" },
    { name: "Ananya Roots", logo: "/images/p4.webp" },
    { name: "EverGreen", logo: "/images/p5.png" },
    { name: "Devraj", logo: "/images/p6.png" },
    { name: "Aadya Creations", logo: "/images/p7.png" }
  ];

  const marqueeList = [...partners, ...partners, ...partners];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between relative overflow-x-clip">
      {/* STICKY HEADER */}
      <Header />

      <main className="flex-grow pb-24">
        
        {/* 🌟 HERO BANNER SECTION */}
        <section className="relative w-full py-16 sm:py-24 bg-slate-950 text-white text-center overflow-hidden mb-12">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
            style={{
              backgroundImage:"url('/images/bg.webp')",            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#046A38]/40 to-slate-950" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 space-y-4">
            <div className="flex items-center justify-center space-x-3 text-[#FF6B00] text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em]">
              <span className="w-8 sm:w-12 h-[2px] bg-[#FF6B00]" />
              <span>SERVICES</span>
              <span className="w-8 sm:w-12 h-[2px] bg-[#FF6B00]" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white drop-shadow-md">
              Our Services
            </h1>
            
            <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
              Empowering environmental sustainability through research, training, consultancy, and global certifications.
            </p>
          </div>
        </section>

        {/* MAIN BODY CONTAINER (1400PX) */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-20 pt-6">

          {/* 1. CORE STRATEGIC PILLARS (ZIG-ZAG DETAILED FEATURE CARDS) */}
          <div className="space-y-12">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 inline-block">
                Core Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight">
                Our Strategic Pillars
              </h2>
              <div className="w-16 h-1 bg-[#FF6B00] rounded-full mx-auto" />
            </div>

            <div className="space-y-12">
              {coreServices.map((service, idx) => {
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
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
                        />
                        <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-amber-300 text-xs font-black uppercase px-3.5 py-1 rounded-full border border-white/20">
                          {service.badge}
                        </div>
                      </div>
                    </div>

                    {/* CONTENT SIDE (50% WIDTH) */}
                    <div className="w-full lg:w-1/2 space-y-5">
                      <div className="space-y-1">
                        <span className="text-xs font-black text-[#FF6B00] uppercase tracking-wider block">
                          {service.subtitle}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-900">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                        {service.desc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {service.features.map((feat, fidx) => (
                          <div key={fidx} className="flex items-start space-x-2.5">
                            <CheckCircle2 className="w-5 h-5 text-[#046A38] shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-slate-100">
                        <Link
                          href="/contact"
                          className="bg-[#046A38] hover:bg-[#FF6B00] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all inline-flex items-center space-x-2 cursor-pointer"
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
          </div>

          {/* 2. SPECIALIZED SERVICE DOMAINS (DARK METHODOLOGY STYLE DESIGN) */}
          <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 space-y-10 shadow-2xl relative overflow-hidden border border-white/10">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-amber-300 text-xs font-black uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/20 inline-block">
                Technical Expertise
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight">
                Specialized Service Domains
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {domains.map((domain, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/15 p-6 rounded-2xl space-y-4 hover:border-amber-300 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#046A38] text-amber-300 flex items-center justify-center shrink-0 shadow-xs border border-white/20">
                      <domain.icon className="w-6 h-6" />
                    </div>

                    <h4 className="font-serif font-extrabold text-base text-amber-300 tracking-wider">
                      {domain.title}
                    </h4>

                    <ul className="space-y-2 pt-2 border-t border-white/15">
                      {domain.points.map((pt, pidx) => (
                        <li key={pidx} className="text-xs sm:text-sm text-slate-300 font-medium leading-snug">
                          - {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. CASE STUDIES & FEATURED PROJECTS */}
          <div className="space-y-10">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 inline-block">
                Case Studies &amp; Audits
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight">
                Our Project&apos;s
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#046A38] text-white rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl border border-emerald-800 flex flex-col justify-between group hover:shadow-2xl transition-all"
                >
                  <div className="space-y-4 text-center">
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border-2 border-white/20 shadow-md">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
                      />
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif font-extrabold text-amber-300 tracking-wide border-b border-white/20 pb-3 leading-snug">
                      {proj.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal pt-1">
                      <strong className="text-white font-bold">{proj.highlightText}</strong> {proj.restDesc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. INDUSTRIES WE SERVE */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-lg space-y-8">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-black uppercase text-[#FF6B00] bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 inline-block">
                Diverse Client Footprint
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900">
                Industries &amp; Sector Expertise
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((ind, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
                  <Building2 className="w-6 h-6 text-[#046A38]" />
                  <h4 className="font-extrabold text-base text-slate-900">{ind.name}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. INSTITUTIONAL NETWORK (PARTNER MARQUEE) */}
          <div className="space-y-6 text-center overflow-hidden pt-4">
            <div className="space-y-2 max-w-xl mx-auto px-4">
              <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 inline-block">
                Institutional Network
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight">
                Partner&apos;s
              </h2>
            </div>

            <div className="relative w-full overflow-hidden py-8">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

              <div className="flex w-max items-center gap-12 sm:gap-16 animate-marquee hover:[animation-play-state:paused] cursor-pointer">
                {marqueeList.map((partner, pidx) => (
                  <div
                    key={pidx}
                    className="flex items-center justify-center shrink-0 h-24 px-2"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-16 sm:max-h-20 max-w-[180px] object-contain block transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        if (e.currentTarget.nextSibling) {
                          e.currentTarget.nextSibling.style.display = "block";
                        }
                      }}
                    />
                    <span className="hidden font-serif font-extrabold text-sm sm:text-base text-slate-800 text-center">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. GRAND ENTERPRISE CTA BANNER */}
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

      {/* INLINE CSS FOR CONTINUOUS SLOW MARQUEE TICKER */}
      <style jsx global>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marqueeScroll 35s linear infinite;
        }
      `}</style>
    </div>
  );
}