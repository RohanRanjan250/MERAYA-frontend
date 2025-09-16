import API from "./instance";

export const fetchWishlist = async () => {
  try {
    const response = await API.get("/wishlist/");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const removeFromWishlist = async (productId) => {
    try {
        const response = await API.delete(`/wishlist/delete/${productId}`);
        return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addToCartWishlist = async (productId) => {
  try {
    const response = await API.post(`/cart/add/wishlist/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};