// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import { Mail, Lock, User, Phone, Leaf, ArrowRight, ArrowLeft, ShieldCheck, Eye, EyeOff } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// function SignupPage() {
//   const { signup } = useAuth();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     gender: "female",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setErrorMsg("");
//     setSuccessMsg("");

//     const res = await signup(formData);
//     setSubmitting(false);

//     if (res.success) {
//       setSuccessMsg("Account created successfully! Redirecting to shop...");
//       setTimeout(() => {
//         window.location.href = "/shop";
//       }, 1000);
//     } else {
//       setErrorMsg(res.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col justify-between">
//       <Header />

//       <main className="flex-grow pb-20">
        
//         {/* SIMPLE CLEAN BACK LINK ALIGNED BELOW HEADER LOGO */}
//         <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-5 pb-2">
//           <Link
//             href="/shop"
//             className="inline-flex items-center space-x-2 text-slate-700 hover:text-[#FF6B00] text-xs sm:text-sm font-extrabold transition-colors cursor-pointer group"
//           >
//             <ArrowLeft className="w-4 h-4 text-[#046A38] group-hover:-translate-x-1 transition-transform" />
//             <span>Back to Shop</span>
//           </Link>
//         </div>

//         {/* MAIN SIGNUP CARD CONTAINER */}
//         <div className="flex items-center justify-center px-4 pt-2 sm:pt-4">
//           <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
            
//             {/* LEFT COLUMN */}
//             <div className="md:col-span-5 bg-gradient-to-b from-[#046A38] via-[#03542c] to-[#0b2918] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
//               <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

//               <div className="space-y-4 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
//                 <div className="w-14 h-14 bg-white/15 rounded-2xl border border-white/30 flex items-center justify-center backdrop-blur-md animate-bounce shadow-xl">
//                   <Leaf className="w-7 h-7 text-amber-300" />
//                 </div>

//                 <div className="space-y-2">
//                   <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight leading-tight">
//                     Looks like you are new here!
//                   </h1>
//                   <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
//                     Sign up with your details to get started with Pure Organic Goodness
//                   </p>
//                 </div>
//               </div>

//               <div className="pt-4 relative z-10">
//                 <div className="rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-black/20 backdrop-blur-xs">
//                   <img
//                     src="https://images.unsplash.com/photo-1546548970-71785318a17b?q=80&w=800&auto=format&fit=crop"
//                     alt="Organic Herbs and Spices"
//                     className="w-full h-44 sm:h-52 object-cover opacity-90 hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT COLUMN */}
//             <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-white space-y-6">
//               <div className="space-y-4">
//                 {errorMsg && (
//                   <div className="bg-red-50 text-red-700 text-xs font-extrabold p-4 rounded-2xl border border-red-200 text-center">
//                     {errorMsg}
//                   </div>
//                 )}

//                 {successMsg && (
//                   <div className="bg-emerald-50 text-[#046A38] text-xs font-extrabold p-4 rounded-2xl border border-emerald-200 text-center">
//                     {successMsg}
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-3.5">
//                   <div className="space-y-1">
//                     <label className="text-xs font-black uppercase tracking-wider text-slate-700">Full Name *</label>
//                     <div className="relative">
//                       <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
//                       <input
//                         type="text"
//                         name="name"
//                         required
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="Jane Doe"
//                         className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 transition-colors"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-1">
//                     <label className="text-xs font-black uppercase tracking-wider text-slate-700">Email Address *</label>
//                     <div className="relative">
//                       <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
//                       <input
//                         type="email"
//                         name="email"
//                         required
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="jane@example.com"
//                         className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 transition-colors"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-1">
//                     <label className="text-xs font-black uppercase tracking-wider text-slate-700">Phone Number *</label>
//                     <div className="relative">
//                       <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
//                       <input
//                         type="tel"
//                         name="phone"
//                         required
//                         value={formData.phone}
//                         onChange={handleChange}
//                         placeholder="9876543210"
//                         className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 transition-colors"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="space-y-1">
//                       <label className="text-xs font-black uppercase tracking-wider text-slate-700">Password *</label>
//                       <div className="relative">
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           name="password"
//                           required
//                           value={formData.password}
//                           onChange={handleChange}
//                           placeholder="Password123"
//                           className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 transition-colors"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
//                         >
//                           {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </div>
//                     <div className="space-y-1">
//                       <label className="text-xs font-black uppercase tracking-wider text-slate-700">Gender *</label>
//                       <select
//                         name="gender"
//                         value={formData.gender}
//                         onChange={handleChange}
//                         className="w-full px-3 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 transition-colors"
//                       >
//                         <option value="female">Female</option>
//                         <option value="male">Male</option>
//                         <option value="other">Other</option>
//                       </select>
//                     </div>
//                   </div>

//                   <p className="text-[11px] text-slate-500 font-medium leading-normal pt-1">
//                     By continuing, you agree to Ecoensa’s{" "}
//                     <Link href="/terms-of-service" className="text-[#046A38] font-bold hover:underline">
//                       Terms of Use
//                     </Link>{" "}
//                     and{" "}
//                     <Link href="/privacy-policy" className="text-[#046A38] font-bold hover:underline">
//                       Privacy Policy
//                     </Link>.
//                   </p>

//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className="w-full bg-[#FF6B00] hover:bg-[#e05e00] disabled:bg-slate-400 text-white font-serif font-black text-sm py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider"
//                   >
//                     {submitting ? (
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     ) : (
//                       <>
//                         <ShieldCheck className="w-4 h-4" />
//                         <span>CONTINUE TO REGISTER</span>
//                       </>
//                     )}
//                   </button>
//                 </form>
//               </div>

//               <div className="pt-3 border-t border-slate-100 text-center">
//                 <Link
//                   href="/login"
//                   className="w-full bg-slate-50 hover:bg-slate-100 text-[#046A38] font-extrabold text-xs py-3.5 px-4 rounded-xl border border-slate-200 transition-all inline-block shadow-xs"
//                 >
//                   Existing User? Log in
//                 </Link>
//               </div>

//             </div>

//           </div>
//         </div>

//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default SignupPage;








/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Lock, User, Phone, Leaf, ArrowRight, ArrowLeft, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "female",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // LAZY INITIALIZER FOR REDIRECT PATH (ZERO LINTER ERRORS & ZERO HISTORY POISONING)
  const [redirectPath] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("redirect") || "/shop";
    }
    return "/shop";
  });

  const backHref = redirectPath === "/checkout" ? "/cart" : "/shop";
  const backLabel = redirectPath === "/checkout" ? "Back to Cart" : "Back to Shop";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const res = await signup(formData);
    setSubmitting(false);

    if (res.success) {
      setSuccessMsg("Account created successfully! Redirecting...");
      setTimeout(() => {
        window.location.href = redirectPath;
      }, 1000);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col justify-between">
      <Header />

      <main className="flex-grow pb-20">
        
        {/* DYNAMIC SMART BACK LINK */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-5 pb-2">
          <Link
            href={backHref}
            className="inline-flex items-center space-x-2 text-slate-700 hover:text-[#FF6B00] text-xs sm:text-sm font-extrabold transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#046A38] group-hover:-translate-x-1 transition-transform" />
            <span>{backLabel}</span>
          </Link>
        </div>

        {/* MAIN SIGNUP CARD CONTAINER */}
        <div className="flex items-center justify-center px-4 pt-2 sm:pt-4">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
            
            {/* LEFT COLUMN */}
            <div className="md:col-span-5 bg-gradient-to-b from-[#046A38] via-[#03542c] to-[#0b2918] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-14 h-14 bg-white/15 rounded-2xl border border-white/30 flex items-center justify-center backdrop-blur-md animate-bounce shadow-xl">
                  <Leaf className="w-7 h-7 text-amber-300" />
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight leading-tight">
                    Looks like you are new here!
                  </h1>
                  <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
                    Sign up with your details to get started with Pure Organic Goodness
                  </p>
                </div>
              </div>

              <div className="pt-4 relative z-10">
                <div className="rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-black/20 backdrop-blur-xs">
                  <img
                    src="https://images.unsplash.com/photo-1546548970-71785318a17b?q=80&w=800&auto=format&fit=crop"
                    alt="Organic Herbs and Spices"
                    className="w-full h-44 sm:h-52 object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-white space-y-6">
              <div className="space-y-4">
                {errorMsg && (
                  <div className="bg-red-50 text-red-700 text-xs font-extrabold p-4 rounded-2xl border border-red-200 text-center">
                    {errorMsg}
                  </div>
                )}

                {successMsg && (
                  <div className="bg-emerald-50 text-[#046A38] text-xs font-extrabold p-4 rounded-2xl border border-emerald-200 text-center">
                    {successMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700">Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-slate-700">Password *</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password123"
                          className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-slate-700">Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-3 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 transition-colors"
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 font-medium leading-normal pt-1">
                    By continuing, you agree to Ecoensa’s{" "}
                    <Link href="/terms-of-service" className="text-[#046A38] font-bold hover:underline">
                      Terms of Use
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-[#046A38] font-bold hover:underline">
                      Privacy Policy
                    </Link>.
                  </p>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#FF6B00] hover:bg-[#e05e00] disabled:bg-slate-400 text-white font-serif font-black text-sm py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider"
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>CONTINUE TO REGISTER</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="pt-3 border-t border-slate-100 text-center">
                <Link
                  href={`/login${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-[#046A38] font-extrabold text-xs py-3.5 px-4 rounded-xl border border-slate-200 transition-all inline-block shadow-xs"
                >
                  Existing User? Log in
                </Link>
              </div>

            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}