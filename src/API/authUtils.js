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
        if(res.status === 401){
          console.log(response);
          const isAuth = response.data.auth.isAuthenticated;
          localStorage.setItem("isAuthenticated", JSON.stringify(isAuth));
        }
        console.log("Access token refreshed on startup:", res.data);
        return res.data;
      })
      .catch(err => {
        console.log("No valid refresh token, user might need to log in again.");
        return null;
      })
      .finally(() => {
        refreshingPromise = null;
      });
  }

  return refreshingPromise;
};
