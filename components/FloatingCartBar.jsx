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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-slate-900/95 backdrop-blur-md text-white border-t-2 border-emerald-500/80 shadow-2xl transition-all duration-500">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        
        {/* LEFT: CART PREVIEW & TOTAL */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-700/80 p-0.5 border border-emerald-400/50 overflow-hidden flex items-center justify-center">
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
            <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 font-serif font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-md">
              {count}
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm font-extrabold text-white line-clamp-1">
                {firstItem?.name || "Cart Item"}
              </span>
              {otherCount > 0 && (
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-slate-300 font-bold hidden sm:inline">
                  +{otherCount} more
                </span>
              )}
            </div>

            <div className="flex items-baseline space-x-1.5">
              <span className="text-[11px] text-slate-300 font-semibold">Total:</span>
              <span className="font-serif font-black text-amber-300 text-base sm:text-lg">
                ₹{formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: CONTINUOUS BLINKING CHECKOUT BUTTON */}
        <div className="flex items-center space-x-2 shrink-0">
          <Link
            href="/checkout"
            className="group relative inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 via-amber-300 to-amber-400 hover:from-amber-400 hover:to-emerald-500 text-slate-950 font-serif font-black text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 border border-amber-200 cursor-pointer animate-pulse"
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