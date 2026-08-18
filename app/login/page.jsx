

// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState, Suspense } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { Mail, Lock, Leaf, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Eye, EyeOff } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// function LoginForm() {
//   const { login } = useAuth();
//   const searchParams = useSearchParams();
//   const redirectPath = searchParams.get("redirect") || "/shop";

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [submitting, setSubmitting] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setErrorMsg("");
//     setSuccessMsg("");

//     const res = await login(email, password);
//     setSubmitting(false);

//     if (res.success) {
//       setSuccessMsg("Login successful! Redirecting...");
//       setTimeout(() => {
//         window.location.href = redirectPath;
//       }, 800);
//     } else {
//       setErrorMsg(res.message);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {errorMsg && (
//         <div className="bg-red-50 text-red-700 text-xs font-extrabold p-4 rounded-2xl border border-red-200 text-center">
//           {errorMsg}
//         </div>
//       )}

//       {successMsg && (
//         <div className="bg-emerald-50 text-[#046A38] text-xs font-extrabold p-4 rounded-2xl border border-emerald-200 text-center">
//           {successMsg}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-700">
//             Email Address *
//           </label>
//           <div className="relative">
//             <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="user@example.com"
//               className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 transition-colors"
//             />
//           </div>
//         </div>

//         <div className="space-y-1.5">
//           <div className="flex justify-between items-center">
//             <label className="text-xs font-black uppercase tracking-wider text-slate-700">
//               Password *
//             </label>
//             <Link href="/forgot-password" className="text-xs text-[#FF6B00] font-extrabold hover:underline">
//               Forgot Password?
//             </Link>
//           </div>
//           <div className="relative">
//             <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
//             <input
//               type={showPassword ? "text" : "password"}
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               className="w-full pl-10 pr-10 py-3.5 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 transition-colors"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
//             >
//               {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//             </button>
//           </div>
//         </div>

//         {/* TERMS DISCLAIMER */}
//         <p className="text-[11px] text-slate-500 font-medium leading-normal">
//           By continuing, you agree to Ecoensa’s{" "}
//           <Link href="/terms-of-service" className="text-[#046A38] font-bold hover:underline">
//             Terms of Use
//           </Link>{" "}
//           and{" "}
//           <Link href="/privacy-policy" className="text-[#046A38] font-bold hover:underline">
//             Privacy Policy
//           </Link>.
//         </p>

//         {/* FLIPKART STYLE BOLD CTA BUTTON */}
//         <button
//           type="submit"
//           disabled={submitting}
//           className="w-full bg-[#FF6B00] hover:bg-[#e05e00] disabled:bg-slate-400 text-white font-serif font-black text-sm py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider"
//         >
//           {submitting ? (
//             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//           ) : (
//             <>
//               <span>CONTINUE TO SIGN IN</span>
//               <ArrowRight className="w-4 h-4" />
//             </>
//           )}
//         </button>
//       </form>

//       {/* TRUST BADGES & EXTRA CONTENT */}
//       <div className="pt-2 border-t border-slate-100 space-y-4">
//         <div className="grid grid-cols-2 gap-3 text-[11px] font-bold text-slate-600">
//           <div className="flex items-center space-x-2 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100 text-[#046A38]">
//             <ShieldCheck className="w-4 h-4 shrink-0" />
//             <span>100% Encrypted Login</span>
//           </div>
//           <div className="flex items-center space-x-2 bg-amber-50/80 p-2.5 rounded-xl border border-amber-100 text-amber-800">
//             <Sparkles className="w-4 h-4 shrink-0" />
//             <span>Pure Organic Spices</span>
//           </div>
//         </div>

//         <Link
//           href="/signup"
//           className="w-full bg-slate-50 hover:bg-slate-100 text-[#046A38] font-extrabold text-xs py-3.5 px-4 rounded-xl border border-slate-200 transition-all block text-center shadow-xs"
//         >
//           New to Ecoensa? Create an account
//         </Link>
//       </div>

