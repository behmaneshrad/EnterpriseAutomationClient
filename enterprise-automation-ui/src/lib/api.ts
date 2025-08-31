import axios from "axios";
import { useAuth } from "@/context/AuthContext";

//برای استفاده در کل پروژه  axios 
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// اضافه کردن توکن به صورت خودکار
axiosInstance.interceptors.request.use(
  (config) => {
    const { tokens } = useAuth();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;