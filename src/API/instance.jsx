import axios from "axios";

const BASE_URL = "http://192.168.12.7:8000";

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

