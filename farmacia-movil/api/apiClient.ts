import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

const apiclient: AxiosInstance = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || 'http://192.168.0.106:3000',
  headers: { "Content-Type": "application/json" },
});

// Interceptor de petición - SIN localStorage para que funcione en móvil
apiclient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // ✅ SOLUCIÓN: Usar try-catch para evitar error en móvil
    try {
      // Solo intenta obtener el token si localStorage existe (web)
      if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      // Si no existe localStorage (móvil), simplemente continúa sin token
      console.log('📱 Ejecutando en móvil - sin localStorage');
    }
    
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiclient;