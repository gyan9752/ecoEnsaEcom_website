// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState, useEffect, useSyncExternalStore } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { CheckCircle2, ShieldCheck, Lock, Truck, ArrowLeft, ShoppingBag, Gift, Check, UserCheck } from "lucide-react";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";

// const API_BASE = "https://moteligo.in/ecoback";

// const emptySubscribe = () => () => {};
// function useHasMounted() {
//   return useSyncExternalStore(
//     emptySubscribe,
//     () => true,
//     () => false
//   );
// }

// /* Token extractor from localStorage */
// const getAuthToken = () => {
//   if (typeof window === "undefined") return null;
//   const extractToken = (raw) => {
//     if (!raw || raw === "null" || raw === "undefined" || raw === "guest_demo_token") return null;
//     try {
//       const parsed = JSON.parse(raw);
//       if (typeof parsed === "string") return parsed;
//       if (parsed?.token) return parsed.token;
//       if (parsed?.authToken) return parsed.authToken;
//       if (parsed?.accessToken) return parsed.accessToken;
//       if (parsed?.data?.token) return parsed.data.token;
//     } catch {
//       // string
//     }
//     return String(raw).trim();
//   };

//   const keys = ["authToken", "token", "accessToken", "adminToken", "userToken", "jwt"];
//   for (const key of keys) {
//     const rawVal = localStorage.getItem(key) || sessionStorage.getItem(key);
//     const t = extractToken(rawVal);
//     if (t) return t;
//   }
//   return null;
// };

// /* Safe currency formatter */
// const formatCurrency = (val) => {
//   if (val === null || val === undefined) return "0";
//   const num = Number(val);
//   if (isNaN(num)) return "0";
//   return num.toLocaleString("en-IN");
// };

// /* Async Razorpay SDK Loader */
// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     if (typeof window === "undefined") return resolve(false);
//     if (window.Razorpay) return resolve(true);

//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// export default function CheckoutPage() {
//   const mounted = useHasMounted();
//   const router = useRouter();
//   const { cartItems = [], getCartTotal, clearCart } = useCart();
//   const { user } = useAuth();

//   const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' or 'razorpay'
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [placedOrderNumber, setPlacedOrderNumber] = useState("");
//   const [placedOrderTotal, setPlacedOrderTotal] = useState(0);

//   // Form State
//   const [formData, setFormData] = useState({
//     email: "",
//     phone: "",
//     firstName: "",
//     lastName: "",
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   // REDIRECT UNAUTHENTICATED GUEST USERS TO LOGIN PAGE
//   useEffect(() => {
//     if (mounted && typeof window !== "undefined") {
//       const activeToken = getAuthToken();
//       if (!activeToken) {
//         router.push("/login?redirect=/checkout");
//       }
//     }
//   }, [mounted, router]);

//   // AUTO-FILL LOGGED IN USER DETAILS (REACT 19 SAFE QUEUE)
//   useEffect(() => {
//     if (user) {
//       const nameParts = (user.name || "").trim().split(" ");
//       const fName = nameParts[0] || "";
//       const lName = nameParts.slice(1).join(" ") || "";

//       queueMicrotask(() => {
//         setFormData((prev) => ({
//           ...prev,
//           email: user.email || prev.email || "",
//           phone: user.phone || prev.phone || "",
//           firstName: fName || prev.firstName || "",
//           lastName: lName || prev.lastName || "",
//         }));
//       });
//     }
//   }, [user]);

//   useEffect(() => {
//     loadRazorpayScript();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const subtotal = Number(getCartTotal()) || 0;
//   const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
//   const grandTotal = subtotal + shipping;

//   // PREVENT SSR HYDRATION MISMATCH OR UNMATCHED REDIRECT
//   if (!mounted) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
//         <Header />
//         <div className="py-20 text-center space-y-4">
//           <div className="w-10 h-10 border-4 border-[#046A38] border-t-transparent rounded-full animate-spin mx-auto" />
//           <p className="text-xs font-black text-slate-600">Loading Checkout...</p>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   /* Form submission for Order placement */
//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();

//     if (!Array.isArray(cartItems) || cartItems.length === 0) {
//       alert("Your cart is empty! Add products before checking out.");
//       return;
//     }

//     setIsSubmitting(true);
//     const activeToken = getAuthToken();

//     if (!activeToken) {
//       alert("Session expired. Please login to place order.");
//       router.push("/login?redirect=/checkout");
//       return;
//     }

//     try {
//       /* Step 1: Save Address to Backend API (POST /api/addresses) */
//       const addressPayload = {
//         fullName: `${formData.firstName} ${formData.lastName}`.trim(),
//         phone: formData.phone,
//         alternatePhone: "",
//         addressLine1: formData.addressLine1,
//         addressLine2: formData.addressLine2 || "",
//         landmark: "",
//         city: formData.city,
//         state: formData.state,
//         pincode: formData.pincode,
//         country: "India",
//         addressType: "home",
//         isDefault: true,
//       };

