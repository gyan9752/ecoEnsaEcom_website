
// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState, useEffect, Suspense } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { Star, Heart, ShoppingBag, Check, Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
// import { useCart } from "../context/CartContext";

// // ==========================================
// // 100% LIVE API BASE CONFIGURATION
// const API_BASE = "https://moteligo.in/ecoback";
// // ==========================================

// const fallbackSVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='100%' height='100%' fill='%23E2E8F0'/><text x='50%' y='50%' font-size='20' font-weight='bold' fill='%23046A38' dominant-baseline='middle' text-anchor='middle'>Ecoensa Product</text></svg>";

// const resolveImageUrl = (path) => {
//   if (!path) return null;
//   if (path.startsWith("http")) return path;
//   const normalizedBase = API_BASE.replace(/\/$/, "");
//   const normalizedPath = path.startsWith("/") ? path : `/${path}`;
//   return `${normalizedBase}${normalizedPath}`;
// };

// function ShopContent() {
//   const searchParams = useSearchParams();
//   const currentCategory = searchParams.get("category") || "all";

//   /* Derived state without synchronous useEffect setState warning */
//   const [selectedCatFilter, setSelectedCatFilter] = useState(null);
//   const activeCategory = selectedCatFilter ?? currentCategory;

//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("featured");
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(5000);
//   const [stockFilter, setStockFilter] = useState("all");

//   const [wishlist, setWishlist] = useState([]);

//   const [productsList, setProductsList] = useState([]);
//   const [categoriesList, setCategoriesList] = useState([{ id: "all", label: "All Products" }]);
//   const [loading, setLoading] = useState(true);

//   const { cartItems, addToCart } = useCart();

//   /* Helper to check if item is already in cart */
//   const checkIsInCart = (product) => {
//     if (!cartItems || !Array.isArray(cartItems)) return false;
//     const targetId = String(product.id || product.slug || product.rawProduct?._id || product.rawProduct?.id);
//     return cartItems.some((c) => {
//       const cId = String(c._id || c.id || c.slug);
//       return cId === targetId;
//     });
//   };

//   /* Fetch live products and categories from backend API (limit=1000) */
//   useEffect(() => {
//     async function fetchShopData() {
//       try {
//         setLoading(true);

//         const [collectionsRes, productsRes] = await Promise.all([
//           fetch(`${API_BASE}/api/collections/visible`),
//           fetch(`${API_BASE}/api/products/public?limit=1000`),
//         ]);

//         const collectionsJson = await collectionsRes.json();
//         const productsJson = await productsRes.json();

//         /* Map categories */
//         if (collectionsJson?.status && Array.isArray(collectionsJson?.data)) {
//           const fetchedCats = collectionsJson.data.map((col) => ({
//             id: col.slug || col._id,
//             label: col.name,
//             rawId: col._id,
//           }));
//           setCategoriesList([{ id: "all", label: "All Products" }, ...fetchedCats]);
//         }

//         /* Map products */
//         if (productsJson?.status && Array.isArray(productsJson?.data)) {
//           const transformed = productsJson.data.map((p) => {
//             const imgs = p.productImages || p.images || [];
//             const img1Raw = typeof imgs[0] === "string" ? imgs[0] : imgs[0]?.image || imgs[0]?.url;
//             const img2Raw = typeof imgs[1] === "string" ? imgs[1] : imgs[1]?.image || imgs[1]?.url;

//             const img1 = resolveImageUrl(img1Raw) || fallbackSVG;
//             const img2 = resolveImageUrl(img2Raw) || img1;

//             const discountVal = p.discountPercentage ?? p.discount ?? 0;
//             const colId = typeof p.collectionId === "object" ? p.collectionId?._id : p.collectionId;
//             const colSlug = typeof p.collectionId === "object" ? p.collectionId?.slug : undefined;

//             const totalStock = typeof p.totalStock === "number" ? p.totalStock : (p.stock ?? 1);

