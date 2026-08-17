


// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState, useEffect } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw, Plus, Minus, Check, MapPin, Sparkles, Leaf, Award } from "lucide-react";
// import { useCart } from "@/app/context/CartContext";

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

// export default function ProductDetailPage() {
//   const params = useParams();

//   /* Support both [id] folder and [slug] folder dynamically */
//   const productIdOrSlug =
//     params?.id ||
//     params?.slug ||
//     (typeof window !== "undefined" ? window.location.pathname.split("/").pop() : "");

//   const [productData, setProductData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState(null);

//   const [galleryImages, setGalleryImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(fallbackSVG);

//   const [selectedWeight, setSelectedWeight] = useState("250g");
//   const [availableWeights, setAvailableWeights] = useState(["100g", "250g", "500g", "1kg"]);

//   const [quantity, setQuantity] = useState(1);
//   const [added, setAdded] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);

//   const [pincode, setPincode] = useState("");
//   const [pincodeMsg, setPincodeMsg] = useState("");

//   const [similarProducts, setSimilarProducts] = useState([]);

//   const { addToCart } = useCart();

//   /* Fetch live Product Details & Similar Products */
//   useEffect(() => {
//     if (!productIdOrSlug) return;

//     async function fetchProductDetails() {
//       try {
//         setLoading(true);
//         setErrorMsg(null);

//         let fetchedProduct = null;

//         /* Step 1: Try by Slug endpoint */
//         try {
//           const slugRes = await fetch(`${API_BASE}/api/collections/slug/${encodeURIComponent(productIdOrSlug)}`);
//           const slugJson = await slugRes.json();
//           if (slugJson?.status && slugJson?.data) {
//             fetchedProduct = slugJson.data;
//           }
//         } catch (e) {
//           console.warn(e);
//         }

//         /* Step 2: Try by Product Slug endpoint */
//         if (!fetchedProduct) {
//           try {
//             const pSlugRes = await fetch(`${API_BASE}/api/products/slug/${encodeURIComponent(productIdOrSlug)}`);
//             const pSlugJson = await pSlugRes.json();
//             if (pSlugJson?.status && pSlugJson?.data) {
//               fetchedProduct = pSlugJson.data;
//             }
//           } catch (e) {
//             console.warn(e);
//           }
//         }

//         /* Step 3: Try by ID endpoint */
//         if (!fetchedProduct) {
//           try {
//             const idRes = await fetch(`${API_BASE}/api/products/${encodeURIComponent(productIdOrSlug)}`);
//             const idJson = await idRes.json();
//             if (idJson?.status && idJson?.data) {
//               fetchedProduct = idJson.data;
//             }
//           } catch (e) {
//             console.warn(e);
//           }
//         }

//         /* Step 4: Fallback match from public products list */
//         if (!fetchedProduct) {
//           try {
//             const publicRes = await fetch(`${API_BASE}/api/products/public`);
//             const publicJson = await publicRes.json();
//             if (publicJson?.status && Array.isArray(publicJson?.data)) {
//               fetchedProduct = publicJson.data.find(
//                 (p) => p.slug === productIdOrSlug || String(p._id) === String(productIdOrSlug)
//               );
//             }
//           } catch (e) {
//             console.warn(e);
//           }
//         }

//         if (fetchedProduct) {
//           setProductData(fetchedProduct);

//           /* Map gallery images */
//           const rawImgs = fetchedProduct.productImages || fetchedProduct.images || [];
//           const mappedImgs = rawImgs
//             .map((img) => resolveImageUrl(typeof img === "string" ? img : img.image || img.url))
//             .filter(Boolean);

//           const finalGallery = mappedImgs.length > 0 ? mappedImgs : [fallbackSVG];
//           setGalleryImages(finalGallery);
//           setSelectedImage(finalGallery[0]);

//           /* Map variants / pack sizes */
//           if (Array.isArray(fetchedProduct.variants) && fetchedProduct.variants.length > 0) {
//             const weights = fetchedProduct.variants
//               .map((v) => v.value || v.variantValue || v.name)
//               .filter(Boolean);
//             if (weights.length > 0) {
//               setAvailableWeights(weights);
//               setSelectedWeight(weights[0]);
//             }
//           }
//         } else {
//           setErrorMsg("Product details not found.");
//         }

