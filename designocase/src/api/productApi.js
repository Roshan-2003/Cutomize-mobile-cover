import { API_BASE_URL } from "./apiUrl";

const API_URL = API_BASE_URL;

// Normal Products
export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

// Products by Category
export const getProductsByCategory = async (category) => {
  const response = await fetch(
    `${API_URL}/products/category/${encodeURIComponent(category)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();
  return data.product;
};

// iPhone 17 Products
export const getIphone17Products = async () => {
  const response = await fetch(`${API_URL}/iphone17`);

  if (!response.ok) {
    throw new Error("Failed to fetch iPhone 17 products");
  }

  return response.json();
};




