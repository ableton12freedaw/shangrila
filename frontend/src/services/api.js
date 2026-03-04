import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const API_BASE_URL = `${BACKEND_URL}/api`;

export const submitContactMessage = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/contact-messages`, payload);
  return response.data;
};