//         /* Fetch Similar Products */
//         const similarRes = await fetch(`${API_BASE}/api/products/public`);
//         const similarJson = await similarRes.json();

//         if (similarJson?.status && Array.isArray(similarJson?.data)) {
//           const mappedSimilar = similarJson.data
//             .filter((p) => p.slug !== productIdOrSlug && String(p._id) !== String(productIdOrSlug))
//             .slice(0, 4)
//             .map((p) => {
//               const imgs = p.productImages || p.images || [];
//               const rawImg = typeof imgs[0] === "string" ? imgs[0] : imgs[0]?.image || imgs[0]?.url;
//               const imgUrl = resolveImageUrl(rawImg) || fallbackSVG;
//               const discountVal = p.discountPercentage ?? p.discount ?? 0;

//               return {
//                 id: p.slug || p._id,
//                 name: p.name,
//                 price: Number(p.payablePrice ?? p.originalPrice) || 0,
//                 mrp: Number(p.originalPrice) || 0,
//                 discount: `${discountVal}% OFF`,
//                 rating: p.rating || 4.9,
//                 reviews: p.reviews || 95,
//                 image: imgUrl,
//                 rawProduct: p,
//               };
//             });

//           setSimilarProducts(mappedSimilar);
//         }
//       } catch (err) {
//         console.error("Failed to load product details:", err);
//         setErrorMsg("Failed to load product information.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProductDetails();
//   }, [productIdOrSlug]);

//   /* Computed Pricing */
//   const price = Number(productData?.payablePrice ?? productData?.originalPrice) || 0;
//   const mrp = Number(productData?.originalPrice) || 0;
//   const discountVal = productData?.discountPercentage ?? productData?.discount ?? 0;

//   // Product Data Object for Cart Context
//   const currentProduct = {
//     id: productData?._id || productData?.id || productIdOrSlug,
//     slug: productData?.slug || productIdOrSlug,
//     name: productData?.name || "Ecoensa Product",
//     price: price,
//     mrp: mrp,
//     image: selectedImage,
//     rawProduct: productData,
//   };

//   // REAL ADD TO CART FUNCTION CALL
//   const handleAddToCart = () => {
//     addToCart(currentProduct, quantity, selectedWeight);
//     setAdded(true);
//     setTimeout(() => setAdded(false), 2000);
//   };

