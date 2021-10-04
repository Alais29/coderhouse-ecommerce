import axios from "axios";
import { IUser } from "commons/interfaces";

const baseUrl = "/api";

export const loginUser = async (data: IUser) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, data);
    return response.data.data;
  } catch (e) {
    console.log(e.response);
    throw new Error(e.response);
  }
};

export const signupUser = async (data: IUser) => {
  try {
    const response = await axios.post(`${baseUrl}/signup`, data);
    return response.data;
  } catch (e) {
    console.log(e.response);
    throw new Error(e.response);
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
