import axios from "axios";
import { refreshAccessToken } from "../store/slices/userSlice";

const getStore = () => require("../store/store").store;

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api", // Replace with your API URL
  timeout: 5000, // Set a timeout of 5 seconds
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // withCredentials: true,
  },
});

// Request Interceptor (Optional: Attach token dynamically)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Example: Fetch token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Optional: Handle global errors)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
 
  async  (error) => {
    
    // save the original request
    const originalRequest = error.config;
    const token = localStorage.getItem("accessToken");
    console.log("originalRequest", originalRequest);
    console.error("API Error:", error.response.status);

      if (error.response?.status === 401 && !originalRequest._retry && token) {
        originalRequest._retry = true; // Prevent infinite loop

        try {
          // Lazy load store and actions to avoid circular dependencies
          const { store } = await import("../store/store");
          const { refreshAccessToken } = await import(
            "../store/slices/userSlice"
          ); // Import action dynamically

          // Get new access token
          const refreshResponse = await store.dispatch(refreshAccessToken());

          if (refreshResponse?.payload?.data?.accessToken) {
            // Update headers with new access token
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${refreshResponse.payload?.data?.accessToken}`;

            // Retry original request
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${refreshResponse.payload?.data?.accessToken}`;

            const response = await axiosInstance(originalRequest);
            
            return response;
          }
        } catch (err) {
          console.error("Token refresh failed:", err);
          return Promise.reject(err);
        }
      }

      console.error("API Error:", error.response?.data || error.message);
      return Promise.reject(error);
  }
);

export default axiosInstance;
