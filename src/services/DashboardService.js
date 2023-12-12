import axiosInstance from '../utils/axiosConfig'

const partURL = 'dashboard/api/';


export const getListProjects = async () => {
    try {
      const response = await axiosInstance.get(`${partURL}projects`);
      return response;
    } catch (error) {
      throw error;
    }
};

export const saveEditProject = async (new_nameProject) => {
  try {
    const response = await axiosInstance.get(`${partURL}save-edit-project`,
      { params: { new_nameProject} }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
