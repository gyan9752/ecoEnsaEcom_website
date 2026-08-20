
// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { Heart, Star, ShoppingBag, Check } from "lucide-react";
// import { useCart } from "@/app/context/CartContext";

// // ==========================================
// // 100% LIVE API BASE CONFIGURATION
// const API_BASE = "https://moteligo.in/ecoback";
// // ==========================================

// const resolveImageUrl = (url) => {
//   if (!url) return null;
//   if (url.startsWith("http")) return url;
//   const cleanBase = API_BASE.replace(/\/$/, "");
//   const cleanUrl = url.startsWith("/") ? url : `/${url}`;
//   return `${cleanBase}${cleanUrl}`;
// };

// export default function FeaturedProducts() {
//   const [wishlist, setWishlist] = useState([]);
//   const [categorySections, setCategorySections] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { addToCart, cartItems = [] } = useCart();

//   const fallbackSVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='100%' height='100%' fill='%23E2E8F0'/><text x='50%' y='50%' font-size='20' font-weight='bold' fill='%23046A38' dominant-baseline='middle' text-anchor='middle'>Ecoensa Product</text></svg>";

//   /* ROBUST MULTI-LEVEL MATCHER FOR GUEST & LOGGED-IN CART OBJECTS */
//   const checkIsInCart = (item) => {
//     if (!cartItems || !Array.isArray(cartItems)) return false;

//     // Extract all possible target product IDs
//     const targetIds = [
//       item?.id,
//       item?.slug,
//       item?.rawProduct?._id,
//       item?.rawProduct?.id,
//       item?.rawProduct?.slug,
//     ]
//       .filter(Boolean)
//       .map((id) => String(id).toLowerCase().trim());

//     if (targetIds.length === 0) return false;

//     return cartItems.some((c) => {
//       const pObj = typeof c?.productId === "object" ? c?.productId : null;
//       const rObj = typeof c?.rawProduct === "object" ? c?.rawProduct : null;
//       const itemObj = typeof c?.item === "object" ? c?.item : null;

//       // Extract all candidate IDs from cart item (handles both object & string formats)
//       const cartCandidateIds = [
//         c?.itemId,
//         c?.id,
//         c?.productId,
//         c?.slug,
//         pObj?._id,
//         pObj?.id,
//         pObj?.slug,
//         rObj?._id,
//         rObj?.id,
//         rObj?.slug,
//         itemObj?._id,
//         itemObj?.id,
//         itemObj?.slug,
//       ]
//         .filter((val) => val && typeof val !== "object")
//         .map((id) => String(id).toLowerCase().trim());

//       return targetIds.some((tId) => cartCandidateIds.includes(tId));
//     });
//   };

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true);

//         /* Fetch collections & ALL public products (limit=1000) in parallel */
//         const [collectionsRes, productsRes] = await Promise.all([
//           fetch(`${API_BASE}/api/collections/visible`),
//           fetch(`${API_BASE}/api/products/public?limit=1000`),
//         ]);

//         const collectionsJson = await collectionsRes.json();
//         const productsJson = await productsRes.json();

//         const collections = collectionsJson?.status && Array.isArray(collectionsJson?.data)
//           ? collectionsJson.data
//           : [];
//         const products = productsJson?.status && Array.isArray(productsJson?.data)
//           ? productsJson.data
//           : [];

//         /* Helper to map single product object */
//         const transformProduct = (p) => {
//           const imgs = p.productImages || p.images || [];
//           const img1Raw = typeof imgs[0] === "string" ? imgs[0] : imgs[0]?.image || imgs[0]?.url;
//           const img2Raw = typeof imgs[1] === "string" ? imgs[1] : imgs[1]?.image || imgs[1]?.url;

//           const img1 = resolveImageUrl(img1Raw) || fallbackSVG;
//           const img2 = resolveImageUrl(img2Raw) || img1;

//           const discountVal = p.discountPercentage ?? p.discount ?? 0;

//           return {
//             id: p._id || p.id || p.slug,
//             slug: p.slug || p._id,
//             name: p.name,
//             badge: p.badge || (discountVal > 30 ? `${discountVal}% OFF` : "Bestseller"),
//             rating: p.rating || 4.9,
//             reviews: p.reviews || 128,
//             price: Number(p.payablePrice ?? p.originalPrice) || 0,
//             mrp: Number(p.originalPrice) || 0,
//             discount: `${discountVal}% OFF`,
//             image: img1,
//             hoverImage: img2,
//             rawProduct: p,
//           };
//         };

//         /* Group products into Category Sections */
//         const sections = [];

