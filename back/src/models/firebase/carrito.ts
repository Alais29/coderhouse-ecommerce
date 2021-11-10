import { IItem } from 'common/interfaces/products';
import { NotFound, RepeatedProductInCart } from 'errors';
import admin from 'firebase-admin';

export class CarritoModelFirebase {
  public carritoDb;
  public productosDb;
  constructor() {
    const db = admin.firestore();
    this.carritoDb = db.collection('carrito');
    this.productosDb = db.collection('productos');
  }

  async get(id?: string): Promise<IItem[] | IItem> {
    try {
      let output: IItem[] | IItem = [];
      if (id) {
        const data = await this.carritoDb.doc(id).get();
        const producto = data.data();
        if (producto) {
          output = {
            id: data.id,
            ...producto,
          } as IItem;
        } else {
          return output[0];
        }
      } else {
        const result = await this.carritoDb.get();
        const productos = result.docs;
        output = productos.map(product => {
          const productData = product.data();
          return {
            id: product.id,
            ...productData,
          };
        }) as IItem[];
      }
      return output;
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los productos' };
    }
  }

  async save(id: string): Promise<IItem> {
    try {
      const productToAddInCart = await this.get(id);

      if (productToAddInCart) {
        throw new RepeatedProductInCart(
          400,
          'El producto que desea agregar ya se encuentra en el carrito',
        );
      } else {
        const productToAddData = await this.productosDb.doc(id).get();
        const productToAdd = productToAddData.data();
        if (productToAdd) {
          await this.carritoDb.doc(id).set({
            ...productToAdd,
          });
          return {
            id,
            ...productToAdd,
          } as IItem;
        } else {
          throw new NotFound(404, 'El producto que deseas agregar no existe');
        }
      }
    } catch (e) {
      if (e instanceof RepeatedProductInCart || e instanceof NotFound) {
        throw e;
      } else {
        throw { error: e, message: 'No se pudo guardar el producto' };
      }
    }
  }

  async delete(id: string): Promise<IItem[]> {
    try {
      const productToDelete = await this.get(id);
      if (productToDelete) {
        await this.carritoDb.doc(id).delete();
        const productsInCart = await this.get();
        return productsInCart as IItem[];
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
}
