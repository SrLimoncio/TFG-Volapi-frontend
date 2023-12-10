import axios from "axios";

const baseURL = 'http://127.0.0.1:5000/menu';


export const getCatsMenu = async (headers) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/categories`,
      { headers }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

/*export const getSubCatsMenu = async (category_id) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/subcategories`,
      { category_id }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getInfoCmdMenuUser = async (headers, command_id) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/info-subcat-user`,
      { command_id },
      { headers }
    );
    return response;
  } catch (error) {
    throw error;
  }
};*/