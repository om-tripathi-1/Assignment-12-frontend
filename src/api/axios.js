import axios from "axios";

const api = axios.create({
  baseURL: "https://assignment-12-backend-v256.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;