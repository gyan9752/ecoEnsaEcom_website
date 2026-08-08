import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, Eye, Server, Cookie, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
      <Header />

      {/* TOP PADDING REDUCED TO pt-8 sm:pt-10 TO REMOVE EXTRA BLANK SPACE */}
      <main className="flex-grow pt-8 sm:pt-10 pb-16">
        {/* GLOBAL 1400PX FULL-WIDTH CONTAINER */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-8">
          
          {/* HEADER (SMALLER SIZE & SOLID BLACK) */}
          <div className="text-center space-y-3">
            <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 inline-block">
              Data Protection & SSL Security
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <div className="w-16 h-1 bg-[#FF6B00] rounded-full mx-auto" />
          </div>

          {/* QUICK SECURITY SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <Lock className="w-6 h-6 text-[#046A38] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">256-Bit SSL Encrypted</h4>
              <p className="text-xs text-slate-500 font-medium">Your personal details and transactions are 100% encrypted.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <Eye className="w-6 h-6 text-[#FF6B00] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">Zero Data Selling</h4>
              <p className="text-xs text-slate-500 font-medium">We never sell or rent your mobile number or email address.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#046A38] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">PCI-DSS Compliant</h4>
              <p className="text-xs text-slate-500 font-medium">Payment details processed safely via RBI-approved Razorpay gateway.</p>
            </div>
          </div>

          {/* PRIVACY CONTENT (FULL 1400PX CARD) */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-slate-200/80 space-y-8 text-slate-700 text-sm sm:text-base font-medium leading-relaxed w-full">
            
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <Server className="w-5 h-5 text-[#046A38]" />
                <span>SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?</span>
              </h3>
              <p>
                When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, delivery address, phone number, and email address. When you browse our store, we also automatically receive your computer&apos;s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />
                <span>SECTION 2 - CONSENT & WITHDRAWAL</span>
              </h3>
              <p>
                <strong>How do you get my consent?</strong> When you provide us with personal information to complete a transaction, verify your payment card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.
              </p>
              <p>
                <strong>How do I withdraw my consent?</strong> If after you opt-in, you change your mind, you may withdraw your consent for us to contact you by emailing us at <a href="mailto:info@ecoensa.com" className="text-[#FF6B00] underline font-bold">info@ecoensa.com</a> or writing to us at Ecoensa Private Limited, Noida, Uttar Pradesh, India.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <Lock className="w-5 h-5 text-[#046A38]" />
                <span>SECTION 3 - DISCLOSURE</span>
              </h3>
              <p>
                We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <Server className="w-5 h-5 text-[#FF6B00]" />
                <span>SECTION 4 - SECURE PAYMENT & DATA STORAGE</span>
              </h3>
              <p>
                Our store is hosted on secure cloud infrastructure with 256-bit SSL encryption. Your purchase transaction data is stored only as long as is necessary to complete your purchase transaction. All direct payment gateways adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council (Visa, MasterCard, Razorpay, UPI).
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-base sm:text-lg font-serif font-black text-slate-[#046A38] uppercase tracking-wider flex items-center space-x-2">
                <Cookie className="w-5 h-5 text-[#046A38]" />
                <span>SECTION 5 - THIRD-PARTY SERVICES & COOKIES</span>
              </h3>
              <p>
                In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us (e.g. payment processors and courier providers). We use cookies to store session details and keep track of your shopping cart.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#FF6B00]" />
                <span>QUESTIONS AND CONTACT INFORMATION</span>
              </h3>
              <p>
                If you would like to access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information, contact our Privacy Officer at <a href="mailto:info@ecoensa.com" className="text-[#FF6B00] underline font-bold">info@ecoensa.com</a>.
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}