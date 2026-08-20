
// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState, useSyncExternalStore } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ShoppingBag, Menu, X, User, LogOut, ChevronDown } from "lucide-react";
// import { useCart } from "@/app/context/CartContext";
// import { useAuth } from "@/app/context/AuthContext";

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
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);

//   const mounted = useHasMounted();
//   const pathname = usePathname();
//   const { getCartCount } = useCart();
//   const { user, logout } = useAuth();

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

//         {/* RIGHT GROUP: NAV LINKS NEAR CART & DEDICATED LOGIN LINK */}
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

//           {/* USER AUTH BUTTON / DROPDOWN */}
//           {mounted && user ? (
//             <div className="relative">
//               <button
//                 onClick={() => setUserDropdownOpen(!userDropdownOpen)}
//                 className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#046A38] transition-all cursor-pointer"
//               >
//                 <div className="w-7 h-7 rounded-full bg-[#046A38] text-white flex items-center justify-center text-xs font-black uppercase">
//                   {user.name ? user.name.charAt(0) : "U"}
//                 </div>
//                 <span className="text-xs font-extrabold max-w-[90px] truncate">
//                   {user.name || "My Profile"}
//                 </span>
//                 <ChevronDown className="w-3.5 h-3.5" />
//               </button>

//               {/* USER DROPDOWN MENU */}
//               {userDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 text-xs font-extrabold space-y-1">
//                   <div className="px-4 py-2 border-b border-slate-100 space-y-0.5">
//                     <p className="text-slate-900 truncate">{user.name}</p>
//                     <p className="text-[10px] text-slate-400 font-semibold truncate">{user.email}</p>
//                   </div>

//                   <button
//                     onClick={() => {
//                       logout();
//                       setUserDropdownOpen(false);
//                     }}
//                     className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2 cursor-pointer transition-colors"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             /* DIRECT DEDICATED LINK TO /login PAGE */
//             <Link
//               href="/login"
//               className="flex items-center space-x-1.5 text-xs font-extrabold px-4 py-2 rounded-full border border-slate-300 hover:border-[#046A38] text-slate-700 hover:text-[#046A38] bg-slate-50 hover:bg-emerald-50/50 transition-all cursor-pointer"
//             >
//               <User className="w-4 h-4 text-[#046A38]" />
//               <span>Login / Sign In</span>
//             </Link>
//           )}

//           {/* DESKTOP CART BUTTON */}
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

//         {/* MOBILE HEADER TOP RIGHT */}
//         <div className="flex items-center space-x-2 md:hidden">
//           {mounted && user ? (
//             <button
//               onClick={() => setUserDropdownOpen(!userDropdownOpen)}
//               className="w-8 h-8 rounded-full bg-[#046A38] text-white font-black text-xs flex items-center justify-center border border-emerald-300"
//             >
//               {user.name ? user.name.charAt(0) : "U"}
//             </button>
//           ) : (
//             <Link
//               href="/login"
//               className="p-1.5 text-slate-700 hover:text-[#046A38] bg-slate-100 rounded-full flex items-center justify-center"
//             >
//               <User className="w-4 h-4 text-[#046A38]" />
//             </Link>
//           )}

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

//           {/* MOBILE USER AUTH BUTTON */}
//           <div className="pt-2 border-t border-slate-100 space-y-2">
//             {mounted && user ? (
//               <button
//                 onClick={() => {
//                   logout();
//                   setMobileMenuOpen(false);
//                 }}
//                 className="w-full flex items-center justify-between bg-red-50 text-red-600 font-extrabold text-xs px-4 py-3 rounded-xl border border-red-200"
//               >
//                 <span>Logged in as {user.name}</span>
//                 <span className="font-black text-red-700">Logout</span>
//               </button>
//             ) : (
//               <Link
//                 href="/login"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="w-full flex items-center justify-center space-x-2 bg-slate-900 text-white font-extrabold text-xs px-4 py-3 rounded-xl shadow-xs block text-center"
//               >
//                 <User className="w-4 h-4 text-emerald-400" />
//                 <span>Login / Register Account</span>
//               </Link>
//             )}

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
import { ShoppingBag, Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";

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
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const mounted = useHasMounted();
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();

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
        
        {/* LEFT LOGO */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/images/logo.png"
            alt="Ecoensa Logo"
            className="w-20 sm:w-24 h-auto object-contain"
          />
        </Link>

        {/* RIGHT GROUP: NAV LINKS NEAR CART & DEDICATED LOGIN LINK */}
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

          {/* USER AUTH BUTTON / DROPDOWN */}
          {mounted && user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#046A38] transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#046A38] text-white flex items-center justify-center text-xs font-black uppercase">
                  {user.name ? user.name.charAt(0) : "U"}
                </div>
                <span className="text-xs font-extrabold max-w-[90px] truncate">
                  {user.name || "My Profile"}
                </span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {/* USER DROPDOWN MENU WITH MY ACCOUNT */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 text-xs font-extrabold space-y-1">
                  <div className="px-4 py-2 border-b border-slate-100 space-y-0.5">
                    <p className="text-slate-900 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 font-semibold truncate">{user.email}</p>
                  </div>

                  {/* MY ACCOUNT & ORDERS LINK */}
                  <Link
                    href="/my-account"
                    onClick={() => setUserDropdownOpen(false)}
                    className="w-full px-4 py-2.5 text-slate-700 hover:text-[#046A38] hover:bg-emerald-50/70 flex items-center space-x-2 cursor-pointer transition-colors"
                  >
                    <User className="w-4 h-4 text-[#046A38]" />
                    <span>My Account &amp; Orders</span>
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2 cursor-pointer transition-colors border-t border-slate-100"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* DIRECT DEDICATED LINK TO /login PAGE */
            <Link
              href="/login"
              className="flex items-center space-x-1.5 text-xs font-extrabold px-4 py-2 rounded-full border border-slate-300 hover:border-[#046A38] text-slate-700 hover:text-[#046A38] bg-slate-50 hover:bg-emerald-50/50 transition-all cursor-pointer"
            >
              <User className="w-4 h-4 text-[#046A38]" />
              <span>Login / Sign In</span>
            </Link>
          )}

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
        <div className="flex items-center space-x-2 md:hidden">
          {mounted && user ? (
            <Link
              href="/my-account"
              className="w-8 h-8 rounded-full bg-[#046A38] text-white font-black text-xs flex items-center justify-center border border-emerald-300"
            >
              {user.name ? user.name.charAt(0) : "U"}
            </Link>
          ) : (
            <Link
              href="/login"
              className="p-1.5 text-slate-700 hover:text-[#046A38] bg-slate-100 rounded-full flex items-center justify-center"
            >
              <User className="w-4 h-4 text-[#046A38]" />
            </Link>
          )}

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

          {/* MOBILE USER AUTH & MY ACCOUNT BUTTONS */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            {mounted && user ? (
              <div className="space-y-2">
                <Link
                  href="/my-account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between bg-emerald-50 text-[#046A38] font-extrabold text-xs px-4 py-3 rounded-xl border border-emerald-200"
                >
                  <span className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>My Account ({user.name})</span>
                  </span>
                  <span className="font-black text-[#046A38]">View</span>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between bg-red-50 text-red-600 font-extrabold text-xs px-4 py-3 rounded-xl border border-red-200 cursor-pointer"
                >
                  <span>Sign Out</span>
                  <span className="font-black text-red-700">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 bg-slate-900 text-white font-extrabold text-xs px-4 py-3 rounded-xl shadow-xs block text-center"
              >
                <User className="w-4 h-4 text-emerald-400" />
                <span>Login / Register Account</span>
              </Link>
            )}

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