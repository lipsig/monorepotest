import axios from "axios";
import AuthService from "./AuthService";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

api.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      AuthService.signOut();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
