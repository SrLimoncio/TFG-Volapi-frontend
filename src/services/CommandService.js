import axiosInstance from '../utils/axiosConfig'

const partURL = '/command/api';

const prepareOptionsForGetRequest = (options) => {
  return Object.entries(options)
    .filter(([_, option]) => option.checked)
    .map(([id, option]) => {
      // Para las opciones con argumentos, envía su valor. Para las normales, simplemente marca que están seleccionadas.
      const value = option.type === 'with_arguments' ? option.inputValue : 'selected';
      return `${id}=${encodeURIComponent(value)}`;
    })
    .join('&');
};

export const menuExecuteCommand = async (command_id, options) => {
    try {
      const preparedOptions = prepareOptionsForGetRequest(options);
      const response = await axiosInstance.get(`${partURL}/exe-vol-command`, {
        params: {
          command_id,
          options: preparedOptions
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
};

export const showCommand = async (command_id) => {
  try {
    const response = await axiosInstance.get(`${partURL}/show-vol-command`, { params: { command_id } });
    return response;
  } catch (error) {
    throw error;
  }
};

