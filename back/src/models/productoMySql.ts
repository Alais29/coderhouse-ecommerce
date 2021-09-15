import { mySqlDbService } from 'services/mysqldb';
import { IItem } from 'common/interfaces';
import { EErrorCodes } from 'common/enums';

class ProductosModel {
  async getAll(): Promise<IItem[]> {
    try {
      return mySqlDbService.get('productos');
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los productos' };
    }
  }

  async get(id: number): Promise<IItem> {
    try {
      const producto = await mySqlDbService.get('productos', id);
      return producto[0];
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar el producto' };
    }
  }

  async save(producto: IItem): Promise<IItem> {
    try {
      const newProduct = await mySqlDbService.create('productos', producto);
      return newProduct[0];
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

  async update(id: number, producto: IItem): Promise<IItem> {
    try {
      const productUpdated = await mySqlDbService.update('productos', id, producto);

      if (productUpdated[0]) {
        return productUpdated[0];
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

  async delete(id: number): Promise<void> {
    try {
      const productDeleted = await mySqlDbService.delete('productos', id);
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
