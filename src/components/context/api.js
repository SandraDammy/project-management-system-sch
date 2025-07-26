import axios from "axios";
import { baseUrl } from "./baseUrl"; 

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const post = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const get = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const put = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};
