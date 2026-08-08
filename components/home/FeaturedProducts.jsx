/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Star, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState([]);
  const [addedItem, setAddedItem] = useState(null);
  const { addToCart } = useCart();

  const fallbackSVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='100%' height='100%' fill='%23E2E8F0'/><text x='50%' y='50%' font-size='20' font-weight='bold' fill='%23046A38' dominant-baseline='middle' text-anchor='middle'>Ecoensa Product</text></svg>";

  const categorySections = [
    {
      categoryTitle: "Organic Spices & Seasoning",
      categorySlug: "/shop?category=spices",
      products: [
        {
          id: "fp1",
          name: "Elaichi Green Med Premium",
          badge: "New Arrival",
          rating: 4.9,
          reviews: 128,
          price: 3399,
          mrp: 6499,
          discount: "48% OFF",
          image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600",
          hoverImage: "https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "fp2",
          name: "Royal Clove Lalperi Special",
          badge: "Bestseller",
          rating: 4.8,
          reviews: 95,
          price: 3499,
          mrp: 6900,
          discount: "49% OFF",
          image: "https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=600",
          hoverImage: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "fp3",
          name: "Cinnamon Cassia Roll Organic",
          badge: "New Arrival",
          rating: 4.7,
          reviews: 110,
          price: 2099,
          mrp: 5499,
          discount: "62% OFF",
          image: "https://images.pexels.com/photos/4198566/pexels-photo-4198566.jpeg?auto=compress&cs=tinysrgb&w=600",
          hoverImage: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "fp4",
          name: "Black Pepper Bold Farm Fresh",
          badge: "Only 2 Left",
          rating: 4.9,
          reviews: 86,
          price: 1899,
          mrp: 2999,
          discount: "36% OFF",
          image: "https://images.pexels.com/photos/4198424/pexels-photo-4198424.jpeg?auto=compress&cs=tinysrgb&w=600",
          hoverImage: "https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
      ],
    },
    {
      categoryTitle: "Premium Dry Fruits & Nuts",
      categorySlug: "/shop?category=dry-fruits",
      products: [
        {
          id: "fp5",
          name: "California Almonds Premium Organic",
          badge: "Bestseller",
          rating: 4.9,
          reviews: 340,
          price: 1299,
          mrp: 1999,
          discount: "35% OFF",
          image: "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=600",
          hoverImage: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "fp6",
          name: "King Cashew Nuts W240 Jumbo",
          badge: "Popular",
          rating: 4.9,
          reviews: 412,
          price: 1499,
          mrp: 2200,
          discount: "31% OFF",
          image: "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=600",
          hoverImage: "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "fp7",
          name: "Organic Dried Berries Superfood Mix",
          badge: "New Arrival",
          rating: 4.8,
          reviews: 230,
          price: 1199,
          mrp: 1799,
          discount: "33% OFF",
          image: "https://images.pexels.com/photos/1093837/pexels-photo-1093837.jpeg?auto=compress&cs=tinysrgb&w=600",
          hoverImage: "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "fp8",
          name: "Organic Chia & Pumpkin Seeds",
          badge: "Superfood",
          rating: 4.8,
          reviews: 178,
          price: 799,
          mrp: 1299,
          discount: "38% OFF",
          image: "https://images.pexels.com/photos/4198424/pexels-photo-4198424.jpeg?auto=compress&cs=tinysrgb&w=600",
          hoverImage: "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
      ],
    },
  ];

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // REAL ADD TO CART FUNCTION CALL
  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <section className="py-12 sm:py-16 bg-white space-y-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-16">
        {categorySections.map((section, sectionIdx) => (
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
                const isLiked = wishlist.includes(item.id);

                return (
                  <div key={item.id} className="group space-y-2.5 flex flex-col justify-between">
                    <div className="relative w-full aspect-square overflow-hidden bg-slate-100 rounded-xl shadow-xs">
                      <Link href={`/products/${item.id}`} className="block w-full h-full">
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

                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="absolute top-3 right-3 z-10 text-slate-700 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                        aria-label="Add to wishlist"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isLiked ? "fill-rose-500 text-rose-500" : "text-slate-700"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <Link href={`/products/${item.id}`}>
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
                      onClick={() => handleAddToCart(item)}
                      className={`w-full font-bold text-xs py-3 rounded-xl shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center space-x-1.5 ${
                        addedItem === item.id
                          ? "bg-emerald-600 text-white"
                          : "bg-black hover:bg-slate-900 text-white"
                      }`}
                    >
                      {addedItem === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added To Cart!</span>
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
        ))}
      </div>
    </section>
  );
}