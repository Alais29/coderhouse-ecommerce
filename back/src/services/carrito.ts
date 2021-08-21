import fs, { promises as fsPromises } from 'fs';
import moment from 'moment';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IItem } from '../common/interfaces';
import { productosService } from './producto';

const { getProductosService } = productosService;

const carritosPath = path.resolve(__dirname, '../../carrito.json');

class Carrito {
  async getCarritoService(): Promise<IItem[]> {
    try {
      const carrito = await fsPromises.readFile(carritosPath, 'utf-8');
      return JSON.parse(carrito).productos;
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar el carrito' };
    }
  }

  async getCarritoProductService(id: string): Promise<IItem> {
    try {
      const carrito = await fsPromises.readFile(carritosPath, 'utf-8');
      const productos = JSON.parse(carrito).productos;
      const producto = productos.find((item: IItem) => item.id === id);
      return producto;
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar el producto' };
    }
  }

  async saveCarritoProductService(id: string): Promise<IItem> {
    try {
      const allProducts = await getProductosService();
      const productToAdd = allProducts.find(item => item.id === id);
  
      if (productToAdd) {
        const carrito = await fsPromises.readFile(carritosPath, 'utf-8');
        const carritoJSON = JSON.parse(carrito);
        carritoJSON.productos.push(productToAdd);
        await fsPromises.writeFile(
          carritosPath,
          JSON.stringify(carritoJSON, null, '\t')
        );
        return carritoJSON.productos;
      } else {
        throw new Error('El producto que desea agregar no existe');
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'Hubo un problema al agregar el producto' };
      } else {
        throw { error: e.error, message: e.message };
      }
    }
    
  }

  async deleteCarritoProductService(id: string): Promise<IItem[]> {
    try {
      const carrito = await fsPromises.readFile(carritosPath, 'utf-8');
      const carritoJSON = JSON.parse(carrito);
      const productToDelete = carritoJSON.productos.find((item: IItem) => item.id === id);

      if (productToDelete) {
        const newCarritoProducts = carritoJSON.productos.filter((item: IItem) => item.id !== id);
        carritoJSON.productos = newCarritoProducts;
        await fsPromises.writeFile(
          carritosPath,
          JSON.stringify(carritoJSON, null, '\t')
        );
        return newCarritoProducts;
      } else {
        throw new Error('El producto que desea eliminar no esta en el carrito');
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'Hubo un problema al eliminar el producto' };
      } else {
        throw { error: e.error, message: e.message };
      }
    }
  }
}



export const carritoService = new Carrito;