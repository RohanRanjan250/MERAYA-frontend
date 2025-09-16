import API from "./instance";

export const fetchCart = async () => {
  try {
    const response = await API.get("/cart/");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const changeCartQuantity = async (itemId, action) => {
  try{
    const response = await API.post(`cart/change/${itemId}/`,{action});
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const removeFromCart = async (itemId) => {
  try{
    const response = await API.delete(`/cart/remove/${itemId}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

