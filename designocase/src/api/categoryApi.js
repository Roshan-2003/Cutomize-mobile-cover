import axios from "axios";
import { API_BASE_URL } from "./apiUrl";

const API_URL = `${API_BASE_URL}/categories`;

export const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await axios.post(API_URL, categoryData);
  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    categoryData
  );

  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};