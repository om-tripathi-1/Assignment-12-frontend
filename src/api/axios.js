import axios from "axios";

/**
 * Centralized Axios instance configured for API communication.
 * Sends HTTP-only session cookies automatically via withCredentials: true.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;