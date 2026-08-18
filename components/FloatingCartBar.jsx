/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

const emptySubscribe = () => () => {};
function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const formatCurrency = (val) => {
  if (val === null || val === undefined) return "0";
  const num = Number(val);
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-IN");
};

export default function FloatingCartBar() {
  const mounted = useHasMounted();
  const pathname = usePathname();
  const { cartItems = [], getCartCount, getCartTotal } = useCart();

  // Prevent SSR Hydration Mismatch
  if (!mounted) return null;

  const count = getCartCount();
  const total = getCartTotal();

  /* Cart, Checkout ya Success Page par floating bar hidden rahega */
  if (count === 0 || pathname === "/cart" || pathname === "/checkout" || pathname?.startsWith("/order-success")) {
    return null;
  }

  const firstItem = cartItems[0];
  const otherCount = cartItems.length - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 py-3 sm:py-3.5 bg-slate-950/95 backdrop-blur-md text-white border-t-2 border-[#046A38] shadow-2xl transition-all duration-500">
      {/* 1400PX EXACT HEADER & FOOTER ALIGNED CONTAINER */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        
        {/* LEFT: CART PREVIEW & TOTAL */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-900/80 p-0.5 border border-emerald-500/50 overflow-hidden flex items-center justify-center">
              {firstItem?.image ? (
                <img
                  src={firstItem.image}
                  alt={firstItem.name || "Product"}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <ShoppingBag className="w-6 h-6 text-white" />
              )}
            </div>
            <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md">
              {count}
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm font-extrabold text-white line-clamp-1">
                {firstItem?.name || "Cart Item"}
              </span>
              {otherCount > 0 && (
                <span className="text-[10px] bg-white/15 px-2.5 py-0.5 rounded-full text-slate-200 font-bold hidden sm:inline">
                  +{otherCount} more
                </span>
              )}
            </div>

            {/* NORMAL CLEAN PRICE TEXT */}
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xs text-slate-300 font-medium">Total:</span>
              <span className="font-sans font-bold text-white text-sm sm:text-base">
                ₹{formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: CONTINUOUS BLINKING CHECKOUT BUTTON */}
        <div className="flex items-center space-x-2 shrink-0">
          <Link
            href="/checkout"
            className="group relative inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 via-amber-300 to-amber-400 hover:from-amber-400 hover:to-emerald-500 text-slate-950 font-sans font-black text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 border border-amber-200 cursor-pointer animate-pulse"
          >
            <Sparkles className="w-4 h-4 text-slate-950 animate-spin" />
            <span className="uppercase tracking-wider">CHECKOUT NOW</span>
            <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}