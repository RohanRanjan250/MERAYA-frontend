import API from "./instance";
import { setAccessToken, clearAccessToken } from "../utils/tokensLocalstorage";

// ✅ Login API
export const login = async (formData) => {
  try {
    const response = await API.post("/auth/login", formData, {
      headers: {
        "Content-Type": "application/json", 
      }
    });

    setAccessToken(response.data.accessToken);
    console.log(response.data) ;
    return response.data;

  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ Signup API
export const signup = async (formData) => {
  try {
    const response = await API.post("/auth/signup", formData, {
      headers: {
        "Content-Type": "application/json",
      }
    });


    setAccessToken(response.data.accessToken);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ Logout API
export const logout = async () => {
  try {
    await API.post("/auth/logout", {}, { withCredentials: true });
    clearAccessToken();
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
