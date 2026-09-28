import axios from "axios";
import { API_BASE_URL } from "./apiUrl";

const API_URL = `${API_BASE_URL}/payment`;

export const createPaymentOrder = async (amount) => {
  const response = await axios.post(
    `${API_URL}/create-order`,
    { amount }
  );

  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await axios.post(
    `${API_URL}/verify`,
    paymentData
  );

  return response.data;
};