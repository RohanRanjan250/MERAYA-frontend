import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true 
});

export const refreshAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true 
});

export const openAPI = axios.create({
  baseURL : BASE_URL,
  withCredentials : true 
})

export default API 