//             return {
//               id: p._id || p.id || p.slug,
//               slug: p.slug || p._id,
//               name: p.name,
//               categorySlug: colSlug || colId || "all",
//               collectionId: colId,
//               price: Number(p.payablePrice ?? p.originalPrice) || 0,
//               mrp: Number(p.originalPrice) || 0,
//               discountVal,
//               discount: `${discountVal}% OFF`,
//               rating: p.rating || 4.9,
//               reviews: p.reviews || 120,
//               inStock: totalStock > 0,
//               image: img1,
//               hoverImage: img2,
//               rawProduct: p,
//             };
//           });

//           setProductsList(transformed);
//         }
//       } catch (err) {
//         console.error("Failed to load shop data:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchShopData();
//   }, []);

//   // Filter Logic
//   let filteredProducts = productsList.filter((item) => {
//     const matchesCat =
//       activeCategory === "all" ||
//       item.categorySlug === activeCategory ||
//       String(item.collectionId) === String(activeCategory);

//     const matchesSearch = item.name
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
    
//     let matchesStock = true;
//     if (stockFilter === "in-stock") matchesStock = item.inStock === true;
//     if (stockFilter === "out-of-stock") matchesStock = item.inStock === false;

//     return (
//       matchesCat &&
//       matchesSearch &&
//       matchesPrice &&
//       matchesStock
//     );
//   });

//   // Sorting
//   if (sortBy === "price-low") {
//     filteredProducts.sort((a, b) => a.price - b.price);
//   } else if (sortBy === "price-high") {
//     filteredProducts.sort((a, b) => b.price - a.price);
//   } else if (sortBy === "rating") {
//     filteredProducts.sort((a, b) => b.rating - a.rating);
//   } else if (sortBy === "discount") {
//     filteredProducts.sort((a, b) => b.discountVal - a.discountVal);
//   }

//   const toggleWishlist = (id) => {
//     setWishlist((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const handleAddToCart = (product) => {
//     if (!product.inStock || checkIsInCart(product)) return;
//     addToCart(product.rawProduct || product, 1);
//   };

//   // TITLE CASE (FIRST LETTER CAPITAL ONLY)
//   const getPageHeading = () => {
//     if (activeCategory === "all") return "All Organic Products";
//     const found = categoriesList.find((c) => c.id === activeCategory);
//     return found ? found.label : "Our Products";
//   };

//   const resetAllFilters = () => {
//     setSelectedCatFilter("all");
//     setSearchQuery("");
//     setSortBy("featured");
//     setMinPrice(0);
//     setMaxPrice(5000);
//     setStockFilter("all");
//   };

//   return (
//     <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-8">
      
//       {/* HEADING BAR */}
//       <div className="border-b border-slate-200 pb-3 flex flex-wrap items-center justify-between gap-4">
//         <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
//           {getPageHeading()}
//         </h1>

//         <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
//           Showing {filteredProducts.length} Items
//         </span>
//       </div>

//       {/* MAIN LAYOUT: FILTER PANEL FIRST (LEFT 3 COLS), PRODUCTS SECOND (RIGHT 9 COLS) */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
//         {/* 1. LEFT SIDEBAR: ADVANCED FILTER PANEL (3 COLUMNS) */}
//         <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-6 sticky top-24">
          
//           <div className="flex items-center justify-between border-b border-slate-200 pb-3">
//             <h3 className="text-base font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
//               <SlidersHorizontal className="w-4 h-4 text-[#046A38]" />
//               <span>Refine Search</span>
//             </h3>
//             <button
//               onClick={resetAllFilters}
//               className="text-xs font-bold text-[#FF6B00] hover:underline cursor-pointer"
//             >
//               Reset All
//             </button>
//           </div>

//           {/* SEARCH INPUT */}
//           <div className="space-y-2">
//             <label className="text-xs font-black uppercase text-slate-700">Search Products</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search by name..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full px-3.5 py-2.5 pl-9 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
//               />
//               <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
//             </div>
//           </div>

