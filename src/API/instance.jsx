import axios from "axios";

const BASE_URL = "http://10.10.4.234:8000";

const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true ,
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

