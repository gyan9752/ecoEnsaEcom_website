// // /* eslint-disable @next/next/no-img-element */
// // "use client";

// // import React, { useState, useSyncExternalStore } from "react";
// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import { ShoppingBag, Menu, X } from "lucide-react";
// // import { useCart } from "@/app/context/CartContext";

// // // React 19 Safe Hook (Zero Linter Warning & Zero Hydration Error)
// // const emptySubscribe = () => () => {};
// // function useHasMounted() {
// //   return useSyncExternalStore(
// //     emptySubscribe,
// //     () => true,
// //     () => false
// //   );
// // }

// // export default function Header() {
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const mounted = useHasMounted();
  
// //   const pathname = usePathname();
// //   const { getCartCount, getCartTotal } = useCart();

// //   const cartCount = getCartCount();
// //   const cartTotal = getCartTotal();

// //   const navLinks = [
// //     { name: "Home", href: "/" },
// //     { name: "Services", href: "/services" },
// //     { name: "Shop", href: "/shop" },
// //     { name: "Contact Us", href: "/contact" },
// //   ];

// //   return (
// //     <header className="sticky top-0 z-50 bg-white text-slate-900 py-3 sm:py-4 border-b border-slate-200 shadow-xs">
// //       {/* GLOBAL 1400PX CONTAINER */}
// //       <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between">
        
// //         {/* CLEAN DIRECT LOGO (NO GREEN CIRCLE WRAPPER) */}
// //         <Link href="/" className="flex items-center shrink-0">
// //           <img
// //             src="/images/logo.png"
// //             alt="Ecoensa Logo"
// //             className="w-20 sm:w-24 h-auto object-contain"
// //           />
// //         </Link>

// //         {/* CENTER NAV LINKS */}
// //         <nav className="hidden md:flex items-center space-x-10">
// //           {navLinks.map((link) => {
// //             const isActive = pathname === link.href;

// //             return (
// //               <Link
// //                 key={link.name}
// //                 href={link.href}
// //                 className={`text-sm sm:text-base font-extrabold transition-colors duration-200 ${
// //                   isActive ? "text-[#046A38]" : "text-slate-700 hover:text-[#FF6B00]"
// //                 }`}
// //               >
// //                 {link.name}
// //               </Link>
// //             );
// //           })}
// //         </nav>

// //         {/* RIGHT CART BUTTON */}
// //         <div className="hidden md:flex items-center space-x-4 shrink-0">
// //           <Link
// //             href="/cart"
// //             className="flex items-center space-x-2.5 text-white hover:bg-[#FF6B00] font-black text-base sm:text-lg transition-all bg-[#046A38] px-5 py-2.5 rounded-full shadow-md hover:scale-105"
// //           >
// //             <span>₹{mounted ? cartTotal.toFixed(2) : "0.00"}</span>
// //             <div className="relative flex items-center">
// //               <ShoppingBag className="w-5 h-5 text-white" />
// //               {mounted && cartCount > 0 && (
// //                 <span className="absolute -top-2 -right-2.5 bg-[#FF6B00] text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
// //                   {cartCount}
// //                 </span>
// //               )}
// //             </div>
// //           </Link>
// //         </div>

// //         {/* MOBILE MENU TOGGLE */}
// //         <div className="flex items-center space-x-3 md:hidden">
// //           <Link
// //             href="/cart"
// //             className="flex items-center space-x-1.5 bg-[#046A38] text-white px-3.5 py-1.5 rounded-full text-xs font-bold"
// //           >
// //             <span>₹{mounted ? cartTotal.toFixed(2) : "0.00"}</span>
// //             <ShoppingBag className="w-4 h-4" />
// //           </Link>

// //           <button
// //             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //             className="p-2 text-slate-700 hover:text-slate-900 cursor-pointer"
// //           >
// //             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
// //           </button>
// //         </div>

// //       </div>

// //       {/* MOBILE DROPDOWN MENU */}
// //       {mobileMenuOpen && (
// //         <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
// //           {navLinks.map((link) => (
// //             <Link
// //               key={link.name}
// //               href={link.href}
// //               onClick={() => setMobileMenuOpen(false)}
// //               className="block text-sm font-extrabold text-slate-800 hover:text-[#046A38] py-1"
// //             >
// //               {link.name}
// //             </Link>
// //           ))}
// //         </div>
// //       )}
// //     </header>
// //   );
// // }




// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState, useSyncExternalStore } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ShoppingBag, Menu, X } from "lucide-react";
// import { useCart } from "@/app/context/CartContext";

// // React 19 Safe Hook
// const emptySubscribe = () => () => {};
// function useHasMounted() {
//   return useSyncExternalStore(
//     emptySubscribe,
//     () => true,
//     () => false
//   );
// }

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const mounted = useHasMounted();
  
//   const pathname = usePathname();
//   const { getCartCount } = useCart();

//   const cartCount = getCartCount();

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Services", href: "/services" },
//     { name: "Shop", href: "/shop" },
//     { name: "Contact Us", href: "/contact" },
//   ];

