"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // React 19 Safe Lazy State Initialization (Zero Linter Warning & Zero Hydration Error)
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ecoensa_cart");
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error("Cart storage load error:", e);
        return [];
      }
    }
    return [];
  });

  // Save to localStorage whenever cartItems updates
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("ecoensa_cart", JSON.stringify(cartItems));
      } catch (e) {
        console.error("Cart storage save error:", e);
      }
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1, weight = "250g") => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.weight === weight
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { ...product, quantity, weight }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCartItems([]);

  const getCartCount = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const getCartTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);