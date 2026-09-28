import { API_BASE_URL } from "./apiUrl";

const API_URL = API_BASE_URL;

export const createProduct = async (formData) => {
  const response = await fetch(
    `${API_URL}/products`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Product create failed"
    );
  }

  return data;
};