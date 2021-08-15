import axios from "axios";
import { IItem } from "../commons/interfaces";
const baseUrl = "/api/productos";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/listar`);
    return response.data.data;
  } catch (e) {
    console.log(e.response);
    throw new Error(e.response.data.message);
  }
};

export const saveProduct = async (newProduct: IItem) => {
  try {
    const response = await axios.post(`${baseUrl}/guardar`, newProduct);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};
