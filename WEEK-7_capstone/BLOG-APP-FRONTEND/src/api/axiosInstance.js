import axios from "axios";

// Create a centralized axios instance
const defaultBaseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const axiosInstance = axios.create({
  // prefer explicit env var, fall back to localhost during development
  baseURL: defaultBaseURL,
  withCredentials: true,
});

export default axiosInstance;