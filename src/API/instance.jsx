import axios from "axios";

const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname.startsWith("192.168.") ||
  window.location.hostname.startsWith("10.");

const BASE_URL = isLocal
  ? (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000")
  : "https://api.meraya.co.in";

const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const refreshAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export const openAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

// Axios interceptor for automatic token refresh on 401 errors
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return API(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        await refreshAPI.get("/refresh");
        console.log("Token refreshed after 401");

        isRefreshing = false;
        processQueue(null);

        // Retry the original request
        return API(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);

        // Refresh failed - redirect to login
        console.error("Token refresh failed, redirecting to login");
        localStorage.setItem("isAuthenticated", JSON.stringify(false));

        // Only redirect if not already on login/signup page
        const publicPaths = ['/login', '/signup', '/'];
        if (!publicPaths.includes(window.location.pathname)) {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;

