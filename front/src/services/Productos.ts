import axios from "axios";
import { IItem, IItemAPI } from "../commons/interfaces";
const baseUrl = "/api/productos";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/listar`);
    return response.data.data;
  } catch (e) {
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

export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/borrar/${id}`);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
}

export const updateProduct = async (id: string, product: IItemAPI) => {
  try {
    const response = await axios.put(`${baseUrl}/actualizar/${id}`, product);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
}