import API, { refreshAPI } from "./instance";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

export const setupInterceptors = () => {
  API.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => API(originalRequest));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          res = await refreshAPI.get("/refresh");
          if(res.status === 401){
            console.log(response);
            const isAuth = response.data.auth.isAuthenticated;
            localStorage.setItem("isAuthenticated", JSON.stringify(isAuth));
          } 
          isRefreshing = false;
          processQueue(null);

          return API(originalRequest);
        } catch (err) {
          isRefreshing = false;
          processQueue(err, null);
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};
