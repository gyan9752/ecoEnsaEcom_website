import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Sparkles, Users, Award, TrendingUp, ArrowRight, CheckCircle2, DollarSign, Share2, UserPlus, ShieldCheck } from "lucide-react";

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
      <Header />

      {/* TOP PADDING REDUCED TO pt-8 sm:pt-10 TO REMOVE EXTRA BLANK SPACE */}
      <main className="flex-grow pt-8 sm:pt-10 pb-16">
        {/* GLOBAL 1400PX CONTAINER */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-12">
          
          {/* HERO CONTAINER */}
          <div className="bg-gradient-to-br from-[#1E7E34] via-[#046A38] to-slate-900 rounded-[32px] p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF6B00]/20 rounded-full blur-3xl pointer-events-none" />

            <span className="bg-white/10 border border-white/20 text-amber-300 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ecoensa Partner Program</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight max-w-3xl mx-auto leading-tight">
              Join the Ecoensa Community & Earn Money!
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed">
              Ecoensa is proud to offer a robust affiliate partner program for creators, health influencers, and bloggers who share our passion for 100% pure organic spices, dry fruits, and A2 ghee. Earn generous monthly commissions for every order through your link.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#FF6B00] hover:bg-[#e05e00] text-white font-black text-sm px-8 py-3.5 rounded-full shadow-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
              >
                Apply for Affiliate Partnership
              </Link>
              <div className="text-xs text-slate-300 font-semibold">
                Already an affiliate partner? <Link href="/contact" className="text-amber-300 underline font-bold">Log in here</Link>
              </div>
            </div>
          </div>

          {/* 4-STEP HOW IT WORKS PROCESS */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-slate-200/80 space-y-8">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-black uppercase text-[#046A38] bg-emerald-50 border border-emerald-200 px-4 py-1 rounded-full">
                Simple 4-Step Process
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900">
                How Our Affiliate Program Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#046A38] flex items-center justify-center mx-auto">
                  <UserPlus className="w-6 h-6" />
                </div>
                <span className="text-xs font-black text-[#FF6B00] block">STEP 01</span>
                <h4 className="font-extrabold text-slate-900 text-base">Sign Up Free</h4>
                <p className="text-xs text-slate-500 font-medium">Create your affiliate account in less than 2 minutes with instant approval.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative text-center">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF6B00] flex items-center justify-center mx-auto">
                  <Share2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-black text-[#FF6B00] block">STEP 02</span>
                <h4 className="font-extrabold text-slate-900 text-base">Share Your Link</h4>
                <p className="text-xs text-slate-500 font-medium">Share custom referral links & promo codes on Instagram, YouTube, or Blog.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#046A38] flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-black text-[#FF6B00] block">STEP 03</span>
                <h4 className="font-extrabold text-slate-900 text-base">Track Purchases</h4>
                <p className="text-xs text-slate-500 font-medium">Customers get 30-day cookie period to complete orders via your link.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 relative text-center">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF6B00] flex items-center justify-center mx-auto">
                  <DollarSign className="w-6 h-6" />
                </div>
                <span className="text-xs font-black text-[#FF6B00] block">STEP 04</span>
                <h4 className="font-extrabold text-slate-900 text-base">Get Paid Monthly</h4>
                <p className="text-xs text-slate-500 font-medium">Direct UPI or Bank payout credited automatically on the 1st of every month.</p>
              </div>

            </div>
          </div>

          {/* PARTNERSHIP OPPORTUNITIES TAGS */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200/80 text-center space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#046A38]">
              PARTNERSHIP OPPORTUNITIES & CAMPAIGNS
            </h3>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                "Affiliate Marketing",
                "Creator Campaigns",
                "Exclusive Coupon Codes",
                "Product Gifting & PR",
                "Recipe Content Creation",
                "Eco Awareness Drives",
                "Bulk B2B Referrals",
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl hover:border-[#046A38] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* COMMISSION TIERS & BENEFITS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3 text-center shadow-xs">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#046A38] mx-auto flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-black text-lg text-slate-900">15% High Commission</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Earn up to 15% commission on every successful customer purchase generated through your referral code.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3 text-center shadow-xs">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-[#FF6B00] mx-auto flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-black text-lg text-slate-900">30-Day Cookie Window</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Even if a customer returns within 30 days of clicking your link, you still get full credit for the sale.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3 text-center shadow-xs">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#046A38] mx-auto flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-black text-lg text-slate-900">1:1 Partner Manager</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Get personalized banners, promo graphic assets, and dedicated support from our marketing team.</p>
            </div>
          </div>

          {/* AFFILIATE FAQ BOX */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
            <h3 className="text-xl font-serif font-black text-amber-300">
              Affiliate Program FAQs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm font-medium">
              <div className="space-y-1">
                <span className="font-extrabold text-white block">Q: Is there any registration fee to join?</span>
                <p className="text-slate-300">No, the Ecoensa Affiliate Partner Program is 100% free to join.</p>
              </div>

              <div className="space-y-1">
                <span className="font-extrabold text-white block">Q: What is the minimum payout threshold?</span>
                <p className="text-slate-300">The minimum payout threshold is ₹1,000. Earnings are transferred via UPI or Bank transfer.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}