//   return (
//     <header className="sticky top-0 z-50 bg-white text-slate-900 py-3 sm:py-4 border-b border-slate-200 shadow-xs">
//       {/* GLOBAL 1400PX CONTAINER */}
//       <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between">
        
//         {/* LEFT LOGO */}
//         <Link href="/" className="flex items-center shrink-0">
//           <img
//             src="/images/logo.png"
//             alt="Ecoensa Logo"
//             className="w-20 sm:w-24 h-auto object-contain"
//           />
//         </Link>

//         {/* RIGHT GROUP: NAV LINKS NEAR CART BUTTON WITH ACTIVE UNDERLINE */}
//         <div className="hidden md:flex items-center space-x-8">
//           <nav className="flex items-center space-x-7">
//             {navLinks.map((link) => {
//               const isActive = pathname === link.href;

//               return (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   className={`text-sm sm:text-base font-extrabold transition-all py-1 ${
//                     isActive
//                       ? "text-[#046A38] border-b-2 border-[#046A38]"
//                       : "text-slate-700 hover:text-[#FF6B00]"
//                   }`}
//                 >
//                   {link.name}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* DESKTOP CART BUTTON (ONLY ICON + QUANTITY BADGE, ZERO PRICE TEXT) */}
//           <Link
//             href="/cart"
//             className="relative flex items-center justify-center p-2.5 text-white bg-[#046A38] hover:bg-[#FF6B00] rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
//           >
//             <ShoppingBag className="w-5 h-5 text-white" />
//             {mounted && cartCount > 0 && (
//               <span className="absolute -top-1.5 -right-1.5 bg-[#FF6B00] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//         </div>

//         {/* MOBILE HEADER TOP RIGHT (ONLY CART ICON + MENU TOGGLE) */}
//         <div className="flex items-center space-x-3 md:hidden">
//           <Link
//             href="/cart"
//             className="relative p-2 bg-[#046A38] text-white rounded-full flex items-center justify-center"
//           >
//             <ShoppingBag className="w-4 h-4" />
//             {mounted && cartCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-[#FF6B00] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="p-2 text-slate-700 hover:text-slate-900 cursor-pointer"
//           >
//             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//       </div>



//       {/* MOBILE DROPDOWN MENU */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               onClick={() => setMobileMenuOpen(false)}
//               className={`block text-sm font-extrabold py-1 ${
//                 pathname === link.href ? "text-[#046A38] border-l-2 border-[#046A38] pl-2" : "text-slate-800"
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {/* MOBILE CART BUTTON AT THE BOTTOM */}
//           <div className="pt-2 border-t border-slate-100">
//             <Link
//               href="/cart"
//               onClick={() => setMobileMenuOpen(false)}
//               className="flex items-center justify-between bg-[#046A38] text-white font-extrabold text-xs px-4 py-3 rounded-xl shadow-xs"
//             >
//               <span className="flex items-center space-x-2">
//                 <ShoppingBag className="w-4 h-4" />
//                 <span>View Shopping Cart</span>
//               </span>
//               <span className="bg-[#FF6B00] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full">
//                 {mounted ? cartCount : 0} Items
//               </span>
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }









/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

// React 19 Safe Hook
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
  const { getCartCount } = useCart();

  const cartCount = getCartCount();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Shop", href: "/shop" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white text-slate-900 py-3 sm:py-4 border-b border-slate-200 shadow-xs">
      {/* GLOBAL 1400PX CONTAINER */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* EXACT ONLY logo.png */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/images/logo.png"
            alt="Ecoensa Logo"
            className="w-20 sm:w-24 h-auto object-contain"
          />
        </Link>

        {/* RIGHT GROUP: NAV LINKS NEAR CART BUTTON WITH ACTIVE UNDERLINE */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm sm:text-base font-extrabold transition-all py-1 ${
                    isActive
                      ? "text-[#046A38] border-b-2 border-[#046A38]"
                      : "text-slate-700 hover:text-[#FF6B00]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP CART BUTTON */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center p-2.5 text-white bg-[#046A38] hover:bg-[#FF6B00] rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-white" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#FF6B00] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* MOBILE HEADER TOP RIGHT */}
        <div className="flex items-center space-x-3 md:hidden">
          <Link
            href="/cart"
            className="relative p-2 bg-[#046A38] text-white rounded-full flex items-center justify-center"
          >
            <ShoppingBag className="w-4 h-4" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF6B00] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
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
              className={`block text-sm font-extrabold py-1 ${
                pathname === link.href ? "text-[#046A38] border-l-2 border-[#046A38] pl-2" : "text-slate-800"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* MOBILE CART BUTTON */}
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between bg-[#046A38] text-white font-extrabold text-xs px-4 py-3 rounded-xl shadow-xs"
            >
              <span className="flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4" />
                <span>View Shopping Cart</span>
              </span>
              <span className="bg-[#FF6B00] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full">
                {mounted ? cartCount : 0} Items
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}