import API from "./instance";

export const buyProduct = async (productId) => {
  try {
    const response = await API.post("/get_product_detail", { id: productId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const selectProduct = async (productId) => {
  try {
    const response = await API.post("/select-product", { id: productId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
