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