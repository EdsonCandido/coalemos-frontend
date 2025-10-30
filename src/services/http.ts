import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// http.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token")
//   if (token) {
//     http.defaults.headers.common["Authorization"] = `Bearer ${token}`
//   }
//   return config
// })
