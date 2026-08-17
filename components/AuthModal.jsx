"use client";

import React, { useState } from "react";
import { X, Mail, Lock, User, Phone, Leaf, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function AuthModal({ isOpen, onClose }) {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Login Form State
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // Signup Form State
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "female",
  });

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const res = await login(loginData.email, loginData.password);
    setSubmitting(false);

    if (res.success) {
      setSuccessMsg("Logged in successfully! Redirecting...");
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const res = await signup(signupData);
    setSubmitting(false);

    if (res.success) {
      setSuccessMsg("Account created successfully! Welcome to Ecoensa.");
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden font-sans">
        
        {/* TOP GREEN THEME HEADER */}
        <div className="bg-gradient-to-r from-[#046A38] to-[#07562e] text-white p-6 sm:p-8 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-md shadow-inner">
            <Leaf className="w-7 h-7 text-amber-300 animate-bounce" />
          </div>

          <h2 className="text-2xl font-serif font-black tracking-tight">
            {isLogin ? "Welcome Back!" : "Join Ecoensa Family"}
          </h2>
          <p className="text-xs text-emerald-100 font-medium mt-1">
            {isLogin ? "Sign in to access your cart & orders" : "Create an account for organic eco-shopping"}
          </p>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => { setIsLogin(true); setErrorMsg(""); setSuccessMsg(""); }}
            className={`flex-1 py-3.5 text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              isLogin ? "border-[#046A38] text-[#046A38] bg-white" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsLogin(false); setErrorMsg(""); setSuccessMsg(""); }}
            className={`flex-1 py-3.5 text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              !isLogin ? "border-[#046A38] text-[#046A38] bg-white" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Register Account
          </button>
        </div>

        {/* FORM BODY */}
        <div className="p-6 sm:p-8 space-y-4">
          
          {errorMsg && (
            <div className="bg-red-50 text-red-700 text-xs font-extrabold p-3.5 rounded-xl border border-red-200 text-center">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 text-[#046A38] text-xs font-extrabold p-3.5 rounded-xl border border-emerald-200 text-center">
              {successMsg}
            </div>
          )}

          {isLogin ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#046A38] hover:bg-[#03542c] disabled:bg-slate-400 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* SIGNUP FORM */
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase text-slate-700">Email</label>
                  <input
                    type="email"
                    required
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase text-slate-700">Phone</label>
                  <input
                    type="tel"
                    required
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase text-slate-700">Password</label>
                  <input
                    type="password"
                    required
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    placeholder="Password123"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase text-slate-700">Gender</label>
                  <select
                    value={signupData.gender}
                    onChange={(e) => setSignupData({ ...signupData, gender: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#046A38] hover:bg-[#03542c] disabled:bg-slate-400 text-white font-extrabold text-sm py-3 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}