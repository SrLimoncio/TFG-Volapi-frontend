import axiosInstance from './axios'

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
  const preparedOptions = prepareOptionsForGetRequest(options);
  const response = await axiosInstance.get(`${partURL}/exe-vol-command`, {
    params: {
      command_id,
      options: preparedOptions
    }
  });

  return response;
};

export const showCommand = async (command_id) => {
  const response = await axiosInstance.get(`${partURL}/show-vol-command`, { params: { command_id } });
  
  return response;
};


export const menuDeleteResultCommand = async (command_id) => {
  const response = await axiosInstance.delete(`${partURL}/delete-result-cmd/${command_id}`);
  
  return response;
};