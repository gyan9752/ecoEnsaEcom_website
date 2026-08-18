

// "use client";

// import React, { useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Building, Sparkles } from "lucide-react";

// export default function ContactPage() {
//   const [submitted, setSubmitted] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "General Inquiry",
//     message: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//     setTimeout(() => {
//       setSubmitted(false);
//       setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
//     }, 4000);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
//       <Header />

//       <main className="flex-grow pb-24">
        
//         {/* 1. HERO BANNER SECTION */}
//         <section className="relative w-full py-14 sm:py-20 bg-slate-950 overflow-hidden mb-12 sm:mb-16">
//           <div
//             className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
//             style={{
//               backgroundImage:
//                 "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80')",
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#046A38]/70 to-slate-950" />

//           <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 text-center space-y-5">
//             <span className="bg-white/10 border border-white/20 text-amber-300 text-xs sm:text-sm font-black uppercase tracking-widest px-4 py-2 rounded-full inline-flex items-center space-x-2 shadow-lg">
//               <Sparkles className="w-4 h-4" />
//               <span>We Are Here To Help</span>
//             </span>

//             <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white tracking-tight leading-tight max-w-5xl mx-auto drop-shadow-xl">
//               Get in Touch With Ecoensa
//             </h1>

//             <p className="text-sm sm:text-base md:text-lg text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
//               Have questions about our organic products, sustainability solutions, bulk orders, or partnerships? Reach out to our team directly.
//             </p>
//           </div>
//         </section>

//         {/* 2. MAIN CONTENT (BALANCED UNIFORM FONT SIZES GRID) */}
//         <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-12">
          
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
//             {/* LEFT COLUMN: CONTACT INFORMATION CARD */}
//             <div className="lg:col-span-5">
//               <div className="bg-gradient-to-br from-[#046A38] via-[#03522b] to-slate-900 rounded-3xl p-8 sm:p-9 text-white space-y-7 shadow-xl relative overflow-hidden">
//                 <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B00]/15 rounded-full blur-3xl pointer-events-none" />

//                 <div className="space-y-1.5">
//                   <h3 className="text-2xl font-serif font-black text-white tracking-tight">
//                     Contact Information
//                   </h3>
//                   <p className="text-sm text-slate-200 font-medium">
//                     Reach out to our team directly for inquiries & support.
//                   </p>
//                 </div>

//                 <div className="space-y-5 text-sm sm:text-base font-medium">
//                   {/* REGISTERED OFFICE */}
//                   <div className="flex items-start space-x-4">
//                     <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 mt-0.5">
//                       <MapPin className="w-5 h-5 text-amber-300" />
//                     </div>
//                     <div>
//                       <span className="font-extrabold text-amber-300 text-xs sm:text-sm uppercase tracking-wider block mb-0.5">
//                         Registered Office
//                       </span>
//                       <span className="text-slate-100 text-sm sm:text-base leading-relaxed">
//                         JG_III, 228-B, Vikas Puri, New Delhi, India - 110018
//                       </span>
//                     </div>
//                   </div>

//                   {/* CORPORATE OFFICE */}
//                   <div className="flex items-start space-x-4">
//                     <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 mt-0.5">
//                       <Building className="w-5 h-5 text-emerald-300" />
//                     </div>
//                     <div>
//                       <span className="font-extrabold text-emerald-300 text-xs sm:text-sm uppercase tracking-wider block mb-0.5">
//                         Corporate Office
//                       </span>
//                       <span className="text-slate-100 text-sm sm:text-base leading-relaxed">
//                         B-208, Tower 3, Techzone VI, Greater Noida West, 201306
//                       </span>
//                     </div>
//                   </div>

//                   {/* PHONE NUMBERS */}
//                   <div className="flex items-center space-x-4">
//                     <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
//                       <Phone className="w-5 h-5 text-amber-300" />
//                     </div>
//                     <div>
//                       <span className="font-extrabold text-amber-300 text-xs sm:text-sm uppercase tracking-wider block mb-0.5">
//                         Phone Numbers
//                       </span>
//                       <a href="tel:+919871500373" className="text-slate-100 hover:text-amber-300 transition-colors font-bold text-sm sm:text-base">
//                         0120-6050108, +91-9871500373
//                       </a>
//                     </div>
//                   </div>

