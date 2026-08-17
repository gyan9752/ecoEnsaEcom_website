// "use client";

// import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// const CartContext = createContext();

// const API_BASE = "https://moteligo.in/ecoback";

// /* Token extractor from localStorage / sessionStorage */
// const getAuthToken = () => {
//   if (typeof window === "undefined") return null;
//   const extractToken = (raw) => {
//     if (!raw || raw === "null" || raw === "undefined") return null;
//     try {
//       const parsed = JSON.parse(raw);
//       if (typeof parsed === "string") return parsed;
//       if (parsed?.token) return parsed.token;
//       if (parsed?.authToken) return parsed.authToken;
//       if (parsed?.accessToken) return parsed.accessToken;
//       if (parsed?.data?.token) return parsed.data.token;
//     } catch {
//       // plain string
//     }
//     return String(raw).trim();
//   };

//   const keys = ["authToken", "token", "accessToken", "adminToken", "userToken", "jwt"];
//   for (const key of keys) {
//     const rawVal = localStorage.getItem(key) || sessionStorage.getItem(key);
//     const t = extractToken(rawVal);
//     if (t) return t;
//   }
//   return null;
// };

// /* Image URL resolver for Backblaze / S3 / Relative paths */
// const resolveImageUrl = (url) => {
//   if (!url) return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='100%' height='100%' fill='%23E2E8F0'/><text x='50%' y='50%' font-size='20' font-weight='bold' fill='%23046A38' dominant-baseline='middle' text-anchor='middle'>Ecoensa Product</text></svg>";
//   if (url.startsWith("http")) return url;
//   const cleanBase = API_BASE.replace(/\/$/, "");
//   const cleanUrl = url.startsWith("/") ? url : `/${url}`;
//   return `${cleanBase}${cleanUrl}`;
// };

// /* Transforms backend cart item format into frontend component item format */
// const transformBackendItem = (item) => {
//   const p = item?.product || {};
//   const imgs = p.productImages || p.images || [];
//   const rawImg = typeof imgs[0] === "string" ? imgs[0] : imgs[0]?.image || imgs[0]?.url || p.productImage;
//   const imgUrl = resolveImageUrl(rawImg);

//   const discountVal = Number(p.discountPercentage ?? p.discount ?? 0) || 0;
//   const payable = Number(item?.price ?? p.payablePrice ?? p.originalPrice ?? 0) || 0;
//   const original = Number(p.originalPrice ?? item?.price ?? payable ?? 0) || payable;
//   const qty = Number(item?.quantity) || 1;

//   return {
//     itemId: item?._id, // Backend item id inside cart
//     id: p._id || p.id || item?._id,
//     productId: p._id || p.id,
//     slug: p.slug || p._id,
//     name: p.name || p.heading || "Ecoensa Product",
//     price: payable,
//     mrp: original,
//     discountVal,
//     quantity: qty,
//     weight: item?.variant?.value || "250g",
//     variant: item?.variant || null,
//     image: imgUrl,
//     rawProduct: p,
//   };
// };

// export function CartProvider({ children }) {
//   // Lazy initial state for Guest Users (Auto-sanitized)
//   const [cartItems, setCartItems] = useState(() => {
//     if (typeof window !== "undefined") {
//       try {
//         const saved = localStorage.getItem("ecoensa_cart");
//         if (saved) {
//           const parsed = JSON.parse(saved);
//           if (Array.isArray(parsed)) {
//             return parsed
//               .map((item) => {
//                 const p = Number(item?.price);
//                 if (isNaN(p)) return null;
//                 return {
//                   ...item,
//                   price: p,
//                   mrp: Number(item?.mrp) || p,
//                   quantity: Number(item?.quantity) || 1,
//                 };
//               })
//               .filter(Boolean);
//           }
//         }
//       } catch (e) {
//         console.error("Cart storage load error:", e);
//       }
//     }
//     return [];
//   });

//   const [loading, setLoading] = useState(true);

//   /* Fetch live cart function */
//   const fetchCart = useCallback(() => {
//     const token = getAuthToken();

//     if (token) {
//       fetch(`${API_BASE}/api/cart`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((res) => res.json())
//         .then((json) => {
//           if (json?.status && Array.isArray(json?.data?.items)) {
//             const formatted = json.data.items.map(transformBackendItem);
//             setCartItems(formatted);
//           }
//         })
//         .catch((err) => {
//           console.error("Backend cart fetch error:", err);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } else {
//       queueMicrotask(() => setLoading(false));
//     }
//   }, []);

