import axios, { AxiosInstance } from "axios";

// Define the address and baseURL
const ADDRESS = "10.0.0.49:8000";
const BASE_URL = `http://${ADDRESS}/`;

// Create the Axios instance
const apiInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

// Define the API constants
export const APIConstants = {
  baseURL: BASE_URL,
};

// Export the axios instance for use in API calls
export default apiInstance;