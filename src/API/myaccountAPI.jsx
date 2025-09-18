import API from "./instance";

export const getUserContact = async () => {
  try {
    const response = await API.get("/user/contact");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateUserContact = async (userData) => {
  try {
    const response = await API.post("/user/contact/update", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};