import axios from './axios';
import axiosInstance from './axios'

const partURL = '/auth/api';

export const login_user = async (email, password) => {
  const response = await axios.post(`${partURL}/login`, 
  { email, password }
  );
  return response;

};

export const register = async (email, password, password2, username, name) => {
  const response = await axios.post(`${partURL}/register`, 
  { email, password, password2, username, name}
  );
  
  return response;
};

export const checkAccessToken = async () => {
  const response = await axiosInstance.get(`${partURL}/check-access-token`);
  
  return response;
};

export const renewAccessToken = async (failedAccessToken, refreshToken) => {
  const response = await axiosInstance.post(`${partURL}/renew-access-token`, {}, {
    headers: {
      'Failed-Access-Token': failedAccessToken,
      'Refresh-Token': `Bearer ${refreshToken}`
    }
  });

  return response;
};