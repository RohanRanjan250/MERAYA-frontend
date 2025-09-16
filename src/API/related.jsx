import API from "./instance";

export const fetchRelatedProducts = async (collectionId) => {
  try {
    const response = await API.get(`/products/related/${collectionId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching related products:", error);
    throw error;
  }
};

export const fetchRelatedProductsCart = async () => {
  try {
    const response = await API.get("/products/related/random");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};