import { createContext, useState, useEffect } from "react";
import { getCart, addToCart } from "../api/cartApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    if (userId && token) {
      setUser({ userId, token, name: name || "Customer", email: email || "" });
    }
  }, []);

  const login = async (data) => {
    const guestCartId = localStorage.getItem("guestCartId");
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    if (data.name) localStorage.setItem("userName", data.name);
    if (data.email) localStorage.setItem("userEmail", data.email);
    localStorage.removeItem("guestCartId");

    setUser({
      userId: data.userId,
      token: data.token,
      name: data.name || "Customer",
      email: data.email || "",
    });

    // 1. If user clicked "Buy It Now" while logged out, handle pendingBuyItem
    const pendingBuyRaw = localStorage.getItem("pendingBuyItem");
    if (pendingBuyRaw) {
      try {
        const pendingItem = JSON.parse(pendingBuyRaw);
        if (pendingItem.productId) {
          await addToCart(
            data.userId,
            pendingItem.productId,
            pendingItem.quantity || 1,
            pendingItem.selectedModel || "iPhone 16 Pro Max"
          );
        }
      } catch (err) {
        console.error("Could not process pending buy item:", err);
      } finally {
        localStorage.removeItem("pendingBuyItem");
      }
    }

    // 2. Transfer guest cart items into user's account
    if (guestCartId && guestCartId !== data.userId) {
      try {
        const response = await getCart(guestCartId);
        for (const item of response.cart?.items || []) {
          await addToCart(
            data.userId,
            item.product?._id || item.product,
            item.quantity,
            item.selectedModel
          );
        }
      } catch (error) {
        console.error("Could not move guest cart to account:", error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("guestCartId");
    localStorage.removeItem("pendingBuyItem");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
};