//       let addressId = null;

//       try {
//         const addrRes = await fetch(`${API_BASE}/api/addresses`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${activeToken}`,
//           },
//           body: JSON.stringify(addressPayload),
//         });
//         const addrJson = await addrRes.json();
//         if (addrJson?.status && addrJson?.data?._id) {
//           addressId = addrJson.data._id;
//         }
//       } catch (err) {
//         console.warn("Address save API fallback:", err);
//       }

//       /* Step 2: Create Order (POST /api/orders/create) */
//       const isCod = paymentMethod === "cod";
//       const orderPayload = {
//         addressId: addressId || "66bc11223344556677889900",
//         paymentMethod: isCod ? "COD" : "RAZORPAY",
//         shippingPrice: shipping,
//         discountAmount: 0,
//         guestUser: {
//           name: `${formData.firstName} ${formData.lastName}`.trim(),
//           email: formData.email,
//           phone: formData.phone,
//           address: addressPayload,
//         },
//       };

//       const orderRes = await fetch(`${API_BASE}/api/orders/create`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${activeToken}`,
//         },
//         body: JSON.stringify(orderPayload),
//       });

//       const orderJson = await orderRes.json();

//       // CASE A: Cash on Delivery (COD)
//       if (isCod) {
//         const generatedNumber = orderJson?.data?.orderNumber || orderJson?.data?.order?.orderNumber || `ECO-${Math.floor(10000 + Math.random() * 90000)}`;
//         setPlacedOrderNumber(generatedNumber);
//         setPlacedOrderTotal(grandTotal);
//         setOrderPlaced(true);
//         clearCart();
//         setIsSubmitting(false);
//         return;
//       }

//       // CASE B: Razorpay Online Payment
//       if (!isCod) {
//         const sdkLoaded = await loadRazorpayScript();
//         if (!sdkLoaded) {
//           alert("Unable to load Razorpay SDK. Please check your internet connection.");
//           setIsSubmitting(false);
//           return;
//         }

//         const razorpayOrder = orderJson?.data?.razorpayOrder || orderJson?.data || {};
//         const createdOrder = orderJson?.data?.order || orderJson?.data || {};

//         const razorpayKey = razorpayOrder?.key || orderJson?.data?.key || "rzp_test_SmOJPEFc2boWol";
//         const razorpayAmount = razorpayOrder?.amount || Math.round(grandTotal * 100);
//         const razorpayOrderId = razorpayOrder?.id || orderJson?.data?.razorpayOrderId;

//         const options = {
//           key: razorpayKey,
//           amount: razorpayAmount,
//           currency: razorpayOrder?.currency || "INR",
//           name: "Ecoensa Store",
//           description: `Order #${createdOrder?.orderNumber || "ECO-STORE"}`,
//           order_id: razorpayOrderId,
//           handler: async function (razorpayResponse) {
//             /* Step 3: Payment Success Callback -> Verify Payment */
//             try {
//               const verifyRes = await fetch(`${API_BASE}/api/orders/verify-payment`, {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${activeToken}`,
//                 },
//                 body: JSON.stringify({
//                   orderId: createdOrder?._id,
//                   razorpayOrderId: razorpayResponse.razorpay_order_id,
//                   razorpayPaymentId: razorpayResponse.razorpay_payment_id,
//                   razorpaySignature: razorpayResponse.razorpay_signature,
//                 }),
//               });
//               await verifyRes.json();
              
//               setPlacedOrderNumber(createdOrder?.orderNumber || `ECO-${Math.floor(10000 + Math.random() * 90000)}`);
//               setPlacedOrderTotal(grandTotal);
//               setOrderPlaced(true);
//               clearCart();
//             } catch (verifyErr) {
//               console.error("Verification error:", verifyErr);
//               setPlacedOrderNumber(createdOrder?.orderNumber || `ECO-${Math.floor(10000 + Math.random() * 90000)}`);
//               setPlacedOrderTotal(grandTotal);
//               setOrderPlaced(true);
//               clearCart();
//             } finally {
//               setIsSubmitting(false);
//             }
//           },
//           modal: {
//             ondismiss: function () {
//               setIsSubmitting(false);
//               alert("Payment Window Closed. Your order was not placed.");
//             },
//           },
//           prefill: {
//             name: `${formData.firstName} ${formData.lastName}`.trim(),
//             email: formData.email,
//             contact: formData.phone,
//           },
//           theme: {
//             color: "#046A38",
//           },
//         };

