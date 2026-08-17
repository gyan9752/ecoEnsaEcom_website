/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Lock, KeyRound, Leaf, ArrowRight, ShieldCheck, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://moteligo.in/ecoback";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  
  const [step, setStep] = useState(1); // Step 1: Send OTP | Step 2: Reset Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [sendingOtp, setSendingOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  /* Step 1: Send OTP to Email (POST /api/users/forgot-password) */
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSendingOtp(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`${API_BASE}/api/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();

      setSendingOtp(false);
      if (json?.status) {
        setSuccessMsg(json?.message || `OTP sent successfully to ${email}. Please check your inbox!`);
        setStep(2);
      } else {
        setErrorMsg(json?.message || "Failed to send OTP to email. Please check your email address.");
      }
    } catch (err) {
      console.warn("Forgot password OTP fetch error:", err);
      setSendingOtp(false);
      setErrorMsg("Network error. Please try again.");
    }
  };

  /* Step 2: Submit OTP & New Password (POST /api/users/reset-password) */
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const res = await resetPassword(email, otp, newPassword);
    setSubmitting(false);

    if (res.success) {
      setSuccessMsg("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-10 pb-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden">
          
          {/* HEADER BRAND BANNER */}
          <div className="bg-gradient-to-r from-[#046A38] via-[#057a41] to-[#046A38] text-white p-8 text-center relative">
            <div className="w-16 h-16 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-md shadow-inner">
              <KeyRound className="w-8 h-8 text-amber-300 animate-pulse" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight">
              Reset Password
            </h1>
            <p className="text-xs text-emerald-100 font-medium mt-1">
              {step === 1 ? "Step 1: Enter email to receive OTP" : "Step 2: Enter OTP & set new password"}
            </p>
          </div>

          {/* FORM BODY */}
          <div className="p-6 sm:p-8 space-y-6">
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

            {step === 1 ? (
              /* STEP 1: EMAIL ONLY FORM WITH "SEND OTP" BUTTON */
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-slate-700">Registered Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sendingOtp}
                  className="w-full bg-[#046A38] hover:bg-[#03542c] disabled:bg-slate-400 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
                >
                  {sendingOtp ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send OTP to Email</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* STEP 2: OTP & NEW PASSWORD FORM */
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black uppercase text-slate-700">Email Address</label>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-[#FF6B00] font-extrabold hover:underline"
                    >
                      Change Email
                    </button>
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      readOnly
                      value={email}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs font-bold bg-slate-100 text-slate-600 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-slate-700">6-Digit OTP Code *</label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 uppercase tracking-widest font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-slate-700">New Password *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="NewPassword123"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#046A38] hover:bg-[#03542c] disabled:bg-slate-400 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Reset Password Now</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="text-center border-t border-slate-100 pt-4 space-y-1">
              <p className="text-xs font-semibold text-slate-600">
                Remember your password?{" "}
                <Link href="/login" className="text-[#FF6B00] font-extrabold hover:underline">
                  Back to Sign In
                </Link>
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}