//           {/* CATEGORIES RADIO LIST (DYNAMIC FROM BACKEND) */}
//           <div className="space-y-2 pt-1 border-t border-slate-100">
//             <label className="text-xs font-black uppercase text-slate-700 block">Product Category</label>
//             <div className="space-y-1.5 text-xs font-semibold text-slate-700 max-h-60 overflow-y-auto pr-1">
//               {categoriesList.map((cat) => (
//                 <label key={cat.id} className="flex items-center space-x-2.5 cursor-pointer hover:text-[#046A38] py-0.5">
//                   <input
//                     type="radio"
//                     name="category"
//                     value={cat.id}
//                     checked={activeCategory === cat.id}
//                     onChange={() => setSelectedCatFilter(cat.id)}
//                     className="accent-[#046A38] w-4 h-4 cursor-pointer"
//                   />
//                   <span className={activeCategory === cat.id ? "font-black text-[#046A38]" : "text-slate-700"}>
//                     {cat.label}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* SORT BY DROPDOWN */}
//           <div className="space-y-2 pt-2 border-t border-slate-100">
//             <label className="text-xs font-black uppercase text-slate-700 flex items-center space-x-1">
//               <ArrowUpDown className="w-3.5 h-3.5 text-[#046A38]" />
//               <span>Sort By</span>
//             </label>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 cursor-pointer"
//             >
//               <option value="featured">Featured / Default</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//               <option value="rating">Highest Customer Rating</option>
//               <option value="discount">Biggest Discount</option>
//             </select>
//           </div>

//           {/* DUAL-THUMB SINGLE TRACK PRICE SLIDER */}
//           <div className="space-y-3 pt-3 border-t border-slate-100">
//             <div className="flex items-center justify-between text-xs font-black">
//               <span className="uppercase text-slate-700">Price Budget:</span>
//               <span className="text-[#046A38] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
//                 ₹{minPrice} - ₹{maxPrice}
//               </span>
//             </div>

//             <div className="relative w-full h-6 flex items-center">
//               {/* Background Track */}
//               <div className="absolute w-full h-2 bg-slate-200 rounded-full" />
              
//               {/* Active Highlighted Range Bar */}
//               <div
//                 className="absolute h-2 bg-[#046A38] rounded-full"
//                 style={{
//                   left: `${(minPrice / 5000) * 100}%`,
//                   width: `${((maxPrice - minPrice) / 5000) * 100}%`,
//                 }}
//               />

//               {/* Min Price Thumb */}
//               <input
//                 type="range"
//                 min={0}
//                 max={5000}
//                 step={50}
//                 value={minPrice}
//                 onChange={(e) => {
//                   const val = Math.min(Number(e.target.value), maxPrice - 100);
//                   setMinPrice(val);
//                 }}
//                 className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#046A38] [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#046A38]"
//                 style={{ zIndex: minPrice > 4000 ? 5 : 3 }}
//               />

//               {/* Max Price Thumb */}
//               <input
//                 type="range"
//                 min={0}
//                 max={5000}
//                 step={50}
//                 value={maxPrice}
//                 onChange={(e) => {
//                   const val = Math.max(Number(e.target.value), minPrice + 100);
//                   setMaxPrice(val);
//                 }}
//                 className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF6B00] [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#FF6B00]"
//                 style={{ zIndex: 4 }}
//               />
//             </div>

//             <div className="flex justify-between text-[11px] font-extrabold text-slate-500">
//               <span>₹0</span>
//               <span>₹5,000</span>
//             </div>
//           </div>

//           {/* AVAILABILITY DROPDOWN */}
//           <div className="space-y-2 pt-3 border-t border-slate-100">
//             <label className="text-xs font-black uppercase text-slate-700">Stock Availability</label>
//             <select
//               value={stockFilter}
//               onChange={(e) => setStockFilter(e.target.value)}
//               className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 cursor-pointer"
//             >
//               <option value="all">All Items</option>
//               <option value="in-stock">In Stock Only</option>
//               <option value="out-of-stock">Out of Stock</option>
//             </select>
//           </div>

