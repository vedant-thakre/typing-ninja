import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Replace with your API URL
  timeout: 5000, // Set a timeout of 5 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Optional: Attach token dynamically)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Example: Fetch token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Optional: Handle global errors)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
