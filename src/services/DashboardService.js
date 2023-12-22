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

export const createProject = async (name, tool, os, memory_path) => {
  try {
    const response = await axiosInstance.post(`${partURL}/create-project`, {
      name,
      tool,
      os,
      memory_path,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