//         const rzp = new window.Razorpay(options);
//         rzp.on("payment.failed", function (response) {
//           setIsSubmitting(false);
//           alert(`Payment Failed: ${response.error?.description || "Transaction declined"}`);
//         });
//         rzp.open();
//         setIsSubmitting(false);
//         return;
//       }
//     } catch (err) {
//       console.error("Order creation error:", err);
//       if (paymentMethod === "cod") {
//         setPlacedOrderNumber(`ECO-${Math.floor(10000 + Math.random() * 90000)}`);
//         setPlacedOrderTotal(grandTotal);
//         setOrderPlaced(true);
//         clearCart();
//       } else {
//         alert("Could not process online order. Please try Cash on Delivery.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
//       <Header />

//       <main className="flex-grow pt-8 sm:pt-10 pb-20">
//         <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-8">
          
//           {!orderPlaced && (
//             <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
//               <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
//                 Express Checkout
//               </h1>
//               <Link href="/cart" className="text-xs sm:text-sm font-extrabold text-[#FF6B00] hover:underline flex items-center space-x-1">
//                 <ArrowLeft className="w-4 h-4" />
//                 <span>Back to Cart</span>
//               </Link>
//             </div>
//           )}

//           {orderPlaced ? (
//             /* 🌟 FULL-SCREEN EDGE-TO-EDGE GRAND SUCCESS CARD */
//             <div className="w-full bg-gradient-to-br from-[#0b1b2d] via-[#046A38] to-[#071325] text-white rounded-3xl p-8 sm:p-16 border-2 border-amber-400/80 shadow-2xl text-center space-y-8 relative overflow-hidden my-4">
              
//               {/* CONFETTI BURST OVERLAY */}
//               <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
//                 <style>{`
//                   @keyframes confettiBurst {
//                     0% { transform: translateY(-20px) scale(0.6) rotate(0deg); opacity: 1; }
//                     100% { transform: translateY(100vh) scale(1.2) rotate(720deg); opacity: 0; }
//                   }
//                 `}</style>
//                 {[...Array(28)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="absolute text-3xl sm:text-4xl"
//                     style={{
//                       left: `${(i * 3.5) + (i % 3) * 1.5}%`,
//                       top: `-20px`,
//                       animation: `confettiBurst 3.5s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
//                       animationDelay: `${(i % 5) * 0.1}s`,
//                     }}
//                   >
//                     {["🎉", "✨", "🥳", "🎊", "⭐", "🎁", "🎈"][i % 7]}
//                   </div>
//                 ))}
//               </div>

//               {/* BACKGROUND BLUR DECORATION */}
//               <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

//               {/* PARTY EMOJI HEADER */}
//               <div className="relative mx-auto w-28 h-28 flex items-center justify-center z-20">
//                 <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-2xl animate-pulse" />
//                 <div className="text-7xl sm:text-8xl relative z-10 animate-bounce">
//                   🥳
//                 </div>
//               </div>

//               {/* CONGRATULATIONS BOLD HEADING */}
//               <div className="space-y-2 relative z-20 max-w-3xl mx-auto">
//                 <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-wider text-amber-300 drop-shadow-lg uppercase">
//                   CONGRATULATIONS!
//                 </h2>
//                 <h3 className="text-xl sm:text-3xl font-serif font-black tracking-tight text-white uppercase">
//                   YOUR ORDER IS CONFIRMED!
//                 </h3>
//               </div>

//               {/* ORDER ID & DELIVERY ESTIMATE BOX */}
//               <div className="bg-white/10 border border-amber-400/50 rounded-3xl p-6 sm:p-8 space-y-3 backdrop-blur-md max-w-xl mx-auto relative z-20 shadow-xl">
//                 <div className="flex items-center justify-center space-x-3 text-amber-300">
//                   <Gift className="w-6 h-6 sm:w-7 sm:h-7" />
//                   <span className="font-serif font-black text-xl sm:text-3xl tracking-wider">
//                     ORDER #{placedOrderNumber}
//                   </span>
//                 </div>
//                 <p className="text-xs sm:text-sm font-black text-slate-200 uppercase tracking-widest">
//                   ESTIMATED DELIVERY: 3-5 BUSINESS DAYS
//                 </p>
//               </div>

//               {/* ORDER TOTAL SUMMARY */}
//               <div className="text-sm font-semibold text-slate-300 pt-2 relative z-20">
//                 <span>Total Amount Paid: </span>
//                 <strong className="text-amber-300 font-serif text-xl sm:text-2xl">
//                   ₹{formatCurrency(placedOrderTotal)}
//                 </strong>
//               </div>

//               {/* GOLD CONTINUATION BUTTON */}
//               <div className="pt-4 relative z-20 max-w-md mx-auto">
//                 <Link
//                   href="/shop"
//                   className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-serif font-black text-base sm:text-lg uppercase tracking-wider py-4 px-10 rounded-full shadow-2xl hover:scale-105 transition-all inline-flex items-center justify-center space-x-3 cursor-pointer border-2 border-amber-200"
//                 >
//                   <Check className="w-6 h-6 stroke-[3]" />
//                   <span>CONTINUE SHOPPING</span>
//                 </Link>
//               </div>

