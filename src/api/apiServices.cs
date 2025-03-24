import axios from "axios";

// ✅ Base API URL
const API_BASE_URL = "http://localhost:5000/api"; // Change if needed

// ✅ Generic function for GET requests
export const getRequest = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

// ✅ Generic function for POST requests
export const postRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};

// ✅ Generic function for PUT requests
export const putRequest = async (endpoint, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error("PUT request error:", error);
    throw error;
  }
};

// ✅ Generic function for DELETE requests
export const deleteRequest = async (endpoint) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("DELETE request error:", error);
    throw error;
  }
};

// ✅ Login function (Example)
export const login = async (email, password) => {
  try {
    const response = await postRequest("login", { email, password });
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// ✅ Register function (Example)
export const register = async (userData) => {
  try {
    const response = await postRequest("register", userData);
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};
