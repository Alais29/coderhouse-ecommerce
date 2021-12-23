import axios from 'axios';
import { IItem, IItemQuery } from '../commons/interfaces';

const baseUrl = '/api/productos';

export const getProducts = async (query?: IItemQuery) => {
  try {
    let queryString = '';
    if (query) {
      queryString = '?';
      const queryArray = Object.entries(query);
      queryArray.forEach((queryValues, index) => {
        queryString += `${queryValues[0]}=${queryValues[1]}${
          index !== queryArray.length - 1 ? '&' : ''
        }`;
      });
    } else {
      queryString = '';
    }
    const response = await axios.get(`${baseUrl}${queryString}`);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const getProduct = async (productId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${productId}`);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const saveProduct = async (newProduct: IItem) => {
  try {
    const response = await axios.post(`${baseUrl}`, newProduct);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const updateProduct = async (id: string, product: IItem) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, product);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};
