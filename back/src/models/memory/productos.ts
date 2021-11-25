import { IItem, IItemQuery } from 'common/interfaces/products';
import { NotFound } from 'errors';
import { productosMockMem } from 'mocks/products-mem';
import { IModel } from 'models/factory/productos';
import { productDTO } from 'dto/productos';

let productos = productosMockMem;

export class ProductosModel implements IModel {
  async get(id?: string): Promise<IItem | IItem[]> {
    try {
      if (id) return productos.find((item: IItem) => item.id === id) as IItem;
      return productos;
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar el producto' };
    }
  }

  async save(producto: IItem): Promise<IItem> {
    try {
      const newProduct = productDTO(producto);
      productos.push(newProduct);
      return newProduct;
    } catch (e) {
      throw { error: e, message: 'No se pudo guardar el producto' };
    }
  }

  async update(id: string, producto: IItem): Promise<IItem> {
    try {
      let productToUpdate = productos.find((item: IItem) => item.id === id);

      if (productToUpdate) {
        productToUpdate = {
          ...productToUpdate,
          ...producto,
        };

        const productToUpdateIndex = productos
          .map((item: IItem) => item.id)
          .indexOf(id);
        productos.splice(productToUpdateIndex, 1, productToUpdate);

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
      const productToDelete = productos.find((item: IItem) => item.id === id);

      if (productToDelete) {
        const newProductList = productos.filter(
          (item: IItem) => item.id !== id,
        );
        productos = newProductList;
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