//   /* Safe Effect hook */
//   useEffect(() => {
//     const token = getAuthToken();
//     if (token) {
//       fetchCart();
//     } else {
//       queueMicrotask(() => setLoading(false));
//     }
//   }, [fetchCart]);

//   /* Save to localStorage for guest users */
//   useEffect(() => {
//     const token = getAuthToken();
//     if (!token && typeof window !== "undefined") {
//       try {
//         localStorage.setItem("ecoensa_cart", JSON.stringify(cartItems));
//       } catch (e) {
//         console.error("Cart storage save error:", e);
//       }
//     }
//   }, [cartItems]);

//   /* ADD TO CART API (POST /api/cart/add OR GUEST FALLBACK) */
//   const addToCart = async (product, quantity = 1, weight = "250g") => {
//     if (!product) return;

//     const token = getAuthToken();
//     const targetProductId = product._id || product.id || product.productId || product.slug;

//     // UNIVERSAL PRICE & NAME EXTRACTOR
//     const rawPrice = product.payablePrice ?? product.price ?? product.originalPrice ?? 0;
//     const rawMrp = product.originalPrice ?? product.mrp ?? rawPrice;
//     const priceNum = Number(rawPrice) || 0;
//     const mrpNum = Number(rawMrp) || priceNum;

//     const pName = product.name || product.heading || "Organic Product";
//     const imgs = product.productImages || product.images || [];
//     const rawImg = typeof imgs[0] === "string" ? imgs[0] : imgs[0]?.image || imgs[0]?.url || product.image || product.productImage;
//     const imgUrl = resolveImageUrl(rawImg);

//     if (token && targetProductId) {
//       try {
//         const payload = {
//           productId: targetProductId,
//           quantity: quantity,
//           variant: {
//             variantId: product.variantId || "v1",
//             name: "Weight",
//             value: weight,
//           },
//         };

//         const res = await fetch(`${API_BASE}/api/cart/add`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(payload),
//         });

//         const json = await res.json();
//         if (json?.status) {
//           fetchCart();
//           return;
//         }
//       } catch (err) {
//         console.error("API addToCart error:", err);
//       }
//     }

//     // Guest Fallback
//     setCartItems((prev) => {
//       const existingIndex = prev.findIndex(
//         (item) => (item.id === targetProductId || item.productId === targetProductId) && item.weight === weight
//       );
//       if (existingIndex >= 0) {
//         const updated = [...prev];
//         updated[existingIndex].quantity += quantity;
//         return updated;
//       }
//       return [
//         ...prev,
//         {
//           id: targetProductId,
//           productId: targetProductId,
//           slug: product.slug || targetProductId,
//           name: pName,
//           price: priceNum,
//           mrp: mrpNum,
//           quantity,
//           weight,
//           image: imgUrl,
//           rawProduct: product,
//         },
//       ];
//     });
//   };

//   /* REMOVE SINGLE ITEM (DELETE /api/cart/item/:itemId) */
//   const removeFromCart = async (targetIdentifier) => {
//     const token = getAuthToken();
//     const foundItem = cartItems.find(
//       (item) => item.itemId === targetIdentifier || item.id === targetIdentifier || item.productId === targetIdentifier
//     );

//     const itemId = foundItem?.itemId || targetIdentifier;

//     if (token && itemId) {
//       try {
//         const res = await fetch(`${API_BASE}/api/cart/item/${itemId}`, {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const json = await res.json();
//         if (json?.status) {
//           fetchCart();
//           return;
//         }
//       } catch (err) {
//         console.error("API removeFromCart error:", err);
//       }
//     }

//     // Guest Fallback
//     setCartItems((prev) =>
//       prev.filter((item) => item.itemId !== targetIdentifier && item.id !== targetIdentifier && item.productId !== targetIdentifier)
//     );
//   };

//   /* UPDATE QUANTITY (PUT /api/cart/update-quantity) */
//   const updateQuantity = async (targetIdentifier, delta) => {
//     const token = getAuthToken();
//     const foundItem = cartItems.find(
//       (item) => item.itemId === targetIdentifier || item.id === targetIdentifier || item.productId === targetIdentifier
//     );

//     if (!foundItem) return;

//     const newQty = (Number(foundItem.quantity) || 1) + delta;

//     if (newQty <= 0) {
//       await removeFromCart(targetIdentifier);
//       return;
//     }

//     const itemId = foundItem.itemId;

