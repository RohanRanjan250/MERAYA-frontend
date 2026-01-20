// authUtils.js
import { refreshAPI } from "./instance";

let lastRefreshTime = 0;
let refreshingPromise = null;

export const initializeAuth = async () => {
  const now = Date.now();
  if (now - lastRefreshTime < 60 * 4000) return; // prevent frequent calls

  lastRefreshTime = now;

  // store promise to reuse for concurrent requests
  if (!refreshingPromise) {
    refreshingPromise = refreshAPI.get("/refresh")
      .then(res => {
        // Token refreshed successfully
        console.log("Access token refreshed on startup:", res.data);
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        return res.data;
      })
      .catch(err => {
        console.log("No valid refresh token, user might need to log in again.");

        // Handle 401 - refresh token expired or invalid
        if (err.response?.status === 401) {
          console.log("Refresh token expired or invalid");
          localStorage.setItem("isAuthenticated", JSON.stringify(false));

          // Optionally redirect to login if on a protected page
          const publicPaths = ['/login', '/signup', '/'];
          if (!publicPaths.includes(window.location.pathname)) {
            window.location.href = '/login';
          }
        }

        return null;
      })
      .finally(() => {
        refreshingPromise = null;
      });
  }

  return refreshingPromise;
};

// Auto-refresh token before expiration (every 4 minutes, token expires at 5 minutes)
export const startAutoRefresh = () => {
  const REFRESH_INTERVAL = 4 * 60 * 1000; // 4 minutes

  setInterval(async () => {
    try {
      const res = await refreshAPI.get("/refresh");
      console.log("Token auto-refreshed:", res.data);
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
    } catch (err) {
      console.error("Auto-refresh failed:", err);
      if (err.response?.status === 401) {
        localStorage.setItem("isAuthenticated", JSON.stringify(false));
      }
    }
  }, REFRESH_INTERVAL);
};
