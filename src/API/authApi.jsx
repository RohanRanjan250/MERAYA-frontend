import API from "./instance";

// ✅ Login API
export const login = async (formData) => {
  try {
    const response = await API.post("/login", formData);
    console.log(response.data) ;
    return response;

  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Mail Verification @signup

export const emailVerify = async (email) => {
  try{
    const response  = await API.post("/signupotp",{'email':email});
    console.log(response);
    return response ;
  }catch (err){
    throw err.response?.data || err.message ;
  }
}

// Mail Verification @ Login
export const emailloginverify = async (email) => {
  try{
    const response  = await API.post("/loginotp",{'email':email});
    console.log(response);
    return response ;
  }catch (err){
    throw err.message ;
  }
}

// ✅ Signup API
export const signup = async (formData) => {
  try {
    const response = await API.post("/signupotp_verify", formData);

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ Logout API
export const logout = async () => {
  try {
    const response = await API.post("/logout");
    return response ;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const signupWithGoogle = async (id_token) => {
  try {
    const response = await API.post("/api/auth/google/signup", {
      id_token,
    });
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginWithGoogle = async (id_token) => {
  try {
    const response = await API.post("/api/auth/google/login", {
      id_token,
    });
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};