//     </div>
//   );
// }

// export default function LoginPage() {
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

//         {/* MAIN LOGIN CARD CONTAINER */}
//         <div className="flex items-center justify-center px-4 pt-2 sm:pt-4">
//           <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
            
//             {/* LEFT COLUMN: THEME BRAND BANNER */}
//             <div className="md:col-span-5 bg-gradient-to-b from-[#046A38] via-[#03542c] to-[#0b2918] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              
//               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
//               <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

//               <div className="space-y-4 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
//                 <div className="w-14 h-14 bg-white/15 rounded-2xl border border-white/30 flex items-center justify-center backdrop-blur-md animate-bounce shadow-xl">
//                   <Leaf className="w-7 h-7 text-amber-300" />
//                 </div>

//                 <div className="space-y-2">
//                   <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight leading-tight">
//                     Login to Ecoensa
//                   </h1>
//                   <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
//                     Get access to your Orders, Wishlist and Pure Organic Recommendations
//                   </p>
//                 </div>
//               </div>

//               <div className="pt-6 relative z-10">
//                 <div className="rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-black/20 backdrop-blur-xs">
//                   <img
//                     src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop"
//                     alt="Pure Organic Spices"
//                     className="w-full h-36 sm:h-44 object-cover opacity-90 hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>
//               </div>

//             </div>

//             {/* RIGHT COLUMN */}
//             <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
//               <Suspense fallback={
//                 <div className="py-20 text-center">
//                   <div className="w-8 h-8 border-4 border-[#046A38] border-t-transparent rounded-full animate-spin mx-auto" />
//                 </div>
//               }>
//                 <LoginForm />
//               </Suspense>
//             </div>

//           </div>
//         </div>

//       </main>

//       <Footer />
//     </div>
//   );
// }





/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Lock, Leaf, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const res = await login(email, password);
    setSubmitting(false);

    if (res.success) {
      setSuccessMsg("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = redirectPath;
      }, 800);
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

        {/* MAIN LOGIN CARD CONTAINER */}
        <div className="flex items-center justify-center px-4 pt-2 sm:pt-4">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
            
            {/* LEFT COLUMN: THEME BRAND BANNER */}
            <div className="md:col-span-5 bg-gradient-to-b from-[#046A38] via-[#03542c] to-[#0b2918] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-14 h-14 bg-white/15 rounded-2xl border border-white/30 flex items-center justify-center backdrop-blur-md animate-bounce shadow-xl">
                  <Leaf className="w-7 h-7 text-amber-300" />
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight leading-tight">
                    Login to Ecoensa
                  </h1>
                  <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
                    Get access to your Orders, Wishlist and Pure Organic Recommendations
                  </p>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <div className="rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-black/20 backdrop-blur-xs">
                  <img
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop"
                    alt="Pure Organic Spices"
                    className="w-full h-36 sm:h-44 object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
              <div className="space-y-6">
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

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="user@example.com"
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                        Password *
                      </label>
                      <Link href="/forgot-password" className="text-xs text-[#FF6B00] font-extrabold hover:underline">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-3.5 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 font-medium leading-normal">
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
                        <span>CONTINUE TO SIGN IN</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="pt-2 border-t border-slate-100 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-[11px] font-bold text-slate-600">
                    <div className="flex items-center space-x-2 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100 text-[#046A38]">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>100% Encrypted Login</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-amber-50/80 p-2.5 rounded-xl border border-amber-100 text-amber-800">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>Pure Organic Spices</span>
                    </div>
                  </div>

                  <Link
                    href={`/signup${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`}
                    className="w-full bg-slate-50 hover:bg-slate-100 text-[#046A38] font-extrabold text-xs py-3.5 px-4 rounded-xl border border-slate-200 transition-all block text-center shadow-xs"
                  >
                    New to Ecoensa? Create an account
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}