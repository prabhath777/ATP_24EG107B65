import axios from "axios";

const api = axios.create({
  baseURL: "https://blood-19ku.onrender.com/api",
  timeout: 10000,
});

// Interceptor to attach the token to every request header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // The backend accepts either:
      // 1. Authorization: Bearer <token>
      // 2. token: <token>
      config.headers["token"] = token;
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
