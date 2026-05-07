import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.freeapi.app/api/v1'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchData = async (path, method) => {
  const url = `${API_BASE_URL}${path}`
  try {
    const response = await api({ url, method });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || error;
  }
}