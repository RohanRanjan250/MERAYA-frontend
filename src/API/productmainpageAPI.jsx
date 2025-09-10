import API from "./instance";

export const buyProduct = async (productId) => {
  try {
    const response = await API.get(`/get_product_detail/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const selectProduct = async (productId) => {
  try {
    const response = await API.get(`/get_product_detail/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
