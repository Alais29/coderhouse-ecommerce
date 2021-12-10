import axios from 'axios';
import { IUser } from 'commons/interfaces';

const baseUrl = '/api/auth';

export const loginUser = async (data: IUser) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, data);
    return response.data.data;
  } catch (e) {
    throw e.response.data;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.get(`${baseUrl}/logout`);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};
