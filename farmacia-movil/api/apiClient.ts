import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

const apiclient: AxiosInstance = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Tipamos el interceptor de la petición
apiclient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiclient;