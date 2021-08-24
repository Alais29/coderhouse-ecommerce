import { promises as fsPromises } from 'fs';
import path from 'path';
import { IItem } from '../common/interfaces';
import { EErrorCodes } from '../common/enums';
import { productos } from './producto';

const { getProductosPersist } = productos;

const carritosPath = path.resolve(__dirname, '../../carrito.json');

class Carrito {
  async getCarritoPersist(): Promise<IItem[]> {
    try {
      const carrito = await fsPromises.readFile(carritosPath, 'utf-8');
      return JSON.parse(carrito).productos;
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar el carrito' };
    }
  }

  async getCarritoProductPersist(id: string): Promise<IItem> {
    try {
      const carrito = await fsPromises.readFile(carritosPath, 'utf-8');
      const productos = JSON.parse(carrito).productos;
      const producto = productos.find((item: IItem) => item.id === id);
      return producto;
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar el producto' };
    }
  }

  async saveCarritoProductPersist(id: string): Promise<IItem> {
    try {
      const allProducts = await getProductosPersist();
      const productToAdd = allProducts.find((item) => item.id === id);
      const carrito = await fsPromises.readFile(carritosPath, 'utf-8');
      const carritoJSON = JSON.parse(carrito);
      const productToAddInCart = carritoJSON.productos.find((item: IItem) => item.id === id);
      
      if (productToAddInCart) {
        throw {
          error: `-${EErrorCodes.ProductRepeated}`,
          message: 'El producto que desea agregar ya se encuentra en el carrito',
        };
      } else {
        if (productToAdd) {
          carritoJSON.productos.push(productToAdd);
          await fsPromises.writeFile(
            carritosPath,
            JSON.stringify(carritoJSON, null, '\t')
          );
          return carritoJSON.productos;
        } else {
          throw {
            error: `-${EErrorCodes.ProductNotFound}`,
            message: 'El producto que desea agregar no existe',
          };
        }
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'Hubo un problema al agregar el producto' };
      } else {
        throw { error: e.error, message: e.message };
      }
    }
  }

  async deleteCarritoProductPersist(id: string): Promise<IItem[]> {
    try {
      const carrito = await fsPromises.readFile(carritosPath, 'utf-8');
      const carritoJSON = JSON.parse(carrito);
      const productToDelete = carritoJSON.productos.find(
        (item: IItem) => item.id === id
      );

      if (productToDelete) {
        const productToDeleteIndex = carritoJSON.productos
          .map((item: IItem) => item.id)
          .indexOf(id);
        carritoJSON.productos.splice(productToDeleteIndex, 1);
        await fsPromises.writeFile(
          carritosPath,
          JSON.stringify(carritoJSON, null, '\t')
        );
        return carritoJSON.productos;
      } else {
        throw {
          error: `-${EErrorCodes.ProductNotFound}`,
          message: 'El producto que desea eliminar no esta en el carrito',
        };
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

export const carrito = new Carrito();
