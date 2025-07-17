
import axios from 'axios';
import { useAuthStore } from '~/stores/useAuthStore';

const baseURL = [import.meta.env.VITE_BACKEND_URL, "/api"].filter(f => !!f).join("")

const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
}, error => Promise.reject(error));

export default axiosClient;
