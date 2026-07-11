// authUtils.js - OPTIMIZED VERSION
import { refreshAPI } from "./instance";
import { clearLoggedInFlag } from "../utils/authCookie";

let lastRefreshTime = 0;
let refreshingPromise = null;
let lastActivity = Date.now();

// ============================================
// ACTIVITY TRACKING
// ============================================
// Track user activity to avoid refreshing for inactive users
const updateActivity = () => {
  lastActivity = Date.now();
};

// Listen to user interactions (passive for performance)
['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
  document.addEventListener(event, updateActivity, { passive: true });
});

// ============================================
// TOKEN EXPIRY MANAGEMENT
// ============================================
const setTokenExpiry = (expiresInSeconds = 300) => {
  const expiryTime = Date.now() + (expiresInSeconds * 1000);
  localStorage.setItem('tokenExpiry', expiryTime.toString());
};

const getTokenExpiry = () => {
  const expiry = localStorage.getItem('tokenExpiry');
  return expiry ? parseInt(expiry) : null;
};

const isTokenExpiringSoon = (bufferSeconds = 30) => {
  const expiry = getTokenExpiry();
  if (!expiry) return true;

  // Check if token expires within buffer time
  return Date.now() >= (expiry - (bufferSeconds * 1000));
};

const isUserActive = (thresholdMinutes = 10) => {
  const timeSinceActivity = Date.now() - lastActivity;
  return timeSinceActivity < (thresholdMinutes * 60 * 1000);
};

// ============================================
// INITIALIZE AUTH
// ============================================
export const initializeAuth = async () => {
  const now = Date.now();

  // Prevent frequent calls (debounce)
  if (now - lastRefreshTime < 60 * 1000) return; // 1 minute cooldown

  // Only refresh if token is expired or missing
  if (!isTokenExpiringSoon(60)) {
    console.log("Token still valid, skipping refresh");
    return;
  }

  lastRefreshTime = now;

  // Store promise to reuse for concurrent requests
  if (!refreshingPromise) {
    refreshingPromise = refreshAPI.get("/refresh")
      .then(res => {
        console.log("Access token refreshed on startup");

        // Store token expiry (default 5 minutes if not provided)
        const expiresIn = res.data?.expires_in || 300;
        setTokenExpiry(expiresIn);

        return res.data;
      })
      .catch(err => {
        console.log("No valid refresh token, user might need to log in again.");

        // Handle 401 - refresh token expired or invalid
        if (err.response?.status === 401) {
          console.log("Refresh token expired or invalid");
          clearLoggedInFlag();
          localStorage.removeItem('tokenExpiry');

          // Redirect to login if on a protected page
          const publicPaths = ['/login', '/signup', '/', '/products', '/privacy-policy', '/return-policy'];
          const currentPath = window.location.pathname;
          const isPublicPath = publicPaths.some(path => currentPath.startsWith(path));

          if (!isPublicPath) {
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

// ============================================
// SMART AUTO-REFRESH (ACTIVITY-BASED)
// ============================================
// Only refreshes if:
// 1. User is active
// 2. Token is about to expire
export const startSmartRefresh = () => {
  const REFRESH_CHECK_INTERVAL = 2 * 60 * 1000; // Check every 2 minutes
  const INACTIVITY_THRESHOLD = 10; // 10 minutes

  setInterval(async () => {
    // Skip if user is inactive
    if (!isUserActive(INACTIVITY_THRESHOLD)) {
      console.log("User inactive, skipping background refresh");
      return;
    }

    // Skip if token is still valid
    if (!isTokenExpiringSoon(60)) {
      console.log("Token still valid, skipping background refresh");
      return;
    }

    // User is active and token is expiring - refresh it
    try {
      const res = await refreshAPI.get("/refresh");
      console.log("Token auto-refreshed (user active, token expiring)");

      const expiresIn = res.data?.expires_in || 300;
      setTokenExpiry(expiresIn);
    } catch (err) {
      console.error("Background refresh failed:", err);
      if (err.response?.status === 401) {
        clearLoggedInFlag();
        localStorage.removeItem('tokenExpiry');
      }
    }
  }, REFRESH_CHECK_INTERVAL);
};

// ============================================
// MANUAL REFRESH (For use in interceptors)
// ============================================
export const refreshToken = async () => {
  try {
    const res = await refreshAPI.get("/refresh");
    const expiresIn = res.data?.expires_in || 300;
    setTokenExpiry(expiresIn);
    return res;
  } catch (err) {
    clearLoggedInFlag();
    localStorage.removeItem('tokenExpiry');
    throw err;
  }
};
