

// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, Truck } from "lucide-react";
// import { useCart } from "../context/CartContext";

// const formatCurrency = (val) => {
//   if (val === null || val === undefined) return "0";
//   const num = Number(val);
//   if (isNaN(num)) return "0";
//   return num.toLocaleString("en-IN");
// };

// export default function CartPage() {
//   const { cartItems = [], loading, updateQuantity, removeFromCart, getCartTotal } = useCart();
//   const [coupon, setCoupon] = useState("");
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [couponApplied, setCouponApplied] = useState(false);

//   const handleApplyCoupon = (e) => {
//     e.preventDefault();
//     if (coupon.trim().toUpperCase() === "ECO10") {
//       setDiscountAmount(500);
//       setCouponApplied(true);
//     } else {
//       alert("Invalid coupon code! Try using 'ECO10' for ₹500 OFF.");
//     }
//   };

//   const subtotal = Number(getCartTotal()) || 0;
//   const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
//   const grandTotal = Math.max(0, subtotal + shipping - discountAmount);

//   const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
//       <Header />

//       <main className="flex-grow pt-8 sm:pt-10 pb-20">
//         <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-8">
          
//           {/* HEADING */}
//           <div className="border-b border-slate-200 pb-3 flex flex-wrap items-center justify-between gap-4">
//             <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
//               Shopping Cart ({safeCartItems.length})
//             </h1>
//             <Link
//               href="/shop"
//               className="text-xs sm:text-sm font-extrabold text-[#FF6B00] hover:underline flex items-center space-x-1"
//             >
//               <span>← Continue Shopping</span>
//             </Link>
//           </div>

//           {loading ? (
//             <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-slate-200 shadow-xs max-w-2xl mx-auto">
//               <div className="w-12 h-12 border-4 border-[#046A38] border-t-transparent rounded-full animate-spin mx-auto" />
//               <p className="text-sm font-extrabold text-slate-700">Fetching your cart from server...</p>
//             </div>
//           ) : safeCartItems.length === 0 ? (
//             <div className="py-20 text-center space-y-6 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
//               <div className="w-20 h-20 bg-emerald-100 text-[#046A38] rounded-full flex items-center justify-center mx-auto">
//                 <ShoppingBag className="w-10 h-10" />
//               </div>
//               <div className="space-y-2">
//                 <h2 className="text-xl font-serif font-black text-slate-900">Your Cart is Currently Empty</h2>
//                 <p className="text-sm text-slate-600 font-medium">Explore our pure organic spices, dry fruits, and ghee range!</p>
//               </div>
//               <Link
//                 href="/shop"
//                 className="bg-black hover:bg-slate-800 text-white font-extrabold text-sm px-8 py-3.5 rounded-full inline-block transition-all shadow-md"
//               >
//                 Explore Shop Now
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
//               {/* LEFT COLUMN: SHOPPING CART ITEMS LIST */}
//               <div className="lg:col-span-8 space-y-4">
//                 <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
                  
//                   {safeCartItems.map((item) => {
//                     const itemKey = item?.itemId || item?.id || item?.productId;
//                     const itemPrice = Number(item?.price) || 0;
//                     const itemMrp = Number(item?.mrp) || 0;
//                     const itemQty = Number(item?.quantity) || 1;
//                     const itemTotal = itemPrice * itemQty;

//                     return (
//                       <div
//                         key={itemKey}
//                         className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100 last:border-0 last:pb-0"
//                       >
//                         {/* CLICKABLE ITEM IMAGE & TITLE */}
//                         <div className="flex items-center space-x-4 w-full sm:w-auto">
//                           <Link href={`/products/${item?.slug || item?.id}`} className="shrink-0 group">
//                             <img
//                               src={item?.image}
//                               alt={item?.name || "Product image"}
//                               className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border border-slate-200 bg-slate-50 group-hover:scale-105 transition-transform duration-300"
//                             />
//                           </Link>

//                           <div className="space-y-1">
//                             <span className="text-[10px] font-black text-[#046A38] uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
//                               {item?.weight || "250g"} Pack
//                             </span>

//                             <Link href={`/products/${item?.slug || item?.id}`}>
//                               <h3 className="text-sm sm:text-base font-extrabold text-slate-900 hover:text-[#FF6B00] transition-colors line-clamp-1">
//                                 {item?.name || "Organic Product"}
//                               </h3>
//                             </Link>

