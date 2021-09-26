import axios from "axios";

const baseUrl = "/api";

export const loginUser = async (name: string) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, { name });
    console.log(response.data.data);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.get(`${baseUrl}/logout`);
    console.log(response.data.data);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};
