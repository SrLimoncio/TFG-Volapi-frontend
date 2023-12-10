import axiosInstance from '../utils/axiosConfig'

const partURL = 'command/api/';

export const menuExecuteCommand = async (command_id) => {
    try {
      const response = await axiosInstance.get(`${partURL}exe-vol-command`, { params: { command_id } });
      return response;
    } catch (error) {
      throw error;
    }
};

export const showCommand = async (command_id) => {
  try {
    const response = await axiosInstance.get(`${partURL}show-vol-command`, { params: { command_id } });
    return response;
  } catch (error) {
    throw error;
  }
};

