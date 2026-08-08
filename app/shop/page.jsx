/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Star, Heart, ShoppingBag, Check, Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useCart } from "../context/CartContext";

// Fallback image in case network fails
const fallbackSVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='100%' height='100%' fill='%23E2E8F0'/><text x='50%' y='50%' font-size='20' font-weight='bold' fill='%23046A38' dominant-baseline='middle' text-anchor='middle'>Ecoensa Product</text></svg>";

// All Products Database with Categories
const allProductsDatabase = [
  // DRY FRUITS
  {
    id: "df1",
    name: "Almonds (Regular)",
    category: "dry-fruits",
    price: 110,
    mrp: 171,
    discountVal: 36,
    discount: "36% OFF",
    rating: 4.8,
    reviews: 120,
    inStock: true,
    image: "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "df2",
    name: "Almond California Premium",
    category: "dry-fruits",
    price: 140,
    mrp: 200,
    discountVal: 30,
    discount: "30% OFF",
    rating: 4.9,
    reviews: 340,
    inStock: true,
    image: "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "df3",
    name: "Almond Jumbo Royal",
    category: "dry-fruits",
    price: 120,
    mrp: 170,
    discountVal: 29,
    discount: "29% OFF",
    rating: 4.7,
    reviews: 88,
    inStock: true,
    image: "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "df4",
    name: "Brazil Nuts Organic",
    category: "dry-fruits",
    price: 420,
    mrp: 540,
    discountVal: 22,
    discount: "22% OFF",
    rating: 4.9,
    reviews: 56,
    inStock: true,
    image: "https://images.pexels.com/photos/1093837/pexels-photo-1093837.jpeg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "df5",
    name: "Pista Salted with Shell",
    category: "dry-fruits",
    price: 200,
    mrp: 256,
    discountVal: 22,
    discount: "22% OFF",
    rating: 4.8,
    reviews: 190,
    inStock: true,
    image: "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "df6",
    name: "Pista Plain Premium",
    category: "dry-fruits",
    price: 310,
    mrp: 375,
    discountVal: 17,
    discount: "17% OFF",
    rating: 4.9,
    reviews: 230,
    inStock: true,
    image: "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/1093837/pexels-photo-1093837.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  // SPICES
  {
    id: "sp1",
    name: "Elaichi Green Med Premium",
    category: "spices",
    price: 3399,
    mrp: 6499,
    discountVal: 48,
    discount: "48% OFF",
    rating: 4.9,
    reviews: 128,
    inStock: true,
    image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "sp2",
    name: "Royal Clove Lalperi Special",
    category: "spices",
    price: 3499,
    mrp: 6900,
    discountVal: 49,
    discount: "49% OFF",
    rating: 4.8,
    reviews: 95,
    inStock: true,
    image: "https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "sp3",
    name: "Cinnamon Cassia Roll Organic",
    category: "spices",
    price: 2099,
    mrp: 5499,
    discountVal: 62,
    discount: "62% OFF",
    rating: 4.7,
    reviews: 110,
    inStock: true,
    image: "https://images.pexels.com/photos/4198566/pexels-photo-4198566.jpeg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "sp4",
    name: "Black Pepper Bold Farm Fresh",
    category: "spices",
    price: 1899,
    mrp: 2999,
    discountVal: 36,
    discount: "36% OFF",
    rating: 4.9,
    reviews: 86,
    inStock: true,
    image: "https://images.pexels.com/photos/4198424/pexels-photo-4198424.jpeg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  // BERRIES
  {
    id: "br1",
    name: "Organic Dried Berries Superfood Mix",
    category: "berries",
    price: 1199,
    mrp: 1799,
    discountVal: 33,
    discount: "33% OFF",
    rating: 4.8,
    reviews: 230,
    inStock: true,
    image: "https://images.pexels.com/photos/1093837/pexels-photo-1093837.jpeg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "br2",
    name: "Wild Blueberries & Cranberries Pack",
    category: "berries",
    price: 899,
    mrp: 1299,
    discountVal: 30,
    discount: "30% OFF",
    rating: 4.9,
    reviews: 145,
    inStock: true,
    image: "https://images.pexels.com/photos/1093837/pexels-photo-1093837.jpeg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  // SEEDS & MILLETS
  {
    id: "sd1",
    name: "Organic Chia & Pumpkin Seeds",
    category: "seeds",
    price: 799,
    mrp: 1299,
    discountVal: 38,
    discount: "38% OFF",
    rating: 4.8,
    reviews: 178,
    inStock: true,
    image: "https://images.pexels.com/photos/4198424/pexels-photo-4198424.jpeg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "ml1",
    name: "Organic Foxtail Millet Grains",
    category: "millets",
    price: 499,
    mrp: 799,
    discountVal: 37,
    discount: "37% OFF",
    rating: 4.9,
    reviews: 140,
    inStock: true,
    image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/4198566/pexels-photo-4198566.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  // HONEY & GHEE
  {
    id: "hn1",
    name: "Pure Wild Organic Honey Jar",
    category: "honey",
    price: 3499,
    mrp: 5700,
    discountVal: 39,
    discount: "39% OFF",
    rating: 5.0,
    reviews: 210,
    inStock: true,
    image: "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "gh1",
    name: "A2 Desi Gir Cow Ghee Pure Bilona",
    category: "a2-ghee",
    price: 1999,
    mrp: 2800,
    discountVal: 28,
    discount: "28% OFF",
    rating: 5.0,
    reviews: 512,
    inStock: true,
    image: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=600",
    hoverImage: "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const [selectedCatFilter, setSelectedCatFilter] = useState(currentCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minDiscount, setMinDiscount] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);

  const [wishlist, setWishlist] = useState([]);
  const [addedItem, setAddedItem] = useState(null);

  const { addToCart } = useCart();

  const categories = [
    { id: "all", label: "All Products" },
    { id: "dry-fruits", label: "Dry Fruits" },
    { id: "spices", label: "Spices" },
    { id: "seeds", label: "Seeds" },
    { id: "millets", label: "Millets" },
    { id: "berries", label: "Berries" },
    { id: "a2-ghee", label: "A2 Ghee" },
    { id: "honey", label: "Honey" },
  ];

  // Filter & Sort Logic
  let filteredProducts = allProductsDatabase.filter((item) => {
    const matchesCat =
      selectedCatFilter === "all" || item.category === selectedCatFilter;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice = item.price <= maxPrice;
    const matchesDiscount = item.discountVal >= minDiscount;
    const matchesRating = item.rating >= minRating;
    const matchesStock = !onlyInStock || item.inStock;

    return (
      matchesCat &&
      matchesSearch &&
      matchesPrice &&
      matchesDiscount &&
      matchesRating &&
      matchesStock
    );
  });

  // Sorting
  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "discount") {
    filteredProducts.sort((a, b) => b.discountVal - a.discountVal);
  }

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  // TITLE CASE (FIRST LETTER CAPITAL ONLY)
  const getPageHeading = () => {
    if (selectedCatFilter === "all") return "All Organic Products";
    const found = categories.find((c) => c.id === selectedCatFilter);
    return found ? found.label : "Our Products";
  };

  const resetAllFilters = () => {
    setSelectedCatFilter("all");
    setSearchQuery("");
    setSortBy("featured");
    setMaxPrice(5000);
    setMinDiscount(0);
    setMinRating(0);
    setOnlyInStock(false);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-8">
      
      {/* SMALLER HEADING WITH TITLE CASE (ONLY FIRST CAPITAL) */}
      <div className="border-b border-slate-200 pb-3 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
          {getPageHeading()}
        </h1>

        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
          Showing {filteredProducts.length} Items
        </span>
      </div>

      {/* TOP CATEGORY PILL TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCatFilter(cat.id)}
            className={`px-5 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              selectedCatFilter === cat.id
                ? "bg-[#046A38] text-white shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: PRODUCTS GRID (4 PRODUCTS PER ROW) */}
        <div className="lg:col-span-9 space-y-6">
          
          {filteredProducts.length === 0 ? (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((item) => {
                const isLiked = wishlist.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="group space-y-3 flex flex-col justify-between bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300"
                  >
                    {/* CLICKABLE IMAGE CONTAINER */}
                    <div className="relative w-full aspect-square overflow-hidden bg-slate-100 rounded-xl">
                      <Link href={`/products/${item.id}`} className="block w-full h-full">
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

                      {/* DISCOUNT BADGE */}
                      <div className="absolute top-2 left-2 z-10 pointer-events-none">
                        <span className="bg-[#EF4444] text-white text-[11px] font-black px-2.5 py-0.5 rounded-md shadow-xs">
                          {item.discount}
                        </span>
                      </div>

                      {/* WISHLIST HEART */}
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="absolute top-2 right-2 z-10 text-slate-700 hover:text-rose-600 transition-colors p-1 cursor-pointer bg-white/80 backdrop-blur-md rounded-full shadow-xs"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isLiked ? "fill-rose-500 text-rose-500" : "text-slate-700"
                          }`}
                        />
                      </button>
                    </div>

                    {/* CLICKABLE HEADING */}
                    <div className="space-y-1">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#FF6B00] transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                      </Link>

                      <div className="flex items-center space-x-1 text-[11px] font-bold text-slate-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-slate-800 font-black">{item.rating}</span>
                        <span>({item.reviews})</span>
                      </div>
                    </div>

                    {/* PRICE LINE */}
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-400 font-bold block">Starting From</span>
                      <div className="flex items-baseline space-x-2">
                        <span className="font-serif font-black text-slate-900 text-lg sm:text-xl">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          MRP ₹{item.mrp.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* SOLID BLACK BUTTON */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`w-full font-extrabold text-xs py-3 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer ${
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
          )}

        </div>

        {/* RIGHT SIDEBAR: ADVANCED FILTER PANEL */}
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

          {/* 1. SEARCH INPUT */}
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

          {/* 2. SORT BY DROPDOWN */}
          <div className="space-y-2">
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

          {/* 3. PRICE RANGE SLIDER */}
          <div className="space-y-2.5 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="uppercase text-slate-700">Max Budget:</span>
              <span className="text-[#046A38]">₹{maxPrice.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min={100}
              max={5000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#046A38] cursor-pointer"
            />
          </div>

          {/* 4. DISCOUNT FILTER */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <label className="text-xs font-black uppercase text-slate-700">Minimum Discount</label>
            <div className="space-y-1.5 text-xs font-semibold text-slate-700">
              {[
                { val: 0, label: "All Discounts" },
                { val: 20, label: "20% & Above" },
                { val: 30, label: "30% & Above" },
                { val: 40, label: "40% & Above" },
              ].map((disc) => (
                <label key={disc.val} className="flex items-center space-x-2 cursor-pointer hover:text-[#046A38]">
                  <input
                    type="radio"
                    name="discount"
                    checked={minDiscount === disc.val}
                    onChange={() => setMinDiscount(disc.val)}
                    className="accent-[#046A38]"
                  />
                  <span>{disc.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 5. RATING FILTER */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <label className="text-xs font-black uppercase text-slate-700">Customer Rating</label>
            <div className="space-y-1.5 text-xs font-semibold text-slate-700">
              {[
                { val: 0, label: "All Ratings" },
                { val: 4.8, label: "⭐ 4.8 & Above" },
                { val: 4.9, label: "⭐ 4.9 & Above" },
              ].map((rat) => (
                <label key={rat.val} className="flex items-center space-x-2 cursor-pointer hover:text-[#046A38]">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === rat.val}
                    onChange={() => setMinRating(rat.val)}
                    className="accent-[#046A38]"
                  />
                  <span>{rat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 6. AVAILABILITY CHECKBOX */}
          <div className="pt-3 border-t border-slate-100">
            <label className="flex items-center space-x-2 text-xs font-extrabold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="accent-[#046A38] w-4 h-4"
              />
              <span>In Stock Items Only</span>
            </label>
          </div>

          {/* GUARANTEE BADGE */}
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center space-y-1">
            <span className="text-xs font-black text-[#046A38] block">100% Organic & Fresh</span>
            <p className="text-[11px] text-slate-600 font-medium">Directly harvested from Kerala organic farms.</p>
          </div>

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