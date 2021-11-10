import { promises as fsPromises } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import path from 'path';
import { IItem, IItemQuery } from 'common/interfaces/products';
import { NotFound } from 'errors';

const productosPath = path.resolve(__dirname, '../../../productos.json');

export class ProductosModelFs {
  async get(id?: string): Promise<IItem | IItem[]> {
    try {
      const productos = await fsPromises.readFile(productosPath, 'utf-8');
      const productosJSON = JSON.parse(productos);
      if (id) return productosJSON.find((item: IItem) => item.id === id);
      return productosJSON;
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar el producto' };
    }
  }

  async save(producto: IItem): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(productosPath, 'utf-8');
      const productosJSON = JSON.parse(productos);

      producto.id = uuidv4();
      producto.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');

      productosJSON.push(producto);
      await fsPromises.writeFile(
        productosPath,
        JSON.stringify(productosJSON, null, '\t'),
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
          JSON.stringify(productosJSON, null, '\t'),
        );
        return productToUpdate;
      } else {
        throw new NotFound(404, 'El producto que desea actualizar no existe');
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
        (item: IItem) => item.id === id,
      );

      if (productToDelete) {
        const newProductList = productosJSON.filter(
          (item: IItem) => item.id !== id,
        );

        await fsPromises.writeFile(
          productosPath,
          JSON.stringify(newProductList, null, '\t'),
        );
      } else {
        throw new NotFound(404, 'El producto que desea eliminar no existe');
      }
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else {
        throw { error: e, message: 'No se pudo actualizar el producto' };
      }
    }
  }

  async query(options: IItemQuery): Promise<IItem[]> {
    const productos = await this.get();
    type Conditions = (aProduct: IItem) => boolean;
    const query: Conditions[] = [];

    if (options.nombre)
      query.push((aProduct: IItem) => aProduct.nombre == options.nombre);

    if (options.codigo)
      query.push((aProduct: IItem) => aProduct.codigo == options.codigo);

    if (options.minPrice)
      query.push(
        (aProduct: IItem) => aProduct.precio >= (options.minPrice as number),
      );

    if (options.maxPrice)
      query.push(
        (aProduct: IItem) => aProduct.precio <= (options.maxPrice as number),
      );

    if (options.minStock)
      query.push(
        (aProduct: IItem) => aProduct.stock >= (options.minStock as number),
      );

    if (options.maxStock)
      query.push(
        (aProduct: IItem) => aProduct.stock <= (options.maxStock as number),
      );

    return (productos as IItem[]).filter(aProduct =>
      query.every(condition => condition(aProduct)),
    );
  }
}
