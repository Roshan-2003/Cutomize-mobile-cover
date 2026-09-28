import axios from "axios";

const API_URL = "http://localhost:5000/api/payment";

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