//                   {/* EMAIL */}
//                   <div className="flex items-center space-x-4">
//                     <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
//                       <Mail className="w-5 h-5 text-emerald-300" />
//                     </div>
//                     <div>
//                       <span className="font-extrabold text-emerald-300 text-xs sm:text-sm uppercase tracking-wider block mb-0.5">
//                         Email Address
//                       </span>
//                       <a href="mailto:info@ecoensa.com" className="text-slate-100 hover:text-emerald-300 transition-colors font-bold text-sm sm:text-base">
//                         info@ecoensa.com
//                       </a>
//                     </div>
//                   </div>

//                   {/* WORKING HOURS */}
//                   <div className="flex items-center space-x-4 pt-3 border-t border-white/15">
//                     <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
//                       <Clock className="w-5 h-5 text-amber-300" />
//                     </div>
//                     <div>
//                       <span className="font-extrabold text-amber-300 text-xs sm:text-sm uppercase tracking-wider block mb-0.5">
//                         Business Hours
//                       </span>
//                       <span className="text-slate-100 text-sm sm:text-base font-medium">Mon – Sat: 9:00 AM – 7:00 PM</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="pt-4 text-xs font-mono text-slate-300 border-t border-white/15 space-y-1 opacity-90">
//                   <p>CIN: U93090DL2021PTC383439</p>
//                   <p>GSTIN: 09AAGCE5473Q1ZU</p>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT COLUMN: CONTACT FORM CARD */}
//             <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200">
              
//               {submitted ? (
//                 <div className="py-16 text-center space-y-4">
//                   <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#046A38] mx-auto flex items-center justify-center animate-bounce">
//                     <CheckCircle2 className="w-10 h-10" />
//                   </div>
//                   <h3 className="text-2xl font-serif font-black text-slate-900">
//                     Message Sent Successfully!
//                   </h3>
//                   <p className="text-sm sm:text-base text-slate-600 font-medium max-w-md mx-auto">
//                     Thank you for contacting Ecoensa. Our representative will get back to you within 24 hours.
//                   </p>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="space-y-1.5">
//                     <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
//                       Send Us a Message
//                     </h3>
//                     <p className="text-sm text-slate-600 font-medium">
//                       Fill in your details below and we will get back to you promptly.
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                     {/* FULL NAME */}
//                     <div className="space-y-1.5">
//                       <label className="text-xs sm:text-sm font-extrabold uppercase text-slate-700 tracking-wider">
//                         Full Name *
//                       </label>
//                       <input
//                         type="text"
//                         required
//                         placeholder="Dr. Archana Naithani"
//                         value={formData.name}
//                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                         className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#046A38] text-sm sm:text-base font-medium text-slate-900 outline-none transition-all shadow-xs"
//                       />
//                     </div>

//                     {/* EMAIL ADDRESS */}
//                     <div className="space-y-1.5">
//                       <label className="text-xs sm:text-sm font-extrabold uppercase text-slate-700 tracking-wider">
//                         Email Address *
//                       </label>
//                       <input
//                         type="email"
//                         required
//                         placeholder="you@example.com"
//                         value={formData.email}
//                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                         className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#046A38] text-sm sm:text-base font-medium text-slate-900 outline-none transition-all shadow-xs"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                     {/* PHONE NUMBER */}
//                     <div className="space-y-1.5">
//                       <label className="text-xs sm:text-sm font-extrabold uppercase text-slate-700 tracking-wider">
//                         Phone Number
//                       </label>
//                       <input
//                         type="tel"
//                         placeholder="+91 9871500373"
//                         value={formData.phone}
//                         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                         className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#046A38] text-sm sm:text-base font-medium text-slate-900 outline-none transition-all shadow-xs"
//                       />
//                     </div>

//                     {/* SUBJECT DROPDOWN */}
//                     <div className="space-y-1.5">
//                       <label className="text-xs sm:text-sm font-extrabold uppercase text-slate-700 tracking-wider">
//                         Subject
//                       </label>
//                       <select
//                         value={formData.subject}
//                         onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
//                         className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#046A38] text-sm sm:text-base font-medium text-slate-900 outline-none bg-white transition-all shadow-xs"
//                       >
//                         <option value="General Inquiry">General Inquiry</option>
//                         <option value="Organic Product Orders">Organic Product Orders</option>
//                         <option value="Partnership & Affiliate">Partnership & Affiliate</option>
//                         <option value="Environmental Consultation">Environmental Consultation</option>
//                         <option value="Bulk Order Inquiry">Bulk Order Inquiry</option>
//                       </select>
//                     </div>
//                   </div>

