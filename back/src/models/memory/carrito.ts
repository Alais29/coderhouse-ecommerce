import { IItem } from 'common/interfaces/products';
import { NotFound, RepeatedProductInCart } from 'errors';
import { ProductosModel } from './productos';

export class CarritoModel {
  private carrito;
  constructor() {
    this.carrito = [] as IItem[];
  }

  async get(id?: string): Promise<IItem | IItem[]> {
    try {
      if (id)
        return this.carrito.find((item: IItem) => item.id === id) as IItem;
      return this.carrito;
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los producto' };
    }
  }

  async save(id: string): Promise<IItem> {
    try {
      const productsModel = new ProductosModel();
      const allProducts = await productsModel.get();
      const productToAdd = (allProducts as IItem[]).find(
        (item: IItem) => item.id === id,
      );
      const productToAddInCart = this.carrito.find(
        (item: IItem) => item.id === id,
      );

      if (productToAddInCart) {
        throw new RepeatedProductInCart(
          400,
          'El producto que desea agregar ya se encuentra en el carrito',
        );
      } else {
        if (productToAdd) {
          this.carrito.push(productToAdd);
          return productToAdd;
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
      const productToDelete = this.carrito.find(
        (item: IItem) => item.id === id,
      );

      if (productToDelete) {
        const productToDeleteIndex = this.carrito
          .map((item: IItem) => item.id)
          .indexOf(id);
        this.carrito.splice(productToDeleteIndex, 1);
        return this.carrito;
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
