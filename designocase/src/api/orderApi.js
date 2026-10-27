import axios from "axios";
import { API_BASE_URL } from "./apiUrl";

const API_URL = `${API_BASE_URL}/orders`;

export const createOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};

export const getUserOrders = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

export const getOrder = async (orderId) => {
  const response = await axios.get(`${API_URL}/${orderId}`);
  return response.data;
};