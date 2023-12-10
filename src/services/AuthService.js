import axios from "axios";

const baseURL = 'http://127.0.0.1:5000/auth';

export const request_login = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/api/login`, {
      email,
      password
    });
    return response;

  } catch (error) {
    throw error;
  }
};

export const register = async (email, password, password2, username, name) => {
  try {
    const response = await axios.post(`${baseURL}/api/register`, 
    { email, password, password2, username, name});
    return response.data;

  } catch (error) {
    throw error;
  }
};

export const checkToken = async (headers) => {
  try {
    const response = await axios.get(`${baseURL}/api/check-token`, { headers });
    return response;

  } catch (error) {
    throw error;
  }
};