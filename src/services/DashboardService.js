import axios from "axios";

const baseURL = 'http://127.0.0.1:5000/dashboard';


export const getListProjects = async (headers) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/projects`,
        { headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };