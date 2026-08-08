/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

// React 19 Official Hook for Safe Client Mounting (Zero Linter Warning & Zero Hydration Mismatch)
const emptySubscribe = () => () => {};
function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mounted = useHasMounted();
  
  const pathname = usePathname();
  const { getCartCount, getCartTotal } = useCart();

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Shop", href: "/shop" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white text-slate-900 py-3 sm:py-4 border-b border-slate-200 shadow-xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Ecoensa Logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/ecosenalogo.webp";
            }}
            className="w-20 sm:w-24 h-auto object-contain"
          />
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-extrabold transition-colors duration-200 ${
                  isActive ? "text-[#046A38]" : "text-slate-700 hover:text-[#FF6B00]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CART BUTTON */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/cart"
            className="flex items-center space-x-2.5 text-white hover:bg-[#FF6B00] font-black text-base sm:text-lg transition-all bg-[#046A38] px-5 py-2.5 rounded-full shadow-md hover:scale-105"
          >
            <span>₹{mounted ? cartTotal.toFixed(2) : "0.00"}</span>
            <div className="relative flex items-center">
              <ShoppingBag className="w-5 h-5 text-white" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-[#FF6B00] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center space-x-3 md:hidden">
          <Link
            href="/cart"
            className="flex items-center space-x-1.5 bg-[#046A38] text-white px-3.5 py-1.5 rounded-full text-xs font-bold"
          >
            <span>₹{mounted ? cartTotal.toFixed(2) : "0.00"}</span>
            <ShoppingBag className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-extrabold text-slate-800 hover:text-[#046A38] py-1"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}