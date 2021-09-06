import { promises as fsPromises } from 'fs';
import path from 'path';
import { IItem } from '../common/interfaces';
import { NotFound } from 'errors';

const productosPath = path.resolve(__dirname, '../../productos.json');

class ProductosModel {
  async getAll(): Promise<IItem[]> {
    try {
      const products = await fsPromises.readFile(productosPath, 'utf-8');
      return JSON.parse(products);
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los productos' };
    }
  }

  async get(id: string): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(productosPath, 'utf-8');
      const productosJSON = JSON.parse(productos);
      const producto = productosJSON.find((item: IItem) => item.id === id);
      return producto;
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar el producto' };
    }
  }

  async save(producto: IItem): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(productosPath, 'utf-8');
      const productosJSON = JSON.parse(productos);

      productosJSON.push(producto);
      await fsPromises.writeFile(
        productosPath,
        JSON.stringify(productosJSON, null, '\t')
      );
      return producto;
    } catch (e) {
      throw { error: e, message: 'No se pudo guardar el producto' };
    }
  }

  async update(id: string, producto: IItem): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(productosPath, 'utf-8');
      const productosJSON = JSON.parse(productos);

      let productToUpdate = productosJSON.find((item: IItem) => item.id === id);

      if (productToUpdate) {
        productToUpdate = {
          ...productToUpdate,
          ...producto,
        };

        const productToUpdateIndex = productosJSON
          .map((item: IItem) => item.id)
          .indexOf(id);
        productosJSON.splice(productToUpdateIndex, 1, productToUpdate);

        await fsPromises.writeFile(
          productosPath,
          JSON.stringify(productosJSON, null, '\t')
        );
        return productToUpdate;
      } else {
        throw new NotFound('El producto que desea actualizar no existe');
      }
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else {
        throw { error: e, message: 'No se pudo actualizar el producto' };
      }
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const productos = await fsPromises.readFile(productosPath, 'utf-8');
      const productosJSON = JSON.parse(productos);

      const productToDelete = productosJSON.find(
        (item: IItem) => item.id === id
      );

      if (productToDelete) {
        const newProductList = productosJSON.filter(
          (item: IItem) => item.id !== id
        );

        await fsPromises.writeFile(
          productosPath,
          JSON.stringify(newProductList, null, '\t')
        );
      } else {
        throw new NotFound('El producto que desea eliminar no existe');
      }
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else {
        throw { error: e, message: 'No se pudo actualizar el producto' };
      }
    }
  }
}

export const productosModel = new ProductosModel();