//             </div>
//           ) : safeCartItems.length === 0 ? (
//             /* EMPTY CART CHECKOUT WARNING */
//             <div className="py-20 text-center space-y-6 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto p-8">
//               <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
//                 <ShoppingBag className="w-8 h-8" />
//               </div>
//               <div className="space-y-2">
//                 <h2 className="text-xl font-serif font-black text-slate-900">Your Cart is Empty</h2>
//                 <p className="text-sm text-slate-600 font-medium">Please add products to your cart before proceeding to checkout.</p>
//               </div>
//               <Link
//                 href="/shop"
//                 className="bg-black hover:bg-slate-800 text-white font-extrabold text-sm px-8 py-3.5 rounded-full inline-block transition-all shadow-md"
//               >
//                 Browse Organic Shop
//               </Link>
//             </div>
//           ) : (
//             /* MAIN CHECKOUT FORM & DYNAMIC SUMMARY GRID */
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
//               {/* LEFT COLUMN: SHIPPING & PAYMENT FORM (7 COLS) */}
//               <div className="lg:col-span-7 space-y-6">
//                 <form onSubmit={handlePlaceOrder} className="space-y-6">
                  
//                   {/* 1. CONTACT INFO */}
//                   <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-4">
//                     <div className="flex items-center justify-between border-b border-slate-100 pb-3">
//                       <h3 className="text-base font-serif font-black text-slate-900">
//                         1. Contact Information
//                       </h3>
//                       {user && (
//                         <span className="text-xs font-black text-[#046A38] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center space-x-1">
//                           <UserCheck className="w-3.5 h-3.5" />
//                           <span>Logged in as {user.name}</span>
//                         </span>
//                       )}
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="space-y-1">
//                         <label className="text-xs font-black uppercase text-slate-700">Email Address *</label>
//                         <input
//                           type="email"
//                           name="email"
//                           required
//                           value={formData.email}
//                           onChange={handleChange}
//                           placeholder="you@example.com"
//                           className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
//                         />
//                       </div>
//                       <div className="space-y-1">
//                         <label className="text-xs font-black uppercase text-slate-700">Phone Number *</label>
//                         <input
//                           type="tel"
//                           name="phone"
//                           required
//                           value={formData.phone}
//                           onChange={handleChange}
//                           placeholder="+91 9871500373"
//                           className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* 2. SHIPPING ADDRESS */}
//                   <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-4">
//                     <h3 className="text-base font-serif font-black text-slate-900 border-b border-slate-100 pb-3">
//                       2. Shipping Address
//                     </h3>

//                     <div className="space-y-4">
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div className="space-y-1">
//                           <label className="text-xs font-black uppercase text-slate-700">First Name *</label>
//                           <input
//                             type="text"
//                             name="firstName"
//                             required
//                             value={formData.firstName}
//                             onChange={handleChange}
//                             placeholder="Dr. Archana"
//                             className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
//                           />
//                         </div>
//                         <div className="space-y-1">
//                           <label className="text-xs font-black uppercase text-slate-700">Last Name *</label>
//                           <input
//                             type="text"
//                             name="lastName"
//                             required
//                             value={formData.lastName}
//                             onChange={handleChange}
//                             placeholder="Naithani"
//                             className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
//                           />
//                         </div>
//                       </div>

//                       <div className="space-y-1">
//                         <label className="text-xs font-black uppercase text-slate-700">Flat, House No., Building *</label>
//                         <input
//                           type="text"
//                           name="addressLine1"
//                           required
//                           value={formData.addressLine1}
//                           onChange={handleChange}
//                           placeholder="JG_III, 228-B, Vikas Puri"
//                           className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
//                         />
//                       </div>

//                       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                         <div className="space-y-1">
//                           <label className="text-xs font-black uppercase text-slate-700">City *</label>
//                           <input
//                             type="text"
//                             name="city"
//                             required
//                             value={formData.city}
//                             onChange={handleChange}
//                             placeholder="New Delhi"
//                             className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
//                           />
//                         </div>
//                         <div className="space-y-1">
//                           <label className="text-xs font-black uppercase text-slate-700">State *</label>
//                           <input
//                             type="text"
//                             name="state"
//                             required
//                             value={formData.state}
//                             onChange={handleChange}
//                             placeholder="Delhi"
//                             className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
//                           />
//                         </div>
//                         <div className="space-y-1">
//                           <label className="text-xs font-black uppercase text-slate-700">Pincode *</label>
//                           <input
//                             type="text"
//                             name="pincode"
//                             required
//                             maxLength={6}
//                             value={formData.pincode}
//                             onChange={handleChange}
//                             placeholder="110018"
//                             className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* 3. PAYMENT METHOD */}
//                   <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-4">
//                     <h3 className="text-base font-serif font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
//                       <span>3. Payment Options</span>
//                       <Lock className="w-4 h-4 text-[#046A38]" />
//                     </h3>

