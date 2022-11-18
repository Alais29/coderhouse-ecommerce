import axios from 'axios';
import { IUser } from 'commons/interfaces';

const baseUrl = '/api/usuarios';

export const signupUser = async (data: IUser) => {
  try {
    const response = await axios.post(`${baseUrl}/signup`, data);
    return response.data;
  } catch (e) {
    if(axios.isAxiosError(e))
      throw new Error(e.response?.data);
    else console.log(e)
  }
};

export const userData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/loggedInUser/data`);
    return response.data;
  } catch (e) {
    if(axios.isAxiosError(e))
      throw new Error(e.response?.data);
    else console.log(e)
  }
};
