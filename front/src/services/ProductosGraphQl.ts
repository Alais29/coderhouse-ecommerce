import axios from 'axios';
import { IItem, IItemQuery } from '../commons/interfaces';

const baseUrl = '/api/productos-graphql';

export const getProductsGraphQl = async () => {
  try {
    let body = {
      query: `
        query {
          getProductos {
            _id
            nombre
            precio
            descripcion
            codigo
            foto
          }
        }
      `,
      variables: {},
    };
    let options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`${baseUrl}/listar`, body, options);
    return response.data.data.getProductos;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const saveProductGraphQl = async (newProduct: IItem) => {
  try {
    const variables = { producto: newProduct };
    let body = {
      query: `
        mutation saveProducto(
          $producto: ItemBase!
        ) {
          saveProducto(
            producto: $producto
          ) {
            _id,
            nombre
            descripcion
            codigo
            stock
            precio
            foto
            timestamp
          }
        }
      `,
      variables,
    };
    let options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`${baseUrl}/guardar`, body, options);
    return response.data.data.saveProducto;
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
};

export const updateProduct = async (id: string, product: IItem) => {
  try {
    const response = await axios.put(`${baseUrl}/actualizar/${id}`, product);
    return response.data.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};