//   const checkPincode = () => {
//     if (pincode.length === 6) {
//       setPincodeMsg("Express delivery available in 2-4 business days!");
//     } else {
//       setPincodeMsg("Please enter a valid 6-digit Pincode");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
//         <Header />
//         <main className="flex-grow pt-16 pb-20 text-center font-bold text-lg">
//           <div className="max-w-[1400px] mx-auto px-4 space-y-6">
//             <div className="h-96 bg-slate-200 rounded-3xl animate-pulse" />
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   if (errorMsg || !productData) {
//     return (
//       <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
//         <Header />
//         <main className="flex-grow pt-16 pb-20 text-center space-y-4">
//           <h2 className="text-2xl font-bold text-slate-800">{errorMsg || "Product Not Found"}</h2>
//           <Link href="/shop" className="bg-[#FF6B00] text-white font-bold text-xs px-6 py-3 rounded-full inline-block">
//             Back to Shop Page
//           </Link>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
//       <Header />

//       <main className="flex-grow pt-8 sm:pt-10 pb-20">
//         <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-16">
          
//           {/* MAIN PRODUCT 2-COLUMN GRID */}
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl items-start">
            
//             {/* LEFT COLUMN: STICKY PRODUCT IMAGES GALLERY */}
//             <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24 lg:self-start">
//               <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group">
//                 <img
//                   src={selectedImage}
//                   alt={productData.name}
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = fallbackSVG;
//                   }}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
                
//                 <div className="absolute top-4 left-4">
//                   <span className="bg-[#6B2D49] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md">
//                     {discountVal > 30 ? `${discountVal}% OFF` : "100% Organic"}
//                   </span>
//                 </div>

//                 <div className="absolute top-4 right-4">
//                   <button
//                     onClick={() => setIsLiked(!isLiked)}
//                     className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-700 flex items-center justify-center hover:text-rose-600 shadow-md cursor-pointer transition-colors"
//                   >
//                     <Heart className={`w-5 h-5 ${isLiked ? "fill-rose-500 text-rose-500" : "text-slate-700"}`} />
//                   </button>
//                 </div>
//               </div>

//               {/* THUMBNAIL SWITCHERS */}
//               {galleryImages.length > 1 && (
//                 <div className="grid grid-cols-4 gap-3">
//                   {galleryImages.map((img, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => setSelectedImage(img)}
//                       className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
//                         selectedImage === img ? "border-slate-900 ring-2 ring-slate-400/20" : "border-slate-200 opacity-70 hover:opacity-100"
//                       }`}
//                     >
//                       <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* RIGHT COLUMN: PRODUCT INFO & BUYING WIDGET */}
//             <div className="lg:col-span-6 space-y-6">
              
//               <div className="space-y-2">
//                 <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200 inline-block">
//                   100% Organic Certified
//                 </span>
//                 <h1 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight leading-tight">
//                   {productData.name}
//                 </h1>

//                 <div className="flex items-center space-x-3 text-xs sm:text-sm font-bold">
//                   <div className="flex items-center space-x-1 text-amber-400">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} className="w-4 h-4 fill-current" />
//                     ))}
//                   </div>
//                   <span className="text-slate-800 font-extrabold">4.9 / 5.0</span>
//                   <span className="text-slate-400">•</span>
//                   <span className="text-[#046A38] font-bold underline cursor-pointer">128 Customer Reviews</span>
//                 </div>
//               </div>

//               {/* PRICING */}
//               <div className="flex items-baseline space-x-3 border-y border-slate-100 py-3.5">
//                 <span className="text-3xl sm:text-4xl font-serif font-black text-slate-900">
//                   Rs. {price.toLocaleString("en-IN")}.00
//                 </span>
//                 {mrp > price && (
//                   <span className="text-sm sm:text-base text-slate-400 line-through">
//                     Rs. {mrp.toLocaleString("en-IN")}.00
//                   </span>
//                 )}
//                 {discountVal > 0 && (
//                   <span className="bg-emerald-100 text-[#046A38] text-xs font-black px-2.5 py-1 rounded-md border border-emerald-200">
//                     Save {discountVal}% OFF
//                   </span>
//                 )}
//               </div>

//               {/* WEIGHT SELECTION */}
//               {availableWeights.length > 0 && (
//                 <div className="space-y-2">
//                   <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">
//                     Select Pack Size: <span className="text-[#046A38] font-bold">{selectedWeight}</span>
//                   </label>
//                   <div className="flex flex-wrap gap-2.5">
//                     {availableWeights.map((weight) => (
//                       <button
//                         key={weight}
//                         onClick={() => setSelectedWeight(weight)}
//                         className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
//                           selectedWeight === weight
//                             ? "bg-slate-900 text-white border-slate-900 shadow-md"
//                             : "bg-slate-50 text-slate-800 border-slate-300 hover:border-slate-400"
//                         }`}
//                       >
//                         {weight}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* QUANTITY & BLACK & WHITE BUTTONS */}
//               <div className="space-y-4 pt-1">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quantity:</span>
//                   <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 font-black cursor-pointer shadow-xs"
//                     >
//                       <Minus className="w-4 h-4" />
//                     </button>
//                     <span className="w-10 text-center text-sm font-black text-slate-900">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 font-black cursor-pointer shadow-xs"
//                     >
//                       <Plus className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* BLACK & WHITE BUTTONS */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
//                   {/* ADD TO CART BUTTON */}
//                   <button
//                     onClick={handleAddToCart}
//                     className={`w-full font-extrabold text-sm py-4 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
//                       added
//                         ? "bg-emerald-600 text-white"
//                         : "bg-black hover:bg-slate-800 text-white"
//                     }`}
//                   >
//                     {added ? (
//                       <>
//                         <Check className="w-4 h-4" />
//                         <span>Added to Cart!</span>
//                       </>
//                     ) : (
//                       <>
//                         <ShoppingBag className="w-4 h-4" />
//                         <span>Add to Cart</span>
//                       </>
//                     )}
//                   </button>

//                   {/* BUY IT NOW LINK TO CHECKOUT */}
//                   <Link
//                     href="/checkout"
//                     onClick={() => addToCart(currentProduct, quantity, selectedWeight)}
//                     className="w-full bg-white hover:bg-slate-100 border-2 border-slate-900 text-slate-900 font-extrabold text-sm py-4 rounded-xl shadow-md transition-all duration-300 cursor-pointer text-center block"
//                   >
//                     BUY IT NOW
//                   </Link>
//                 </div>
//               </div>

//               {/* TRUST BADGES */}
//               <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-center text-xs font-semibold text-slate-600">
//                 <div className="space-y-1">
//                   <Truck className="w-5 h-5 text-[#046A38] mx-auto" />
//                   <span>Free Express Shipping</span>
//                 </div>
//                 <div className="space-y-1">
//                   <ShieldCheck className="w-5 h-5 text-[#FF6B00] mx-auto" />
//                   <span>100% Quality Assurance</span>
//                 </div>
//                 <div className="space-y-1">
//                   <RotateCcw className="w-5 h-5 text-[#046A38] mx-auto" />
//                   <span>5 Days Easy Return</span>
//                 </div>
//               </div>

//               {/* PINCODE CHECKER */}
//               <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-xs font-black uppercase text-slate-800 flex items-center space-x-1.5">
//                     <MapPin className="w-4 h-4 text-[#046A38]" />
//                     <span>Check Delivery Availability</span>
//                   </label>
//                   <div className="flex space-x-2">
//                     <input
//                       type="text"
//                       maxLength={6}
//                       placeholder="Enter 6-digit Pincode"
//                       value={pincode}
//                       onChange={(e) => setPincode(e.target.value)}
//                       className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-white"
//                     />
//                     <button
//                       onClick={checkPincode}
//                       className="bg-slate-900 hover:bg-black text-white text-xs font-extrabold px-4 py-2 rounded-xl transition-colors cursor-pointer"
//                     >
//                       Check
//                     </button>
//                   </div>
//                   {pincodeMsg && (
//                     <p className="text-[11px] font-bold text-[#046A38]">{pincodeMsg}</p>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs font-bold text-slate-700">
//                   <div className="flex items-center space-x-1.5">
//                     <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
//                     <span>100% Organic Certified</span>
//                   </div>
//                   <div className="flex items-center space-x-1.5">
//                     <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
//                     <span>Direct Farm Harvested</span>
//                   </div>
//                   <div className="flex items-center space-x-1.5">
//                     <Award className="w-4 h-4 text-[#FF6B00] shrink-0" />
//                     <span>Eco-Friendly Packaging</span>
//                   </div>
//                   <div className="flex items-center space-x-1.5">
//                     <ShieldCheck className="w-4 h-4 text-[#046A38] shrink-0" />
//                     <span>Secure PCI Checkout</span>
//                   </div>
//                 </div>
//               </div>

//               {/* SPECIFICATIONS & DETAILS */}
//               <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-6 text-slate-700">
//                 <div className="space-y-3 border-b border-slate-200 pb-4">
//                   <h3 className="text-lg font-serif font-black text-slate-900">
//                     Product Specifications & Details
//                   </h3>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs font-medium text-slate-800">
//                     <p><strong>Product:</strong> {productData.name}</p>
//                     <p><strong>Heading:</strong> {productData.heading || productData.name}</p>
//                     <p><strong>Selected Weight:</strong> {selectedWeight} Net Pack</p>
//                     <p><strong>Collection:</strong> {productData.collectionId?.name || "Organic Superfoods"}</p>
//                     <p><strong>Brand:</strong> Ecoensa</p>
//                     <p><strong>Status:</strong> {productData.status || "In Stock"}</p>
//                   </div>
//                 </div>

//                 {/* SHORT & FULL DESCRIPTION */}
//                 <div className="space-y-3 text-xs text-slate-700 font-medium leading-relaxed">
//                   {productData.shortDescription && (
//                     <div
//                       className="font-semibold text-slate-900"
//                       dangerouslySetInnerHTML={{ __html: productData.shortDescription }}
//                     />
//                   )}
//                   {productData.fullDescription && (
//                     <div
//                       dangerouslySetInnerHTML={{ __html: productData.fullDescription }}
//                     />
//                   )}
//                 </div>
//               </div>

//             </div>

//           </div>

//           {/* SIMILAR PRODUCTS */}
//           {similarProducts.length > 0 && (
//             <div className="space-y-6 pt-4">
//               <div className="flex items-center justify-between border-b border-slate-200 pb-3">
//                 <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
//                   You May Also Like
//                 </h3>
//                 <Link href="/shop" className="text-xs sm:text-sm font-extrabold text-[#FF6B00] hover:underline">
//                   View All Products →
//                 </Link>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {similarProducts.map((item) => (
//                   <div key={item.id} className="group space-y-2.5 flex flex-col justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
//                     <div className="relative w-full aspect-square overflow-hidden bg-slate-100 rounded-xl">
//                       <Link href={`/products/${item.id}`}>
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = fallbackSVG;
//                           }}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                         />
//                       </Link>
//                       <span className="absolute top-2 left-2 bg-[#6B2D49] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
//                         {item.discount}
//                       </span>
//                     </div>

//                     <div className="space-y-1">
//                       <Link href={`/products/${item.id}`}>
//                         <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-[#FF6B00] line-clamp-1">
//                           {item.name}
//                         </h4>
//                       </Link>
//                       <div className="flex items-center space-x-1 text-[11px] font-bold text-slate-500">
//                         <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
//                         <span className="text-slate-800">{item.rating}</span>
//                         <span>({item.reviews})</span>
//                       </div>
//                     </div>

//                     <div className="flex items-center space-x-2 text-xs font-normal">
//                       <span className="text-slate-400 line-through">Rs. {item.mrp.toLocaleString("en-IN")}.00</span>
//                       <span className="font-bold text-slate-900 text-sm">Rs. {item.price.toLocaleString("en-IN")}.00</span>
//                     </div>

//                     <button
//                       onClick={() => addToCart(item.rawProduct || item, 1)}
//                       className="w-full bg-black hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
//                     >
//                       <ShoppingBag className="w-3.5 h-3.5" />
//                       <span>Add to Cart</span>
//                     </button>
//                   </div>
//                 ))}
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

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw, Plus, Minus, Check, MapPin, Sparkles, Leaf, Award } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