//     if (token && itemId) {
//       try {
//         const res = await fetch(`${API_BASE}/api/cart/update-quantity`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             itemId: itemId,
//             quantity: newQty,
//           }),
//         });

//         const json = await res.json();
//         if (json?.status) {
//           fetchCart();
//           return;
//         }
//       } catch (err) {
//         console.error("API updateQuantity error:", err);
//       }
//     }

//     // Guest Fallback
//     setCartItems((prev) =>
//       prev.map((item) => {
//         if (item.itemId === targetIdentifier || item.id === targetIdentifier || item.productId === targetIdentifier) {
//           return { ...item, quantity: newQty };
//         }
//         return item;
//       })
//     );
//   };

//   /* CLEAR ENTIRE CART (DELETE /api/cart/clear) */
//   const clearCart = async () => {
//     const token = getAuthToken();

//     if (token) {
//       try {
//         const res = await fetch(`${API_BASE}/api/cart/clear`, {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const json = await res.json();
//         if (json?.status) {
//           setCartItems([]);
//           return;
//         }
//       } catch (err) {
//         console.error("API clearCart error:", err);
//       }
//     }

//     // Guest Fallback
//     setCartItems([]);
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("ecoensa_cart");
//     }
//   };

//   const getCartCount = () =>
//     Array.isArray(cartItems) ? cartItems.reduce((acc, item) => acc + (Number(item?.quantity) || 0), 0) : 0;

//   const getCartTotal = () =>
//     Array.isArray(cartItems) ? cartItems.reduce((acc, item) => acc + (Number(item?.price) || 0) * (Number(item?.quantity) || 0), 0) : 0;

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         loading,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         fetchCart,
//         getCartCount,
//         getCartTotal,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);








"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

const API_BASE = "https://moteligo.in/ecoback";

/* Token extractor from localStorage / sessionStorage */
const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  const extractToken = (raw) => {
    if (!raw || raw === "null" || raw === "undefined") return null;
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string") return parsed;
      if (parsed?.token) return parsed.token;
      if (parsed?.authToken) return parsed.authToken;
      if (parsed?.accessToken) return parsed.accessToken;
      if (parsed?.data?.token) return parsed.data.token;
    } catch {
      // plain string
    }
    return String(raw).trim();
  };

  const keys = ["authToken", "token", "accessToken", "adminToken", "userToken", "jwt"];
  for (const key of keys) {
    const rawVal = localStorage.getItem(key) || sessionStorage.getItem(key);
    const t = extractToken(rawVal);
    if (t) return t;
  }
  return null;
};

/* Image URL resolver for Backblaze / S3 / Relative paths */
const resolveImageUrl = (url) => {
  if (!url) return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='100%' height='100%' fill='%23E2E8F0'/><text x='50%' y='50%' font-size='20' font-weight='bold' fill='%23046A38' dominant-baseline='middle' text-anchor='middle'>Ecoensa Product</text></svg>";
  if (typeof url !== "string") return "/images/spices.jpg";
  if (url.startsWith("http") || url.startsWith("data:")) return url;
  const cleanBase = API_BASE.replace(/\/$/, "");
  const cleanUrl = url.startsWith("/") ? url : `/${url}`;
  return `${cleanBase}${cleanUrl}`;
};

/* Transforms backend cart item format into frontend component item format */
const transformBackendItem = (item) => {
  const p = item?.product || item || {};
  const imgs = p.productImages || p.images || (p.image ? [p.image] : []);
  const rawImg = typeof imgs[0] === "string" ? imgs[0] : imgs[0]?.image || imgs[0]?.url || p.image || p.productImage || item?.image;
  const imgUrl = resolveImageUrl(rawImg);

  const discountVal = Number(p.discountPercentage ?? p.discount ?? 0) || 0;
  const payable = Number(item?.price ?? p.payablePrice ?? p.price ?? p.originalPrice ?? 0) || 0;
  const original = Number(p.originalPrice ?? item?.price ?? payable ?? 0) || payable;
  const qty = Number(item?.quantity) || 1;

  return {
    itemId: item?._id || item?.itemId,
    id: p._id || p.id || item?._id,
    productId: p._id || p.id || item?.productId,
    slug: p.slug || p._id || item?._id,
    name: p.name || p.heading || item?.name || "Ecoensa Product",
    price: payable,
    mrp: original,
    discountVal,
    quantity: qty,
    weight: item?.variant?.value || item?.weight || "250g",
    variant: item?.variant || null,
    image: imgUrl,
    rawProduct: p,
  };
};

