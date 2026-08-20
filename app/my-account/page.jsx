"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  User,
  ShoppingBag,
  Truck,
  MapPin,
  Lock,
  LogOut,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  Printer,
  X,
  ChevronRight,
  Heart,
  Award,
  RefreshCw,
  Star,
  Search,
  ShieldCheck,
  KeyRound,
  Check,
} from "lucide-react";

/* MOCK USER DATA */
const initialUser = {
  name: "Atul Mishra",
  email: "atul.mishra@gmail.com",
  phone: "+91 98765 43210",
  gender: "Male",
  joinedDate: "January 2026",
  rewardPoints: 240, // 1 Point = ₹1
};

const initialOrders = [
  {
    _id: "ECO-1787137905337",
    orderNumber: "EC-2026-72030",
    createdAt: "19 Aug 2026",
    status: "PROCESSING",
    totalAmount: 1800,
    subtotal: 1800,
    discount: 0,
    paymentMethod: "Razorpay (Credit/Debit Card)",
    paymentStatus: "PAID",
    txnId: "pay_TRbjo4Rjr7pLxg",
    courierPartner: "BlueDart Express",
    trackingNumber: "BD-982145892IN",
    estimatedDelivery: "22 Aug 2026",
    items: [
      {
        _id: "item-1",
        productName: "Pure Organic A2 Gir Cow Ghee (500ml)",
        variantName: "500ml Glass Jar",
        quantity: 1,
        originalPrice: 1800,
        itemTotal: 1800,
        image: "https://images.unsplash.com/photo-1589927986076-2d5f07d5c1f4?w=150&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    _id: "ECO-1787112894002",
    orderNumber: "EC-2026-61019",
    createdAt: "10 Aug 2026",
    status: "DELIVERED",
    totalAmount: 950,
    subtotal: 1100,
    discount: 150,
    paymentMethod: "Cash on Delivery (COD)",
    paymentStatus: "PAID",
    txnId: "N/A (COD)",
    courierPartner: "Delhivery Surface",
    trackingNumber: "DEL-84729104IN",
    estimatedDelivery: "14 Aug 2026",
    items: [
      {
        _id: "item-2",
        productName: "Cold Pressed Virgin Mustard Oil (1L)",
        variantName: "1 Litre Bottle",
        quantity: 2,
        originalPrice: 550,
        itemTotal: 950,
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150&auto=format&fit=crop&q=80",
      },
    ],
  },
];

const initialWishlist = [
  {
    id: "wish-1",
    name: "Organic Wild Forest Raw Honey (500g)",
    price: 650,
    originalPrice: 800,
    inStock: true,
    image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: "wish-2",
    name: "Pure Himalayan Pink Salt Powder (1kg)",
    price: 220,
    originalPrice: 280,
    inStock: true,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200&auto=format&fit=crop&q=80",
  },
];

const initialAddresses = [
  {
    id: "addr-1",
    isDefault: true,
    fullName: "Atul Mishra",
    phone: "+91 98765 43210",
    addressLine1: "A7, Shtabdi Enclave",
    addressLine2: "Near City Park",
    city: "Kushinagar",
    state: "Uttar Pradesh",
    pincode: "121221",
    type: "Home",
  },
  {
    id: "addr-2",
    isDefault: false,
    fullName: "Atul Mishra (Office)",
    phone: "+91 98765 43210",
    addressLine1: "Suite 402, Ecoensa Tower",
    addressLine2: "Sector 62",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201301",
    type: "Work",
  },
];

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState("profile"); // profile | orders | wishlist | rewards | addresses | security

  // USER & FORM STATES
  const [user, setUser] = useState(initialUser);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(initialUser);

  // ORDERS & SEARCH STATES
  const [orders, setOrders] = useState(initialOrders);
  const [orderFilter, setOrderFilter] = useState("ALL");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState(null);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState(null);
  const [reviewModalOrder, setReviewModalOrder] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  // WISHLIST
  const [wishlist, setWishlist] = useState(initialWishlist);

  // ADDRESS STATES
  const [addresses, setAddresses] = useState(initialAddresses);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddr, setEditingAddr] = useState(null);
  const [addrForm, setAddrForm] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
    isDefault: false,
  });

  // SECURITY FORM
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saving, setSaving] = useState(false);

  /* HANDLERS */
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setUser(profileForm);
      setIsEditingProfile(false);
      setSaving(false);
      alert("Profile details updated successfully!");
    }, 400);
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert("New Passwords do not match!");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSecurityForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      alert("Password changed successfully!");
    }, 400);
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "CANCELLED" } : o))
      );
      alert("Order has been cancelled.");
    }
  };

  const handleReorder = (order) => {
    alert(`Re-ordered items from ${order.orderNumber}! Items added to your cart.`);
  };

  const handleRemoveWishlist = (id) => {
    setWishlist((prev) => prev.filter((w) => w.id !== id));
  };

  const handleOpenAddAddress = () => {
    setEditingAddr(null);
    setAddrForm({
      fullName: user.name,
      phone: user.phone,
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      type: "Home",
      isDefault: addresses.length === 0,
    });
    setAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr) => {
    setEditingAddr(addr);
    setAddrForm(addr);
    setAddressModalOpen(true);
  };

  const handleSaveAddressSubmit = (e) => {
    e.preventDefault();
    if (editingAddr) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingAddr.id ? { ...addrForm, id: editingAddr.id } : a))
      );
    } else {
      const newAddr = { ...addrForm, id: `addr-${Date.now()}` };
      if (newAddr.isDefault) {
        setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })));
      }
      setAddresses((prev) => [...prev, newAddr]);
    }
    setAddressModalOpen(false);
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your product review has been submitted.");
    setReviewModalOrder(null);
    setReviewComment("");
  };

  const filteredOrders = orders
    .filter((o) => {
      if (orderFilter === "ALL") return true;
      return o.status === orderFilter;
    })
    .filter((o) => {
      if (!orderSearchQuery.trim()) return true;
      const q = orderSearchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.items.some((i) => i.productName.toLowerCase().includes(q))
      );
    });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* 1. WEBSITE HEADER */}
      <Header />

      {/* 2. MAIN DASHBOARD CONTENT CONTAINER */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-6">
          
          {/* TOP WELCOME BANNER WITH LOYALTY BADGE */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-l-8 border-l-[#046A38]">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-[#046A38] text-white flex items-center justify-center text-2xl font-black shadow-md shrink-0">
                {user.name ? user.name.charAt(0) : "U"}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                    Welcome back, {user.name} 👋
                  </h1>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                    <Award className="w-3 h-3 text-amber-600" />
                    <span>Gold Club</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                  {user.email} • Member since {user.joinedDate}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="flex-1 md:flex-none bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl text-center">
                <p className="text-[10px] font-black uppercase text-[#046A38]">Green Wallet</p>
                <p className="text-lg font-black text-[#046A38]">₹{user.rewardPoints}</p>
              </div>
              <div className="flex-1 md:flex-none bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-center">
                <p className="text-[10px] font-black uppercase text-slate-400">Total Orders</p>
                <p className="text-lg font-black text-slate-800">{orders.length}</p>
              </div>
              <div className="flex-1 md:flex-none bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-center">
                <p className="text-[10px] font-black uppercase text-slate-400">Wishlist</p>
                <p className="text-lg font-black text-[#FF6B00]">{wishlist.length}</p>
              </div>
            </div>
          </div>

          {/* MAIN LAYOUT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* LEFT NAVIGATION SIDEBAR */}
            <div className="lg:col-span-1 bg-white rounded-3xl p-3 border border-slate-200 shadow-sm space-y-1 h-fit">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-extrabold text-sm transition-all cursor-pointer ${
                  activeTab === "profile"
                    ? "bg-emerald-50 text-[#046A38] border border-emerald-200"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-[#046A38]" />
                  <span>My Profile</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-extrabold text-sm transition-all cursor-pointer ${
                  activeTab === "orders"
                    ? "bg-emerald-50 text-[#046A38] border border-emerald-200"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center space-x-3">
                  <ShoppingBag className="w-5 h-5 text-[#046A38]" />
                  <span>My Orders &amp; Invoices</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-extrabold text-sm transition-all cursor-pointer ${
                  activeTab === "wishlist"
                    ? "bg-emerald-50 text-[#046A38] border border-emerald-200"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-[#FF6B00]" />
                  <span>My Wishlist ({wishlist.length})</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                onClick={() => setActiveTab("rewards")}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-extrabold text-sm transition-all cursor-pointer ${
                  activeTab === "rewards"
                    ? "bg-emerald-50 text-[#046A38] border border-emerald-200"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span>Green Rewards &amp; Wallet</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-extrabold text-sm transition-all cursor-pointer ${
                  activeTab === "addresses"
                    ? "bg-emerald-50 text-[#046A38] border border-emerald-200"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#046A38]" />
                  <span>Saved Addresses</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-extrabold text-sm transition-all cursor-pointer ${
                  activeTab === "security"
                    ? "bg-emerald-50 text-[#046A38] border border-emerald-200"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-[#046A38]" />
                  <span>Security &amp; Password</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to log out?")) {
                      localStorage.clear();
                      window.location.href = "/login";
                    }
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-extrabold text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout Account</span>
                </button>
              </div>
            </div>

            {/* RIGHT CONTENT PANEL */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              
              {/* TAB 1: MY PROFILE */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-lg font-black text-slate-900">Personal Details</h2>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">
                        Manage your name, contact info, and profile preferences
                      </p>
                    </div>
                    {!isEditingProfile && (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#046A38] text-xs font-extrabold cursor-pointer transition-all"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit Details</span>
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold uppercase text-slate-700">Full Name *</label>
                        <input
                          type="text"
                          disabled={!isEditingProfile}
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[#046A38] text-sm font-bold disabled:bg-slate-50 outline-none"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold uppercase text-slate-700">Email Address *</label>
                        <input
                          type="email"
                          disabled={!isEditingProfile}
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[#046A38] text-sm font-bold disabled:bg-slate-50 outline-none"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold uppercase text-slate-700">Phone Number *</label>
                        <input
                          type="text"
                          disabled={!isEditingProfile}
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[#046A38] text-sm font-bold disabled:bg-slate-50 outline-none"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold uppercase text-slate-700">Gender</label>
                        <select
                          disabled={!isEditingProfile}
                          value={profileForm.gender}
                          onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[#046A38] text-sm font-bold disabled:bg-slate-50 outline-none cursor-pointer"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {isEditingProfile && (
                      <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setIsEditingProfile(false)}
                          className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-extrabold text-xs cursor-pointer hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={saving}
                          className="px-6 py-2.5 rounded-xl bg-[#046A38] hover:bg-emerald-800 text-white font-extrabold text-xs cursor-pointer shadow-sm"
                        >
                          {saving ? "Saving..." : "Save Profile"}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* TAB 2: MY ORDERS WITH SEARCH & RE-ORDER */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
                    <div>
                      <h2 className="text-lg font-black text-slate-900">Order History</h2>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">
                        Track deliveries, download invoices, and reorder favorites
                      </p>
                    </div>

                    {/* SEARCH BAR */}
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Search by Order # or Product..."
                        value={orderSearchQuery}
                        onChange={(e) => setOrderSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-bold w-full sm:w-64 outline-none focus:border-[#046A38]"
                      />
                    </div>
                  </div>

                  {/* FILTER BUTTONS */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setOrderFilter("ALL")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                        orderFilter === "ALL"
                          ? "bg-[#046A38] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      All Orders ({orders.length})
                    </button>
                    <button
                      onClick={() => setOrderFilter("PROCESSING")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                        orderFilter === "PROCESSING"
                          ? "bg-[#046A38] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      In Transit ({orders.filter((o) => o.status === "PROCESSING").length})
                    </button>
                    <button
                      onClick={() => setOrderFilter("DELIVERED")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                        orderFilter === "DELIVERED"
                          ? "bg-[#046A38] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      Delivered ({orders.filter((o) => o.status === "DELIVERED").length})
                    </button>
                  </div>

                  <div className="space-y-4">
                    {filteredOrders.map((ord) => (
                      <div
                        key={ord._id}
                        className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs"
                      >
                        <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-black text-slate-900">
                              Order #{ord.orderNumber}
                            </p>
                            <p className="text-[11px] font-semibold text-slate-500">
                              Placed on {ord.createdAt}
                            </p>
                          </div>

                          <span
                            className={`text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                              ord.status === "DELIVERED"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : ord.status === "CANCELLED"
                                ? "bg-red-100 text-red-800 border border-red-300"
                                : "bg-amber-100 text-amber-800 border border-amber-300"
                            }`}
                          >
                            {ord.status === "PROCESSING" ? "In Transit" : ord.status}
                          </span>
                        </div>

                        <div className="p-5 space-y-3">
                          {ord.items.map((item) => (
                            <div key={item._id} className="flex items-center space-x-4">
                              <img
                                src={item.image}
                                alt={item.productName}
                                className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                              />
                              <div className="flex-1">
                                <h4 className="text-sm font-extrabold text-slate-900">
                                  {item.productName}
                                </h4>
                                <p className="text-xs font-semibold text-slate-500">
                                  Variant: {item.variantName} | Qty: {item.quantity}
                                </p>
                                <p className="text-xs font-black text-[#046A38] mt-0.5">
                                  ₹{item.itemTotal}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="px-5 py-3.5 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <p className="text-xs font-semibold text-slate-500">
                            Payment: <strong className="text-slate-800">{ord.paymentMethod}</strong> ({ord.paymentStatus})
                          </p>

                          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                            {ord.status === "DELIVERED" && (
                              <>
                                <button
                                  onClick={() => handleReorder(ord)}
                                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:border-[#046A38] text-slate-700 hover:text-[#046A38] text-xs font-extrabold cursor-pointer transition-all"
                                >
                                  <RefreshCw className="w-3.5 h-3.5" />
                                  <span>Re-order</span>
                                </button>

                                <button
                                  onClick={() => setReviewModalOrder(ord)}
                                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 text-xs font-extrabold cursor-pointer transition-all"
                                >
                                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                  <span>Write Review</span>
                                </button>
                              </>
                            )}

                            {ord.status === "PROCESSING" && (
                              <button
                                onClick={() => handleCancelOrder(ord._id)}
                                className="px-3 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-extrabold cursor-pointer"
                              >
                                Cancel Order
                              </button>
                            )}

                            <button
                              onClick={() => setSelectedOrderForInvoice(ord)}
                              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-100 text-xs font-extrabold cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>Tax Invoice</span>
                            </button>

                            <button
                              onClick={() => setSelectedOrderForTracking(ord)}
                              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-[#046A38] hover:bg-emerald-800 text-white text-xs font-extrabold cursor-pointer transition-all shadow-xs"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>Track Order</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: WISHLIST */}
              {activeTab === "wishlist" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-lg font-black text-slate-900">My Saved Wishlist</h2>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      Your favorite items saved for future purchase
                    </p>
                  </div>

                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wishlist.map((item) => (
                        <div
                          key={item.id}
                          className="border border-slate-200 rounded-2xl p-4 flex items-center space-x-4 bg-white relative group"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div className="flex-1 space-y-1">
                            <h4 className="text-xs font-black text-slate-900 line-clamp-2">
                              {item.name}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-black text-[#046A38]">₹{item.price}</span>
                              <span className="text-xs font-semibold text-slate-400 line-through">₹{item.originalPrice}</span>
                            </div>
                            <button
                              onClick={() => alert(`Added ${item.name} to cart!`)}
                              className="mt-2 w-full py-1.5 rounded-lg bg-[#046A38] hover:bg-emerald-800 text-white text-xs font-extrabold cursor-pointer shadow-xs"
                            >
                              Add to Cart
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveWishlist(item.id)}
                            className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-600 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 space-y-3">
                      <Heart className="w-12 h-12 text-slate-300 mx-auto" />
                      <p className="text-sm font-extrabold text-slate-700">Your wishlist is empty</p>
                      <p className="text-xs text-slate-400">Save items while shopping to view them here</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: REWARDS & WALLET */}
              {activeTab === "rewards" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-lg font-black text-slate-900">Green Loyalty Rewards</h2>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      Earn 1 Green Point on every ₹100 spent on organic products
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#046A38] to-emerald-800 text-white rounded-3xl p-6 shadow-md flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-extrabold uppercase opacity-80">Available Cash Wallet</p>
                      <h3 className="text-3xl font-black">₹{user.rewardPoints}</h3>
                      <p className="text-xs font-medium text-emerald-200">1 Green Point = ₹1 Instant Discount at checkout</p>
                    </div>
                    <Award className="w-16 h-16 text-amber-300 opacity-90" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-black text-slate-900">Points History</h3>
                    <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 bg-white">
                      <div className="p-4 flex items-center justify-between text-xs">
                        <div>
                          <strong className="text-slate-900">Earned on Order #EC-2026-72030</strong>
                          <p className="text-[11px] text-slate-400 font-semibold">19 Aug 2026</p>
                        </div>
                        <span className="font-black text-[#046A38]">+18 Green Points</span>
                      </div>

                      <div className="p-4 flex items-center justify-between text-xs">
                        <div>
                          <strong className="text-slate-900">Welcome Bonus Credits</strong>
                          <p className="text-[11px] text-slate-400 font-semibold">10 Aug 2026</p>
                        </div>
                        <span className="font-black text-[#046A38]">+222 Green Points</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: SAVED ADDRESSES */}
              {activeTab === "addresses" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-lg font-black text-slate-900">Saved Addresses</h2>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">
                        Save shipping locations for faster 1-click checkout
                      </p>
                    </div>
                    <button
                      onClick={handleOpenAddAddress}
                      className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#046A38] hover:bg-emerald-800 text-white text-xs font-extrabold cursor-pointer transition-all shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Address</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`border rounded-2xl p-5 space-y-2 relative bg-white transition-all ${
                          addr.isDefault
                            ? "border-[#046A38] shadow-sm bg-emerald-50/20"
                            : "border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {addr.type}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              Default Address
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-black text-slate-900">{addr.fullName}</h3>
                        <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                          {addr.addressLine1}, {addr.addressLine2 ? `${addr.addressLine2}, ` : ""}
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="text-xs font-semibold text-slate-500">
                          Phone: <strong className="text-slate-800">{addr.phone}</strong>
                        </p>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          {!addr.isDefault && (
                            <button
                              onClick={() => handleSetDefaultAddress(addr.id)}
                              className="text-xs font-extrabold text-[#046A38] hover:underline cursor-pointer"
                            >
                              Set as Default
                            </button>
                          )}
                          <div className="flex items-center space-x-2 ml-auto">
                            <button
                              onClick={() => handleOpenEditAddress(addr)}
                              className="p-1.5 text-slate-600 hover:text-[#046A38] cursor-pointer"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="p-1.5 text-slate-600 hover:text-red-600 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SECURITY & PASSWORD (BALANCED 2-COLUMN GRID) */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-lg font-black text-slate-900">Security &amp; Password</h2>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      Update your account password and review active security protection
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* LEFT COLUMN: PASSWORD CHANGE FORM */}
                    <form onSubmit={handleSaveSecurity} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold uppercase text-slate-700">Current Password *</label>
                        <input
                          type="password"
                          placeholder="Enter current password"
                          value={securityForm.currentPassword}
                          onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[#046A38] text-sm font-bold outline-none"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold uppercase text-slate-700">New Password *</label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          value={securityForm.newPassword}
                          onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[#046A38] text-sm font-bold outline-none"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold uppercase text-slate-700">Confirm New Password *</label>
                        <input
                          type="password"
                          placeholder="Re-enter new password"
                          value={securityForm.confirmPassword}
                          onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[#046A38] text-sm font-bold outline-none"
                          required
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={saving}
                          className="px-6 py-2.5 rounded-xl bg-[#046A38] hover:bg-emerald-800 text-white font-extrabold text-xs cursor-pointer shadow-sm"
                        >
                          {saving ? "Updating Password..." : "Update Password"}
                        </button>
                      </div>
                    </form>

                    {/* RIGHT COLUMN: SECURITY SHIELD & GUIDELINES CARD */}
                    <div className="bg-gradient-to-br from-emerald-50/80 via-white to-slate-50 border border-emerald-200/80 rounded-3xl p-6 space-y-5 shadow-xs">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-[#046A38] text-white flex items-center justify-center shadow-md shrink-0">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-sm font-black text-slate-900">256-Bit SSL Protection</h3>
                          <p className="text-[11px] font-extrabold text-[#046A38] flex items-center space-x-1 mt-0.5">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Account Status: Fully Secured</span>
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <p className="text-xs font-black uppercase text-slate-700 tracking-wider">
                          Password Requirements:
                        </p>
                        <ul className="space-y-2 text-xs font-semibold text-slate-600">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-[#046A38] shrink-0" />
                            <span>Minimum 8 characters long</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-[#046A38] shrink-0" />
                            <span>Include numbers (0-9) &amp; special symbols (@, #)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-[#046A38] shrink-0" />
                            <span>Avoid reusing passwords from other apps</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-[#046A38] shrink-0" />
                            <span>Never share your login credentials with anyone</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-emerald-100 flex items-center justify-between text-[11px] font-extrabold text-slate-500">
                        <span className="flex items-center space-x-1">
                          <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                          <span>Last Changed: 30 days ago</span>
                        </span>
                        <span className="text-[#046A38] font-black">Active Guard 🛡️</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* 3. WEBSITE FOOTER */}
      <Footer />

      {/* ================= MODAL 1: LIVE ORDER TRACKING TIMELINE ================= */}
      {selectedOrderForTracking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Shipment Live Tracking</h3>
              <button
                onClick={() => setSelectedOrderForTracking(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
              <div>
                <p className="text-xs font-black text-slate-900">{selectedOrderForTracking.courierPartner}</p>
                <p className="text-[11px] font-semibold text-slate-500">AWB: {selectedOrderForTracking.trackingNumber}</p>
              </div>
              <span className="text-[11px] font-black px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                Est. {selectedOrderForTracking.estimatedDelivery}
              </span>
            </div>

            <div className="space-y-4 px-2">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#046A38] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-slate-900">Order Placed &amp; Confirmed</p>
                  <p className="text-[11px] font-semibold text-slate-500">{selectedOrderForTracking.createdAt} • Payment Verified</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#046A38] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-slate-900">Packed &amp; Dispatched</p>
                  <p className="text-[11px] font-semibold text-slate-500">Handed over to courier facility</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 opacity-60">
                <CheckCircle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-slate-900">Out for Delivery</p>
                  <p className="text-[11px] font-semibold text-slate-500">Scheduled for registered address</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedOrderForTracking(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: PRINTABLE TAX INVOICE MODAL ================= */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Tax Invoice Receipt</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#046A38] text-white text-xs font-extrabold cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Invoice</span>
                </button>
                <button
                  onClick={() => setSelectedOrderForInvoice(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-base font-black text-[#046A38]">Ecoensa Natural &amp; Organic</h2>
                  <p className="text-slate-500">GSTIN: 29AAAAA0000A1Z5</p>
                  <p className="text-slate-500">support@ecoensa.com</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 text-sm">TAX INVOICE</p>
                  <p className="text-slate-500">Invoice: #{selectedOrderForInvoice.orderNumber}</p>
                  <p className="text-slate-500">Date: {selectedOrderForInvoice.createdAt}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-extrabold text-slate-900">Billed To:</p>
                <p className="text-slate-700">{user.name}</p>
                <p className="text-slate-500">{user.phone} | {user.email}</p>
              </div>

              <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-[#046A38] text-white text-[11px] uppercase">
                    <th className="p-2.5">Item</th>
                    <th className="p-2.5 text-center">Qty</th>
                    <th className="p-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedOrderForInvoice.items.map((item) => (
                    <tr key={item._id}>
                      <td className="p-2.5">{item.productName} ({item.variantName})</td>
                      <td className="p-2.5 text-center">{item.quantity}</td>
                      <td className="p-2.5 text-right font-black">₹{item.itemTotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center pt-2 border-t border-slate-200 font-black text-sm">
                <span>Grand Total (Paid)</span>
                <span className="text-[#046A38]">₹{selectedOrderForInvoice.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: PRODUCT REVIEW MODAL ================= */}
      {reviewModalOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Write Product Review</h3>
              <button
                onClick={() => setReviewModalOrder(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-extrabold uppercase text-slate-700">Rating</label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold uppercase text-slate-700">Your Review *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your experience with this organic product..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-[#046A38]"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOrder(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#046A38] text-white font-extrabold text-xs cursor-pointer shadow-xs"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 4: ADD/EDIT ADDRESS MODAL ================= */}
      {addressModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingAddr ? "Edit Delivery Address" : "Add New Delivery Address"}
              </h3>
              <button
                onClick={() => setAddressModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddressSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-extrabold uppercase text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={addrForm.fullName}
                    onChange={(e) => setAddrForm({ ...addrForm, fullName: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-extrabold uppercase text-slate-700">Phone *</label>
                  <input
                    type="text"
                    required
                    value={addrForm.phone}
                    onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-bold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-extrabold uppercase text-slate-700">Flat, House No, Building *</label>
                <input
                  type="text"
                  required
                  value={addrForm.addressLine1}
                  onChange={(e) => setAddrForm({ ...addrForm, addressLine1: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-bold outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-extrabold uppercase text-slate-700">Street, Area, Landmark</label>
                <input
                  type="text"
                  value={addrForm.addressLine2}
                  onChange={(e) => setAddrForm({ ...addrForm, addressLine2: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-bold outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-extrabold uppercase text-slate-700">City *</label>
                  <input
                    type="text"
                    required
                    value={addrForm.city}
                    onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-extrabold uppercase text-slate-700">State *</label>
                  <input
                    type="text"
                    required
                    value={addrForm.state}
                    onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-extrabold uppercase text-slate-700">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={addrForm.pincode}
                    onChange={(e) => setAddrForm({ ...addrForm, pincode: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-bold outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setAddressModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#046A38] text-white font-extrabold text-xs cursor-pointer shadow-xs"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