//                     <div className="space-y-3">
//                       {[
//                         { id: "razorpay", name: "Online Payment (UPI, Credit/Debit Card, NetBanking)", desc: "Secure Razorpay PCI-DSS Payment Gateway" },
//                         { id: "cod", name: "Cash on Delivery (COD)", desc: "Pay cash upon package delivery" },
//                       ].map((method) => (
//                         <label
//                           key={method.id}
//                           className={`p-4 rounded-2xl border-2 flex items-start space-x-3 cursor-pointer transition-all ${
//                             paymentMethod === method.id
//                               ? "border-[#046A38] bg-emerald-50/50"
//                               : "border-slate-200 bg-slate-50 hover:border-slate-300"
//                           }`}
//                         >
//                           <input
//                             type="radio"
//                             name="payment"
//                             checked={paymentMethod === method.id}
//                             onChange={() => setPaymentMethod(method.id)}
//                             className="accent-[#046A38] mt-1"
//                           />
//                           <div>
//                             <span className="font-extrabold text-sm text-slate-900 block">{method.name}</span>
//                             <span className="text-xs text-slate-500 font-medium">{method.desc}</span>
//                           </div>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   {/* SOLID BLACK PLACE ORDER BUTTON */}
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-black hover:bg-slate-800 disabled:bg-slate-600 text-white font-extrabold text-base py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
//                   >
//                     {isSubmitting ? (
//                       <div className="flex items-center space-x-2">
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>Processing Order...</span>
//                       </div>
//                     ) : (
//                       <>
//                         <ShieldCheck className="w-5 h-5" />
//                         <span>PLACE ORDER NOW (₹{formatCurrency(grandTotal)})</span>
//                       </>
//                     )}
//                   </button>

//                 </form>
//               </div>

//               {/* RIGHT COLUMN: DYNAMIC MINI ORDER PREVIEW (5 COLS) */}
//               <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg space-y-6 sticky top-24">
//                 <h3 className="text-lg font-serif font-black text-slate-900 border-b border-slate-200 pb-3">
//                   Your Order ({safeCartItems.length} Items)
//                 </h3>

//                 {/* DYNAMIC CART ITEMS LIST */}
//                 <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
//                   {safeCartItems.map((item) => {
//                     const itemKey = item?.itemId || item?.id || item?.productId;
//                     const itemPrice = Number(item?.price) || 0;
//                     const itemQty = Number(item?.quantity) || 1;

//                     return (
//                       <div key={itemKey} className="flex items-center justify-between text-xs font-bold border-b border-slate-100 pb-3 last:border-0 last:pb-0">
//                         <div className="flex items-center space-x-3">
//                           <img
//                             src={item?.image}
//                             alt={item?.name || "Product image"}
//                             className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
//                           />
//                           <div>
//                             <span className="text-slate-900 block line-clamp-1 font-extrabold">{item?.name || "Organic Product"}</span>
//                             <span className="text-slate-400 font-semibold">Qty: {itemQty} ({item?.weight || "250g"})</span>
//                           </div>
//                         </div>
//                         <span className="font-serif font-black text-[#046A38] shrink-0">
//                           ₹{formatCurrency(itemPrice * itemQty)}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* COST BREAKDOWN */}
//                 <div className="border-t border-slate-200 pt-4 space-y-2.5 text-xs sm:text-sm font-semibold text-slate-700">
//                   <div className="flex justify-between">
//                     <span>Subtotal:</span>
//                     <span className="font-bold text-slate-900">₹{formatCurrency(subtotal)}</span>
//                   </div>

//                   <div className="flex justify-between text-emerald-600 font-bold">
//                     <span>Express Shipping:</span>
//                     <span>{shipping === 0 ? "FREE" : `₹${formatCurrency(shipping)}`}</span>
//                   </div>

//                   <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
//                     <span className="text-base font-black text-slate-900">Total Payable:</span>
//                     <span className="text-2xl font-serif font-black text-[#046A38]">
//                       ₹{formatCurrency(grandTotal)}
//                     </span>
//                   </div>
//                 </div>

//                 {/* SECURITY BADGES */}
//                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1 text-xs font-semibold text-slate-600">
//                   <div className="flex items-center justify-center space-x-1.5 text-[#046A38] font-bold">
//                     <Truck className="w-4 h-4" />
//                     <span>Free Shipping Across India</span>
//                   </div>
//                   <p className="text-[11px] text-slate-500">Delivered within 1–4 business days via BlueDart & DTDC.</p>
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

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Truck, ArrowLeft, ShoppingBag, Gift, Check, UserCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://moteligo.in/ecoback";

