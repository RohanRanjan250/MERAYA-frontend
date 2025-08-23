import axios from "axios";

const BASE_URL = "https://your-api.com";

const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true // so cookies are sent (for refresh token)
});

export default API;
