import API, { refreshAPI } from "./instance";

const setupInterceptors = () => {
  API.interceptors.request.use(
    (config) => {
        return config; 
    },
    (error) => Promise.reject(error)
  );

  API.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await refreshAPI.post("/refresh");
          return API(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
