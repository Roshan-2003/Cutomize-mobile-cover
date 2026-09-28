import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCart, getCartUserId } from '../api/cartApi';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = async () => {
    const userId = getCartUserId();
    try {
      const response = await getCart(userId);
      if (response.success && response.cart) {
        // Saari quantities ko plus karke total count nikalna
        const total = response.cart.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      }
    } catch (error) {
      console.error("Error updating cart count:", error);
    }
  };

  useEffect(() => {
    refreshCartCount(); // Jab App load ho tab count fetch karein
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);