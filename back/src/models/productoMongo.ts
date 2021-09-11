import { mongoDbServiceProductos } from 'services/mongodb';
import { IItem, IItemMongoDoc } from 'common/interfaces';
import { EErrorCodes } from 'common/enums';

class ProductosModel {
  async getAll(): Promise<IItemMongoDoc[]> {
    try {
      return mongoDbServiceProductos.get();
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los productos' };
    }
  }

  async get(id: string): Promise<IItemMongoDoc> {
    try {
      const producto = await mongoDbServiceProductos.get(id);
      return producto[0];
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar el producto' };
    }
  }

  async save(producto: IItem): Promise<IItemMongoDoc> {
    try {
      const newProduct = await mongoDbServiceProductos.create(producto);
      return newProduct;
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'No se pudo guardar el producto' };
      } else {
        throw {
          error: e.error,
          message: e.message,
        };
      }
    }
  }

  async update(id: string, producto: IItem): Promise<IItemMongoDoc> {
    try {
      const productUpdated = await mongoDbServiceProductos.update(id, producto);

      if (productUpdated) {
        return productUpdated;
      } else {
        throw {
          error: `-${EErrorCodes.ProductNotFound}`,
          message: 'El producto que desea actualizar no existe',
        };
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'No se pudo actualizar el producto' };
      } else {
        throw {
          error: e.error,
          message: e.message,
        };
      }
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const productDeleted = await mongoDbServiceProductos.delete(id);
      if (!productDeleted) {
        throw {
          error: `-${EErrorCodes.ProductNotFound}`,
          message: 'El producto que desea eliminar no existe',
        };
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'No se pudo borrar el producto' };
      } else {
        throw { error: e.error, message: e.message };
      }
    }
  }
}

export const productosModel = new ProductosModel();
