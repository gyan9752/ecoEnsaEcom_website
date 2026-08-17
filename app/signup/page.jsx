// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import { Mail, Lock, User, Phone, Leaf, ShieldCheck } from "lucide-react";
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
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
//       <Header />

//       <main className="flex-grow pt-10 pb-20 flex items-center justify-center px-4">
//         <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden">
          
//           {/* HEADER BRAND BANNER */}
//           <div className="bg-gradient-to-r from-[#046A38] via-[#057a41] to-[#046A38] text-white p-8 text-center relative">
//             <div className="w-16 h-16 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-md shadow-inner">
//               <Leaf className="w-8 h-8 text-amber-300 animate-bounce" />
//             </div>

//             <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight">
//               Create Account
//             </h1>
//             <p className="text-xs text-emerald-100 font-medium mt-1">
//               Join Ecoensa for pure organic spices, dry fruits & ghee
//             </p>
//           </div>

//           {/* FORM BODY */}
//           <div className="p-6 sm:p-8 space-y-6">
//             {errorMsg && (
//               <div className="bg-red-50 text-red-700 text-xs font-extrabold p-4 rounded-2xl border border-red-200 text-center">
//                 {errorMsg}
//               </div>
//             )}

//             {successMsg && (
//               <div className="bg-emerald-50 text-[#046A38] text-xs font-extrabold p-4 rounded-2xl border border-emerald-200 text-center">
//                 {successMsg}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-1">
//                 <label className="text-xs font-black uppercase text-slate-700">Full Name *</label>
//                 <div className="relative">
//                   <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Jane Doe"
//                     className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-black uppercase text-slate-700">Email Address *</label>
//                 <div className="relative">
//                   <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="jane@example.com"
//                     className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-black uppercase text-slate-700">Phone Number *</label>
//                 <div className="relative">
//                   <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="9876543210"
//                     className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div className="space-y-1">
//                   <label className="text-xs font-black uppercase text-slate-700">Password *</label>
//                   <input
//                     type="password"
//                     name="password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Password123"
//                     className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
//                   />
//                 </div>
//                 <div className="space-y-1">
//                   <label className="text-xs font-black uppercase text-slate-700">Gender *</label>
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                     className="w-full px-3 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
//                   >
//                     <option value="female">Female</option>
//                     <option value="male">Male</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full bg-[#046A38] hover:bg-[#03542c] disabled:bg-slate-400 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
//               >
//                 {submitting ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <>
//                     <ShieldCheck className="w-4 h-4" />
//                     <span>Register Account</span>
//                   </>
//                 )}
//               </button>
//             </form>

//             <div className="text-center border-t border-slate-100 pt-4">
//               <p className="text-xs font-semibold text-slate-600">
//                 Already have an Ecoensa account?{" "}
//                 <Link href="/login" className="text-[#FF6B00] font-extrabold hover:underline">
//                   Sign In Here
//                 </Link>
//               </p>
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
import { Mail, Lock, User, Phone, Leaf, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function SignupPage() {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "female",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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
      setSuccessMsg("Account created successfully! Redirecting to shop...");
      setTimeout(() => {
        window.location.href = "/shop";
      }, 1000);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-8 sm:pt-12 pb-20 flex items-center justify-center px-4">
        {/* FLIPKART STYLE 2-COLUMN SPLIT CONTAINER */}
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          
          {/* LEFT COLUMN: THEME BRAND BANNER (5 COLS - 40% WIDTH) */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#046A38] via-[#03542c] to-[#0b2918] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            
            {/* BACKGROUND ORGANIC PATTERN GLOW */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center backdrop-blur-md">
                <Leaf className="w-6 h-6 text-amber-300" />
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

            {/* BOTTOM ORGANIC UNSPLASH IMAGE GRAPHIC */}
            <div className="pt-6 relative z-10">
              <div className="rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-black/20 backdrop-blur-xs">
                <img
                  src="https://images.unsplash.com/photo-1546548970-71785318a17b?q=80&w=800&auto=format&fit=crop"
                  alt="Organic Herbs and Spices"
                  className="w-full h-36 sm:h-44 object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: CLEAN FORM SECTION (7 COLS - 60% WIDTH) */}
          <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-white space-y-6">
            
            <div className="space-y-5">
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

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password123"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 transition-colors"
                    />
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

                {/* TERMS DISCLAIMER */}
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

                {/* FLIPKART STYLE BOLD CTA BUTTON */}
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

            {/* BOTTOM REDIRECT TO LOGIN */}
            <div className="pt-4 border-t border-slate-100 text-center">
              <Link
                href="/login"
                className="w-full bg-slate-50 hover:bg-slate-100 text-[#046A38] font-extrabold text-xs py-3.5 px-4 rounded-xl border border-slate-200 transition-all inline-block shadow-xs"
              >
                Existing User? Log in
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SignupPage;