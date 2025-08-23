import API from "./instance";
import { getAccessToken, setAccessToken, clearAccessToken } from "../utils/tokensLocalstorage";

const setupInterceptors = () => {

  API.interceptors.request.use(
    config => {
      const token = getAccessToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  API.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await API.post("/auth/refresh", {}, { withCredentials: true });
          const newAccessToken = res.data.accessToken;

          setAccessToken(newAccessToken);
          API.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;

          return API(originalRequest);
        } catch (err) {
          clearAccessToken();
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
