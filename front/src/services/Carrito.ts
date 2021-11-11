import axios from 'axios';

const baseUrl = '/api/carrito';

export const getCarritoProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const saveCarritoProduct = async (id: string) => {
  try {
    const response = await axios.post(`${baseUrl}/${id}`);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const editCarritoProduct = async (productData: {
  productId: string;
  amount: string | number;
}) => {
  try {
    const response = await axios.put(`${baseUrl}`, productData);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const deleteCarritoProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};