//                             <div className="flex items-baseline space-x-2 text-xs">
//                               <span className="font-serif font-black text-slate-900 text-sm">
//                                 ₹{formatCurrency(itemPrice)}
//                               </span>
//                               {itemMrp > itemPrice && (
//                                 <span className="text-slate-400 line-through">
//                                   ₹{formatCurrency(itemMrp)}
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         </div>

//                         {/* QUANTITY & ACTIONS */}
//                         <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto pt-2 sm:pt-0">
//                           {/* QUANTITY COUNTER */}
//                           <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
//                             <button
//                               onClick={() => updateQuantity(itemKey, -1)}
//                               className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer shadow-xs"
//                             >
//                               <Minus className="w-3.5 h-3.5" />
//                             </button>
//                             <span className="w-8 text-center text-xs font-black text-slate-900">
//                               {itemQty}
//                             </span>
//                             <button
//                               onClick={() => updateQuantity(itemKey, 1)}
//                               className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer shadow-xs"
//                             >
//                               <Plus className="w-3.5 h-3.5" />
//                             </button>
//                           </div>

//                           {/* SUBTOTAL */}
//                           <span className="font-serif font-black text-slate-900 text-base sm:text-lg min-w-[90px] text-right">
//                             ₹{formatCurrency(itemTotal)}
//                           </span>

//                           {/* DEFAULT RED DELETE BUTTON */}
//                           <button
//                             onClick={() => removeFromCart(itemKey)}
//                             className="text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2.5 rounded-xl border border-red-200/80 transition-all cursor-pointer shadow-xs"
//                             title="Remove Item"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   })}

//                 </div>

//                 {/* COUPON CODE BOX */}
//                 <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
//                   <div className="flex items-center space-x-2">
//                     <Tag className="w-5 h-5 text-[#FF6B00]" />
//                     <span className="text-xs font-black text-slate-800 uppercase">Have a Promo Coupon?</span>
//                   </div>

//                   <form onSubmit={handleApplyCoupon} className="flex space-x-2 w-full sm:w-auto">
//                     <input
//                       type="text"
//                       placeholder="Enter 'ECO10'"
//                       value={coupon}
//                       onChange={(e) => setCoupon(e.target.value)}
//                       className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold uppercase outline-none focus:border-[#046A38] bg-slate-50"
//                     />
//                     <button
//                       type="submit"
//                       className="bg-slate-900 hover:bg-black text-white text-xs font-extrabold px-5 py-2 rounded-xl cursor-pointer transition-colors"
//                     >
//                       Apply
//                     </button>
//                   </form>
//                 </div>
//               </div>

//               {/* RIGHT COLUMN: ORDER SUMMARY CARD */}
//               <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg space-y-6 sticky top-24">
//                 <h3 className="text-lg font-serif font-black text-slate-900 border-b border-slate-200 pb-3">
//                   Order Summary
//                 </h3>

//                 <div className="space-y-3 text-xs sm:text-sm font-semibold text-slate-700">
//                   <div className="flex justify-between">
//                     <span>Bag Subtotal:</span>
//                     <span className="font-bold text-slate-900">₹{formatCurrency(subtotal)}</span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span>Shipping Charges:</span>
//                     <span className="font-bold text-emerald-600">
//                       {shipping === 0 ? "FREE" : `₹${formatCurrency(shipping)}`}
//                     </span>
//                   </div>

//                   {couponApplied && (
//                     <div className="flex justify-between text-emerald-600 font-bold">
//                       <span>Promo Discount:</span>
//                       <span>-₹{formatCurrency(discountAmount)}</span>
//                     </div>
//                   )}

//                   <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
//                     <span className="text-base font-black text-slate-900">Total Payable:</span>
//                     <span className="text-2xl font-serif font-black text-[#046A38]">
//                       ₹{formatCurrency(grandTotal)}
//                     </span>
//                   </div>
//                 </div>

//                 {/* SOLID BLACK PROCEED TO CHECKOUT BUTTON */}
//                 <Link
//                   href="/checkout"
//                   className="w-full bg-black hover:bg-slate-800 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer block text-center"
//                 >
//                   <span>Proceed to Checkout</span>
//                   <ArrowRight className="w-4 h-4" />
//                 </Link>

