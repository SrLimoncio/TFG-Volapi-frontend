import axiosInstance from '../utils/axiosConfig'

const partURL = '/dashboard/api';


export const getListProjects = async () => {
    try {
      const response = await axiosInstance.get(`${partURL}/projects`);
      return response;

    } catch (error) {
      throw error;
    }
};

export const updateProject = async (id_project, new_nameProject) => {
  try {
    const response = await axiosInstance.put(`${partURL}/update-name-project/${id_project}`,
      { new_nameProject }
    );
    return response;

  } catch (error) {
    throw error;
  }
};

export const activateProject = async (id_project) => {
  try {
    const response = await axiosInstance.put(`${partURL}/activate-project/${id_project}`);
    return response;

  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id_project) => {
  try {
    const response = await axiosInstance.delete(`${partURL}/delete-project/${id_project}`);
    return response;

  } catch (error) {
    throw error;
  }
};

export const createProject = async (name, tool, os) => {
  try {
    const response = await axiosInstance.post(`${partURL}/create-project`,
    { name, tool, os });
    return response;

  } catch (error) {
    throw error;
  }
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

  try {
    const response = await axiosInstance.post(`${partURL}/upload-chunk-file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;

  } catch (error) {
    throw error;
  }
};