//         if (collections.length > 0) {
//           collections.forEach((col) => {
//             const matchedProducts = products.filter((p) => {
//               const pColId = typeof p.collectionId === "object" ? p.collectionId?._id : p.collectionId;
//               const pColName = typeof p.collectionId === "object" ? p.collectionId?.name : (p.collectionName || p.collection?.name);
//               return (
//                 (pColId && String(pColId) === String(col._id)) ||
//                 (pColName && String(pColName).toLowerCase().trim() === String(col.name).toLowerCase().trim())
//               );
//             });

//             /* ONLY INCLUDE CATEGORY IF IT HAS AT LEAST 4 PRODUCTS */
//             if (matchedProducts.length >= 4) {
//               sections.push({
//                 categoryTitle: col.heading || col.name,
//                 categorySlug: `/shop?category=${col.slug || col._id}`,

//                 /* EXACTLY 4 PRODUCTS FOR FULL 4-COLUMN ROW */
//                 products: matchedProducts.slice(0, 4).map(transformProduct),
//               });
//             }
//           });
//         }

//         /* Fallback if no category has >= 4 products, pick top 4 from all products */
//         if (sections.length === 0 && products.length >= 4) {
//           sections.push({
//             categoryTitle: "Featured Products",
//             categorySlug: "/shop",
//             products: products.slice(0, 4).map(transformProduct),
//           });
//         }

//         /* EXACTLY MAX 4 CATEGORY SECTIONS ON HOME PAGE */
//         setCategorySections(sections.slice(0, 4));
//       } catch (err) {
//         console.error("Failed to load featured products:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   const toggleWishlist = (id) => {
//     setWishlist((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   // REAL ADD TO CART FUNCTION CALL
//   const handleAddToCart = (product) => {
//     addToCart(product.rawProduct || product, 1);
//   };

//   return (
//     <section className="py-12 sm:py-16 bg-white space-y-16">
//       <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-16">
        
//         {loading ? (
//           <div className="space-y-6">
//             <div className="h-8 w-64 bg-slate-200 rounded-md animate-pulse" />
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
//               {[1, 2, 3, 4].map((idx) => (
//                 <div key={idx} className="h-80 bg-slate-100 rounded-xl animate-pulse" />
//               ))}
//             </div>
//           </div>
//         ) : (
//           categorySections.map((section, sectionIdx) => (
//             <div key={sectionIdx} className="space-y-6">
//               <div className="flex items-center justify-between border-b border-slate-200 pb-3">
//                 <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
//                   {section.categoryTitle}
//                 </h2>

//                 <Link
//                   href={section.categorySlug}
//                   className="text-xs sm:text-sm font-extrabold text-[#FF6B00] hover:underline transition-colors"
//                 >
//                   View All →
//                 </Link>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
//                 {section.products.map((item) => {
//                   const isLiked = wishlist.includes(item.id);
//                   const isInCart = checkIsInCart(item);

//                   return (
//                     <div key={item.id} className="group space-y-2.5 flex flex-col justify-between">
//                       <div className="relative w-full aspect-square overflow-hidden bg-slate-100 rounded-xl shadow-xs">
//                         <Link href={`/products/${item.slug}`} className="block w-full h-full">
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = fallbackSVG;
//                             }}
//                             className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0 absolute inset-0"
//                           />
//                           <img
//                             src={item.hoverImage}
//                             alt={item.name}
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = fallbackSVG;
//                             }}
//                             className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out absolute inset-0"
//                           />
//                         </Link>

//                         <div className="absolute top-3 left-3 z-10 pointer-events-none">
//                           <span className="bg-[#6B2D49] text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-xs">
//                             {item.badge}
//                           </span>
//                         </div>

//                         <button
//                           onClick={() => toggleWishlist(item.id)}
//                           className="absolute top-3 right-3 z-10 text-slate-700 hover:text-rose-600 transition-colors p-1 cursor-pointer"
//                           aria-label="Add to wishlist"
//                         >
//                           <Heart
//                             className={`w-5 h-5 ${
//                               isLiked ? "fill-rose-500 text-rose-500" : "text-slate-700"
//                             }`}
//                           />
//                         </button>
//                       </div>

//                       <div className="space-y-1">
//                         <Link href={`/products/${item.slug}`}>
//                           <h3 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-[#FF6B00] transition-colors line-clamp-1 leading-snug">
//                             {item.name}
//                           </h3>
//                         </Link>

//                         <div className="flex items-center space-x-1 text-[11px] font-bold text-slate-500">
//                           <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
//                           <span className="text-slate-800 font-extrabold">{item.rating}</span>
//                           <span>({item.reviews})</span>
//                         </div>
//                       </div>

//                       <div className="flex items-center space-x-2 text-xs font-normal">
//                         <span className="text-slate-500 line-through">
//                           Rs. {item.mrp.toLocaleString("en-IN")}.00
//                         </span>

