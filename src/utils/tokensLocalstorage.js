
const ACCESS_TOKEN_KEY = "accessToken";

// Save token
export const setAccessToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

// Get token
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

// Remove token (logout)
export const clearAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};
