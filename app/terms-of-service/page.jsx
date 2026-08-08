import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, ShieldCheck, Scale, AlertCircle, RefreshCw, Landmark } from "lucide-react";

export default function TermsOfServicePage() {
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
              User Agreement & Terms
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
              Terms of Service
            </h1>
            <div className="w-16 h-1 bg-[#FF6B00] rounded-full mx-auto" />
          </div>

          {/* QUICK SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <FileText className="w-6 h-6 text-[#046A38] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">Binding User Agreement</h4>
              <p className="text-xs text-slate-500 font-medium">By accessing Ecoensa, you agree to comply with our store policies.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#FF6B00] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">FSSAI Organic Compliance</h4>
              <p className="text-xs text-slate-500 font-medium">All food products comply with strict Indian food safety regulations.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2 shadow-xs">
              <Landmark className="w-6 h-6 text-[#046A38] mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">Jurisdiction of India</h4>
              <p className="text-xs text-slate-500 font-medium">Governed by laws of India & Delhi NCR judicial jurisdiction.</p>
            </div>
          </div>

          {/* TERMS CONTENT (FULL 1400PX CARD) */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-slate-200/80 space-y-8 text-slate-700 text-sm sm:text-base font-medium leading-relaxed w-full">
            
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#046A38]" />
                <span>OVERVIEW & ACCEPTANCE OF TERMS</span>
              </h3>
              <p>
                This website is operated by <strong>Ecoensa Private Limited</strong>. Throughout the site, the terms &quot;we&quot;, &quot;us&quot; and &quot;our&quot; refer to Ecoensa. Ecoensa offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />
                <span>SECTION 1 - ONLINE STORE TERMS & ELIGIBILITY</span>
              </h3>
              <p>
                By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our organic food products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright and trademark laws).
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-[#046A38]" />
                <span>SECTION 2 - PRODUCTS, ACCURACY & PRICING</span>
              </h3>
              <p>
                Prices for our products are subject to change without prior notice. We reserve the right at any time to modify or discontinue any product without notice. We have made every effort to display as accurately as possible the colors and images of our products that appear at the store.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-[#FF6B00]" />
                <span>SECTION 3 - ACCURACY OF BILLING & ACCOUNT INFORMATION</span>
              </h3>
              <p>
                We reserve the right to refuse any order you place with us. You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <Scale className="w-5 h-5 text-[#046A38]" />
                <span>SECTION 4 - GOVERNING LAW & JURISDICTION</span>
              </h3>
              <p>
                These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India. Any legal dispute or claim arising out of your purchase shall be subject to the exclusive jurisdiction of the courts in Delhi NCR / Gautam Buddha Nagar, Uttar Pradesh.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#FF6B00]" />
                <span>SECTION 5 - CONTACT INFORMATION</span>
              </h3>
              <p>
                Questions about the Terms of Service should be sent to us at <a href="mailto:info@ecoensa.com" className="text-[#FF6B00] underline font-bold">info@ecoensa.com</a> or via phone at <strong>+91-9871500373</strong>.
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}