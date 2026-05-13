import axios from "axios";

// Create a centralized axios instance
const defaultBaseURL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const axiosInstance = axios.create({
  // prefer explicit env var, fall back to localhost during development
  baseURL: defaultBaseURL,
  withCredentials: true,
});

// Redirect to login on 401 responses (session expired / unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // perform a full redirect so app state resets
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;