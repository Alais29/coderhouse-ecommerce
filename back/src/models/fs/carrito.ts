import { promises as fsPromises } from 'fs';
import path from 'path';
import { IItem } from 'common/interfaces/products';
import { ProductosModelFs } from 'models/fs/producto';
import { NotFound, RepeatedProductInCart } from 'errors';

const carritosPath = path.resolve(__dirname, '../../../carrito.json');

export class CarritoModelFs {
  async get(id?: string): Promise<IItem[] | IItem> {
    try {
      const carrito = await fsPromises.readFile(carritosPath, 'utf-8');
      const productos = JSON.parse(carrito).productos;
      if (id) return productos.find((item: IItem) => item.id === id);
      return productos;
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los productos' };
    }
  }

  async save(id: string): Promise<IItem> {
    try {
      const productsModel = new ProductosModelFs();
      const allProducts = await productsModel.get();
      const productToAdd = (allProducts as IItem[]).find(
        (item: IItem) => item.id === id,
      );
      const carrito = await fsPromises.readFile(carritosPath, 'utf-8');
      const carritoJSON = JSON.parse(carrito);
      const productToAddInCart = carritoJSON.productos.find(
        (item: IItem) => item.id === id,
      );

      if (productToAddInCart) {
        throw new RepeatedProductInCart(
          400,
          'El producto que desea agregar ya se encuentra en el carrito',
        );
      } else {
        if (productToAdd) {
          carritoJSON.productos.push(productToAdd);
          await fsPromises.writeFile(
            carritosPath,
            JSON.stringify(carritoJSON, null, '\t'),
          );
          return carritoJSON.productos;
        } else {
          throw new NotFound(404, 'El producto que desea agregar no existe');
        }
      }
    } catch (e) {
      if (e instanceof NotFound || e instanceof RepeatedProductInCart) {
        throw e;
      } else {
        throw { error: e, message: 'Hubo un problema al agregar el producto' };
      }
    }
  }

  async delete(id: string): Promise<IItem[]> {
    try {
      const carrito = await fsPromises.readFile(carritosPath, 'utf-8');
      const carritoJSON = JSON.parse(carrito);
      const productToDelete = carritoJSON.productos.find(
        (item: IItem) => item.id === id,
      );

      if (productToDelete) {
        const productToDeleteIndex = carritoJSON.productos
          .map((item: IItem) => item.id)
          .indexOf(id);
        carritoJSON.productos.splice(productToDeleteIndex, 1);
        await fsPromises.writeFile(
          carritosPath,
          JSON.stringify(carritoJSON, null, '\t'),
        );
        return carritoJSON.productos;
      } else {
        throw new NotFound(
          404,
          'El producto que desea eliminar no esta en el carrito',
        );
      }
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else {
        throw { error: e, message: 'No se pudo eliminar el producto' };
      }
    }
  }
}