//           {/* GUARANTEE BADGE */}
//           <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center space-y-1">
//             <span className="text-xs font-black text-[#046A38] block">100% Organic & Fresh</span>
//             <p className="text-[11px] text-slate-600 font-medium">Directly harvested from Kerala organic farms.</p>
//           </div>

//         </div>

//         {/* 2. RIGHT COLUMN: PRODUCTS GRID (9 COLUMNS) */}
//         <div className="lg:col-span-9 space-y-6">
          
//           {loading ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//               {[1, 2, 3, 4, 5, 6].map((idx) => (
//                 <div key={idx} className="h-80 bg-slate-200 rounded-2xl animate-pulse" />
//               ))}
//             </div>
//           ) : filteredProducts.length === 0 ? (
//             <div className="py-16 text-center space-y-4 bg-white rounded-3xl border border-slate-200">
//               <p className="text-lg font-bold text-slate-700">No products match your selected filters.</p>
//               <button
//                 onClick={resetAllFilters}
//                 className="bg-[#FF6B00] text-white font-extrabold text-xs px-6 py-3 rounded-full cursor-pointer shadow-md"
//               >
//                 Reset All Filters
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//               {filteredProducts.map((item) => {
//                 const isLiked = wishlist.includes(item.id);
//                 const isInCart = checkIsInCart(item);

//                 return (
//                   <div
//                     key={item.id}
//                     className="group space-y-3 flex flex-col justify-between bg-white p-4.5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300"
//                   >
//                     {/* CLICKABLE IMAGE CONTAINER */}
//                     <div className="relative w-full aspect-square overflow-hidden bg-slate-100 rounded-xl">
//                       <Link href={`/products/${item.slug}`} className="block w-full h-full">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = fallbackSVG;
//                           }}
//                           className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 absolute inset-0"
//                         />
//                         <img
//                           src={item.hoverImage}
//                           alt={item.name}
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = fallbackSVG;
//                           }}
//                           className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0"
//                         />
//                       </Link>

//                       {/* DISCOUNT / OUT OF STOCK BADGE */}
//                       <div className="absolute top-2 left-2 z-10 pointer-events-none">
//                         {!item.inStock ? (
//                           <span className="bg-red-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-md shadow-xs">
//                             Out of Stock
//                           </span>
//                         ) : (
//                           item.discountVal > 0 && (
//                             <span className="bg-[#EF4444] text-white text-[11px] font-black px-2.5 py-0.5 rounded-md shadow-xs">
//                               {item.discount}
//                             </span>
//                           )
//                         )}
//                       </div>

//                       {/* WISHLIST HEART */}
//                       <button
//                         onClick={() => toggleWishlist(item.id)}
//                         className="absolute top-2 right-2 z-10 text-slate-700 hover:text-rose-600 transition-colors p-1 cursor-pointer bg-white/80 backdrop-blur-md rounded-full shadow-xs"
//                       >
//                         <Heart
//                           className={`w-4 h-4 ${
//                             isLiked ? "fill-rose-500 text-rose-500" : "text-slate-700"
//                           }`}
//                         />
//                       </button>
//                     </div>

//                     {/* CLICKABLE HEADING */}
//                     <div className="space-y-1">
//                       <Link href={`/products/${item.slug}`}>
//                         <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#FF6B00] transition-colors line-clamp-1">
//                           {item.name}
//                         </h3>
//                       </Link>

//                       <div className="flex items-center space-x-1 text-[11px] font-bold text-slate-500">
//                         <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
//                         <span className="text-slate-800 font-black">{item.rating}</span>
//                         <span>({item.reviews})</span>
//                       </div>
//                     </div>

