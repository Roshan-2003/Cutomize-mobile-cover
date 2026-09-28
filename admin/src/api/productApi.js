import { apiRequest } from "./apiClient";

export const createProduct = async (formData) => {
  return apiRequest("/products", {
    method: "POST",
    body: formData,
  });
};