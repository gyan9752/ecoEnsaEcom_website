import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Truck, Globe, Clock, PackageCheck, MapPin, ShieldCheck, Box } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
      <Header />

      {/* TOP PADDING REDUCED TO pt-8 sm:pt-10 TO REMOVE EXTRA BLANK SPACE */}
      <main className="flex-grow pt-8 sm:pt-10 pb-16">
        {/* GLOBAL 1400PX FULL-WIDTH CONTAINER */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-10">
          
          {/* HEADER (SMALLER SIZE & SOLID BLACK) */}
          <div className="text-center space-y-3">
            <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 inline-block">
              Fast, Safe & Eco-Friendly Delivery
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
              Shipping & Delivery Policy
            </h1>
            <div className="w-16 h-1 bg-[#FF6B00] rounded-full mx-auto" />
          </div>

          {/* QUICK DELIVERY HIGHLIGHT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <Truck className="w-6 h-6 text-[#046A38] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">Free Shipping &gt; ₹999</h4>
              <p className="text-xs text-slate-500 font-medium">Complimentary express shipping across all India pincodes.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <Clock className="w-6 h-6 text-[#FF6B00] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">24-Hour Dispatch</h4>
              <p className="text-xs text-slate-500 font-medium">Fresh organic stock dispatched within 24 business hours.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <PackageCheck className="w-6 h-6 text-[#046A38] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">Real-Time SMS/WhatsApp</h4>
              <p className="text-xs text-slate-500 font-medium">Live tracking links sent immediately upon package handover.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <Box className="w-6 h-6 text-[#FF6B00] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">Zero-Plastic Packing</h4>
              <p className="text-xs text-slate-500 font-medium">Sealed in food-grade, nitrogen-flushed eco-pouches.</p>
            </div>
          </div>

          {/* POLICY CONTENT (FULL 1400PX CARD) */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-slate-200/80 space-y-10 text-slate-700 text-sm sm:text-base font-medium leading-relaxed w-full">
            
            {/* 1. DOMESTIC SHIPPING & RATES */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
                <Truck className="w-6 h-6 text-[#046A38]" />
                <span>1. Domestic Shipping Rates & Free Delivery</span>
              </h3>

              <p>
                We offer <strong className="text-[#046A38] font-extrabold">Free Express Delivery</strong> across India on all orders of <strong className="text-slate-900 font-extrabold">₹999 and above</strong>. For orders under ₹999, a nominal flat express shipping charge of <strong>₹99</strong> applies.
              </p>

              <p>
                We partner with tier-1 air and ground express courier providers (BlueDart, Delhivery, DTDC, ExpressBees) to deliver your pure organic food products with maximum speed and freshness.
              </p>
            </div>

            {/* 2. REGIONAL DELIVERY TIMELINE GRID */}
            <div className="space-y-4 pt-8 border-t border-slate-100">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
                <Clock className="w-6 h-6 text-[#FF6B00]" />
                <span>2. Estimated Delivery SLA by Location</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1.5">
                  <span className="text-xs font-black uppercase text-[#046A38] block">Metro Cities</span>
                  <h5 className="font-extrabold text-slate-900 text-base">1 to 2 Business Days</h5>
                  <p className="text-xs text-slate-500">Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune.</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1.5">
                  <span className="text-xs font-black uppercase text-[#FF6B00] block">Tier 2 & Tier 3 Cities</span>
                  <h5 className="font-extrabold text-slate-900 text-base">2 to 4 Business Days</h5>
                  <p className="text-xs text-slate-500">State capitals, major district headquarters, and urban centers.</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1.5">
                  <span className="text-xs font-black uppercase text-slate-600 block">Remote / Island Pincodes</span>
                  <h5 className="font-extrabold text-slate-900 text-base">4 to 6 Business Days</h5>
                  <p className="text-xs text-slate-500">Hilly regions, North-East states, J&K, and island territories.</p>
                </div>
              </div>

              <div className="bg-orange-50/80 p-5 rounded-2xl border border-orange-200 space-y-1">
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  <strong className="text-[#FF6B00]">Note for Remote Locations:</strong> Weather disruptions or regional courier lockdowns may occasionally add 24-48 hours. You can <Link href="/contact" className="text-[#FF6B00] underline font-bold">contact our support team</Link> for real-time order status.
                </p>
              </div>
            </div>

            {/* 3. ORDER DISPATCH & LIVE TRACKING */}
            <div className="space-y-4 pt-8 border-t border-slate-100">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-[#046A38]" />
                <span>3. Order Dispatch & Real-Time Tracking</span>
              </h3>
              <p>
                As soon as your order is packaged and picked up by our courier team, an automated SMS and WhatsApp notification containing your AWB Tracking Number and direct tracking URL will be sent to your registered mobile number.
              </p>
            </div>

            {/* 4. ECO-FRIENDLY PACKAGING */}
            <div className="space-y-4 pt-8 border-t border-slate-100">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="w-6 h-6 text-[#046A38]" />
                <span>4. Sustainable & Food-Grade Eco Packaging</span>
              </h3>
              <p>
                Ecoensa is committed to zero plastic pollution. Our spices, ghee jars, and dry fruits are sealed in recycled, food-grade glass jars and Nitrogen-flushed pouches to guarantee 100% freshness during transit.
              </p>
            </div>

            {/* 5. INTERNATIONAL SHIPPING */}
            <div className="space-y-4 pt-8 border-t border-slate-100">
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center space-x-2">
                <Globe className="w-6 h-6 text-[#FF6B00]" />
                <span>5. International Bulk & Exports</span>
              </h3>
              <p>
                We export our organic spices and A2 ghee globally (USA, UK, UAE, Australia, Canada). For international shipments and custom clearance queries, please email us directly at <a href="mailto:info@ecoensa.com" className="text-[#FF6B00] underline font-bold">info@ecoensa.com</a> or call <strong>+91-9871500373</strong>.
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}