//                   {/* MESSAGE TEXTAREA */}
//                   <div className="space-y-1.5">
//                     <label className="text-xs sm:text-sm font-extrabold uppercase text-slate-700 tracking-wider">
//                       Your Message *
//                     </label>
//                     <textarea
//                       rows={4}
//                       required
//                       placeholder="Write your message or inquiry here..."
//                       value={formData.message}
//                       onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                       className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#046A38] text-sm sm:text-base font-medium text-slate-900 outline-none resize-none transition-all shadow-xs"
//                     />
//                   </div>

//                   {/* SUBMIT BUTTON */}
//                   <button
//                     type="submit"
//                     className="w-full bg-[#046A38] hover:bg-[#FF6B00] text-white font-extrabold text-sm sm:text-base py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
//                   >
//                     <Send className="w-4 h-4" />
//                     <span>Send Message</span>
//                   </button>
//                 </form>
//               )}

//             </div>

//           </div>

//           {/* QUICK SUPPORT CARDS WITH MATCHING FONT SIZES */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
//             <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 text-center shadow-xs">
//               <MessageSquare className="w-6 h-6 text-[#046A38] mx-auto" />
//               <h4 className="font-extrabold text-slate-900 text-base">Instant Support</h4>
//               <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
//                 Get fast replies on WhatsApp and email during business hours.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 text-center shadow-xs">
//               <Mail className="w-6 h-6 text-[#FF6B00] mx-auto" />
//               <h4 className="font-extrabold text-slate-900 text-base">Corporate Inquiries</h4>
//               <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
//                 For corporate orders & consultancy, write to info@ecoensa.com.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 text-center shadow-xs">
//               <MapPin className="w-6 h-6 text-[#046A38] mx-auto" />
//               <h4 className="font-extrabold text-slate-900 text-base">PAN India Presence</h4>
//               <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
//                 Offices in Delhi NCR & Greater Noida West with nationwide shipping.
//               </p>
//             </div>
//           </div>

//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }




"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, 
  Building, Sparkles, AlertCircle, Check 
} from "lucide-react";

// ==========================================
// 100% LIVE API BASE CONFIGURATION
const API_BASE = "https://moteligo.in/ecoback";
// ==========================================