//                 {/* TRUST BADGES */}
//                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-center text-xs font-semibold text-slate-600">
//                   <div className="flex items-center justify-center space-x-1.5 text-[#046A38] font-bold">
//                     <ShieldCheck className="w-4 h-4" />
//                     <span>256-Bit SSL Encrypted Checkout</span>
//                   </div>
//                   <div className="flex items-center justify-center space-x-1.5 text-slate-500">
//                     <Truck className="w-4 h-4" />
//                     <span>Free Shipping on Orders &gt; ₹999</span>
//                   </div>
//                 </div>

//               </div>

//             </div>
//           )}

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
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, Truck, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const formatCurrency = (val) => {
  if (val === null || val === undefined) return "0";
  const num = Number(val);
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-IN");
};

export default function CartPage() {
  const { cartItems = [], loading, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  /* CUSTOM POPUP MODAL STATE */
  const [couponModal, setCouponModal] = useState({ open: false, type: "", message: "" });

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!coupon.trim()) {
      setCouponModal({
        open: true,
        type: "error",
        message: "Please enter a coupon code before applying!",
      });
      return;
    }

    if (coupon.trim().toUpperCase() === "ECO10") {
      setDiscountAmount(500);
      setCouponApplied(true);
      setCouponModal({
        open: true,
        type: "success",
        message: "Coupon 'ECO10' applied successfully! You got ₹500 OFF.",
      });
    } else {
      setCouponModal({
        open: true,
        type: "error",
        message: "Invalid coupon code! Try using 'ECO10' for ₹500 OFF.",
      });
    }
  };

  const subtotal = Number(getCartTotal()) || 0;
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal + shipping - discountAmount);

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between relative">
      <Header />

      <main className="flex-grow pt-8 sm:pt-10 pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-8">
          
          {/* HEADING */}
          <div className="border-b border-slate-200 pb-3 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
              Shopping Cart ({safeCartItems.length})
            </h1>
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-extrabold text-[#FF6B00] hover:underline flex items-center space-x-1"
            >
              <span>← Continue Shopping</span>
            </Link>
          </div>

          {loading ? (
            <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-slate-200 shadow-xs max-w-2xl mx-auto">
              <div className="w-12 h-12 border-4 border-[#046A38] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-extrabold text-slate-700">Fetching your cart from server...</p>
            </div>
          ) : safeCartItems.length === 0 ? (
            <div className="py-20 text-center space-y-6 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-emerald-100 text-[#046A38] rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-serif font-black text-slate-900">Your Cart is Currently Empty</h2>
                <p className="text-sm text-slate-600 font-medium">Explore our pure organic spices, dry fruits, and ghee range!</p>
              </div>
              <Link
                href="/shop"
                className="bg-black hover:bg-slate-800 text-white font-extrabold text-sm px-8 py-3.5 rounded-full inline-block transition-all shadow-md"
              >
                Explore Shop Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* LEFT COLUMN: SHOPPING CART ITEMS LIST */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
                  
                  {safeCartItems.map((item) => {
                    const itemKey = item?.itemId || item?.id || item?.productId;
                    const itemPrice = Number(item?.price) || 0;
                    const itemMrp = Number(item?.mrp) || 0;
                    const itemQty = Number(item?.quantity) || 1;
                    const itemTotal = itemPrice * itemQty;

                    return (
                      <div
                        key={itemKey}
                        className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100 last:border-0 last:pb-0"
                      >
                        {/* CLICKABLE ITEM IMAGE & TITLE */}
                        <div className="flex items-center space-x-4 w-full sm:w-auto">
                          <Link href={`/products/${item?.slug || item?.id}`} className="shrink-0 group">
                            <img
                              src={item?.image}
                              alt={item?.name || "Product image"}
                              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border border-slate-200 bg-slate-50 group-hover:scale-105 transition-transform duration-300"
                            />
                          </Link>

                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-[#046A38] uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {item?.weight || "250g"} Pack
                            </span>

                            <Link href={`/products/${item?.slug || item?.id}`}>
                              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 hover:text-[#FF6B00] transition-colors line-clamp-1">
                                {item?.name || "Organic Product"}
                              </h3>
                            </Link>

                            <div className="flex items-baseline space-x-2 text-xs">
                              <span className="font-black text-slate-900 text-sm">
                                ₹{formatCurrency(itemPrice)}
                              </span>
                              {itemMrp > itemPrice && (
                                <span className="text-slate-400 line-through">
                                  ₹{formatCurrency(itemMrp)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* QUANTITY & ACTIONS */}
                        <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto pt-2 sm:pt-0">
                          {/* QUANTITY COUNTER */}
                          <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                            <button
                              onClick={() => updateQuantity(itemKey, -1)}
                              className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer shadow-xs"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-black text-slate-900">
                              {itemQty}
                            </span>
                            <button
                              onClick={() => updateQuantity(itemKey, 1)}
                              className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer shadow-xs"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* SUBTOTAL */}
                          <span className=" font-black text-slate-900 text-base sm:text-lg min-w-[90px] text-right">
                            ₹{formatCurrency(itemTotal)}
                          </span>

                          {/* DEFAULT RED DELETE BUTTON */}
                          <button
                            onClick={() => removeFromCart(itemKey)}
                            className="text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2.5 rounded-xl border border-red-200/80 transition-all cursor-pointer shadow-xs"
                            title="Remove Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                </div>

                {/* COUPON CODE BOX */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-5 h-5 text-[#FF6B00]" />
                    <span className="text-xs font-black text-slate-800 uppercase">Have a Promo Coupon?</span>
                  </div>

                  <form onSubmit={handleApplyCoupon} className="flex space-x-2 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Enter 'ECO10'"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold uppercase outline-none focus:border-[#046A38] bg-slate-50"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-black text-white text-xs font-extrabold px-5 py-2 rounded-xl cursor-pointer transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                </div>
              </div>

              {/* RIGHT COLUMN: ORDER SUMMARY CARD */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg space-y-6 sticky top-24">
                <h3 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-3">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs sm:text-sm font-semibold text-slate-700">
                  <div className="flex justify-between">
                    <span>Bag Subtotal:</span>
                    <span className="font-bold text-slate-900">₹{formatCurrency(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping Charges:</span>
                    <span className="font-bold text-emerald-600">
                      {shipping === 0 ? "FREE" : `₹${formatCurrency(shipping)}`}
                    </span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Promo Discount:</span>
                      <span>-₹{formatCurrency(discountAmount)}</span>
                    </div>
                  )}

                  <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                    <span className="text-base font-black text-slate-900">Total Payable:</span>
                    <span className="text-2xl  font-black text-[#046A38]">
                      ₹{formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* SOLID BLACK PROCEED TO CHECKOUT BUTTON */}
                <Link
                  href="/checkout"
                  className="w-full bg-black hover:bg-slate-800 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer block text-center"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* TRUST BADGES */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-center text-xs font-semibold text-slate-600">
                  <div className="flex items-center justify-center space-x-1.5 text-[#046A38] font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>256-Bit SSL Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1.5 text-slate-500">
                    <Truck className="w-4 h-4" />
                    <span>Free Shipping on Orders &gt; ₹999</span>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </main>

      {/* CUSTOM POPUP MODAL DIALOG */}
      {couponModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 shadow-2xl border border-slate-200 relative">
            
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setCouponModal({ open: false, type: "", message: "" })}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ICON */}
            <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center ${
              couponModal.type === "success" ? "bg-emerald-100 text-[#046A38]" : "bg-rose-100 text-rose-600"
            }`}>
              {couponModal.type === "success" ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <AlertCircle className="w-8 h-8" />
              )}
            </div>

            {/* MESSAGE CONTENT */}
            <div className="space-y-1.5">
              <h3 className="text-xl font-serif font-black text-slate-900">
                {couponModal.type === "success" ? "Coupon Applied!" : "Invalid Coupon"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {couponModal.message}
              </p>
            </div>

            {/* OK BUTTON */}
            <button
              onClick={() => setCouponModal({ open: false, type: "", message: "" })}
              className={`w-full font-extrabold text-xs py-3.5 rounded-xl text-white shadow-md cursor-pointer transition-colors ${
                couponModal.type === "success" ? "bg-[#046A38] hover:bg-[#03522b]" : "bg-slate-900 hover:bg-black"
              }`}
            >
              OK, Got It
            </button>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}