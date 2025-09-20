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

export const getUserAddress = async () => {
  try {
    const response = await API.get("/user/addresses");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateUserAddress = async (address_id, data) => {
  try {
    const response = await API.post(`/user/addresses/${address_id}/update`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addUserAddress = async (data) => {
  try {
    const response = await API.post("/user/addresses/add", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchUsername = async () => {
  try {
    const response = await API.get("/user/contact/username");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};