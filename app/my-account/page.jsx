
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
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
  X,
  ChevronRight,
  Heart,
  Award,
  RefreshCw,
  Search,
  ShieldCheck,
  KeyRound,
  Check,
  AlertTriangle,
  ChevronLeft,
  FileText,
  Leaf,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const API_BASE = "https://moteligo.in/ecoback";
const WISHLIST_STORAGE_KEY = "eco_user_wishlist_ids";

/* Authorization Token Extractor */
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
    } catch {}
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

const resolveImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  const cleanBase = API_BASE.replace(/\/$/, "");
  const cleanUrl = url.startsWith("/") ? url : `/${url}`;
  return `${cleanBase}${cleanUrl}`;
};

const extractStringVal = (val, fallback = "") => {
  if (!val) return fallback;
  if (typeof val === "string") return val;
  if (typeof val === "number") return String(val);
  if (typeof val === "object") {
    return val.value || val.name || val.title || val.variantName || val.label || fallback;
  }
  return fallback;
};

const normalizeOrderStatus = (ord) => {
  const rawStatus = String(
    ord?.status ||
    ord?.orderStatus ||
    ord?.fulfillmentStatus ||
    ord?.deliveryStatus ||
    "PROCESSING"
  ).toUpperCase();

  if (rawStatus.includes("DELIVER") || rawStatus.includes("COMPLET")) return "DELIVERED";
  if (rawStatus.includes("CANCEL")) return "CANCELLED";
  if (rawStatus.includes("PENDING")) return "PENDING";
  if (rawStatus.includes("DISPATCH") || rawStatus.includes("TRANSIT") || rawStatus.includes("SHIP")) return "IN_TRANSIT";
  return rawStatus || "PROCESSING";
};

const calculateOrderDetails = (ord) => {
  const itemsArray = Array.isArray(ord?.items)
    ? ord.items
    : Array.isArray(ord?.products)
    ? ord.products
    : Array.isArray(ord?.orderItems)
    ? ord.orderItems
    : Array.isArray(ord?.cartItems)
    ? ord.cartItems
    : [];

  let computedSum = 0;

  const normalizedItems = itemsArray.map((item, idx) => {
    const pName = extractStringVal(item?.productName || item?.name || item?.product?.name || item?.title || item?.product?.title || item?.product, "Organic Product");
    const vName = extractStringVal(item?.variantName || item?.variant || item?.weight || item?.selectedVariant, "Standard Pack");
    const qty = Number(item?.quantity || item?.qty || item?.count || 1);
    
    const rawPrice = Number(item?.price || item?.unitPrice || item?.product?.price || 0);
    const itemTot = Number(item?.itemTotal || item?.totalPrice || item?.total) || (rawPrice * qty);
    const unitPrice = rawPrice > 0 ? rawPrice : itemTot > 0 ? Math.round(itemTot / qty) : 0;

    computedSum += (itemTot > 0 ? itemTot : unitPrice * qty);

    const imgSrc = extractStringVal(item?.image || item?.product?.image || item?.img, "https://images.unsplash.com/photo-1589927986076-2d5f07d5c1f4?w=150&auto=format&fit=crop&q=80");
    const pId = String(item?.productId || item?.product?._id || item?.product?.id || item?._id || item?.id || `item-${idx}`);

    return {
      _id: pId,
      productId: pId,
      productName: String(pName),
      variantName: String(vName),
      quantity: qty,
      unitPrice: unitPrice,
      itemTotal: itemTot > 0 ? itemTot : unitPrice * qty,
      image: imgSrc,
      rawItem: item,
    };
  });

  const rawGrandTotal = Number(
    ord?.totalAmount ??
    ord?.pricing?.totalPrice ??
    ord?.pricing?.total ??
    ord?.grandTotal ??
    ord?.totalPrice ??
    ord?.total ??
    0
  );

  const finalGrandTotal = rawGrandTotal > 0 ? rawGrandTotal : computedSum;

  return {
    normalizedItems,
    finalGrandTotal,
    status: normalizeOrderStatus(ord),
  };
};

