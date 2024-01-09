import axiosInstance from './axios'

const partURL = '/menu/api';


export const getCatsMenu = async () => {
  const response = await axiosInstance.get(`${partURL}/categories`);
  return response;
};