export default function ContactPage() {
  const [successTooltip, setSuccessTooltip] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  /* STRICT FRONTEND FORM VALIDATION (FIELD KE NICHE) */
  const validateForm = () => {
    const errors = {};

    // 1. Full Name Validation
    if (!formData.name.trim()) {
      errors.name = "Full Name is required.";
    } else if (formData.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters long.";
    }

    // 2. Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email Address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    // 3. Indian Mobile Number Validation (Starts with 6-9, Exactly 10 Digits)
    const cleanPhone = formData.phone.trim().replace(/[\s\-\+\(\)]/g, "");
    if (!cleanPhone) {
      errors.phone = "Phone Number is required.";
    } else {
      const phoneDigits = cleanPhone.startsWith("91") && cleanPhone.length === 12 ? cleanPhone.slice(2) : cleanPhone;
      const indianPhoneRegex = /^[6-9]\d{9}$/;
      if (!indianPhoneRegex.test(phoneDigits)) {
        errors.phone = "Must be a valid 10-digit mobile number starting with 6-9.";
      }
    }

    // 4. Message Validation
    if (!formData.message.trim()) {
      errors.message = "Message cannot be empty.";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* REAL SUBMIT CONTACT ENQUIRY API HANDLER (6.1) */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validateForm()) return;

    setSubmitting(true);

    const payload = {
      fullName: formData.name.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phone.trim(),
      subject: formData.subject,
      message: formData.message.trim(),
    };

    try {
      const res = await fetch(`${API_BASE}/api/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json?.success || json?.status) {
        setSuccessTooltip(true);
        setFormErrors({});
        setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
        setTimeout(() => {
          setSuccessTooltip(false);
        }, 5000);
      } else {
        setErrorMsg(json?.message || "Failed to submit enquiry. Please check fields.");
      }
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setErrorMsg("Network error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between relative">
      <Header />

      {/* FLOATING SUCCESS TOOLTIP / TOAST NOTIFICATION ON TOP RIGHT */}
      {successTooltip && (
        <div className="fixed top-24 right-5 z-50 bg-[#046A38] text-white px-6 py-4 rounded-2xl shadow-2xl border border-emerald-300 flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-6 h-6 text-amber-300 shrink-0" />
          <div>
            <h5 className="font-extrabold text-sm text-white">Message Sent Successfully!</h5>
            <p className="text-xs text-emerald-100 font-medium">Thank you! Our team will contact you within 24 hours.</p>
          </div>
        </div>
      )}

      <main className="flex-grow pb-24">
        
        {/* 1. HERO BANNER SECTION */}
        <section className="relative w-full py-14 sm:py-20 bg-slate-950 overflow-hidden mb-12 sm:mb-16">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#046A38]/70 to-slate-950" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 text-center space-y-5">
            <span className="bg-white/10 border border-white/20 text-amber-300 text-xs sm:text-sm font-black uppercase tracking-widest px-4 py-2 rounded-full inline-flex items-center space-x-2 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span>We Are Here To Help</span>
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white tracking-tight leading-tight max-w-5xl mx-auto drop-shadow-xl">
              Get in Touch With Ecoensa
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Have questions about our organic products, sustainability solutions, bulk orders, or partnerships? Reach out to our team directly.
            </p>
          </div>
        </section>

        {/* 2. MAIN CONTENT GRID */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: CONTACT INFORMATION CARD */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#046A38] via-[#03522b] to-slate-900 rounded-3xl p-8 sm:p-9 text-white space-y-7 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B00]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-1.5">
                  <h3 className="text-2xl font-serif font-black text-white tracking-tight">
                    Contact Information
                  </h3>
                  <p className="text-sm text-slate-200 font-medium">
                    Reach out to our team directly for inquiries & support.
                  </p>
                </div>

                <div className="space-y-5 text-sm sm:text-base font-medium">
                  {/* REGISTERED OFFICE */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 mt-0.5">
                      <MapPin className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <span className="font-extrabold text-amber-300 text-xs sm:text-sm uppercase tracking-wider block mb-0.5">
                        Registered Office
                      </span>
                      <span className="text-slate-100 text-sm sm:text-base leading-relaxed">
                        JG_III, 228-B, Vikas Puri, New Delhi, India - 110018
                      </span>
                    </div>
                  </div>

                  {/* CORPORATE OFFICE */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 mt-0.5">
                      <Building className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <span className="font-extrabold text-emerald-300 text-xs sm:text-sm uppercase tracking-wider block mb-0.5">
                        Corporate Office
                      </span>
                      <span className="text-slate-100 text-sm sm:text-base leading-relaxed">
                        B-208, Tower 3, Techzone VI, Greater Noida West, 201306
                      </span>
                    </div>
                  </div>

                  {/* PHONE NUMBERS */}
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <Phone className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <span className="font-extrabold text-amber-300 text-xs sm:text-sm uppercase tracking-wider block mb-0.5">
                        Phone Numbers
                      </span>
                      <a href="tel:+919871500373" className="text-slate-100 hover:text-amber-300 transition-colors font-bold text-sm sm:text-base">
                        0120-6050108, +91-9871500373
                      </a>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <Mail className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <span className="font-extrabold text-emerald-300 text-xs sm:text-sm uppercase tracking-wider block mb-0.5">
                        Email Address
                      </span>
                      <a href="mailto:info@ecoensa.com" className="text-slate-100 hover:text-emerald-300 transition-colors font-bold text-sm sm:text-base">
                        info@ecoensa.com
                      </a>
                    </div>
                  </div>

                  {/* WORKING HOURS */}
                  <div className="flex items-center space-x-4 pt-3 border-t border-white/15">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <Clock className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <span className="font-extrabold text-amber-300 text-xs sm:text-sm uppercase tracking-wider block mb-0.5">
                        Business Hours
                      </span>
                      <span className="text-slate-100 text-sm sm:text-base font-medium">Mon – Sat: 9:00 AM – 7:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-xs font-mono text-slate-300 border-t border-white/15 space-y-1 opacity-90">
                  <p>CIN: U93090DL2021PTC383439</p>
                  <p>GSTIN: 09AAGCE5473Q1ZU</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CONTACT FORM CARD */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="space-y-1.5">
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
                    Send Us a Message
                  </h3>
                  <p className="text-sm text-slate-600 font-medium">
                    Fill in your details below and we will get back to you promptly.
                  </p>
                </div>

                {errorMsg && (
                  <div className="bg-rose-50 text-rose-700 text-xs font-bold p-3.5 rounded-xl border border-rose-200 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* FULL NAME */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-extrabold uppercase text-slate-700 tracking-wider block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Dr. Archana Naithani"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: null });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base font-medium text-slate-900 outline-none transition-all shadow-xs ${
                        formErrors.name ? "border-rose-500 bg-rose-50/30" : "border-slate-300 focus:border-[#046A38]"
                      }`}
                    />
                    {/* ERROR VALIDATION MESSAGE DIRECTLY BELOW INPUT */}
                    {formErrors.name && (
                      <p className="text-rose-600 text-xs font-bold pt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formErrors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* EMAIL ADDRESS */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-extrabold uppercase text-slate-700 tracking-wider block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (formErrors.email) setFormErrors({ ...formErrors, email: null });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base font-medium text-slate-900 outline-none transition-all shadow-xs ${
                        formErrors.email ? "border-rose-500 bg-rose-50/30" : "border-slate-300 focus:border-[#046A38]"
                      }`}
                    />
                    {/* ERROR VALIDATION MESSAGE DIRECTLY BELOW INPUT */}
                    {formErrors.email && (
                      <p className="text-rose-600 text-xs font-bold pt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formErrors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* PHONE NUMBER (STRICT 6-9 & 10 DIGITS) */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-extrabold uppercase text-slate-700 tracking-wider block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      maxLength={13}
                      placeholder="9871500373"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: null });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base font-medium text-slate-900 outline-none transition-all shadow-xs ${
                        formErrors.phone ? "border-rose-500 bg-rose-50/30" : "border-slate-300 focus:border-[#046A38]"
                      }`}
                    />
                    {/* ERROR VALIDATION MESSAGE DIRECTLY BELOW INPUT */}
                    {formErrors.phone && (
                      <p className="text-rose-600 text-xs font-bold pt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formErrors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* SUBJECT DROPDOWN */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-extrabold uppercase text-slate-700 tracking-wider block">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#046A38] text-sm sm:text-base font-medium text-slate-900 outline-none bg-white transition-all shadow-xs cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Order Support">Order Support</option>
                      <option value="Wholesale / Bulk Order">Wholesale / Bulk Order</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                {/* MESSAGE TEXTAREA */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-extrabold uppercase text-slate-700 tracking-wider block">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write your message or inquiry here..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (formErrors.message) setFormErrors({ ...formErrors, message: null });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base font-medium text-slate-900 outline-none resize-none transition-all shadow-xs ${
                      formErrors.message ? "border-rose-500 bg-rose-50/30" : "border-slate-300 focus:border-[#046A38]"
                    }`}
                  />
                  {/* ERROR VALIDATION MESSAGE DIRECTLY BELOW INPUT */}
                  {formErrors.message && (
                    <p className="text-rose-600 text-xs font-bold pt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{formErrors.message}</span>
                    </p>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#046A38] hover:bg-[#FF6B00] disabled:bg-slate-400 text-white font-extrabold text-sm sm:text-base py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>

          {/* QUICK SUPPORT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 text-center shadow-xs">
              <MessageSquare className="w-6 h-6 text-[#046A38] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-base">Instant Support</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Get fast replies on WhatsApp and email during business hours.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 text-center shadow-xs">
              <Mail className="w-6 h-6 text-[#FF6B00] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-base">Corporate Inquiries</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                For corporate orders & consultancy, write to info@ecoensa.com.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 text-center shadow-xs">
              <MapPin className="w-6 h-6 text-[#046A38] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-base">PAN India Presence</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Offices in Delhi NCR & Greater Noida West with nationwide shipping.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}