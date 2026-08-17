"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const API_BASE = "https://moteligo.in/ecoback";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("authToken") || localStorage.getItem("userToken");
      if (saved && saved !== "null" && saved !== "undefined") return saved;
    }
    return null;
  });

  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch {
          // fallback
        }
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json?.status && json?.data) {
            setUser(json.data);
            if (typeof window !== "undefined") {
              localStorage.setItem("user", JSON.stringify(json.data));
            }
          }
        })
        .catch((err) => console.error("Profile fetch error:", err))
        .finally(() => setLoading(false));
    } else {
      queueMicrotask(() => setLoading(false));
    }
  }, [token]);

  /* Login API (POST /api/users/login) */
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (json?.status && json?.token) {
        setToken(json.token);
        setUser(json.user);
        localStorage.setItem("authToken", json.token);
        localStorage.setItem("user", JSON.stringify(json.user));
        return { success: true, message: json.message || "Login successful!" };
      }
      return { success: false, message: json?.message || "Invalid credentials" };
    } catch (err) {
      return { success: false, message: "Server connection failed" };
    }
  };

  /* Signup API (POST /api/users/signup) */
  const signup = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json?.status && json?.token) {
        setToken(json.token);
        setUser(json.user);
        localStorage.setItem("authToken", json.token);
        localStorage.setItem("user", JSON.stringify(json.user));
        return { success: true, message: json.message || "Registered successfully!" };
      }
      return { success: false, message: json?.message || "Signup failed" };
    } catch (err) {
      return { success: false, message: "Server connection failed" };
    }
  };

  /* Reset Password API (POST /api/users/reset-password) */
  const resetPassword = async (email, otp, newPassword) => {
    try {
      const res = await fetch(`${API_BASE}/api/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const json = await res.json();
      if (json?.status) {
        return { success: true, message: json.message || "Password reset successful!" };
      }
      return { success: false, message: json?.message || "Invalid OTP or request" };
    } catch (err) {
      return { success: false, message: "Server connection failed" };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      token: null,
      loading: false,
      login: async () => ({ success: false, message: "AuthProvider not mounted" }),
      signup: async () => ({ success: false, message: "AuthProvider not mounted" }),
      resetPassword: async () => ({ success: false, message: "AuthProvider not mounted" }),
      logout: () => {},
    };
  }
  return context;
};