export default function MyAccountPage() {
  const { addToCart, cartItems = [] } = useCart();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  // CHECK IF ITEM IS ALREADY IN CART
  const checkIsInCart = (item) => {
    if (!cartItems || !Array.isArray(cartItems)) return false;

    const targetIds = [
      item?._id,
      item?.id,
      item?.productId,
      item?.slug,
      item?.rawProduct?._id,
      item?.rawProduct?.id,
    ]
      .filter(Boolean)
      .map((id) => String(id).toLowerCase().trim());

    if (targetIds.length === 0) return false;

    return cartItems.some((c) => {
      const pObj = typeof c?.productId === "object" ? c?.productId : null;
      const rObj = typeof c?.rawProduct === "object" ? c?.rawProduct : null;

      const cartCandidateIds = [
        c?.itemId,
        c?.id,
        c?.productId,
        c?.slug,
        pObj?._id,
        pObj?.id,
        pObj?.slug,
        rObj?._id,
        rObj?.id,
        rObj?.slug,
      ]
        .filter((val) => val && typeof val !== "object")
        .map((id) => String(id).toLowerCase().trim());

      return targetIds.some((tId) => cartCandidateIds.includes(tId));
    });
  };

  // CUSTOM TOAST STATE
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3500);
  };

  // CUSTOM CONFIRM MODAL STATE
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    onConfirm: null,
  });

  const openConfirm = (title, message, confirmText, onConfirm) => {
    setConfirmModal({ open: true, title, message, confirmText, onConfirm });
  };

  // USER & FORM STATES
  const [user, setUser] = useState({
    _id: "",
    name: "User",
    email: "",
    phone: "",
    gender: "Male",
    joinedDate: "2026",
    rewardPoints: 0,
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(user);

  // ORDERS & PAGINATION STATES (5 ORDERS PER PAGE)
  const [orders, setOrders] = useState([]);
  const [orderFilter, setOrderFilter] = useState("ALL");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [orderPage, setOrderPage] = useState(1);
  const ordersPerPage = 5;

  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState(null);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState(null);

  // RESET PAGE NUMBER WHEN FILTER OR SEARCH CHANGES
  useEffect(() => {
    setOrderPage(1);
  }, [orderFilter, orderSearchQuery]);

  // AUTO TRIGGER DIRECT BROWSER PRINT WHEN TAX INVOICE IS CLICKED
  useEffect(() => {
    if (selectedOrderForInvoice) {
      const timer = setTimeout(() => {
        window.print();
        setSelectedOrderForInvoice(null);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [selectedOrderForInvoice]);

  // WISHLIST & ADDRESS STATES
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
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

  // WALLET & SECURITY FORM
  const [walletHistory, setWalletHistory] = useState([]);
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saving, setSaving] = useState(false);

  /* ================== FETCH LIVE DATA WITH PERSISTENT WISHLIST POPULATOR ================== */
  const fetchAllAccountData = async () => {
    setLoading(true);
    const token = getAuthToken();

    if (!token && typeof window !== "undefined") {
      // eslint-disable-next-line
      window.location.href = "/login?redirect=/my-account";
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    try {
      // 1. GET PROFILE
      try {
        const profileRes = await fetch(`${API_BASE}/api/users/profile`, { headers });
        const profileJson = await profileRes.json();
        const userData = profileJson?.data || profileJson?.user || profileJson;
        if (userData?.email || userData?.name) {
          const formattedUser = {
            _id: String(userData._id || userData.id || ""),
            name: extractStringVal(userData.name || userData.fullName, "Valued Customer"),
            email: extractStringVal(userData.email, ""),
            phone: extractStringVal(userData.phone || userData.mobile, ""),
            gender: extractStringVal(userData.gender, "Male"),
            joinedDate: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "2026",
            rewardPoints: Number(userData.rewardPoints || userData.walletBalance || 0),
          };
          setUser(formattedUser);
          setProfileForm(formattedUser);
        }
      } catch (err) {
        console.warn("Profile API Fetch fallback:", err);
      }

      // 2. GET ORDERS
      try {
        const ordersRes = await fetch(`${API_BASE}/api/orders/my-orders`, { headers });
        const ordersJson = await ordersRes.json();
        const ordersList = ordersJson?.data || ordersJson?.orders || [];
        if (Array.isArray(ordersList)) {
          setOrders(ordersList);
        }
      } catch (err) {
        console.warn("Orders API Fetch fallback:", err);
      }

      // 3. GET ADDRESSES
      try {
        const addrRes = await fetch(`${API_BASE}/api/addresses`, { headers });
        const addrJson = await addrRes.json();
        const addrList = addrJson?.data || addrJson?.addresses || [];
        if (Array.isArray(addrList)) {
          setAddresses(addrList);
        }
      } catch (err) {
        console.warn("Addresses API Fetch fallback:", err);
      }

      // 4. GET WISHLIST WITH DEEP CATALOG POPULATOR & STOCK CHECKER
      try {
        const wishRes = await fetch(`${API_BASE}/api/wishlist`, { headers });
        const wishJson = await wishRes.json();
        const wishListRaw = wishJson?.data || wishJson?.wishlist || wishJson?.items || wishJson?.products || [];

        const localSavedIds = (() => {
          try {
            const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
          } catch {
            return [];
          }
        })();

        const apiIds = Array.isArray(wishListRaw)
          ? wishListRaw.map((wItem) => {
              if (typeof wItem === "string") return wItem;
              return wItem?._id || wItem?.id || wItem?.productId || wItem?.product?._id || wItem?.product;
            }).filter(Boolean).map((id) => String(id).toLowerCase().trim())
          : [];

        const combinedIds = Array.from(new Set([...apiIds, ...localSavedIds]));

        if (combinedIds.length > 0) {
          let allPublicProducts = [];
          try {
            const prodRes = await fetch(`${API_BASE}/api/products/public?limit=1000`);
            const prodJson = await prodRes.json();
            allPublicProducts = prodJson?.data || [];
          } catch {}

          const formattedWishlist = combinedIds.map((pId) => {
            const matchedP = allPublicProducts.find(
              (p) => String(p._id || p.id || p.slug).toLowerCase().trim() === String(pId).toLowerCase().trim()
            );

            const prodName = extractStringVal(matchedP?.name, "Pure Organic Product");
            const prodPrice = Number(matchedP?.payablePrice ?? matchedP?.price ?? matchedP?.originalPrice ?? 499);
            const prodMrp = Number(matchedP?.originalPrice ?? prodPrice);

            const totalStock = typeof matchedP?.totalStock === "number" ? matchedP.totalStock : (matchedP?.stock ?? 1);
            const inStock = totalStock > 0 && matchedP?.status !== "OUT_OF_STOCK" && matchedP?.inStock !== false;

            const imgs = matchedP?.productImages || matchedP?.images || [];
            const img1Raw = typeof imgs[0] === "string" ? imgs[0] : imgs[0]?.image || imgs[0]?.url;
            const prodImg = resolveImageUrl(img1Raw) || "https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=200&auto=format&fit=crop&q=80";

            return {
              _id: pId,
              id: pId,
              productId: pId,
              name: prodName,
              price: prodPrice,
              originalPrice: prodMrp,
              inStock: inStock,
              image: prodImg,
              rawProduct: matchedP || { _id: pId, name: prodName, price: prodPrice, totalStock },
            };
          });

          setWishlist(formattedWishlist);
        } else {
          setWishlist([]);
        }
      } catch (err) {
        console.warn("Wishlist API Fetch fallback:", err);
      }

      // 5. GET WALLET
      try {
        const walletRes = await fetch(`${API_BASE}/api/wallet`, { headers });
        const walletJson = await walletRes.json();
        if (walletJson?.data) {
          if (walletJson.data.balance !== undefined) {
            setUser((prev) => ({ ...prev, rewardPoints: Number(walletJson.data.balance || 0) }));
          }
          if (Array.isArray(walletJson.data.history)) {
            setWalletHistory(walletJson.data.history);
          }
        }
      } catch (err) {
        console.warn("Wallet API Fetch fallback:", err);
      }

    } catch (globalErr) {
      console.error("Account panel fetch error:", globalErr);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAccountData();
  }, []);

  /* ================== ACTION HANDLERS ================== */

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    const token = getAuthToken();

    try {
      const targetId = user._id || "profile";
      const res = await fetch(`${API_BASE}/api/users/${targetId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profileForm.name,
          phone: profileForm.phone,
          gender: profileForm.gender,
        }),
      });
      const data = await res.json();
      if (res.ok || data?.status) {
        setUser(profileForm);
        setIsEditingProfile(false);
        showToast("Profile details updated successfully!", "success");
      } else {
        showToast(data?.message || "Failed to update profile.", "error");
      }
    } catch (err) {
      showToast("Network error updating profile.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSecurity = async (e) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      showToast("New Passwords do not match!", "error");
      return;
    }
    setSaving(true);
    const token = getAuthToken();

    try {
      const res = await fetch(`${API_BASE}/api/users/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: securityForm.currentPassword,
          newPassword: securityForm.newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok || data?.status) {
        setSecurityForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        showToast("Password updated successfully!", "success");
      } else {
        showToast(data?.message || "Password update failed.", "error");
      }
    } catch (err) {
      showToast("Network error changing password.", "error");
    } finally {
      setSaving(false);
    }
  };

  const triggerCancelOrder = (orderId) => {
    openConfirm(
      "Cancel Order?",
      "Are you sure you want to cancel this order? This action cannot be undone.",
      "Yes, Cancel Order",
      async () => {
        const token = getAuthToken();
        try {
          const res = await fetch(`${API_BASE}/api/orders/${orderId}/cancel`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (res.ok || data?.status) {
            setOrders((prev) =>
              prev.map((o) => (o._id === orderId ? { ...o, status: "CANCELLED" } : o))
            );
            showToast("Order has been cancelled.", "info");
          } else {
            showToast(data?.message || "Failed to cancel order.", "error");
          }
        } catch (err) {
          showToast("Network error cancelling order.", "error");
        }
      }
    );
  };

  const handleReorder = (order) => {
    const details = calculateOrderDetails(order);
    if (Array.isArray(details.normalizedItems) && details.normalizedItems.length > 0) {
      details.normalizedItems.forEach((item) => {
        if (addToCart) {
          addToCart({
            _id: item.productId,
            id: item.productId,
            productId: item.productId,
            name: item.productName,
            productName: item.productName,
            price: item.unitPrice,
            originalPrice: item.unitPrice,
            image: item.image,
            selectedVariant: item.variantName,
            variant: item.variantName,
            quantity: item.quantity || 1,
          });
        }
      });
      showToast(`Items from Order #${order.orderNumber || order._id} added to cart!`, "success");
    }
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
    setAddrForm({
      fullName: extractStringVal(addr.fullName, user.name),
      phone: extractStringVal(addr.phone, user.phone),
      addressLine1: extractStringVal(addr.addressLine1, ""),
      addressLine2: extractStringVal(addr.addressLine2, ""),
      city: extractStringVal(addr.city, ""),
      state: extractStringVal(addr.state, ""),
      pincode: extractStringVal(addr.pincode, ""),
      type: extractStringVal(addr.type, "Home"),
      isDefault: Boolean(addr.isDefault),
    });
    setAddressModalOpen(true);
  };

  const handleSaveAddressSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      if (editingAddr) {
        const res = await fetch(`${API_BASE}/api/addresses/${editingAddr._id || editingAddr.id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(addrForm),
        });
        if (res.ok) {
          showToast("Address updated successfully!", "success");
          fetchAllAccountData();
        }
      } else {
        const res = await fetch(`${API_BASE}/api/addresses`, {
          method: "POST",
          headers,
          body: JSON.stringify(addrForm),
        });
        if (res.ok) {
          showToast("New address added!", "success");
          fetchAllAccountData();
        }
      }
    } catch (err) {
      showToast("Address saved locally.", "info");
    } finally {
      setAddressModalOpen(false);
    }
  };

  const triggerDeleteAddress = (id) => {
    openConfirm(
      "Delete Address?",
      "Are you sure you want to remove this shipping address?",
      "Delete Address",
      async () => {
        const token = getAuthToken();
        try {
          const res = await fetch(`${API_BASE}/api/addresses/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            setAddresses((prev) => prev.filter((a) => (a._id || a.id) !== id));
            showToast("Address deleted.", "info");
          }
        } catch (err) {
          setAddresses((prev) => prev.filter((a) => (a._id || a.id) !== id));
          showToast("Address removed.", "info");
        }
      }
    );
  };

  const handleSetDefaultAddress = async (id) => {
    const token = getAuthToken();
    try {
      await fetch(`${API_BASE}/api/addresses/${id}/default`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses((prev) =>
        prev.map((a) => ({ ...a, isDefault: (a._id || a.id) === id }))
      );
      showToast("Default address updated!", "success");
    } catch (err) {
      setAddresses((prev) =>
        prev.map((a) => ({ ...a, isDefault: (a._id || a.id) === id }))
      );
    }
  };

  const handleRemoveWishlist = async (productId) => {
    const token = getAuthToken();
    const cleanId = String(productId).toLowerCase().trim();

    try {
      const localSaved = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]");
      const updatedLocal = localSaved.filter((id) => String(id).toLowerCase().trim() !== cleanId);
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updatedLocal));
    } catch {}

    setWishlist((prev) => prev.filter((w) => String(w._id || w.id || w.productId).toLowerCase().trim() !== cleanId));

    try {
      await fetch(`${API_BASE}/api/wishlist/remove/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("Item removed from wishlist.", "info");
    } catch (err) {
      showToast("Item removed from wishlist.", "info");
    }
  };

  const triggerLogout = () => {
    openConfirm(
      "Logout Account?",
      "Are you sure you want to sign out from your Ecoensa account?",
      "Yes, Logout",
      () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("token");
        localStorage.removeItem("userToken");
        localStorage.removeItem(WISHLIST_STORAGE_KEY);
        localStorage.clear();
        // eslint-disable-next-line
        window.location.href = "/login";
      }
    );
  };

  const filteredOrders = orders
    .filter((o) => {
      const orderDetails = calculateOrderDetails(o);
      if (orderFilter === "ALL") return true;
      if (orderFilter === "PROCESSING") return orderDetails.status === "PROCESSING" || orderDetails.status === "IN_TRANSIT" || orderDetails.status === "PENDING";
      return orderDetails.status === orderFilter;
    })
    .filter((o) => {
      if (!orderSearchQuery.trim()) return true;
      const q = orderSearchQuery.toLowerCase();
      const num = String(o.orderNumber || o._id || "").toLowerCase();
      const details = calculateOrderDetails(o);
      return (
        num.includes(q) ||
        details.normalizedItems.some((i) => i.productName.toLowerCase().includes(q))
      );
    });

  // PAGINATION SLICE CALCULATIONS
  const totalFilteredOrders = filteredOrders.length;
  const totalOrderPages = Math.ceil(totalFilteredOrders / ordersPerPage) || 1;
  const indexOfLastOrder = orderPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrdersSlice = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      
      {/* BULLETPROOF PRINT CSS */}
      <style jsx global>{`
        @media print {
          .print\:hidden {
            display: none !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            height: auto !important;
            overflow: visible !important;
          }
          .min-h-screen {
            min-height: 0 !important;
            height: auto !important;
          }
          #printable-invoice-root {
            display: block !important;
            position: relative !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      `}</style>

      {/* 1. WEBSITE INTERFACE WRAPPER (HIDDEN DURING PRINT) */}
      <div className="print:hidden min-h-screen flex flex-col justify-between">
        
        {/* TOAST NOTIFICATION */}
        {toast.show && (
          <div className="fixed top-5 right-5 z-50 animate-bounce">
            <div
              className={`flex items-center space-x-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-xs font-black transition-all ${
                toast.type === "error"
                  ? "bg-red-50 text-red-800 border-red-200"
                  : toast.type === "info"
                  ? "bg-amber-50 text-amber-900 border-amber-200"
                  : "bg-emerald-50 text-[#046A38] border-emerald-200"
              }`}
            >
              {toast.type === "error" ? (
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              ) : (
                <CheckCircle className="w-5 h-5 text-[#046A38] shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
          </div>
        )}

        {/* CONFIRMATION DIALOG */}
        {confirmModal.open && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-center animate-scaleIn">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">{confirmModal.title}</h3>
                <p className="text-xs font-semibold text-slate-500">{confirmModal.message}</p>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <button
                  onClick={() => setConfirmModal({ ...confirmModal, open: false })}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setConfirmModal({ ...confirmModal, open: false });
                    if (confirmModal.onConfirm) confirmModal.onConfirm();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs cursor-pointer shadow-xs"
                >
                  {confirmModal.confirmText}
                </button>
              </div>
            </div>
          </div>
        )}

        <Header />

        <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1280px] mx-auto space-y-6">
            
            {/* TOP WELCOME BANNER */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-l-8 border-l-[#046A38]">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-[#046A38] text-white flex items-center justify-center text-2xl font-black shadow-md shrink-0">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                      Welcome back, {user.name} 👋
                    </h1>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                      <Award className="w-3 h-3 text-amber-600" />
                      <span>Gold Member</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                    {user.email} • Member since {user.joinedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto">
                {/* <div className="flex-1 md:flex-none bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl text-center">
                  <p className="text-[10px] font-black uppercase text-[#046A38]">Green Wallet</p>
                  <p className="text-lg font-black text-[#046A38]">₹{user.rewardPoints}</p>
                </div> */}
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
              
              {/* LEFT SIDEBAR */}
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

                {/* <button
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
                </button> */}

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
                    onClick={triggerLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-extrabold text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout Account</span>
                  </button>
                </div>
              </div>

              {/* RIGHT CONTENT PANEL */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                
                {loading ? (
                  <div className="py-20 text-center space-y-3">
                    <div className="w-8 h-8 border-4 border-[#046A38] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs font-black text-slate-500">Loading Account Details...</p>
                  </div>
                ) : (
                  <>
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

                    {/* TAB 2: MY ORDERS WITH 5-ORDERS PAGINATION */}
                    {activeTab === "orders" && (
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
                          <div>
                            <h2 className="text-lg font-black text-slate-900">Order History</h2>
                            <p className="text-xs font-semibold text-slate-500 mt-0.5">
                              Track deliveries, download invoices, and reorder favorites
                            </p>
                          </div>

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
                            In Transit ({orders.filter((o) => calculateOrderDetails(o).status !== "DELIVERED" && calculateOrderDetails(o).status !== "CANCELLED").length})
                          </button>
                          <button
                            onClick={() => setOrderFilter("DELIVERED")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                              orderFilter === "DELIVERED"
                                ? "bg-[#046A38] text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            Delivered ({orders.filter((o) => calculateOrderDetails(o).status === "DELIVERED").length})
                          </button>
                        </div>

                        <div className="space-y-4">
                          {currentOrdersSlice.length > 0 ? (
                            currentOrdersSlice.map((ord) => {
                              const details = calculateOrderDetails(ord);
                              const orderNum = extractStringVal(ord.orderNumber || ord._id, "ECO-ORDER");
                              const orderDate = ord.createdAt ? new Date(ord.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Recent";
                              const itemsList = details.normalizedItems;

                              return (
                                <div
                                  key={ord._id || orderNum}
                                  className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs"
                                >
                                  <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
                                    <div>
                                      <p className="text-sm font-black text-slate-900">
                                        Order #{orderNum}
                                      </p>
                                      <p className="text-[11px] font-semibold text-slate-500">
                                        Placed on {orderDate}
                                      </p>
                                    </div>

                                    <span
                                      className={`text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                                        details.status === "DELIVERED"
                                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                          : details.status === "CANCELLED"
                                          ? "bg-red-100 text-red-800 border border-red-300"
                                          : "bg-amber-100 text-amber-800 border border-amber-300"
                                      }`}
                                    >
                                      {details.status === "PROCESSING" || details.status === "IN_TRANSIT" ? "In Transit" : details.status}
                                    </span>
                                  </div>

                                  <div className="p-5 space-y-4 divide-y divide-slate-100">
                                    {itemsList.map((item, idx) => (
                                      <div key={item._id || idx} className="flex items-center space-x-4 pt-3 first:pt-0">
                                        <img
                                          src={item.image}
                                          alt={item.productName}
                                          className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-50"
                                        />
                                        <div className="flex-1">
                                          <h4 className="text-sm font-extrabold text-slate-900">
                                            {item.productName}
                                          </h4>
                                          <p className="text-xs font-semibold text-slate-500">
                                            Variant: {item.variantName} | Qty: {item.quantity}
                                          </p>
                                          <p className="text-xs font-black text-[#046A38] mt-0.5">
                                            ₹{item.itemTotal.toLocaleString("en-IN")} ({item.quantity} × ₹{item.unitPrice.toLocaleString("en-IN")})
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="px-5 py-3.5 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                    <div>
                                      <p className="text-xs font-semibold text-slate-500">
                                        Payment: <strong className="text-slate-800">{extractStringVal(ord.paymentMethod, "COD")}</strong>
                                      </p>
                                      <p className="text-xs font-black text-slate-900 mt-0.5">
                                        Total Amount: <span className="text-[#046A38] font-black text-sm">₹{details.finalGrandTotal.toLocaleString("en-IN")}</span>
                                      </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                                      {details.status === "DELIVERED" && (
                                        <button
                                          onClick={() => handleReorder(ord)}
                                          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:border-[#046A38] text-slate-700 hover:text-[#046A38] text-xs font-extrabold cursor-pointer transition-all"
                                        >
                                          <RefreshCw className="w-3.5 h-3.5" />
                                          <span>Re-order</span>
                                        </button>
                                      )}

                                      {(details.status === "PROCESSING" || details.status === "IN_TRANSIT" || details.status === "PENDING") && (
                                        <button
                                          onClick={() => triggerCancelOrder(ord._id)}
                                          className="px-3 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-extrabold cursor-pointer"
                                        >
                                          Cancel Order
                                        </button>
                                      )}

                                      {/* TAX INVOICE DIRECT PRINT BUTTON */}
                                      <button
                                        onClick={() => setSelectedOrderForInvoice(ord)}
                                        className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-extrabold cursor-pointer transition-all shadow-xs"
                                      >
                                        <FileText className="w-3.5 h-3.5 text-emerald-400" />
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
                              );
                            })
                          ) : (
                            <div className="text-center py-12 space-y-3">
                              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                              <p className="text-sm font-extrabold text-slate-700">No orders found</p>
                              <p className="text-xs text-slate-400">Place an order from our shop to view order history</p>
                            </div>
                          )}

                          {/* ORDER HISTORY PAGINATION BAR */}
                          {totalOrderPages > 1 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                              <span className="text-xs font-extrabold text-slate-500">
                                Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, totalFilteredOrders)} of {totalFilteredOrders} Orders
                              </span>

                              <div className="flex items-center space-x-1.5">
                                <button
                                  disabled={orderPage === 1}
                                  onClick={() => setOrderPage((prev) => Math.max(1, prev - 1))}
                                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-extrabold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer transition-all flex items-center space-x-1"
                                >
                                  <ChevronLeft className="w-3.5 h-3.5" />
                                  <span>Prev</span>
                                </button>

                                {[...Array(totalOrderPages)].map((_, idx) => {
                                  const pNum = idx + 1;
                                  return (
                                    <button
                                      key={pNum}
                                      onClick={() => setOrderPage(pNum)}
                                      className={`w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                        orderPage === pNum
                                          ? "bg-[#046A38] text-white shadow-xs"
                                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                      }`}
                                    >
                                      {pNum}
                                    </button>
                                  );
                                })}

                                <button
                                  disabled={orderPage === totalOrderPages}
                                  onClick={() => setOrderPage((prev) => Math.min(totalOrderPages, prev + 1))}
                                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-extrabold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer transition-all flex items-center space-x-1"
                                >
                                  <span>Next</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* TAB 3: DYNAMIC WISHLIST TAB */}
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
                            {wishlist.map((item) => {
                              const wishId = item._id || item.id || item.productId;
                              const isInCart = checkIsInCart(item);

                              return (
                                <div
                                  key={wishId}
                                  className="border border-slate-200 rounded-2xl p-4 flex items-center space-x-4 bg-white relative group shadow-xs hover:border-[#046A38] transition-all"
                                >
                                  <div className="relative w-20 h-20 shrink-0">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full rounded-xl object-cover border border-slate-200 bg-slate-50"
                                    />
                                    {!item.inStock && (
                                      <span className="absolute inset-0 bg-black/40 backdrop-blur-[1px] rounded-xl flex items-center justify-center text-[9px] font-black text-white uppercase text-center p-0.5">
                                        Out of Stock
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex-1 space-y-1">
                                    <h4 className="text-xs font-black text-slate-900 line-clamp-2">
                                      {item.name}
                                    </h4>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm font-black text-[#046A38]">₹{item.price.toLocaleString("en-IN")}</span>
                                      {item.originalPrice > item.price && (
                                        <span className="text-xs font-semibold text-slate-400 line-through">₹{item.originalPrice.toLocaleString("en-IN")}</span>
                                      )}
                                    </div>

                                    {!item.inStock ? (
                                      <button
                                        disabled
                                        className="mt-2 w-full py-1.5 rounded-lg bg-slate-200 text-slate-500 text-xs font-extrabold cursor-not-allowed flex items-center justify-center space-x-1"
                                      >
                                        <ShoppingBag className="w-3.5 h-3.5 opacity-50" />
                                        <span>Out of Stock</span>
                                      </button>
                                    ) : isInCart ? (
                                      <button
                                        disabled
                                        className="mt-2 w-full py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-extrabold cursor-default flex items-center justify-center space-x-1 shadow-xs"
                                      >
                                        <Check className="w-3.5 h-3.5" />
                                        <span>Already in Cart</span>
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          if (addToCart) {
                                            addToCart(item.rawProduct || item, 1);
                                          }
                                          showToast(`Added ${item.name} to cart!`, "success");
                                        }}
                                        className="mt-2 w-full py-1.5 rounded-lg bg-[#046A38] hover:bg-emerald-800 text-white text-xs font-extrabold cursor-pointer shadow-xs transition-all flex items-center justify-center space-x-1"
                                      >
                                        <ShoppingBag className="w-3.5 h-3.5" />
                                        <span>Add to Cart</span>
                                      </button>
                                    )}
                                  </div>

                                  <button
                                    onClick={() => handleRemoveWishlist(wishId)}
                                    className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-600 cursor-pointer transition-colors"
                                    title="Remove item"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              );
                            })}
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
                    {/* {activeTab === "rewards" && (
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
                            {walletHistory.length > 0 ? (
                              walletHistory.map((item, idx) => (
                                <div key={idx} className="p-4 flex items-center justify-between text-xs">
                                  <div>
                                    <strong className="text-slate-900">{extractStringVal(item.description || item.title, "Reward Points")}</strong>
                                    <p className="text-[11px] text-slate-400 font-semibold">{extractStringVal(item.date, "Recent")}</p>
                                  </div>
                                  <span className={`font-black ${item.points > 0 ? "text-[#046A38]" : "text-red-600"}`}>
                                    {item.points > 0 ? `+${item.points}` : item.points} Green Points
                                  </span>
                                </div>
                              ))
                            ) : (
                              <div className="p-4 text-center text-xs font-semibold text-slate-500">
                                No recent wallet transactions.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )} */}

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
                          {addresses.map((addr) => {
                            const addrId = addr._id || addr.id;
                            return (
                              <div
                                key={addrId}
                                className={`border rounded-2xl p-5 space-y-2 relative bg-white transition-all ${
                                  addr.isDefault
                                    ? "border-[#046A38] shadow-sm bg-emerald-50/20"
                                    : "border-slate-200"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                    {extractStringVal(addr.addressType || addr.type, "Home")}
                                  </span>
                                  {addr.isDefault && (
                                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                      Default Address
                                    </span>
                                  )}
                                </div>

                                <h3 className="text-sm font-black text-slate-900">{extractStringVal(addr.fullName, user.name)}</h3>
                                <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                                  {extractStringVal(addr.addressLine1, "")}, {addr.addressLine2 ? `${extractStringVal(addr.addressLine2, "")}, ` : ""}
                                  {extractStringVal(addr.city, "")}, {extractStringVal(addr.state, "")} - {extractStringVal(addr.pincode, "")}
                                </p>
                                <p className="text-xs font-semibold text-slate-500">
                                  Phone: <strong className="text-slate-800">{extractStringVal(addr.phone, user.phone)}</strong>
                                </p>

                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                  {!addr.isDefault && (
                                    <button
                                      onClick={() => handleSetDefaultAddress(addrId)}
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
                                      onClick={() => triggerDeleteAddress(addrId)}
                                      className="p-1.5 text-slate-600 hover:text-red-600 cursor-pointer"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* TAB 6: SECURITY & PASSWORD */}
                    {activeTab === "security" && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-100 pb-4">
                          <h2 className="text-lg font-black text-slate-900">Security &amp; Password</h2>
                          <p className="text-xs font-semibold text-slate-500 mt-0.5">
                            Update your account password and review active security protection
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
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
                  </>
                )}

              </div>
            </div>
          </div>
        </main>

        <Footer />

        {/* MODAL 1: LIVE ORDER TRACKING */}
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
                  <p className="text-xs font-black text-slate-900">{extractStringVal(selectedOrderForTracking.courierPartner, "BlueDart / Delhivery")}</p>
                  <p className="text-[11px] font-semibold text-slate-500">AWB: {extractStringVal(selectedOrderForTracking.trackingNumber || selectedOrderForTracking._id, "N/A")}</p>
                </div>
                <span className="text-[11px] font-black px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                  Est. {extractStringVal(selectedOrderForTracking.estimatedDelivery, "3 to 5 Days")}
                </span>
              </div>

              <div className="space-y-4 px-2">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#046A38] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-slate-900">Order Placed &amp; Confirmed</p>
                    <p className="text-[11px] font-semibold text-slate-500">Payment Verified</p>
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

        {/* MODAL 3: ADD/EDIT ADDRESS MODAL */}
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

      {/* 2. EXCLUSIVE PRINT-ONLY TAX INVOICE CONTAINER */}
      {selectedOrderForInvoice && (
        <div id="printable-invoice-root" className="hidden print:block bg-white text-slate-800 font-sans p-2">
          <div className="w-full bg-white p-6 rounded-2xl border border-slate-300 text-slate-800 space-y-6 relative overflow-hidden">
            
            {/* SUBTLE WATERMARK */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none z-0">
              <div className="text-center transform -rotate-45">
                <span className="text-8xl font-serif font-black tracking-widest text-[#046A38] uppercase block">
                  ECOENSA
                </span>
                <span className="text-xl font-sans font-extrabold tracking-[0.3em] text-slate-900 uppercase block mt-2">
                  100% CERTIFIED ORGANIC
                </span>
              </div>
            </div>

            {/* INVOICE CONTENT */}
            <div className="relative z-10 space-y-6">
              
              {/* HEADER */}
              <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#046A38] to-emerald-800 text-white flex items-center justify-center shadow-xs shrink-0">
                      <Leaf className="w-6 h-6 text-amber-300" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-serif font-black text-[#046A38] tracking-tight">
                        Ecoensa Natural &amp; Organic
                      </h1>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                        100% Certified Organic Foods
                      </p>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 font-semibold space-y-0.5 pt-1">
                    <p><strong>GSTIN:</strong> 29AAAAA0000A1Z5 | <strong>FSSAI Lic:</strong> 10020022001234</p>
                    <p>Sector 62, Ecoensa Plaza, Green Tech Park, New Delhi - 110001</p>
                    <p>Support: support@ecoensa.com | Toll-Free: +91 1800 123 4567</p>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-md tracking-widest uppercase inline-block">
                    TAX INVOICE
                  </span>
                  <div className="text-[11px] text-slate-600 font-bold space-y-0.5 pt-1">
                    <p className="text-slate-900 font-black text-xs">
                      Invoice #: <span className="text-[#046A38]">#ECO-INV-{String(selectedOrderForInvoice._id || "").slice(-8).toUpperCase()}</span>
                    </p>
                    <p>Order #: {extractStringVal(selectedOrderForInvoice.orderNumber || selectedOrderForInvoice._id, "ECO")}</p>
                    <p>Invoice Date: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                    <p>Payment Mode: <strong className="text-slate-900 uppercase">{extractStringVal(selectedOrderForInvoice.paymentMethod, "COD")} (PAID)</strong></p>
                  </div>
                </div>
              </div>

              {/* BILLED TO & SHIPPED TO */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-[11px]">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase text-[#046A38] tracking-wider">BILLED TO (CUSTOMER)</p>
                  <h4 className="text-xs font-black text-slate-900">{user.name}</h4>
                  <p className="text-slate-600 font-semibold">Phone: {user.phone || "Registered Contact"}</p>
                  <p className="text-slate-600 font-semibold">Email: {user.email}</p>
                </div>

                <div className="space-y-1 border-l border-slate-200 pl-4">
                  <p className="text-[9px] font-black uppercase text-[#046A38] tracking-wider">SHIPPING LOCATION</p>
                  <p className="text-slate-800 font-bold">
                    {extractStringVal(selectedOrderForInvoice.shippingAddress?.fullName || selectedOrderForInvoice.shippingAddress?.name, user.name)}
                  </p>
                  <p className="text-slate-600 font-semibold leading-tight">
                    {extractStringVal(selectedOrderForInvoice.shippingAddress?.addressLine1 || selectedOrderForInvoice.shippingAddress?.address, "Default Delivery Address")},{" "}
                    {selectedOrderForInvoice.shippingAddress?.city ? `${selectedOrderForInvoice.shippingAddress.city}, ` : ""}
                    {selectedOrderForInvoice.shippingAddress?.state ? `${selectedOrderForInvoice.shippingAddress.state} - ` : ""}
                    {selectedOrderForInvoice.shippingAddress?.pincode || ""}
                  </p>
                </div>
              </div>

              {/* PARTICULAR ITEMS TABLE */}
              <div>
                <table className="w-full text-left border-collapse border border-slate-200 text-[11px]">
                  <thead>
                    <tr className="bg-[#046A38] text-white text-[10px] font-black uppercase tracking-wider">
                      <th className="p-2 border-r border-emerald-800 w-8 text-center">#</th>
                      <th className="p-2 border-r border-emerald-800">Item Particulars</th>
                      <th className="p-2 border-r border-emerald-800 text-center">HSN</th>
                      <th className="p-2 border-r border-emerald-800 text-center">Qty</th>
                      <th className="p-2 border-r border-emerald-800 text-right">Unit Price</th>
                      <th className="p-2 border-r border-emerald-800 text-center">GST %</th>
                      <th className="p-2 text-right">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-semibold text-slate-800">
                    {calculateOrderDetails(selectedOrderForInvoice).normalizedItems.map((item, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                        <td className="p-2 text-center border-r border-slate-200 font-bold">{idx + 1}</td>
                        <td className="p-2 border-r border-slate-200">
                          <strong className="text-slate-900 block font-bold">{item.productName}</strong>
                          <span className="text-[10px] text-slate-500 font-semibold">Variant: {item.variantName}</span>
                        </td>
                        <td className="p-2 text-center border-r border-slate-200 text-slate-500 font-bold">2106</td>
                        <td className="p-2 text-center border-r border-slate-200 font-black">{item.quantity}</td>
                        <td className="p-2 text-right border-r border-slate-200 font-bold">₹{item.unitPrice.toLocaleString("en-IN")}.00</td>
                        <td className="p-2 text-center border-r border-slate-200 text-slate-500 font-bold">5% (Incl)</td>
                        <td className="p-2 text-right font-black text-slate-900">₹{item.itemTotal.toLocaleString("en-IN")}.00</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CALCULATION & PAYMENT SUMMARY */}
              <div className="grid grid-cols-2 gap-4 pt-1 items-start">
                <div className="space-y-2 bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 text-[10px]">
                  <div className="flex items-center space-x-1.5 text-[#046A38] font-black">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Payment Authorization: COMPLETED</span>
                  </div>
                  <p className="text-slate-600 font-semibold leading-tight">
                    Thank you for purchasing 100% natural and organic products with Ecoensa! This invoice represents official proof of payment.
                  </p>
                  <div className="pt-1.5 border-t border-emerald-200 text-[9px] text-slate-500 font-semibold space-y-0.5">
                    <p><strong>Terms:</strong> 1. Goods once sold can be returned within 5 days of delivery.</p>
                    <p>2. All disputes subject to New Delhi State Jurisdiction only.</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-[11px] font-bold text-slate-700">
                  <div className="flex justify-between items-center">
                    <span>Items Subtotal:</span>
                    <span>₹{calculateOrderDetails(selectedOrderForInvoice).finalGrandTotal.toLocaleString("en-IN")}.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Shipping &amp; Express Handling:</span>
                    <span className="text-[#046A38] font-black">FREE (₹0.00)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Estimated Taxes (GST 5% Included):</span>
                    <span>₹{Math.round(calculateOrderDetails(selectedOrderForInvoice).finalGrandTotal * 0.05).toLocaleString("en-IN")}.00</span>
                  </div>

                  <div className="pt-2 border-t-2 border-slate-900 flex justify-between items-center text-slate-900 text-sm font-black">
                    <span>Grand Total Paid:</span>
                    <span className="text-[#046A38]">₹{calculateOrderDetails(selectedOrderForInvoice).finalGrandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* FOOTER E-STAMP AUTHORIZATION */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] font-semibold text-slate-500">
                <div>
                  <p className="text-slate-900 font-extrabold">Ecoensa Corporate Head Office</p>
                  <p className="text-[9px]">This is a Computer Generated Tax Invoice document. No physical signature required.</p>
                </div>

                <div className="text-right">
                  <div className="border border-emerald-300 bg-emerald-50 px-3 py-1 rounded-lg inline-block text-[10px] font-black text-[#046A38] uppercase">
                    Verified Tax Invoice ✓
                  </div>
                  <p className="text-[9px] text-slate-400 mt-0.5">Ecoensa Natural &amp; Organic Ltd.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}