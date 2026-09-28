import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/cart`;

export const getCartUserId = () => {
  const loggedInUserId = localStorage.getItem("userId");

  if (loggedInUserId) return loggedInUserId;

  const guestUserId = localStorage.getItem("guestCartId");

  if (guestUserId) return guestUserId;

  const newGuestUserId = crypto.randomUUID().replace(/-/g, "").slice(0, 24);
  localStorage.setItem("guestCartId", newGuestUserId);
  return newGuestUserId;
};

export const addToCart = async (userId, productId, quantity = 1, selectedModel = "iPhone 16 Pro Max") => {
  const response = await axios.post(API_URL, {
    userId,
    productId,
    quantity,
    selectedModel,
  });

  return response.data;
};

export const getCart = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);

  return response.data;
};

export const updateCartQuantity = async (
  userId,
  productId,
  quantity,
  selectedModel
) => {
  const response = await axios.put(
    `${API_URL}/${userId}/${productId}`,
    {
      quantity,
      selectedModel,
    }
  );

  return response.data;
};

export const removeFromCart = async (userId, productId, selectedModel) => {
  const response = await axios.delete(
    `${API_URL}/${userId}/${productId}`,
    {
      params: { selectedModel },
    }
  );

  return response.data;
};
