import axiosInstance from './axios'

const partURL = '/dashboard/api';


export const checkUserHasProject = async () => {
  const response = await axiosInstance.get(`${partURL}/user-has-projects`);

  return response;
};

export const getListProjects = async () => {
  const response = await axiosInstance.get(`${partURL}/projects`);

  return response;
};

export const getProfile = async () => {
  const response = await axiosInstance.get(`${partURL}/get-profile`);

  return response;
};

export const updateProject = async (id_project, new_nameProject) => {
  const response = await axiosInstance.put(`${partURL}/update-name-project/${id_project}`,
    { new_nameProject }
  );
  
  return response;
};

export const activateProject = async (id_project) => {
  const response = await axiosInstance.put(`${partURL}/activate-project/${id_project}`);

  return response;
};

export const deleteProject = async (id_project) => {
  const response = await axiosInstance.delete(`${partURL}/delete-project/${id_project}`);
  
  return response;
};

export const createProject = async (name, tool, os) => {
  const response = await axiosInstance.post(`${partURL}/create-project`,
  { name, tool, os });
  
  return response;
};

export const uploadChunk  = async (projectId, chunk, chunkNumber, totalChunks, fileName) => {
  const formData = new FormData();
  formData.append("projectId", projectId);
  formData.append("chunk", chunk);
  formData.append("chunkNumber", chunkNumber);

  // Incluir el total de chunks solo para el primer chunk
  if (chunkNumber === 1) {
    formData.append("totalChunks", totalChunks);
    formData.append("fileName", fileName);
  }

  const response = await axiosInstance.post(`${partURL}/upload-chunk-file`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response;

};