// ==========================================
// 100% LIVE API BASE CONFIGURATION
const API_BASE = "https://moteligo.in/ecoback";
// ==========================================

const fallbackSVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='100%' height='100%' fill='%23E2E8F0'/><text x='50%' y='50%' font-size='20' font-weight='bold' fill='%23046A38' dominant-baseline='middle' text-anchor='middle'>Ecoensa Product</text></svg>";

const resolveImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const normalizedBase = API_BASE.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

export default function ProductDetailPage() {
  const params = useParams();

  /* Support both [id] folder and [slug] folder dynamically */
  const productIdOrSlug =
    params?.id ||
    params?.slug ||
    (typeof window !== "undefined" ? window.location.pathname.split("/").pop() : "");

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(fallbackSVG);

  /* Grouped Variants State: { "Size": ["XXL", "XL"], "Color": ["Red", "Green"] } */
  const [groupedVariants, setGroupedVariants] = useState({});
  const [selectedVariants, setSelectedVariants] = useState({});

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState("");

  const [similarProducts, setSimilarProducts] = useState([]);

  const { addToCart } = useCart();

  /* Fetch live Product Details & Similar Products */
  useEffect(() => {
    if (!productIdOrSlug) return;

    async function fetchProductDetails() {
      try {
        setLoading(true);
        setErrorMsg(null);

        let fetchedProduct = null;

        /* Step 1: Try by Slug endpoint */
        try {
          const slugRes = await fetch(`${API_BASE}/api/collections/slug/${encodeURIComponent(productIdOrSlug)}`);
          const slugJson = await slugRes.json();
          if (slugJson?.status && slugJson?.data) {
            fetchedProduct = slugJson.data;
          }
        } catch (e) {
          console.warn(e);
        }

        /* Step 2: Try by Product Slug endpoint */
        if (!fetchedProduct) {
          try {
            const pSlugRes = await fetch(`${API_BASE}/api/products/slug/${encodeURIComponent(productIdOrSlug)}`);
            const pSlugJson = await pSlugRes.json();
            if (pSlugJson?.status && pSlugJson?.data) {
              fetchedProduct = pSlugJson.data;
            }
          } catch (e) {
            console.warn(e);
          }
        }

        /* Step 3: Try by ID endpoint */
        if (!fetchedProduct) {
          try {
            const idRes = await fetch(`${API_BASE}/api/products/${encodeURIComponent(productIdOrSlug)}`);
            const idJson = await idRes.json();
            if (idJson?.status && idJson?.data) {
              fetchedProduct = idJson.data;
            }
          } catch (e) {
            console.warn(e);
          }
        }

        /* Step 4: Fallback match from public products list */
        if (!fetchedProduct) {
          try {
            const publicRes = await fetch(`${API_BASE}/api/products/public`);
            const publicJson = await publicRes.json();
            if (publicJson?.status && Array.isArray(publicJson?.data)) {
              fetchedProduct = publicJson.data.find(
                (p) => p.slug === productIdOrSlug || String(p._id) === String(productIdOrSlug)
              );
            }
          } catch (e) {
            console.warn(e);
          }
        }

        if (fetchedProduct) {
          setProductData(fetchedProduct);

          /* Map gallery images */
          const rawImgs = fetchedProduct.productImages || fetchedProduct.images || [];
          const mappedImgs = rawImgs
            .map((img) => resolveImageUrl(typeof img === "string" ? img : img.image || img.url))
            .filter(Boolean);

          const finalGallery = mappedImgs.length > 0 ? mappedImgs : [fallbackSVG];
          setGalleryImages(finalGallery);
          setSelectedImage(finalGallery[0]);

          /* GROUP VARIANTS BY TYPE (Size, Color, Weight, etc.) */
          if (Array.isArray(fetchedProduct.variants) && fetchedProduct.variants.length > 0) {
            const grouped = {};
            const initialSelection = {};

            fetchedProduct.variants.forEach((v) => {
              const typeName = v.name || v.variantName || "Variant";
              const typeValue = v.value || v.variantValue;
              
              if (typeName && typeValue) {
                if (!grouped[typeName]) {
                  grouped[typeName] = [];
                  initialSelection[typeName] = typeValue; // set first value as default
                }
                if (!grouped[typeName].includes(typeValue)) {
                  grouped[typeName].push(typeValue);
                }
              }
            });

            setGroupedVariants(grouped);
            setSelectedVariants(initialSelection);
          }
        } else {
          setErrorMsg("Product details not found.");
        }

        /* Fetch Similar Products */
        const similarRes = await fetch(`${API_BASE}/api/products/public`);
        const similarJson = await similarRes.json();

        if (similarJson?.status && Array.isArray(similarJson?.data)) {
          const mappedSimilar = similarJson.data
            .filter((p) => p.slug !== productIdOrSlug && String(p._id) !== String(productIdOrSlug))
            .slice(0, 4)
            .map((p) => {
              const imgs = p.productImages || p.images || [];
              const rawImg = typeof imgs[0] === "string" ? imgs[0] : imgs[0]?.image || imgs[0]?.url;
              const imgUrl = resolveImageUrl(rawImg) || fallbackSVG;
              const discountVal = p.discountPercentage ?? p.discount ?? 0;

              return {
                id: p.slug || p._id,
                name: p.name,
                price: Number(p.payablePrice ?? p.originalPrice) || 0,
                mrp: Number(p.originalPrice) || 0,
                discount: `${discountVal}% OFF`,
                rating: p.rating || 4.9,
                reviews: p.reviews || 95,
                image: imgUrl,
                rawProduct: p,
              };
            });

          setSimilarProducts(mappedSimilar);
        }
      } catch (err) {
        console.error("Failed to load product details:", err);
        setErrorMsg("Failed to load product information.");
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [productIdOrSlug]);

  /* Computed Pricing */
  const price = Number(productData?.payablePrice ?? productData?.originalPrice) || 0;
  const mrp = Number(productData?.originalPrice) || 0;
  const discountVal = productData?.discountPercentage ?? productData?.discount ?? 0;

  // Selected Variant String Summary (e.g. "XXL / Red")
  const selectedVariantSummary = Object.values(selectedVariants).filter(Boolean).join(" / ") || "Standard";

  // Product Data Object for Cart Context
  const currentProduct = {
    id: productData?._id || productData?.id || productIdOrSlug,
    slug: productData?.slug || productIdOrSlug,
    name: productData?.name || "Ecoensa Product",
    price: price,
    mrp: mrp,
    image: selectedImage,
    rawProduct: productData,
  };

  // REAL ADD TO CART FUNCTION CALL
  const handleAddToCart = () => {
    addToCart(currentProduct, quantity, selectedVariantSummary);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const checkPincode = () => {
    if (pincode.length === 6) {
      setPincodeMsg("Express delivery available in 2-4 business days!");
    } else {
      setPincodeMsg("Please enter a valid 6-digit Pincode");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
        <Header />
        <main className="flex-grow pt-16 pb-20 text-center font-bold text-lg">
          <div className="max-w-[1400px] mx-auto px-4 space-y-6">
            <div className="h-96 bg-slate-200 rounded-3xl animate-pulse" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (errorMsg || !productData) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
        <Header />
        <main className="flex-grow pt-16 pb-20 text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">{errorMsg || "Product Not Found"}</h2>
          <Link href="/shop" className="bg-[#FF6B00] text-white font-bold text-xs px-6 py-3 rounded-full inline-block">
            Back to Shop Page
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-8 sm:pt-10 pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-16">
          
          {/* MAIN PRODUCT 2-COLUMN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl items-start">
            
            {/* LEFT COLUMN: STICKY PRODUCT IMAGES GALLERY */}
            <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24 lg:self-start">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group">
                <img
                  src={selectedImage}
                  alt={productData.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackSVG;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-4 left-4">
                  <span className="bg-[#6B2D49] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md">
                    {discountVal > 30 ? `${discountVal}% OFF` : "100% Organic"}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-700 flex items-center justify-center hover:text-rose-600 shadow-md cursor-pointer transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-rose-500 text-rose-500" : "text-slate-700"}`} />
                  </button>
                </div>
              </div>

              {/* THUMBNAIL SWITCHERS */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImage === img ? "border-slate-900 ring-2 ring-slate-400/20" : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: PRODUCT INFO & BUYING WIDGET */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-2">
                <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200 inline-block">
                  100% Organic Certified
                </span>
                <h1 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight leading-tight">
                  {productData.name}
                </h1>

                <div className="flex items-center space-x-3 text-xs sm:text-sm font-bold">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-slate-800 font-extrabold">4.9 / 5.0</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-[#046A38] font-bold underline cursor-pointer">128 Customer Reviews</span>
                </div>
              </div>

              {/* PRICING */}
              <div className="flex items-baseline space-x-3 border-y border-slate-100 py-3.5">
                <span className="text-3xl sm:text-4xl font-serif font-black text-slate-900">
                  Rs. {price.toLocaleString("en-IN")}.00
                </span>
                {mrp > price && (
                  <span className="text-sm sm:text-base text-slate-400 line-through">
                    Rs. {mrp.toLocaleString("en-IN")}.00
                  </span>
                )}
                {discountVal > 0 && (
                  <span className="bg-emerald-100 text-[#046A38] text-xs font-black px-2.5 py-1 rounded-md border border-emerald-200">
                    Save {discountVal}% OFF
                  </span>
                )}
              </div>

              {/* DYNAMIC VARIANT SELECTION (GROUPED SEPARATELY BY TYPE) */}
              {Object.keys(groupedVariants).length > 0 && (
                <div className="space-y-4">
                  {Object.keys(groupedVariants).map((typeName) => {
                    const values = groupedVariants[typeName];
                    const currentSelected = selectedVariants[typeName] || values[0];

                    return (
                      <div key={typeName} className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">
                          Select {typeName}: <span className="text-[#046A38] font-bold">{currentSelected}</span>
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {values.map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() =>
                                setSelectedVariants((prev) => ({
                                  ...prev,
                                  [typeName]: val,
                                }))
                              }
                              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                                currentSelected === val
                                  ? "bg-slate-900 text-white border-slate-900 shadow-md"
                                  : "bg-slate-50 text-slate-800 border-slate-300 hover:border-slate-400"
                              }`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* QUANTITY & BLACK & WHITE BUTTONS */}
              <div className="space-y-4 pt-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quantity:</span>
                  <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 font-black cursor-pointer shadow-xs"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-black text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 font-black cursor-pointer shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* BLACK & WHITE BUTTONS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* ADD TO CART BUTTON */}
                  <button
                    onClick={handleAddToCart}
                    className={`w-full font-extrabold text-sm py-4 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                      added
                        ? "bg-emerald-600 text-white"
                        : "bg-black hover:bg-slate-800 text-white"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  {/* BUY IT NOW LINK TO CHECKOUT */}
                  <Link
                    href="/checkout"
                    onClick={() => addToCart(currentProduct, quantity, selectedVariantSummary)}
                    className="w-full bg-white hover:bg-slate-100 border-2 border-slate-900 text-slate-900 font-extrabold text-sm py-4 rounded-xl shadow-md transition-all duration-300 cursor-pointer text-center block"
                  >
                    BUY IT NOW
                  </Link>
                </div>
              </div>

              {/* TRUST BADGES */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-center text-xs font-semibold text-slate-600">
                <div className="space-y-1">
                  <Truck className="w-5 h-5 text-[#046A38] mx-auto" />
                  <span>Free Express Shipping</span>
                </div>
                <div className="space-y-1">
                  <ShieldCheck className="w-5 h-5 text-[#FF6B00] mx-auto" />
                  <span>100% Quality Assurance</span>
                </div>
                <div className="space-y-1">
                  <RotateCcw className="w-5 h-5 text-[#046A38] mx-auto" />
                  <span>5 Days Easy Return</span>
                </div>
              </div>

              {/* PINCODE CHECKER */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-800 flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-[#046A38]" />
                    <span>Check Delivery Availability</span>
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-[#046A38] bg-white"
                    />
                    <button
                      onClick={checkPincode}
                      className="bg-slate-900 hover:bg-black text-white text-xs font-extrabold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      Check
                    </button>
                  </div>
                  {pincodeMsg && (
                    <p className="text-[11px] font-bold text-[#046A38]">{pincodeMsg}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs font-bold text-slate-700">
                  <div className="flex items-center space-x-1.5">
                    <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Organic Certified</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Direct Farm Harvested</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Award className="w-4 h-4 text-[#FF6B00] shrink-0" />
                    <span>Eco-Friendly Packaging</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#046A38] shrink-0" />
                    <span>Secure PCI Checkout</span>
                  </div>
                </div>
              </div>

              {/* SPECIFICATIONS & DETAILS */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-6 text-slate-700">
                <div className="space-y-3 border-b border-slate-200 pb-4">
                  <h3 className="text-lg font-serif font-black text-slate-900">
                    Product Specifications & Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs font-medium text-slate-800">
                    <p><strong>Product:</strong> {productData.name}</p>
                    <p><strong>Heading:</strong> {productData.heading || productData.name}</p>
                    <p><strong>Selected Variant:</strong> {selectedVariantSummary}</p>
                    <p><strong>Collection:</strong> {productData.collectionId?.name || "Organic Superfoods"}</p>
                    <p><strong>Brand:</strong> Ecoensa</p>
                    <p><strong>Status:</strong> {productData.status || "In Stock"}</p>
                  </div>
                </div>

                {/* SHORT & FULL DESCRIPTION */}
                <div className="space-y-3 text-xs text-slate-700 font-medium leading-relaxed">
                  {productData.shortDescription && (
                    <div
                      className="font-semibold text-slate-900"
                      dangerouslySetInnerHTML={{ __html: productData.shortDescription }}
                    />
                  )}
                  {productData.fullDescription && (
                    <div
                      dangerouslySetInnerHTML={{ __html: productData.fullDescription }}
                    />
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* SIMILAR PRODUCTS */}
          {similarProducts.length > 0 && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
                  You May Also Like
                </h3>
                <Link href="/shop" className="text-xs sm:text-sm font-extrabold text-[#FF6B00] hover:underline">
                  View All Products →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((item) => (
                  <div key={item.id} className="group space-y-2.5 flex flex-col justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
                    <div className="relative w-full aspect-square overflow-hidden bg-slate-100 rounded-xl">
                      <Link href={`/products/${item.id}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackSVG;
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <span className="absolute top-2 left-2 bg-[#6B2D49] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {item.discount}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <Link href={`/products/${item.id}`}>
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-[#FF6B00] line-clamp-1">
                          {item.name}
                        </h4>
                      </Link>
                      <div className="flex items-center space-x-1 text-[11px] font-bold text-slate-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-slate-800">{item.rating}</span>
                        <span>({item.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-normal">
                      <span className="text-slate-400 line-through">Rs. {item.mrp.toLocaleString("en-IN")}.00</span>
                      <span className="font-bold text-slate-900 text-sm">Rs. {item.price.toLocaleString("en-IN")}.00</span>
                    </div>

                    <button
                      onClick={() => addToCart(item.rawProduct || item, 1)}
                      className="w-full bg-black hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}