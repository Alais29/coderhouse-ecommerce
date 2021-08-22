import axios from "axios";

const baseUrl = "/api/carrito";

export const getCarritoProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/listar`);
    return response.data.data
  } catch (e) {
    throw new Error(e.response.data.message)
  }
}

export const saveCarritoProduct = async (id: string) => {
  try {
    const response = await axios.post(`${baseUrl}/agregar/${id}`)
    return response.data.data
  } catch (e) {
    throw new Error(e.response.data.message);
  }
}

export const deleteCarritoProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/borrar/${id}`)
    return response.data.data
  } catch (e) {
    throw new Error(e.response.data.message);
  }
}