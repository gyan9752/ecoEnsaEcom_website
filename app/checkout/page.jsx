/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Lock, Truck, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderItems, setPlacedOrderItems] = useState([]);
  const [placedOrderTotal, setPlacedOrderTotal] = useState(0);

  const subtotal = getCartTotal();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty! Add products before checking out.");
      return;
    }

    setPlacedOrderItems([...cartItems]);
    setPlacedOrderTotal(grandTotal);
    setOrderPlaced(true);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-8 sm:pt-10 pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-8">
          
          {/* HEADING (SMALLER SIZE & SOLID BLACK) */}
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
              Express Checkout
            </h1>
            <Link href="/cart" className="text-xs sm:text-sm font-extrabold text-[#FF6B00] hover:underline flex items-center space-x-1">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Cart</span>
            </Link>
          </div>

          {orderPlaced ? (
            /* SUCCESS ORDER CONFIRMATION SCREEN */
            <div className="py-16 text-center space-y-6 bg-white rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto p-8">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#046A38] mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-amber-500 tracking-widest">Order Confirmed!</span>
                <h2 className="text-2xl font-serif font-black text-slate-900">Thank You for Your Order</h2>
                <p className="text-sm text-slate-600 font-medium max-w-md mx-auto">
                  Your order <strong>#ECO-89241</strong> has been placed successfully for a total of{" "}
                  <strong className="text-[#046A38]">₹{placedOrderTotal.toLocaleString("en-IN")}</strong>.
                </p>
              </div>

              {/* ORDER ITEMS RECAP */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-left max-w-md mx-auto">
                <span className="text-xs font-black uppercase text-slate-700 block border-b border-slate-200 pb-1">
                  Ordered Items ({placedOrderItems.length})
                </span>
                {placedOrderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="line-clamp-1">{item.name} (x{item.quantity})</span>
                    <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/shop"
                className="bg-black hover:bg-slate-800 text-white font-extrabold text-sm px-8 py-4 rounded-full inline-block transition-all shadow-md"
              >
                Continue Shopping
              </Link>
            </div>
          ) : cartItems.length === 0 ? (
            /* EMPTY CART CHECKOUT WARNING */
            <div className="py-20 text-center space-y-6 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto p-8">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-serif font-black text-slate-900">Your Cart is Empty</h2>
                <p className="text-sm text-slate-600 font-medium">Please add products to your cart before proceeding to checkout.</p>
              </div>
              <Link
                href="/shop"
                className="bg-black hover:bg-slate-800 text-white font-extrabold text-sm px-8 py-3.5 rounded-full inline-block transition-all shadow-md"
              >
                Browse Organic Shop
              </Link>
            </div>
          ) : (
            /* MAIN CHECKOUT FORM & DYNAMIC SUMMARY GRID */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* LEFT COLUMN: SHIPPING & PAYMENT FORM (7 COLS) */}
              <div className="lg:col-span-7 space-y-6">
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  
                  {/* 1. CONTACT INFO */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-4">
                    <h3 className="text-base font-serif font-black text-slate-900 border-b border-slate-100 pb-3">
                      1. Contact Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black uppercase text-slate-700">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black uppercase text-slate-700">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 9871500373"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. SHIPPING ADDRESS */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-4">
                    <h3 className="text-base font-serif font-black text-slate-900 border-b border-slate-100 pb-3">
                      2. Shipping Address
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-black uppercase text-slate-700">First Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Dr. Archana"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black uppercase text-slate-700">Last Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Naithani"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-black uppercase text-slate-700">Flat, House No., Building *</label>
                        <input
                          type="text"
                          required
                          placeholder="JG_III, 228-B, Vikas Puri"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-black uppercase text-slate-700">City *</label>
                          <input
                            type="text"
                            required
                            placeholder="New Delhi"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black uppercase text-slate-700">State *</label>
                          <input
                            type="text"
                            required
                            placeholder="Delhi"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black uppercase text-slate-700">Pincode *</label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            placeholder="110018"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. PAYMENT METHOD */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-4">
                    <h3 className="text-base font-serif font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                      <span>3. Payment Options</span>
                      <Lock className="w-4 h-4 text-[#046A38]" />
                    </h3>

                    <div className="space-y-3">
                      {[
                        { id: "upi", name: "UPI / QR Code (Google Pay, PhonePe, Paytm)", desc: "Instant discount & 0% processing fee" },
                        { id: "card", name: "Credit / Debit Card (Visa, MasterCard, Amex)", desc: "Secure PCI-DSS Razorpay gateway" },
                        { id: "cod", name: "Cash on Delivery (COD)", desc: "Pay cash upon package delivery" },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={`p-4 rounded-2xl border-2 flex items-start space-x-3 cursor-pointer transition-all ${
                            paymentMethod === method.id
                              ? "border-[#046A38] bg-emerald-50/50"
                              : "border-slate-200 bg-slate-50 hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === method.id}
                            onChange={() => setPaymentMethod(method.id)}
                            className="accent-[#046A38] mt-1"
                          />
                          <div>
                            <span className="font-extrabold text-sm text-slate-900 block">{method.name}</span>
                            <span className="text-xs text-slate-500 font-medium">{method.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* SOLID BLACK PLACE ORDER BUTTON */}
                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-slate-800 text-white font-extrabold text-base py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>PLACE ORDER NOW (₹{grandTotal.toLocaleString("en-IN")})</span>
                  </button>

                </form>
              </div>

              {/* RIGHT COLUMN: DYNAMIC MINI ORDER PREVIEW (5 COLS) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg space-y-6 sticky top-24">
                <h3 className="text-lg font-serif font-black text-slate-900 border-b border-slate-200 pb-3">
                  Your Order ({cartItems.length} Items)
                </h3>

                {/* DYNAMIC CART ITEMS LIST */}
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs font-bold border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                        />
                        <div>
                          <span className="text-slate-900 block line-clamp-1 font-extrabold">{item.name}</span>
                          <span className="text-slate-400 font-semibold">Qty: {item.quantity} ({item.weight || "250g"})</span>
                        </div>
                      </div>
                      <span className="font-serif font-black text-slate-900 shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* COST BREAKDOWN */}
                <div className="border-t border-slate-200 pt-4 space-y-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold text-slate-900">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Express Shipping:</span>
                    <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>

                  <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                    <span className="text-base font-black text-slate-900">Total Payable:</span>
                    <span className="text-2xl font-serif font-black text-[#046A38]">
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* SECURITY BADGES */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1 text-xs font-semibold text-slate-600">
                  <div className="flex items-center justify-center space-x-1.5 text-[#046A38] font-bold">
                    <Truck className="w-4 h-4" />
                    <span>Free Shipping Across India</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Delivered within 1–4 business days via BlueDart & DTDC.</p>
                </div>

              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}