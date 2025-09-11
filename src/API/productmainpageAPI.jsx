import API from "./instance";

export const buyProduct = async (slug) => {
  try {
    const response = await API.get(`/get_product_detail/${slug}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateReviewReaction = async (reviewId, action) => {
  try{
    const response = await API.post(`/reviews/${reviewId}/reaction/`, {action})
    return response.data
  } catch (error) {
    throw error.response?.data || error.message;
  }
};