//                     {/* PRICE LINE */}
//                     <div className="space-y-0.5">
//                       <span className="text-[10px] text-slate-400 font-bold block">Starting From</span>
//                       <div className="flex items-baseline space-x-2">
//                         <span className=" font-black text-slate-900 text-lg sm:text-xl">
//                           ₹{item.price.toLocaleString("en-IN")}
//                         </span>
//                         {item.mrp > item.price && (
//                           <span className="text-xs text-slate-400 line-through">
//                             MRP ₹{item.mrp.toLocaleString("en-IN")}
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* BUTTON STATES: OUT OF STOCK / ALREADY IN CART / ADD TO CART */}
//                     {!item.inStock ? (
//                       <button
//                         disabled
//                         className="w-full font-extrabold text-xs py-3 rounded-xl bg-slate-200 text-slate-500 cursor-not-allowed flex items-center justify-center space-x-1.5"
//                       >
//                         <ShoppingBag className="w-3.5 h-3.5 opacity-50" />
//                         <span>Out of Stock</span>
//                       </button>
//                     ) : isInCart ? (
//                       <button
//                         disabled
//                         className="w-full font-extrabold text-xs py-3 rounded-xl bg-emerald-600 text-white cursor-default flex items-center justify-center space-x-1.5 shadow-md"
//                       >
//                         <Check className="w-3.5 h-3.5" />
//                         <span>Already in Cart</span>
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => handleAddToCart(item)}
//                         className="w-full font-extrabold text-xs py-3 rounded-xl bg-black hover:bg-slate-900 text-white shadow-md transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
//                       >
//                         <ShoppingBag className="w-3.5 h-3.5" />
//                         <span>Add to Cart</span>
//                       </button>
//                     )}

//                   </div>
//                 );
//               })}
//             </div>
//           )}

//         </div>

//       </div>

//     </div>
//   );
// }

// export default function ShopPage() {
//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
//       <Header />

//       <main className="flex-grow pt-8 sm:pt-10 pb-20">
//         <Suspense fallback={<div className="text-center py-20 font-bold">Loading shop products...</div>}>
//           <ShopContent />
//         </Suspense>
//       </main>

//       <Footer />
//     </div>
//   );
// }









/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Star, Heart, ShoppingBag, Check, Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useCart } from "../context/CartContext";

const API_BASE = "https://moteligo.in/ecoback";
const WISHLIST_STORAGE_KEY = "eco_user_wishlist_ids";

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

const getLocalWishlist = () => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveLocalWishlist = (list) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
  } catch {}
};

const fallbackSVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='100%' height='100%' fill='%23E2E8F0'/><text x='50%' y='50%' font-size='20' font-weight='bold' fill='%23046A38' dominant-baseline='middle' text-anchor='middle'>Ecoensa Product</text></svg>";

const resolveImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const normalizedBase = API_BASE.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

