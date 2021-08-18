import fs, { promises as fsPromises } from 'fs';
import moment from 'moment';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IItem } from '../common/interfaces';
import { isValidProduct } from '../utils/validations';

const ProductosPath = path.resolve(__dirname, '../../productos.json');
class Productos {
  async getProductos(): Promise<IItem[]> {
    try {
      const products = await fsPromises.readFile(ProductosPath, 'utf-8');
      return JSON.parse(products);
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los productos' };
    }
  }

  async getProducto(id: string): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(ProductosPath, 'utf-8');
      const productosJSON = JSON.parse(productos);
      const producto = productosJSON.find((item: IItem) => item.id === id);
      return producto;
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar el producto' };
    }
  }

  async saveProducto(producto: IItem): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(ProductosPath, 'utf-8');
      const productosJSON = JSON.parse(productos);

      producto.id = uuidv4();
      producto.precio = Number(producto.precio);
      producto.stock = Number(producto.stock);
      producto.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');

      // check if all fields in product are valid and not empty
      isValidProduct(producto);

      if (fs.existsSync(ProductosPath)) {
        productosJSON.push(producto);
        await fsPromises.writeFile(
          ProductosPath,
          JSON.stringify(productosJSON, null, '\t')
        );
        return producto;
      } else {
        throw new Error('No se pudo guardar el producto');
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'No se pudo guardar el producto' };
      } else {
        throw {error: e.error, message: e.message};
      }
    }
  }

  async updateProducto(id: string, producto: IItem): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(ProductosPath, 'utf-8');
      const productosJSON = JSON.parse(productos);

      producto.precio = Number(producto.precio);
      producto.stock = Number(producto.stock);

      // check if all fields in product are valid and not empty
      isValidProduct(producto);

      let productToUpdate = productosJSON.find((item: IItem) => item.id === id);
      productToUpdate = {
        ...productToUpdate,
        ...producto,
      };

      const newProductList = productosJSON.filter(
        (item: IItem) => item.id !== id
      );
      newProductList.push(productToUpdate);

      if (fs.existsSync(ProductosPath)) {
        await fsPromises.writeFile(
          ProductosPath,
          JSON.stringify(newProductList, null, '\t')
        );
        return productToUpdate;
      } else {
        throw new Error('No se pudo actualizar el producto');
      }
    } catch (e) {
      if (e.code) {
        throw {
          error: e,
          message: 'No se pudo actualizar el producto',
        };
      } else {
        throw {error: e.error, message: e.message};
      }
    }
  }

  async deleteProducto(id: string): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(ProductosPath, 'utf-8');
      const productosJSON = JSON.parse(productos);

      const newProductList = productosJSON.filter(
        (item: IItem) => item.id !== id
      );

      if (fs.existsSync(ProductosPath)) {
        await fsPromises.writeFile(
          ProductosPath,
          JSON.stringify(newProductList, null, '\t')
        );
        return newProductList;
      } else {
        throw new Error('No se pudo borrar el producto');
      }
    } catch (e) {
      if (e.code) {
        throw {
          error: e,
          message: 'No se pudo borrar el producto',
        };
      } else {
        throw Error(e.message);
      }
    }
  }
}

export const productosService = new Productos;