/* Identifier matcher helper */
const isItemMatch = (item, id) => {
  if (!item || !id) return false;
  const target = String(id);
  return (
    String(item.itemId) === target ||
    String(item.id) === target ||
    String(item.productId) === target ||
    String(item.slug) === target
  );
};

export function CartProvider({ children }) {
  // Lazy initial state for Guest Users (Auto-sanitized)
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ecoensa_cart");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return parsed
              .map((item) => {
                const p = Number(item?.price);
                if (isNaN(p)) return null;
                return {
                  ...item,
                  price: p,
                  mrp: Number(item?.mrp) || p,
                  quantity: Number(item?.quantity) || 1,
                  image: resolveImageUrl(item?.image),
                };
              })
              .filter(Boolean);
          }
        }
      } catch (e) {
        console.error("Cart storage load error:", e);
      }
    }
    return [];
  });

  const [loading, setLoading] = useState(true);

  // SMART SYNC FOR GUEST ITEMS ON LOGIN (ZERO DUPLICATION)
  const syncGuestItemsOnLogin = async (authToken) => {
    if (typeof window === "undefined" || !authToken) return;
    try {
      const saved = localStorage.getItem("ecoensa_cart");
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length === 0) return;

      // 1. Fetch server cart first to see what is ALREADY in database
      let serverProductIds = new Set();
      try {
        const res = await fetch(`${API_BASE}/api/cart`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const json = await res.json();
        if (json?.status && Array.isArray(json?.data?.items)) {
          json.data.items.forEach((it) => {
            const pId = it.product?._id || it.productId || it.product;
            if (pId) serverProductIds.add(String(pId));
          });
        }
      } catch (e) {
        console.warn("Fetch server cart before sync error:", e);
      }

      // 2. Filter out guest items that are ALREADY present on server
      const newItemsToSync = parsed.filter((item) => {
        const pId = item.productId || item.id || item._id;
        return pId && !String(pId).startsWith("guest-") && !serverProductIds.has(String(pId));
      });

      // 3. Sync only NEW guest items to backend
      if (newItemsToSync.length > 0) {
        const promises = newItemsToSync.map(async (item) => {
          const pId = item.productId || item.id || item._id;
          try {
            await fetch(`${API_BASE}/api/cart/add`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
              body: JSON.stringify({
                productId: pId,
                quantity: item.quantity || 1,
                variant: {
                  variantId: "v1",
                  name: "Weight",
                  value: item.weight || "250g",
                },
              }),
            });
          } catch (e) {
            console.warn("Item sync error:", e);
          }
        });
        await Promise.all(promises);
      }

      // 4. Always clear guest cart storage after sync
      localStorage.removeItem("ecoensa_cart");
    } catch (e) {
      console.warn("Guest cart sync warning:", e);
    }
  };

  /* Fetch live cart function */
  const fetchCart = useCallback(async () => {
    const token = getAuthToken();

    if (token) {
      await syncGuestItemsOnLogin(token);

      try {
        const res = await fetch(`${API_BASE}/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        if (json?.status) {
          const rawItems = json?.data?.items || json?.data || [];
          const formatted = Array.isArray(rawItems) ? rawItems.map(transformBackendItem) : [];
          setCartItems(formatted);
        }
      } catch (err) {
        console.error("Backend cart fetch error:", err);
      } finally {
        setLoading(false);
      }
    } else {
      queueMicrotask(() => setLoading(false));
    }
  }, []);

  /* Safe Effect hook */
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      queueMicrotask(() => {
        fetchCart();
      });
    } else {
      queueMicrotask(() => setLoading(false));
    }
  }, [fetchCart]);

  /* Save to localStorage for guest users */
  useEffect(() => {
    const token = getAuthToken();
    if (!token && typeof window !== "undefined") {
      try {
        localStorage.setItem("ecoensa_cart", JSON.stringify(cartItems));
      } catch (e) {
        console.error("Cart storage save error:", e);
      }
    }
  }, [cartItems]);

  /* ADD TO CART API (POST /api/cart/add OR GUEST FALLBACK) */
  const addToCart = async (product, quantity = 1, weight = "250g") => {
    if (!product) return;

    const token = getAuthToken();
    const targetProductId = product._id || product.id || product.productId || product.slug;

    // UNIVERSAL PRICE & NAME EXTRACTOR
    const rawPrice = product.payablePrice ?? product.price ?? product.originalPrice ?? 0;
    const rawMrp = product.originalPrice ?? product.mrp ?? rawPrice;
    const priceNum = Number(rawPrice) || 0;
    const mrpNum = Number(rawMrp) || priceNum;

    const pName = product.name || product.heading || "Organic Product";
    const imgs = product.productImages || product.images || (product.image ? [product.image] : []);
    const rawImg = typeof imgs[0] === "string" ? imgs[0] : imgs[0]?.image || imgs[0]?.url || product.image || product.productImage;
    const imgUrl = resolveImageUrl(rawImg);

    // Update Local State Immediately
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => (item.id === targetProductId || item.productId === targetProductId) && item.weight === weight
      );
      let updated;
      if (existingIndex >= 0) {
        updated = [...prev];
        updated[existingIndex].quantity += quantity;
      } else {
        updated = [
          ...prev,
          {
            id: targetProductId,
            productId: targetProductId,
            slug: product.slug || targetProductId,
            name: pName,
            price: priceNum,
            mrp: mrpNum,
            quantity,
            weight,
            image: imgUrl,
            rawProduct: product,
          },
        ];
      }
      if (!token && typeof window !== "undefined") {
        localStorage.setItem("ecoensa_cart", JSON.stringify(updated));
      }
      return updated;
    });

    if (token && targetProductId) {
      try {
        const payload = {
          productId: targetProductId,
          quantity: quantity,
          variant: {
            variantId: product.variantId || "v1",
            name: "Weight",
            value: weight,
          },
        };

        const res = await fetch(`${API_BASE}/api/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const json = await res.json();
        if (json?.status) {
          fetchCart();
          return;
        }
      } catch (err) {
        console.error("API addToCart error:", err);
      }
    }
  };

  /* REMOVE SINGLE ITEM (DELETE /api/cart/item/:itemId) */
  const removeFromCart = async (targetIdentifier) => {
    const token = getAuthToken();
    const foundItem = cartItems.find((item) => isItemMatch(item, targetIdentifier));
    const itemId = foundItem?.itemId || targetIdentifier;

    setCartItems((prev) => {
      const updated = prev.filter((item) => !isItemMatch(item, targetIdentifier));
      if (!token && typeof window !== "undefined") {
        localStorage.setItem("ecoensa_cart", JSON.stringify(updated));
      }
      return updated;
    });

    if (token && itemId) {
      try {
        const res = await fetch(`${API_BASE}/api/cart/item/${itemId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        if (json?.status) {
          fetchCart();
          return;
        }
      } catch (err) {
        console.error("API removeFromCart error:", err);
      }
    }
  };

  /* UPDATE QUANTITY (PUT /api/cart/update-quantity) */
  const updateQuantity = async (targetIdentifier, delta) => {
    const token = getAuthToken();
    const foundItem = cartItems.find((item) => isItemMatch(item, targetIdentifier));

    if (!foundItem) return;

    const newQty = (Number(foundItem.quantity) || 1) + delta;

    if (newQty <= 0) {
      await removeFromCart(targetIdentifier);
      return;
    }

    setCartItems((prev) => {
      const updated = prev.map((item) => {
        if (isItemMatch(item, targetIdentifier)) {
          return { ...item, quantity: newQty };
        }
        return item;
      });
      if (!token && typeof window !== "undefined") {
        localStorage.setItem("ecoensa_cart", JSON.stringify(updated));
      }
      return updated;
    });

    const itemId = foundItem.itemId;

    if (token && itemId) {
      try {
        const res = await fetch(`${API_BASE}/api/cart/update-quantity`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            itemId: itemId,
            quantity: newQty,
          }),
        });

        const json = await res.json();
        if (json?.status) {
          fetchCart();
          return;
        }
      } catch (err) {
        console.error("API updateQuantity error:", err);
      }
    }
  };

  /* CLEAR ENTIRE CART (DELETE /api/cart/clear) */
  const clearCart = async () => {
    setCartItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("ecoensa_cart");
    }

    const token = getAuthToken();

    if (token) {
      try {
        const res = await fetch(`${API_BASE}/api/cart/clear`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        if (json?.status) {
          return;
        }
      } catch (err) {
        console.error("API clearCart error:", err);
      }
    }
  };

  const getCartCount = () =>
    Array.isArray(cartItems) ? cartItems.reduce((acc, item) => acc + (Number(item?.quantity) || 0), 0) : 0;

  const getCartTotal = () =>
    Array.isArray(cartItems) ? cartItems.reduce((acc, item) => acc + (Number(item?.price) || 0) * (Number(item?.quantity) || 0), 0) : 0;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCart,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);