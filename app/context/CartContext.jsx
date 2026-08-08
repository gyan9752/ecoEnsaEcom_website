"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Lazy initialization from LocalStorage (Safe for SSR & avoids cascading renders)
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const savedCart = localStorage.getItem("ecoensa_cart");
        return savedCart ? JSON.parse(savedCart) : [];
      } catch (e) {
        console.error("Cart sync error", e);
      }
    }
    return [];
  });

  // Save to LocalStorage whenever cartItems change
  useEffect(() => {
    try {
      localStorage.setItem("ecoensa_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Cart save error", e);
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, quantity = 1, selectedWeight = "250g") => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            mrp: product.mrp || product.price * 1.5,
            weight: selectedWeight,
            image: product.image,
            quantity: quantity,
          },
        ];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update Quantity (+ / -)
  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total Items Count
  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Total Payable Amount
  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

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

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}