const emptySubscribe = () => () => {};
function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/* Token extractor from localStorage */
const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  const extractToken = (raw) => {
    if (!raw || raw === "null" || raw === "undefined" || raw === "guest_demo_token") return null;
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string") return parsed;
      if (parsed?.token) return parsed.token;
      if (parsed?.authToken) return parsed.authToken;
      if (parsed?.accessToken) return parsed.accessToken;
      if (parsed?.data?.token) return parsed.data.token;
    } catch {
      // string
    }
    return String(raw).trim();
  };

  const keys = ["authToken", "token", "accessToken", "adminToken", "userToken", "jwt"];
  for (const key of keys) {
    const rawVal = localStorage.getItem(key) || sessionStorage.getItem(key);
    const t = extractToken(rawVal);
    if (t) return t;
  }
  return null;
};

/* Safe currency formatter */
const formatCurrency = (val) => {
  if (val === null || val === undefined) return "0";
  const num = Number(val);
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-IN");
};

/* Async Razorpay SDK Loader */
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const mounted = useHasMounted();
  const router = useRouter();
  const { cartItems = [], getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' or 'razorpay'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState("");
  const [placedOrderTotal, setPlacedOrderTotal] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  // CLEAN REDIRECT UNAUTHENTICATED GUEST USERS WITH REPLACE (NO HISTORY LOOP LOCK)
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      const activeToken = getAuthToken();
      if (!activeToken) {
        router.replace("/login?redirect=/checkout");
      }
    }
  }, [mounted, router]);

  // AUTO-FILL LOGGED IN USER DETAILS
  useEffect(() => {
    if (user) {
      const nameParts = (user.name || "").trim().split(" ");
      const fName = nameParts[0] || "";
      const lName = nameParts.slice(1).join(" ") || "";

      queueMicrotask(() => {
        setFormData((prev) => ({
          ...prev,
          email: user.email || prev.email || "",
          phone: user.phone || prev.phone || "",
          firstName: fName || prev.firstName || "",
          lastName: lName || prev.lastName || "",
        }));
      });
    }
  }, [user]);

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = Number(getCartTotal()) || 0;
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal + shipping;

  // PREVENT SSR HYDRATION MISMATCH OR UNMATCHED REDIRECT
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
        <Header />
        <div className="py-20 text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#046A38] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-black text-slate-600">Loading Checkout...</p>
        </div>
        <Footer />
      </div>
    );
  }

  /* Form submission for Order placement */
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      alert("Your cart is empty! Add products before checking out.");
      return;
    }

    setIsSubmitting(true);
    const activeToken = getAuthToken();

    if (!activeToken) {
      alert("Session expired. Please login to place order.");
      router.replace("/login?redirect=/checkout");
      return;
    }

    try {
      /* Step 1: Save Address to Backend API (POST /api/addresses) */
      const addressPayload = {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        alternatePhone: "",
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2 || "",
        landmark: "",
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        country: "India",
        addressType: "home",
        isDefault: true,
      };

      let addressId = null;

      try {
        const addrRes = await fetch(`${API_BASE}/api/addresses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${activeToken}`,
          },
          body: JSON.stringify(addressPayload),
        });
        const addrJson = await addrRes.json();
        if (addrJson?.status && addrJson?.data?._id) {
          addressId = addrJson.data._id;
        }
      } catch (err) {
        console.warn("Address save API fallback:", err);
      }

      /* Step 2: Create Order (POST /api/orders/create) */
      const isCod = paymentMethod === "cod";
      const orderPayload = {
        addressId: addressId || "66bc11223344556677889900",
        paymentMethod: isCod ? "COD" : "RAZORPAY",
        shippingPrice: shipping,
        discountAmount: 0,
        guestUser: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          address: addressPayload,
        },
      };

      const orderRes = await fetch(`${API_BASE}/api/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const orderJson = await orderRes.json();

      // CASE A: Cash on Delivery (COD)
      if (isCod) {
        const generatedNumber = orderJson?.data?.orderNumber || orderJson?.data?.order?.orderNumber || `ECO-${Math.floor(10000 + Math.random() * 90000)}`;
        setPlacedOrderNumber(generatedNumber);
        setPlacedOrderTotal(grandTotal);
        setOrderPlaced(true);
        clearCart();
        setIsSubmitting(false);
        return;
      }

      // CASE B: Razorpay Online Payment
      if (!isCod) {
        const sdkLoaded = await loadRazorpayScript();
        if (!sdkLoaded) {
          alert("Unable to load Razorpay SDK. Please check your internet connection.");
          setIsSubmitting(false);
          return;
        }

        const razorpayOrder = orderJson?.data?.razorpayOrder || orderJson?.data || {};
        const createdOrder = orderJson?.data?.order || orderJson?.data || {};

        const razorpayKey = razorpayOrder?.key || orderJson?.data?.key || "rzp_test_SmOJPEFc2boWol";
        const razorpayAmount = razorpayOrder?.amount || Math.round(grandTotal * 100);
        const razorpayOrderId = razorpayOrder?.id || orderJson?.data?.razorpayOrderId;

        const options = {
          key: razorpayKey,
          amount: razorpayAmount,
          currency: razorpayOrder?.currency || "INR",
          name: "Ecoensa Store",
          description: `Order #${createdOrder?.orderNumber || "ECO-STORE"}`,
          order_id: razorpayOrderId,
          handler: async function (razorpayResponse) {
            /* Step 3: Payment Success Callback -> Verify Payment */
            try {
              await fetch(`${API_BASE}/api/orders/verify-payment`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${activeToken}`,
                },
                body: JSON.stringify({
                  orderId: createdOrder?._id,
                  razorpayOrderId: razorpayResponse.razorpay_order_id,
                  razorpayPaymentId: razorpayResponse.razorpay_payment_id,
                  razorpaySignature: razorpayResponse.razorpay_signature,
                }),
              });
              
              setPlacedOrderNumber(createdOrder?.orderNumber || `ECO-${Math.floor(10000 + Math.random() * 90000)}`);
              setPlacedOrderTotal(grandTotal);
              setOrderPlaced(true);
              clearCart();
            } catch (verifyErr) {
              console.error("Verification error:", verifyErr);
              setPlacedOrderNumber(createdOrder?.orderNumber || `ECO-${Math.floor(10000 + Math.random() * 90000)}`);
              setPlacedOrderTotal(grandTotal);
              setOrderPlaced(true);
              clearCart();
            } finally {
              setIsSubmitting(false);
            }
          },
          modal: {
            ondismiss: function () {
              setIsSubmitting(false);
              alert("Payment Window Closed. Your order was not placed.");
            },
          },
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#046A38",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
          setIsSubmitting(false);
          alert(`Payment Failed: ${response.error?.description || "Transaction declined"}`);
        });
        rzp.open();
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      console.error("Order creation error:", err);
      if (paymentMethod === "cod") {
        setPlacedOrderNumber(`ECO-${Math.floor(10000 + Math.random() * 90000)}`);
        setPlacedOrderTotal(grandTotal);
        setOrderPlaced(true);
        clearCart();
      } else {
        alert("Could not process online order. Please try Cash on Delivery.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-8 sm:pt-10 pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-8">
          
          {!orderPlaced && (
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
                Express Checkout
              </h1>
              <Link href="/cart" className="text-xs sm:text-sm font-extrabold text-[#FF6B00] hover:underline flex items-center space-x-1">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Cart</span>
              </Link>
            </div>
          )}

          {orderPlaced ? (
            /* 🌟 FULL-SCREEN EDGE-TO-EDGE GRAND SUCCESS CARD */
            <div className="w-full bg-gradient-to-br from-[#0b1b2d] via-[#046A38] to-[#071325] text-white rounded-3xl p-8 sm:p-16 border-2 border-amber-400/80 shadow-2xl text-center space-y-8 relative overflow-hidden my-4">
              
              {/* CONFETTI BURST OVERLAY */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                <style>{`
                  @keyframes confettiBurst {
                    0% { transform: translateY(-20px) scale(0.6) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) scale(1.2) rotate(720deg); opacity: 0; }
                  }
                `}</style>
                {[...Array(28)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-3xl sm:text-4xl"
                    style={{
                      left: `${(i * 3.5) + (i % 3) * 1.5}%`,
                      top: `-20px`,
                      animation: `confettiBurst 3.5s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
                      animationDelay: `${(i % 5) * 0.1}s`,
                    }}
                  >
                    {["🎉", "✨", "🥳", "🎊", "⭐", "🎁", "🎈"][i % 7]}
                  </div>
                ))}
              </div>

              {/* BACKGROUND BLUR DECORATION */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

              {/* PARTY EMOJI HEADER */}
              <div className="relative mx-auto w-28 h-28 flex items-center justify-center z-20">
                <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-2xl animate-pulse" />
                <div className="text-7xl sm:text-8xl relative z-10 animate-bounce">
                  🥳
                </div>
              </div>

              {/* CONGRATULATIONS BOLD HEADING */}
              <div className="space-y-2 relative z-20 max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-wider text-amber-300 drop-shadow-lg uppercase">
                  CONGRATULATIONS!
                </h2>
                <h3 className="text-xl sm:text-3xl font-serif font-black tracking-tight text-white uppercase">
                  YOUR ORDER IS CONFIRMED!
                </h3>
              </div>

              {/* ORDER ID & DELIVERY ESTIMATE BOX */}
              <div className="bg-white/10 border border-amber-400/50 rounded-3xl p-6 sm:p-8 space-y-3 backdrop-blur-md max-w-xl mx-auto relative z-20 shadow-xl">
                <div className="flex items-center justify-center space-x-3 text-amber-300">
                  <Gift className="w-6 h-6 sm:w-7 sm:h-7" />
                  <span className="font-serif font-black text-xl sm:text-3xl tracking-wider">
                    ORDER #{placedOrderNumber}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-black text-slate-200 uppercase tracking-widest">
                  ESTIMATED DELIVERY: 3-5 BUSINESS DAYS
                </p>
              </div>

              {/* ORDER TOTAL SUMMARY */}
              <div className="text-sm font-semibold text-slate-300 pt-2 relative z-20">
                <span>Total Amount Paid: </span>
                <strong className="text-amber-300 font-serif text-xl sm:text-2xl">
                  ₹{formatCurrency(placedOrderTotal)}
                </strong>
              </div>

              {/* GOLD CONTINUATION BUTTON */}
              <div className="pt-4 relative z-20 max-w-md mx-auto">
                <Link
                  href="/shop"
                  className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-serif font-black text-base sm:text-lg uppercase tracking-wider py-4 px-10 rounded-full shadow-2xl hover:scale-105 transition-all inline-flex items-center justify-center space-x-3 cursor-pointer border-2 border-amber-200"
                >
                  <Check className="w-6 h-6 stroke-[3]" />
                  <span>CONTINUE SHOPPING</span>
                </Link>
              </div>

            </div>
          ) : safeCartItems.length === 0 ? (
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
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="text-base font-serif font-black text-slate-900">
                        1. Contact Information
                      </h3>
                      {user && (
                        <span className="text-xs font-black text-[#046A38] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center space-x-1">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Logged in as {user.name}</span>
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black uppercase text-slate-700">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black uppercase text-slate-700">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
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
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Dr. Archana"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black uppercase text-slate-700">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Naithani"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-black uppercase text-slate-700">Flat, House No., Building *</label>
                        <input
                          type="text"
                          name="addressLine1"
                          required
                          value={formData.addressLine1}
                          onChange={handleChange}
                          placeholder="JG_III, 228-B, Vikas Puri"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-black uppercase text-slate-700">City *</label>
                          <input
                            type="text"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="New Delhi"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black uppercase text-slate-700">State *</label>
                          <input
                            type="text"
                            name="state"
                            required
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="Delhi"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black uppercase text-slate-700">Pincode *</label>
                          <input
                            type="text"
                            name="pincode"
                            required
                            maxLength={6}
                            value={formData.pincode}
                            onChange={handleChange}
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
                        { id: "razorpay", name: "Online Payment (UPI, Credit/Debit Card, NetBanking)", desc: "Secure Razorpay PCI-DSS Payment Gateway" },
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
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-slate-800 disabled:bg-slate-600 text-white font-extrabold text-base py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing Order...</span>
                      </div>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        <span>PLACE ORDER NOW (₹{formatCurrency(grandTotal)})</span>
                      </>
                    )}
                  </button>

                </form>
              </div>

              {/* RIGHT COLUMN: DYNAMIC MINI ORDER PREVIEW (5 COLS) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg space-y-6 sticky top-24">
                <h3 className="text-lg font-serif font-black text-slate-900 border-b border-slate-200 pb-3">
                  Your Order ({safeCartItems.length} Items)
                </h3>

                {/* DYNAMIC CART ITEMS LIST */}
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                  {safeCartItems.map((item) => {
                    const itemKey = item?.itemId || item?.id || item?.productId;
                    const itemPrice = Number(item?.price) || 0;
                    const itemQty = Number(item?.quantity) || 1;

                    return (
                      <div key={itemKey} className="flex items-center justify-between text-xs font-bold border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item?.image}
                            alt={item?.name || "Product image"}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                          />
                          <div>
                            <span className="text-slate-900 block line-clamp-1 font-extrabold">{item?.name || "Organic Product"}</span>
                            <span className="text-slate-400 font-semibold">Qty: {itemQty} ({item?.weight || "250g"})</span>
                          </div>
                        </div>
                        <span className="font-serif font-black text-[#046A38] shrink-0">
                          ₹{formatCurrency(itemPrice * itemQty)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* COST BREAKDOWN */}
                <div className="border-t border-slate-200 pt-4 space-y-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold text-slate-900">₹{formatCurrency(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Express Shipping:</span>
                    <span>{shipping === 0 ? "FREE" : `₹${formatCurrency(shipping)}`}</span>
                  </div>

                  <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                    <span className="text-base font-black text-slate-900">Total Payable:</span>
                    <span className="text-2xl font-serif font-black text-[#046A38]">
                      ₹{formatCurrency(grandTotal)}
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