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