/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw, Plus, Minus, Check, MapPin, Sparkles, Leaf, Award } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function ProductDetailPage() {
  const [selectedWeight, setSelectedWeight] = useState("250g");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState("");

  const { addToCart } = useCart();

  // Gallery Images
  const galleryImages = [
    "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/4198566/pexels-photo-4198566.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  // Product Data Object
  const currentProduct = {
    id: "fp1",
    name: "Elaichi Green Med Premium",
    price: 3399,
    mrp: 6499,
    image: selectedImage,
  };

  // Similar Products List
  const similarProducts = [
    {
      id: "fp2",
      name: "Royal Clove Lalperi Special",
      price: 3499,
      mrp: 6900,
      discount: "49% OFF",
      rating: 4.8,
      reviews: 95,
      image: "https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "fp6",
      name: "King Cashew Nuts W240 Jumbo",
      price: 1499,
      mrp: 2200,
      discount: "31% OFF",
      rating: 4.9,
      reviews: 412,
      image: "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "fp9",
      name: "Pure Wild Organic Honey Jar",
      price: 3499,
      mrp: 5700,
      discount: "39% OFF",
      rating: 5.0,
      reviews: 210,
      image: "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "fp5",
      name: "California Almonds Premium Organic",
      price: 1299,
      mrp: 1999,
      discount: "35% OFF",
      rating: 4.9,
      reviews: 340,
      image: "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  // REAL ADD TO CART FUNCTION CALL
  const handleAddToCart = () => {
    addToCart(currentProduct, quantity, selectedWeight);
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
                  alt="Elaichi Green Med Premium"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-4 left-4">
                  <span className="bg-[#6B2D49] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md">
                    New Arrival
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-700 flex items-center justify-center hover:text-rose-600 shadow-md cursor-pointer transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 4 THUMBNAIL SWITCHERS */}
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
            </div>

            {/* RIGHT COLUMN: PRODUCT INFO & BUYING WIDGET */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-2">
                <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200 inline-block">
                  100% Organic Certified
                </span>
                <h1 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight leading-tight">
                  Elaichi Green Med Premium
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
                  Rs. 3,399.00
                </span>
                <span className="text-sm sm:text-base text-slate-400 line-through">
                  Rs. 6,499.00
                </span>
                <span className="bg-emerald-100 text-[#046A38] text-xs font-black px-2.5 py-1 rounded-md border border-emerald-200">
                  Save 48% OFF
                </span>
              </div>

              {/* WEIGHT SELECTION */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">
                  Select Pack Size: <span className="text-[#046A38] font-bold">{selectedWeight}</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {["100g", "250g", "500g", "1kg"].map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                        selectedWeight === weight
                          ? "bg-slate-900 text-white border-slate-900 shadow-md"
                          : "bg-slate-50 text-slate-800 border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

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
                    onClick={() => addToCart(currentProduct, quantity, selectedWeight)}
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
                    <p><strong>Product:</strong> Elaichi Green Med Premium</p>
                    <p><strong>Dimensions:</strong> 8-9mm Bold Medium</p>
                    <p><strong>Weight:</strong> {selectedWeight} Net Pack</p>
                    <p><strong>Content:</strong> 100% Kerala Green Elaichi</p>
                    <p><strong>Origin:</strong> Western Ghats, Kerala</p>
                    <p><strong>Brand:</strong> Ecoensa</p>
                    <p><strong>Pack Sizes:</strong> 100g, 250g, 500g & 1kg</p>
                    <p><strong>Shelf Life:</strong> 12 Months</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-700 font-medium leading-relaxed">
                  <p>
                    Invest in pure organic health with <strong>Ecoensa Elaichi Green Med Premium</strong>. Sourced directly from certified organic farms in Western Ghats, Kerala, these handpicked pods deliver an intense natural aroma and rich essential oil content.
                  </p>
                  <p>
                    Free from synthetic fertilizers, chemical washes, or artificial food dyes, our green cardamom preserves authentic wellness properties.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* SIMILAR PRODUCTS */}
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
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                    <span className="text-slate-400 line-through">Rs. {item.mrp}.00</span>
                    <span className="font-bold text-slate-900 text-sm">Rs. {item.price}.00</span>
                  </div>

                  <button
                    onClick={() => addToCart(item, 1)}
                    className="w-full bg-black hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}