//                         <span className="font-bold text-slate-900 text-sm">
//                           Rs. {item.price.toLocaleString("en-IN")}.00
//                         </span>

//                         <span className="border border-slate-400 text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
//                           {item.discount}
//                         </span>
//                       </div>

//                       {/* NO DUPLICATE ADD TO CART BUTTON (LOGGED-IN & GUEST SUPPORTED) */}
//                       <button
//                         onClick={() => !isInCart && handleAddToCart(item)}
//                         disabled={isInCart}
//                         className={`w-full font-bold text-xs py-3 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-1.5 ${
//                           isInCart
//                             ? "bg-emerald-600 text-white cursor-default"
//                             : "bg-black hover:bg-slate-900 text-white cursor-pointer"
//                         }`}
//                       >
//                         {isInCart ? (
//                           <>
//                             <Check className="w-3.5 h-3.5" />
//                             <span>Already in Cart</span>
//                           </>
//                         ) : (
//                           <>
//                             <ShoppingBag className="w-3.5 h-3.5" />
//                             <span>Add to Cart</span>
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ))
//         )}

//       </div>
//     </section>
//   );
// }










/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Star, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

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

// HELPER TO READ LOCAL WISHLIST
const getLocalWishlist = () => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// HELPER TO SAVE LOCAL WISHLIST
const saveLocalWishlist = (list) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
  } catch {}
};

const resolveImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  const cleanBase = API_BASE.replace(/\/$/, "");
  const cleanUrl = url.startsWith("/") ? url : `/${url}`;
  return `${cleanBase}${cleanUrl}`;
};

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState(() => getLocalWishlist());
  const [categorySections, setCategorySections] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart, cartItems = [] } = useCart();

  const fallbackSVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='100%' height='100%' fill='%23E2E8F0'/><text x='50%' y='50%' font-size='20' font-weight='bold' fill='%23046A38' dominant-baseline='middle' text-anchor='middle'>Ecoensa Product</text></svg>";

  const checkIsInCart = (item) => {
    if (!cartItems || !Array.isArray(cartItems)) return false;
    const targetIds = [
      item?.id,
      item?.slug,
      item?.rawProduct?._id,
      item?.rawProduct?.id,
      item?.rawProduct?.slug,
    ]
      .filter(Boolean)
      .map((id) => String(id).toLowerCase().trim());

    if (targetIds.length === 0) return false;

    return cartItems.some((c) => {
      const pObj = typeof c?.productId === "object" ? c?.productId : null;
      const rObj = typeof c?.rawProduct === "object" ? c?.rawProduct : null;
      const itemObj = typeof c?.item === "object" ? c?.item : null;

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
        itemObj?._id,
        itemObj?.id,
        itemObj?.slug,
      ]
        .filter((val) => val && typeof val !== "object")
        .map((id) => String(id).toLowerCase().trim());

      return targetIds.some((tId) => cartCandidateIds.includes(tId));
    });
  };

  useEffect(() => {
    async function fetchData() {
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

        // MERGE BACKEND WISHLIST WITH LOCALSTORAGE
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

        const collections = collectionsJson?.status && Array.isArray(collectionsJson?.data)
          ? collectionsJson.data
          : [];
        const products = productsJson?.status && Array.isArray(productsJson?.data)
          ? productsJson.data
          : [];

        const transformProduct = (p) => {
          const imgs = p.productImages || p.images || [];
          const img1Raw = typeof imgs[0] === "string" ? imgs[0] : imgs[0]?.image || imgs[0]?.url;
          const img2Raw = typeof imgs[1] === "string" ? imgs[1] : imgs[1]?.image || imgs[1]?.url;

          const img1 = resolveImageUrl(img1Raw) || fallbackSVG;
          const img2 = resolveImageUrl(img2Raw) || img1;

          const discountVal = p.discountPercentage ?? p.discount ?? 0;

          return {
            id: String(p._id || p.id || p.slug),
            slug: p.slug || p._id,
            name: p.name,
            badge: p.badge || (discountVal > 30 ? `${discountVal}% OFF` : "Bestseller"),
            rating: p.rating ? Number(p.rating).toFixed(1) : "0.0",
            reviews: p.numReviews || p.reviewsCount || p.reviews || 0,
            price: Number(p.payablePrice ?? p.originalPrice) || 0,
            mrp: Number(p.originalPrice) || 0,
            discount: `${discountVal}% OFF`,
            image: img1,
            hoverImage: img2,
            rawProduct: p,
          };
        };

        const sections = [];

        if (collections.length > 0) {
          collections.forEach((col) => {
            const matchedProducts = products.filter((p) => {
              const pColId = typeof p.collectionId === "object" ? p.collectionId?._id : p.collectionId;
              const pColName = typeof p.collectionId === "object" ? p.collectionId?.name : (p.collectionName || p.collection?.name);
              return (
                (pColId && String(pColId) === String(col._id)) ||
                (pColName && String(pColName).toLowerCase().trim() === String(col.name).toLowerCase().trim())
              );
            });

            if (matchedProducts.length >= 4) {
              sections.push({
                categoryTitle: col.heading || col.name,
                categorySlug: `/shop?category=${col.slug || col._id}`,
                products: matchedProducts.slice(0, 4).map(transformProduct),
              });
            }
          });
        }

        if (sections.length === 0 && products.length >= 4) {
          sections.push({
            categoryTitle: "Featured Products",
            categorySlug: "/shop",
            products: products.slice(0, 4).map(transformProduct),
          });
        }

        setCategorySections(sections.slice(0, 4));
      } catch (err) {
        console.error("Failed to load featured products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  /* PERSISTENT WISHLIST TOGGLE */
  const toggleWishlist = async (item) => {
    const token = getAuthToken();

    if (!token) {
      if (typeof window !== "undefined") {
        // eslint-disable-next-line
        window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      }
      return;
    }

    const realId = String(item.rawProduct?._id || item.id).toLowerCase().trim();
    const isLiked = wishlist.includes(realId);

    const updatedList = isLiked
      ? wishlist.filter((wId) => wId !== realId)
      : [...wishlist, realId];

    // INSTANT LOCALSTORAGE UPDATE
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
    addToCart(product.rawProduct || product, 1);
  };

  return (
    <section className="py-12 sm:py-16 bg-white space-y-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-16">
        
        {loading ? (
          <div className="space-y-6">
            <div className="h-8 w-64 bg-slate-200 rounded-md animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
              {[1, 2, 3, 4].map((idx) => (
                <div key={idx} className="h-80 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          categorySections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
                  {section.categoryTitle}
                </h2>

                <Link
                  href={section.categorySlug}
                  className="text-xs sm:text-sm font-extrabold text-[#FF6B00] hover:underline transition-colors"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
                {section.products.map((item) => {
                  const targetIdClean = String(item.id).toLowerCase().trim();
                  const isLiked = wishlist.includes(targetIdClean);
                  const isInCart = checkIsInCart(item);

                  return (
                    <div key={item.id} className="group space-y-2.5 flex flex-col justify-between">
                      <div className="relative w-full aspect-square overflow-hidden bg-slate-100 rounded-xl shadow-xs">
                        <Link href={`/products/${item.slug}`} className="block w-full h-full">
                          <img
                            src={item.image}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = fallbackSVG;
                            }}
                            className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0 absolute inset-0"
                          />
                          <img
                            src={item.hoverImage}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = fallbackSVG;
                            }}
                            className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out absolute inset-0"
                          />
                        </Link>

                        <div className="absolute top-3 left-3 z-10 pointer-events-none">
                          <span className="bg-[#6B2D49] text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-xs">
                            {item.badge}
                          </span>
                        </div>

                        {/* LIVE PERISTENT WISHLIST HEART */}
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="absolute top-3 right-3 z-10 text-slate-700 hover:text-rose-600 transition-all p-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:scale-110 cursor-pointer"
                          aria-label="Add to wishlist"
                        >
                          <Heart
                            className={`w-5 h-5 transition-colors ${
                              isLiked ? "fill-rose-500 text-rose-500" : "text-slate-700"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <Link href={`/products/${item.slug}`}>
                          <h3 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-[#FF6B00] transition-colors line-clamp-1 leading-snug">
                            {item.name}
                          </h3>
                        </Link>

                        <div className="flex items-center space-x-1 text-[11px] font-bold text-slate-500">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-slate-800 font-extrabold">{item.rating}</span>
                          <span>({item.reviews})</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-xs font-normal">
                        <span className="text-slate-500 line-through">
                          Rs. {item.mrp.toLocaleString("en-IN")}.00
                        </span>

                        <span className="font-bold text-slate-900 text-sm">
                          Rs. {item.price.toLocaleString("en-IN")}.00
                        </span>

                        <span className="border border-slate-400 text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                          {item.discount}
                        </span>
                      </div>

                      <button
                        onClick={() => !isInCart && handleAddToCart(item)}
                        disabled={isInCart}
                        className={`w-full font-bold text-xs py-3 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-1.5 ${
                          isInCart
                            ? "bg-emerald-600 text-white cursor-default"
                            : "bg-black hover:bg-slate-900 text-white cursor-pointer"
                        }`}
                      >
                        {isInCart ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Already in Cart</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

      </div>
    </section>
  );
}