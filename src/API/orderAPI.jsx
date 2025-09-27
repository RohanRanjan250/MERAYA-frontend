import API from "./instance";

export const OrderCreate = async (payload) => {
  try {
    // Corrected to use POST and pass the payload as the request body
    const response = await API.post("/orders/create", payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await API.get("/orders/history");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// API/orderAPI.js
export const initiateReturn = async (orderId, orderItemId, reason, refundMethod) => {
  try {
    const response = await API.post("/api/return-order/", {
      orderId,
      orderItemId,
      reason,
      refundMethod,
    });
    return response.data;
  } catch (error) {
    console.error("Return order failed:", error);
    throw error.response?.data || error.message;
  }
};