function ShopContent() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const [selectedCatFilter, setSelectedCatFilter] = useState(null);
  const activeCategory = selectedCatFilter ?? currentCategory;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [stockFilter, setStockFilter] = useState("all");

  const [wishlist, setWishlist] = useState(() => getLocalWishlist());
  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([{ id: "all", label: "All Products" }]);
  const [loading, setLoading] = useState(true);

  const { cartItems, addToCart } = useCart();

  const checkIsInCart = (product) => {
    if (!cartItems || !Array.isArray(cartItems)) return false;
    const targetId = String(product.id || product.slug || product.rawProduct?._id || product.rawProduct?.id);
    return cartItems.some((c) => {
      const cId = String(c._id || c.id || c.slug);
      return cId === targetId;
    });
  };

  useEffect(() => {
    async function fetchShopData() {
      try {
        setLoading(true);

        const token = getAuthToken();
        const wishlistPromise = token
          ? fetch(`${API_BASE}/api/wishlist`, { headers: { Authorization: `Bearer ${token}` } })
          : Promise.resolve(null);

        const [collectionsRes, productsRes, wishlistRes] = await Promise.all([
          fetch(`${API_BASE}/api/collections/visible`),
          fetch(`${API_BASE}/api/products/public?limit=1000`),
          wishlistPromise,
        ]);

        const collectionsJson = await collectionsRes.json();
        const productsJson = await productsRes.json();

        if (wishlistRes && wishlistRes.ok) {
          const wishJson = await wishlistRes.json();
          const wishListRaw = wishJson?.data || wishJson?.wishlist || wishJson?.items || [];
          if (Array.isArray(wishListRaw)) {
            const apiIds = wishListRaw.map((w) => {
              if (typeof w === "string") return w;
              return w._id || w.id || w.productId || w.product?._id || w.product;
            }).filter(Boolean).map((id) => String(id).toLowerCase().trim());

            const merged = Array.from(new Set([...getLocalWishlist(), ...apiIds]));
            setWishlist(merged);
            saveLocalWishlist(merged);
          }
        }

        if (collectionsJson?.status && Array.isArray(collectionsJson?.data)) {
          const fetchedCats = collectionsJson.data.map((col) => ({
            id: col.slug || col._id,
            label: col.name,
            rawId: col._id,
          }));
          setCategoriesList([{ id: "all", label: "All Products" }, ...fetchedCats]);
        }

        if (productsJson?.status && Array.isArray(productsJson?.data)) {
          const transformed = productsJson.data.map((p) => {
            const imgs = p.productImages || p.images || [];
            const img1Raw = typeof imgs[0] === "string" ? imgs[0] : imgs[0]?.image || imgs[0]?.url;
            const img2Raw = typeof imgs[1] === "string" ? imgs[1] : imgs[1]?.image || imgs[1]?.url;

            const img1 = resolveImageUrl(img1Raw) || fallbackSVG;
            const img2 = resolveImageUrl(img2Raw) || img1;

            const discountVal = p.discountPercentage ?? p.discount ?? 0;
            const colId = typeof p.collectionId === "object" ? p.collectionId?._id : p.collectionId;
            const colSlug = typeof p.collectionId === "object" ? p.collectionId?.slug : undefined;

            const totalStock = typeof p.totalStock === "number" ? p.totalStock : (p.stock ?? 1);

            return {
              id: String(p._id || p.id || p.slug),
              slug: p.slug || p._id,
              name: p.name,
              categorySlug: colSlug || colId || "all",
              collectionId: colId,
              price: Number(p.payablePrice ?? p.originalPrice) || 0,
              mrp: Number(p.originalPrice) || 0,
              discountVal,
              discount: `${discountVal}% OFF`,
              rating: p.rating ? Number(p.rating).toFixed(1) : "0.0",
              reviews: p.numReviews || p.reviewsCount || p.reviews || 0,
              inStock: totalStock > 0,
              image: img1,
              hoverImage: img2,
              rawProduct: p,
            };
          });

          setProductsList(transformed);
        }
      } catch (err) {
        console.error("Failed to load shop data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchShopData();
  }, []);

  let filteredProducts = productsList.filter((item) => {
    const matchesCat =
      activeCategory === "all" ||
      item.categorySlug === activeCategory ||
      String(item.collectionId) === String(activeCategory);

    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
    
    let matchesStock = true;
    if (stockFilter === "in-stock") matchesStock = item.inStock === true;
    if (stockFilter === "out-of-stock") matchesStock = item.inStock === false;

    return (
      matchesCat &&
      matchesSearch &&
      matchesPrice &&
      matchesStock
    );
  });

  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => Number(b.rating) - Number(a.rating));
  } else if (sortBy === "discount") {
    filteredProducts.sort((a, b) => b.discountVal - a.discountVal);
  }

  /* PERSISTENT SHOP WISHLIST TOGGLE */
  const toggleWishlist = async (product) => {
    const token = getAuthToken();

    if (!token) {
      if (typeof window !== "undefined") {
        // eslint-disable-next-line
        window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      }
      return;
    }

    const realId = String(product.rawProduct?._id || product.id).toLowerCase().trim();
    const isLiked = wishlist.includes(realId);

    const updatedList = isLiked
      ? wishlist.filter((wId) => wId !== realId)
      : [...wishlist, realId];

    // INSTANT LOCALSTORAGE PERSISTENCE
    setWishlist(updatedList);
    saveLocalWishlist(updatedList);

    try {
      if (isLiked) {
        await fetch(`${API_BASE}/api/wishlist/remove/${realId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await fetch(`${API_BASE}/api/wishlist/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: realId }),
        });
      }
    } catch (err) {
      console.error("Wishlist sync error:", err);
    }
  };

  const handleAddToCart = (product) => {
    if (!product.inStock || checkIsInCart(product)) return;
    addToCart(product.rawProduct || product, 1);
  };

  const getPageHeading = () => {
    if (activeCategory === "all") return "All Organic Products";
    const found = categoriesList.find((c) => c.id === activeCategory);
    return found ? found.label : "Our Products";
  };

  const resetAllFilters = () => {
    setSelectedCatFilter("all");
    setSearchQuery("");
    setSortBy("featured");
    setMinPrice(0);
    setMaxPrice(5000);
    setStockFilter("all");
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-8">
      
      <div className="border-b border-slate-200 pb-3 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
          {getPageHeading()}
        </h1>

        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
          Showing {filteredProducts.length} Items
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-6 sticky top-24">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-base font-serif font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-[#046A38]" />
              <span>Refine Search</span>
            </h3>
            <button
              onClick={resetAllFilters}
              className="text-xs font-bold text-[#FF6B00] hover:underline cursor-pointer"
            >
              Reset All
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-700">Search Products</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-2.5 pl-9 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-2 pt-1 border-t border-slate-100">
            <label className="text-xs font-black uppercase text-slate-700 block">Product Category</label>
            <div className="space-y-1.5 text-xs font-semibold text-slate-700 max-h-60 overflow-y-auto pr-1">
              {categoriesList.map((cat) => (
                <label key={cat.id} className="flex items-center space-x-2.5 cursor-pointer hover:text-[#046A38] py-0.5">
                  <input
                    type="radio"
                    name="category"
                    value={cat.id}
                    checked={activeCategory === cat.id}
                    onChange={() => setSelectedCatFilter(cat.id)}
                    className="accent-[#046A38] w-4 h-4 cursor-pointer"
                  />
                  <span className={activeCategory === cat.id ? "font-black text-[#046A38]" : "text-slate-700"}>
                    {cat.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-black uppercase text-slate-700 flex items-center space-x-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#046A38]" />
              <span>Sort By</span>
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 cursor-pointer"
            >
              <option value="featured">Featured / Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="uppercase text-slate-700">Price Budget:</span>
              <span className="text-[#046A38] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                ₹{minPrice} - ₹{maxPrice}
              </span>
            </div>

            <div className="relative w-full h-6 flex items-center">
              <div className="absolute w-full h-2 bg-slate-200 rounded-full" />
              <div
                className="absolute h-2 bg-[#046A38] rounded-full"
                style={{
                  left: `${(minPrice / 5000) * 100}%`,
                  width: `${((maxPrice - minPrice) / 5000) * 100}%`,
                }}
              />
              <input
                type="range"
                min={0}
                max={5000}
                step={50}
                value={minPrice}
                onChange={(e) => {
                  const val = Math.min(Number(e.target.value), maxPrice - 100);
                  setMinPrice(val);
                }}
                className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#046A38] [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#046A38]"
                style={{ zIndex: minPrice > 4000 ? 5 : 3 }}
              />
              <input
                type="range"
                min={0}
                max={5000}
                step={50}
                value={maxPrice}
                onChange={(e) => {
                  const val = Math.max(Number(e.target.value), minPrice + 100);
                  setMaxPrice(val);
                }}
                className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF6B00] [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#FF6B00]"
                style={{ zIndex: 4 }}
              />
            </div>

            <div className="flex justify-between text-[11px] font-extrabold text-slate-500">
              <span>₹0</span>
              <span>₹5,000</span>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100">
            <label className="text-xs font-black uppercase text-slate-700">Stock Availability</label>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-slate-50 cursor-pointer"
            >
              <option value="all">All Items</option>
              <option value="in-stock">In Stock Only</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center space-y-1">
            <span className="text-xs font-black text-[#046A38] block">100% Organic & Fresh</span>
            <p className="text-[11px] text-slate-600 font-medium">Directly harvested from Kerala organic farms.</p>
          </div>

        </div>

        <div className="lg:col-span-9 space-y-6">
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div key={idx} className="h-80 bg-slate-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center space-y-4 bg-white rounded-3xl border border-slate-200">
              <p className="text-lg font-bold text-slate-700">No products match your selected filters.</p>
              <button
                onClick={resetAllFilters}
                className="bg-[#FF6B00] text-white font-extrabold text-xs px-6 py-3 rounded-full cursor-pointer shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {filteredProducts.map((item) => {
                const targetIdClean = String(item.id).toLowerCase().trim();
                const isLiked = wishlist.includes(targetIdClean);
                const isInCart = checkIsInCart(item);

                return (
                  <div
                    key={item.id}
                    className="group space-y-3 flex flex-col justify-between bg-white p-4.5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative w-full aspect-square overflow-hidden bg-slate-100 rounded-xl">
                      <Link href={`/products/${item.slug}`} className="block w-full h-full">
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackSVG;
                          }}
                          className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 absolute inset-0"
                        />
                        <img
                          src={item.hoverImage}
                          alt={item.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackSVG;
                          }}
                          className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0"
                        />
                      </Link>

                      <div className="absolute top-2 left-2 z-10 pointer-events-none">
                        {!item.inStock ? (
                          <span className="bg-red-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-md shadow-xs">
                            Out of Stock
                          </span>
                        ) : (
                          item.discountVal > 0 && (
                            <span className="bg-[#EF4444] text-white text-[11px] font-black px-2.5 py-0.5 rounded-md shadow-xs">
                              {item.discount}
                            </span>
                          )
                        )}
                      </div>

                      <button
                        onClick={() => toggleWishlist(item)}
                        className="absolute top-2 right-2 z-10 text-slate-700 hover:text-rose-600 transition-all p-1.5 cursor-pointer bg-white/80 backdrop-blur-md rounded-full shadow-xs hover:scale-110"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            isLiked ? "fill-rose-500 text-rose-500" : "text-slate-700"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <Link href={`/products/${item.slug}`}>
                        <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#FF6B00] transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                      </Link>

                      {/* <div className="flex items-center space-x-1 text-[11px] font-bold text-slate-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-slate-800 font-black">{item.rating}</span>
                        <span>({item.reviews})</span>
                      </div> */}
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-400 font-bold block">Starting From</span>
                      <div className="flex items-baseline space-x-2">
                        <span className=" font-black text-slate-900 text-lg sm:text-xl">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                        {item.mrp > item.price && (
                          <span className="text-xs text-slate-400 line-through">
                            MRP ₹{item.mrp.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>

                    {!item.inStock ? (
                      <button
                        disabled
                        className="w-full font-extrabold text-xs py-3 rounded-xl bg-slate-200 text-slate-500 cursor-not-allowed flex items-center justify-center space-x-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 opacity-50" />
                        <span>Out of Stock</span>
                      </button>
                    ) : isInCart ? (
                      <button
                        disabled
                        className="w-full font-extrabold text-xs py-3 rounded-xl bg-emerald-600 text-white cursor-default flex items-center justify-center space-x-1.5 shadow-md"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Already in Cart</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full font-extrabold text-xs py-3 rounded-xl bg-black hover:bg-slate-900 text-white shadow-md transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    )}

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-8 sm:pt-10 pb-20">
        <Suspense fallback={<div className="text-center py-20 font-bold">Loading shop products...</div>}>
          <ShopContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}